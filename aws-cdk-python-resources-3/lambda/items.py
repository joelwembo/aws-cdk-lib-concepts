import os
import json
import uuid
import boto3

import utils

demo_table = boto3.resource("dynamodb").Table(os.environ.get('DEMO_TABLE_NAME'))


def index(event, context):
    response = demo_table.scan(
        Limit=10,
        ReturnConsumedCapacity='TOTAL'
    )
    return utils.respond_success(response)


def store(event, context):
    data = json.loads(event.get('body'))
    response = demo_table.put_item(
        Item={
            'id': str(uuid.uuid4()),
            'title': data.get('title'),
            'description': data.get('description')
        },
        ConditionExpression='attribute_not_exists(#id)',
        ExpressionAttributeNames={
            '#id': 'id'
        },
        ReturnConsumedCapacity='TOTAL'
    )
    return utils.respond_success(response)


