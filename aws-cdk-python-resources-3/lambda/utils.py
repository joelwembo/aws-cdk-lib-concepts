import json


def respond_success(body):
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'text/json'
        },
        'body': json.dumps(body)
    }
