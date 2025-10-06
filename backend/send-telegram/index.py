import json
import os
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