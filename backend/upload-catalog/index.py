import json
import os
import base64
import uuid
from typing import Dict, Any

TEMP_CHUNKS = {}

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Upload PDF catalog files in chunks to avoid memory issues
    Args: event with httpMethod, body containing chunk data, metadata
          context with request_id
    Returns: HTTP response with catalog info (on last chunk)
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
    
    try:
        body_data = json.loads(event.get('body', '{}'))
    except Exception as e:
        print(f"Error parsing body: {str(e)}")
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Invalid JSON body: {str(e)}'})
        }
    
    title = body_data.get('title', '')
    description = body_data.get('description', '')
    category = body_data.get('category', 'xcmg')
    file_data = body_data.get('file_data', '')
    file_name = body_data.get('file_name', 'catalog.pdf')
    chunk_index = body_data.get('chunk_index', 0)
    total_chunks = body_data.get('total_chunks', 1)
    upload_id = body_data.get('upload_id', 'single')
    file_size = body_data.get('file_size', 0)
    
    print(f"Upload request: chunk {chunk_index}/{total_chunks}, file: {file_name}, size: {file_size}")
    
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
        print(f"Processing chunk {chunk_index}, file_data length: {len(file_data)}")
        chunk_bytes = base64.b64decode(file_data.split(',')[1] if ',' in file_data else file_data)
        print(f"Decoded chunk size: {len(chunk_bytes)} bytes")
        
        if upload_id not in TEMP_CHUNKS:
            TEMP_CHUNKS[upload_id] = {
                'chunks': {},
                'metadata': {
                    'title': title,
                    'description': description,
                    'category': category,
                    'file_name': file_name,
                    'file_size': file_size,
                    'total_chunks': total_chunks
                }
            }
        
        TEMP_CHUNKS[upload_id]['chunks'][chunk_index] = chunk_bytes
        
        if len(TEMP_CHUNKS[upload_id]['chunks']) < total_chunks:
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'chunk_received': chunk_index,
                    'chunks_received': len(TEMP_CHUNKS[upload_id]['chunks']),
                    'total_chunks': total_chunks
                }),
                'isBase64Encoded': False
            }
        
        all_chunks = TEMP_CHUNKS[upload_id]['chunks']
        metadata = TEMP_CHUNKS[upload_id]['metadata']
        
        file_bytes = b''.join([all_chunks[i] for i in sorted(all_chunks.keys())])
        file_base64 = base64.b64encode(file_bytes).decode('utf-8')
        
        import psycopg2
        import psycopg2.extensions
        
        conn = psycopg2.connect(database_url)
        conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
        cur = conn.cursor()
        
        sql = f"""
            INSERT INTO t_p90963059_techglobal_business_.catalogs 
            (title, description, category, file_name, file_size, file_data, file_url)
            VALUES ('{metadata["title"].replace("'", "''")}', '{metadata["description"].replace("'", "''")}', 
                    '{metadata["category"]}', '{metadata["file_name"].replace("'", "''")}', {metadata["file_size"]}, 
                    decode('{file_base64}', 'base64'), '')
            RETURNING id
        """
        cur.execute(sql)
        catalog_id = cur.fetchone()[0]
        
        cur.close()
        conn.close()
        
        del TEMP_CHUNKS[upload_id]
        
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
                    'title': metadata['title'],
                    'description': metadata['description'],
                    'category': metadata['category'],
                    'file_name': metadata['file_name'],
                    'file_size': metadata['file_size']
                }
            }),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        if upload_id in TEMP_CHUNKS:
            del TEMP_CHUNKS[upload_id]
        
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }