import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Обновление статуса отзыва (одобрить/отклонить/удалить)
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

    data = json.loads(event.get('body', '{}'))
    review_id = data.get('id')
    action = data.get('action')
    password = data.get('password', '')
    
    ADMIN_PASSWORD = 'Ktcybr21'
    
    if password != ADMIN_PASSWORD:
        return {
            'statusCode': 403,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Неверный пароль'}),
            'isBase64Encoded': False
        }
    
    if not review_id or action not in ['approve', 'reject', 'delete']:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid request'}),
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
            'body': json.dumps({'error': 'Database not configured'}),
            'isBase64Encoded': False
        }
    
    import psycopg2
    import psycopg2.extensions
    
    try:
        conn = psycopg2.connect(db_url)
        conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
        cur = conn.cursor()
        
        if action == 'delete':
            sql = f"DELETE FROM t_p90963059_techglobal_business_.reviews WHERE id = {review_id}"
            message = 'Отзыв удален'
        elif action == 'approve':
            sql = f"UPDATE t_p90963059_techglobal_business_.reviews SET status = 'approved' WHERE id = {review_id}"
            message = 'Отзыв одобрен'
        else:
            sql = f"UPDATE t_p90963059_techglobal_business_.reviews SET status = 'rejected' WHERE id = {review_id}"
            message = 'Отзыв отклонен'
        
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
                'message': message
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