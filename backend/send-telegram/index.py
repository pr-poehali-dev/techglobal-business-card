import json
import os
import base64
from typing import Dict, Any
from urllib import request, error
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Отправка заявок с сайта в Telegram бот
    Args: event - dict с httpMethod, body (name, phone, message)
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict с результатом отправки
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

    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')

    if not bot_token or not chat_id:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Telegram не настроен'}),
            'isBase64Encoded': False
        }

    form_data = json.loads(event.get('body', '{}'))
    
    message = f'''🆕 Новая заявка с сайта!

👤 Имя: {form_data.get('name', '')}
📱 Телефон: {form_data.get('phone', '')}
💬 Сообщение: {form_data.get('message', '')}

⏰ Время: {datetime.now().strftime('%d.%m.%Y %H:%M')}'''

    telegram_url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
    
    payload = json.dumps({
        'chat_id': chat_id,
        'text': message
    }).encode('utf-8')
    
    req = request.Request(
        telegram_url,
        data=payload,
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    
    try:
        with request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
        
        file_data = form_data.get('file', '')
        file_name = form_data.get('fileName', '')
        
        if file_data and file_name:
            file_base64 = file_data.split(',')[1] if ',' in file_data else file_data
            file_bytes = base64.b64decode(file_base64)
            
            boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
            body_parts = []
            body_parts.append(f'--{boundary}'.encode())
            body_parts.append(f'Content-Disposition: form-data; name="chat_id"\r\n'.encode())
            body_parts.append(f'{chat_id}\r\n'.encode())
            body_parts.append(f'--{boundary}'.encode())
            body_parts.append(f'Content-Disposition: form-data; name="document"; filename="{file_name}"\r\n'.encode())
            body_parts.append(b'Content-Type: application/octet-stream\r\n\r\n')
            body_parts.append(file_bytes)
            body_parts.append(f'\r\n--{boundary}--\r\n'.encode())
            
            multipart_body = b'\r\n'.join(body_parts)
            
            file_url = f'https://api.telegram.org/bot{bot_token}/sendDocument'
            file_req = request.Request(
                file_url,
                data=multipart_body,
                headers={
                    'Content-Type': f'multipart/form-data; boundary={boundary}'
                },
                method='POST'
            )
            
            with request.urlopen(file_req) as file_response:
                pass
            
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Заявка отправлена'}),
            'isBase64Encoded': False
        }
    except error.HTTPError:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Ошибка отправки в Telegram'}),
            'isBase64Encoded': False
        }