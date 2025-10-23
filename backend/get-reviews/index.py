import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Получение отзывов из БД
    Args: event - dict с httpMethod
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response с отзывами
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }

    db_url = os.environ.get('DATABASE_URL')
    
    if not db_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'reviews': []}),
            'isBase64Encoded': False
        }
    
    import psycopg2
    
    try:
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        
        cur.execute("SELECT id, company, author, position, text, status, created_at FROM t_p90963059_techglobal_business_.reviews ORDER BY created_at DESC")
        rows = cur.fetchall()
        
        reviews = []
        for row in rows:
            reviews.append({
                'id': row[0],
                'company': row[1],
                'author': row[2],
                'position': row[3],
                'text': row[4],
                'status': row[5],
                'created_at': row[6].isoformat() if row[6] else None
            })
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'reviews': reviews}),
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
            'body': json.dumps({'reviews': [], 'error': str(e)}),
            'isBase64Encoded': False
        }