import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Удаление заявки или всех заявок из базы данных
    Args: event - dict с httpMethod, body (id, password, clear_all)
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict с результатом удаления
    '''
    method: str = event.get('httpMethod', 'POST')
    
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
    lead_id = form_data.get('id', 0)
    password = form_data.get('password', '')
    clear_all = form_data.get('clear_all', False)
    date_from = form_data.get('date_from')
    date_to = form_data.get('date_to')
    
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
    
    database_url = os.environ.get('DATABASE_URL')
    
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Database not configured'}),
            'isBase64Encoded': False
        }

    try:
        import psycopg2
        import psycopg2.extensions
        
        conn = psycopg2.connect(database_url)
        conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
        cur = conn.cursor()
        
        if clear_all:
            where_conditions = []
            if date_from:
                where_conditions.append(f"created_at >= '{date_from}'")
            if date_to:
                where_conditions.append(f"created_at <= '{date_to} 23:59:59'")
            
            where_clause = ""
            if where_conditions:
                where_clause = " WHERE " + " AND ".join(where_conditions)
            
            cur.execute(f"SELECT COUNT(*) FROM t_p90963059_techglobal_business_.leads{where_clause}")
            count = cur.fetchone()[0]
            
            cur.execute(f"DELETE FROM t_p90963059_techglobal_business_.leads{where_clause}")
            
            cur.close()
            conn.close()
            
            message = f'Удалено заявок: {count}'
            if date_from or date_to:
                if date_from and date_to:
                    message += f' (с {date_from} по {date_to})'
                elif date_from:
                    message += f' (начиная с {date_from})'
                else:
                    message += f' (до {date_to})'
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True, 'message': message, 'deleted': count}),
                'isBase64Encoded': False
            }
        else:
            sql = f"DELETE FROM t_p90963059_techglobal_business_.leads WHERE id = {int(lead_id)}"
            cur.execute(sql)
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True, 'message': 'Заявка удалена'}),
                'isBase64Encoded': False
            }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }