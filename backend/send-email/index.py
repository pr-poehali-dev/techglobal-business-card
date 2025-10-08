import json
import os
import smtplib
import base64
from typing import Dict, Any
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Отправка заявок с сайта на email через SMTP
    Args: event - dict с httpMethod, body (name, phone, message, file)
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict с результатом отправки
    '''
    print(f"=== EMAIL FUNCTION CALLED ===")
    print(f"Request received: {event.get('httpMethod')}")
    print(f"Body: {event.get('body', 'NO BODY')}")
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

    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    email_to = os.environ.get('EMAIL_TO')

    if not all([smtp_host, smtp_user, smtp_password, email_to]):
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Email не настроен', 'details': 'Проверьте секреты SMTP'}),
            'isBase64Encoded': False
        }

    form_data = json.loads(event.get('body', '{}'))
    
    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = email_to
    msg['Subject'] = f"Новая заявка с сайта от {form_data.get('name', 'Неизвестно')}"
    
    body = f'''Новая заявка с сайта TechGlobal!

Имя: {form_data.get('name', '')}
Телефон: {form_data.get('phone', '')}
Сообщение: {form_data.get('message', '')}

Дата и время: {datetime.now().strftime('%d.%m.%Y %H:%M')}
'''
    
    msg.attach(MIMEText(body, 'plain', 'utf-8'))
    
    file_data = form_data.get('file', '')
    file_name = form_data.get('fileName', '')
    
    if file_data and file_name:
        file_base64 = file_data.split(',')[1] if ',' in file_data else file_data
        file_bytes = base64.b64decode(file_base64)
        
        part = MIMEBase('application', 'octet-stream')
        part.set_payload(file_bytes)
        encoders.encode_base64(part)
        part.add_header('Content-Disposition', f'attachment; filename={file_name}')
        msg.attach(part)
    
    try:
        server = smtplib.SMTP(smtp_host, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
        server.quit()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Заявка отправлена на email'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        print(f"SMTP Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Ошибка отправки email', 'details': str(e)}),
            'isBase64Encoded': False
        }