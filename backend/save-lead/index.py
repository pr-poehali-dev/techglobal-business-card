import json
import os
from typing import Dict, Any
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Сохранение заявок — отправка в Telegram и Email
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
    
    results = {'telegram': False, 'email': False, 'errors': []}
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    
    if bot_token and chat_id:
        try:
            from urllib import request
            
            telegram_message = f'''🆕 Новая заявка с сайта!

👤 Имя: {name}
📱 Телефон: {phone}
💬 Сообщение: {message}

⏰ Время: {datetime.now().strftime('%d.%m.%Y %H:%M')}'''
            
            telegram_url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
            payload = json.dumps({'chat_id': chat_id, 'text': telegram_message}).encode('utf-8')
            
            req = request.Request(telegram_url, data=payload, headers={'Content-Type': 'application/json'}, method='POST')
            with request.urlopen(req, timeout=5) as response:
                response.read()
            results['telegram'] = True
        except Exception as e:
            results['errors'].append(f'Telegram: {str(e)}')
    
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
            msg['Subject'] = f"Новая заявка с сайта от {name}"
            
            body = f'''Новая заявка с сайта TechGlobal!

Имя: {name}
Телефон: {phone}
Сообщение: {message}

Дата и время: {datetime.now().strftime('%d.%m.%Y %H:%M')}'''
            
            msg.attach(MIMEText(body, 'plain', 'utf-8'))
            
            server = smtplib.SMTP(smtp_host, smtp_port, timeout=5)
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
            server.quit()
            results['email'] = True
        except Exception as e:
            results['errors'].append(f'Email: {str(e)}')
    
    success = results['telegram'] or results['email']
    
    return {
        'statusCode': 200 if success else 500,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': success,
            'message': 'Заявка отправлена' if success else 'Не настроены каналы отправки',
            'results': results
        }),
        'isBase64Encoded': False
    }
