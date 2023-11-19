import os
import json
import boto3

import utils

demo_table = boto3.resource('dynamodb').Table(os.environ.get('DEMO_TABLE_NAME'))


def get(event, context):
    response = demo_table.get_item(
        Key={
            "id": event.get('pathParameters').get('item')
        },
        ReturnConsumedCapacity='TOTAL'
    )
    return utils.respond_success(response)


def update(event, context):
    data = json.loads(event.get('body'))
    response = demo_table.update_item(
        Key={
            'id': event.get('pathParameters').get('item')
        },
        UpdateExpression='SET #title = :title, #description = :description',
        ExpressionAttributeValues={
            ':title': data.get('title'),
            ':description': data.get('description')
        },
        ExpressionAttributeNames={
            '#title': 'title',
            '#description': 'description'
        },
        ReturnConsumedCapacity='TOTAL'
    )
    return utils.respond_success(response)


def delete(event, context):
    response = demo_table.delete_item(
        Key={
            'id': event.get('pathParameters').get('item')
        },
        ReturnConsumedCapacity='TOTAL'
    )
    return utils.respond_success(response)
