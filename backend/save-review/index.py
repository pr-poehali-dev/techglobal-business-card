import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Сохранение отзывов в БД
    Args: event - dict с httpMethod, body
          context - объект с атрибутами request_id, function_name
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

    review_data = json.loads(event.get('body', '{}'))
    company = review_data.get('company', '')
    author = review_data.get('author', '')
    position = review_data.get('position', '')
    text = review_data.get('text', '')
    
    db_url = os.environ.get('DATABASE_URL')
    
    if not db_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Database not configured'}),
            'isBase64Encoded': False
        }
    
    import psycopg2
    import psycopg2.extensions
    
    try:
        conn = psycopg2.connect(db_url)
        conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
        cur = conn.cursor()
        
        safe_company = company.replace("'", "''")
        safe_author = author.replace("'", "''")
        safe_position = position.replace("'", "''")
        safe_text = text.replace("'", "''")
        
        sql = f"INSERT INTO t_p90963059_techglobal_business_.reviews (company, author, position, text, status) VALUES ('{safe_company}', '{safe_author}', '{safe_position}', '{safe_text}', 'pending')"
        cur.execute(sql)
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Отзыв отправлен на модерацию'
            }),
            'isBase64Encoded': False
        }
    except Exception as e:
        print(f"DB ERROR: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }