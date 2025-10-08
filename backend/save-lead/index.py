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
    file_data = form_data.get('file', '')
    
    results = {'database': False, 'errors': []}
    
    db_url = os.environ.get('DATABASE_URL')
    
    if db_url:
        import psycopg2
        import psycopg2.extensions
        try:
            conn = psycopg2.connect(db_url)
            conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
            cur = conn.cursor()
            
            safe_name = name.replace("'", "''")
            safe_phone = phone.replace("'", "''")
            safe_message = (message or '').replace("'", "''")
            safe_file = (file_name or '').replace("'", "''")
            safe_file_data = (file_data or '').replace("'", "''")
            
            print(f"Attempting DB insert: {name}, {phone}, file_name: {file_name}, file_data_length: {len(safe_file_data)}")
            sql = f"INSERT INTO t_p90963059_techglobal_business_.leads (name, phone, message, file_name, file_data) VALUES ('{safe_name}', '{safe_phone}', '{safe_message}', '{safe_file}', '{safe_file_data}')"
            cur.execute(sql)
            
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