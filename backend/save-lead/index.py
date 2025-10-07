import json
import os
from typing import Dict, Any
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Сохранение заявок в БД, отправка в Telegram и Email
    Args: event - dict с httpMethod, body (name, phone, message, file)
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict с результатом
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }

    form_data = json.loads(event.get('body', '{}'))
    name = form_data.get('name', '')
    phone = form_data.get('phone', '')
    message = form_data.get('message', '')
    file_name = form_data.get('fileName', '')
    
    results = {'database': False, 'telegram': False, 'email': False, 'errors': []}
    
    db_url = os.environ.get('DATABASE_URL')
    
    if db_url:
        import psycopg2
        try:
            print(f'Connecting to DB...')
            conn = psycopg2.connect(db_url)
            cur = conn.cursor()
            
            ip_address = event.get('requestContext', {}).get('identity', {}).get('sourceIp', '') or ''
            user_agent = event.get('headers', {}).get('user-agent', '') or ''
            
            name_clean = name.replace("'", "''")
            phone_clean = phone.replace("'", "''")
            message_clean = message.replace("'", "''") if message else ''
            file_clean = file_name.replace("'", "''") if file_name else ''
            ip_clean = ip_address.replace("'", "''")
            ua_clean = user_agent.replace("'", "''")
            
            query = f"""INSERT INTO t_p90963059_techglobal_business_.leads (name, phone, message, file_name, ip_address, user_agent) 
                       VALUES ('{name_clean}', '{phone_clean}', '{message_clean}', '{file_clean}', '{ip_clean}', '{ua_clean}')"""
            
            print(f'Executing query: {query[:100]}...')
            cur.execute(query)
            conn.commit()
            print('DB commit successful!')
            cur.close()
            conn.close()
            results['database'] = True
        except Exception as e:
            print(f'DB Error: {str(e)}')
            results['errors'].append(f'DB: {str(e)}')
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    
    if bot_token and chat_id:
        try:
            import urllib.request
            
            telegram_message = f'''🆕 Новая заявка!

👤 {name}
📱 {phone}
💬 {message or "—"}

⏰ {datetime.now().strftime('%d.%m.%Y %H:%M')}'''
            
            telegram_url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
            payload = json.dumps({'chat_id': chat_id, 'text': telegram_message}).encode('utf-8')
            
            req = urllib.request.Request(telegram_url, data=payload, headers={'Content-Type': 'application/json'}, method='POST')
            with urllib.request.urlopen(req, timeout=5) as response:
                response.read()
            results['telegram'] = True
        except Exception as e:
            results['errors'].append(f'TG: {str(e)}')
    
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    email_to = os.environ.get('EMAIL_TO')
    
    if all([smtp_host, smtp_user, smtp_password, email_to]):
        try:
            import smtplib
            from email.mime.text import MIMEText
            from email.mime.multipart import MIMEMultipart
            
            smtp_port = int(os.environ.get('SMTP_PORT', '587'))
            
            msg = MIMEMultipart()
            msg['From'] = smtp_user
            msg['To'] = email_to
            msg['Subject'] = f"Заявка от {name}"
            
            body = f'''Заявка с сайта

Имя: {name}
Телефон: {phone}
Сообщение: {message or "—"}

{datetime.now().strftime('%d.%m.%Y %H:%M')}'''
            
            msg.attach(MIMEText(body, 'plain', 'utf-8'))
            
            server = smtplib.SMTP(smtp_host, smtp_port, timeout=10)
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
            server.quit()
            results['email'] = True
        except Exception as e:
            results['errors'].append(f'Email: {str(e)}')
    
    msg = 'Заявка принята!'
    if results['database']:
        msg = 'Заявка сохранена!'
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': True,
            'message': msg,
            'results': results
        }),
        'isBase64Encoded': False
    }