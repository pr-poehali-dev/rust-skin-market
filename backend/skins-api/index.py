import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any
from datetime import datetime

def json_serial(obj):
    '''JSON serializer for datetime objects'''
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f"Type {type(obj)} not serializable")

def get_db_connection():
    '''Get database connection using DATABASE_URL'''
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления скинами в магазине
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с request_id
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    conn = get_db_connection()
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            skin_id = params.get('id')
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                if skin_id:
                    cur.execute('SELECT * FROM skins WHERE id = %s', (skin_id,))
                    skin = cur.fetchone()
                    if not skin:
                        return {
                            'statusCode': 404,
                            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                            'body': json.dumps({'error': 'Скин не найден'})
                        }
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps(dict(skin), default=json_serial)
                    }
                else:
                    cur.execute('SELECT * FROM skins ORDER BY created_at DESC')
                    skins = cur.fetchall()
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps([dict(skin) for skin in skins], default=json_serial)
                    }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            name = body_data.get('name')
            weapon = body_data.get('weapon')
            rarity = body_data.get('rarity')
            price = body_data.get('price')
            image_url = body_data.get('image_url', '/placeholder.svg')
            
            if not all([name, weapon, rarity, price]):
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Необходимы поля: name, weapon, rarity, price'})
                }
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    'INSERT INTO skins (name, weapon, rarity, price, image_url) VALUES (%s, %s, %s, %s, %s) RETURNING *',
                    (name, weapon, rarity, price, image_url)
                )
                new_skin = cur.fetchone()
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(dict(new_skin), default=json_serial)
                }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            skin_id = body_data.get('id')
            
            if not skin_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Необходимо поле id'})
                }
            
            fields = []
            values = []
            for field in ['name', 'weapon', 'rarity', 'price', 'image_url']:
                if field in body_data:
                    fields.append(f"{field} = %s")
                    values.append(body_data[field])
            
            if not fields:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Нет полей для обновления'})
                }
            
            values.append(skin_id)
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    f"UPDATE skins SET {', '.join(fields)}, updated_at = CURRENT_TIMESTAMP WHERE id = %s RETURNING *",
                    values
                )
                updated_skin = cur.fetchone()
                if not updated_skin:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Скин не найден'})
                    }
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(dict(updated_skin), default=json_serial)
                }
        
        elif method == 'DELETE':
            params = event.get('queryStringParameters') or {}
            skin_id = params.get('id')
            
            if not skin_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Необходим параметр id'})
                }
            
            with conn.cursor() as cur:
                cur.execute('DELETE FROM skins WHERE id = %s', (skin_id,))
                if cur.rowcount == 0:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Скин не найден'})
                    }
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'message': 'Скин удален'})
                }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Метод не поддерживается'})
            }
    
    finally:
        conn.close()