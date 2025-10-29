import json
import os
import base64
import urllib.request
import urllib.parse
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Download PDF catalog file by ID from database or external URL
    Args: event with httpMethod GET, queryStringParameters with id
          context with request_id
    Returns: HTTP response with PDF file as base64
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
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    params = event.get('queryStringParameters', {}) or {}
    catalog_id = params.get('id', '')
    
    if not catalog_id:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Catalog ID is required'})
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
        import psycopg2
        import psycopg2.extensions
        
        conn = psycopg2.connect(database_url)
        conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
        cur = conn.cursor()
        
        sql = f"""
            SELECT file_url, file_name
            FROM t_p90963059_techglobal_business_.catalogs
            WHERE id = {int(catalog_id)}
        """
        cur.execute(sql)
        row = cur.fetchone()
        
        cur.close()
        conn.close()
        
        if not row or not row[0]:
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Catalog not found'})
            }
        
        file_url = row[0]
        
        parsed = urllib.parse.urlparse(file_url)
        encoded_path = urllib.parse.quote(parsed.path.encode('utf-8'), safe='/')
        encoded_url = f"{parsed.scheme}://{parsed.netloc}{encoded_path}"
        
        return {
            'statusCode': 302,
            'headers': {
                'Location': encoded_url,
                'Access-Control-Allow-Origin': '*'
            },
            'body': ''
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