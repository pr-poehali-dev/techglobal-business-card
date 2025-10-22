import json
import os
from datetime import datetime, timedelta
from typing import Dict, Any, Optional

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Получение статистики посещений из Google Analytics API
    Args: event - dict with httpMethod, queryStringParameters (period: day/week/month)
          context - object with request_id, function_name
    Returns: HTTP response with analytics data
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
    
    params = event.get('queryStringParameters') or {}
    period: str = params.get('period', 'week')
    
    property_id = os.environ.get('GOOGLE_ANALYTICS_PROPERTY_ID')
    credentials_json = os.environ.get('GOOGLE_ANALYTICS_CREDENTIALS')
    
    if not property_id or not credentials_json:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'configured': False,
                'message': 'Google Analytics не настроен. Добавьте секреты GOOGLE_ANALYTICS_PROPERTY_ID и GOOGLE_ANALYTICS_CREDENTIALS'
            })
        }
    
    try:
        from google.analytics.data_v1beta import BetaAnalyticsDataClient
        from google.analytics.data_v1beta.types import (
            RunReportRequest,
            DateRange,
            Dimension,
            Metric
        )
        from google.oauth2 import service_account
        
        credentials_dict = json.loads(credentials_json)
        credentials = service_account.Credentials.from_service_account_info(
            credentials_dict,
            scopes=['https://www.googleapis.com/auth/analytics.readonly']
        )
        
        client = BetaAnalyticsDataClient(credentials=credentials)
        
        days_map = {'day': 1, 'week': 7, 'month': 30}
        days = days_map.get(period, 7)
        
        end_date = datetime.now()
        start_date = end_date - timedelta(days=days)
        
        request = RunReportRequest(
            property=f'properties/{property_id}',
            dimensions=[
                Dimension(name='date'),
                Dimension(name='country')
            ],
            metrics=[
                Metric(name='activeUsers'),
                Metric(name='sessions'),
                Metric(name='screenPageViews'),
                Metric(name='averageSessionDuration')
            ],
            date_ranges=[DateRange(
                start_date=start_date.strftime('%Y-%m-%d'),
                end_date=end_date.strftime('%Y-%m-%d')
            )]
        )
        
        response = client.run_report(request)
        
        visitors_by_date = {}
        total_users = 0
        total_sessions = 0
        total_pageviews = 0
        countries = {}
        
        for row in response.rows:
            date = row.dimension_values[0].value
            country = row.dimension_values[1].value
            users = int(row.metric_values[0].value)
            sessions = int(row.metric_values[1].value)
            pageviews = int(row.metric_values[2].value)
            
            formatted_date = f"{date[6:8]}.{date[4:6]}.{date[0:4]}"
            
            if formatted_date not in visitors_by_date:
                visitors_by_date[formatted_date] = 0
            visitors_by_date[formatted_date] += users
            
            if country not in countries:
                countries[country] = 0
            countries[country] += users
            
            total_users += users
            total_sessions += sessions
            total_pageviews += pageviews
        
        date_data = [{'date': date, 'visitors': count} for date, count in sorted(visitors_by_date.items())]
        country_data = sorted([{'country': country, 'visitors': count} for country, count in countries.items()], 
                             key=lambda x: x['visitors'], reverse=True)[:5]
        
        avg_session_duration = 0
        if response.rows:
            avg_session_duration = sum(float(row.metric_values[3].value) for row in response.rows) / len(response.rows)
        
        result = {
            'configured': True,
            'period': period,
            'summary': {
                'total_users': total_users,
                'total_sessions': total_sessions,
                'total_pageviews': total_pageviews,
                'avg_session_duration': round(avg_session_duration, 2)
            },
            'visitors_by_date': date_data,
            'top_countries': country_data
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps(result)
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': str(e),
                'message': 'Ошибка получения данных из Google Analytics'
            })
        }
