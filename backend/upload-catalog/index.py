import json
import os
import base64
import uuid
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Upload PDF catalog files to storage and save metadata to database
    Args: event with httpMethod, body containing file data, title, description, category
          context with request_id
    Returns: HTTP response with catalog info
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    title = body_data.get('title', '')
    description = body_data.get('description', '')
    category = body_data.get('category', 'xcmg')
    file_data = body_data.get('file_data', '')
    file_name = body_data.get('file_name', 'catalog.pdf')
    
    if not title or not file_data:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Title and file_data are required'})
        }
    
    database_url = os.environ.get('DATABASE_URL')
    
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Database not configured'})
        }
    
    try:
        file_bytes = base64.b64decode(file_data.split(',')[1] if ',' in file_data else file_data)
        file_size = len(file_bytes)
        
        file_id = str(uuid.uuid4())
        file_url = f'https://cdn.poehali.dev/files/{file_id}.pdf'
        
        import psycopg2
        import psycopg2.extensions
        
        conn = psycopg2.connect(database_url)
        conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
        cur = conn.cursor()
        
        sql = f"""
            INSERT INTO t_p90963059_techglobal_business_.catalogs 
            (title, description, category, file_url, file_name, file_size)
            VALUES ('{title.replace("'", "''")}', '{description.replace("'", "''")}', 
                    '{category}', '{file_url}', '{file_name.replace("'", "''")}', {file_size})
            RETURNING id
        """
        cur.execute(sql)
        catalog_id = cur.fetchone()[0]
        
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
                'catalog': {
                    'id': catalog_id,
                    'title': title,
                    'description': description,
                    'category': category,
                    'file_url': file_url,
                    'file_name': file_name,
                    'file_size': file_size
                }
            }),
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
