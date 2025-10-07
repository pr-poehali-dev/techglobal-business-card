import json
import os
from typing import Dict, Any
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Сохранение заявок в БД
    Args: event, context
    Returns: HTTP response
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
    
    results = {'database': False, 'errors': []}
    
    db_url = os.environ.get('DATABASE_URL')
    
    if db_url:
        import psycopg2
        try:
            conn = psycopg2.connect(db_url)
            cur = conn.cursor()
            
            ip_address = event.get('requestContext', {}).get('identity', {}).get('sourceIp', '') or ''
            user_agent = event.get('headers', {}).get('user-agent', '') or ''
            
            print(f"Attempting DB insert: {name}, {phone}")
            cur.execute(
                "INSERT INTO leads (name, phone, message, file_name, ip_address, user_agent) VALUES (%s, %s, %s, %s, %s, %s)",
                (name, phone, message or '', file_name or '', ip_address, user_agent)
            )
            conn.commit()
            cur.close()
            conn.close()
            results['database'] = True
            print("DB insert successful!")
        except Exception as e:
            print(f"DB ERROR: {str(e)}")
            results['errors'].append(str(e))
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': True,
            'message': 'Заявка принята!',
            'results': results
        }),
        'isBase64Encoded': False
    }