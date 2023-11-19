from aws_cdk import (
    core,
    aws_lambda as _lambda,
    aws_apigateway as api_gateway,
    aws_dynamodb as dynamodb
)


class CdkTutStack(core.Stack):

    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        # The code that defines your stack goes here
        lambda_greetings = _lambda.Function(
            self, 'GreetingsHandler',
            runtime=_lambda.Runtime.PYTHON_3_7,
            code=_lambda.Code.asset('lambda'),
            handler='greetings.greet',
            memory_size=128
        )

        api_stage_options = api_gateway.StageOptions(stage_name="dev")
        api = api_gateway.LambdaRestApi(self, 'Endpoint', handler=lambda_greetings, deploy_options=api_stage_options)

        demo_table = dynamodb.Table(
            self, 'DemoTable',
            partition_key=dynamodb.Attribute(
                name='id', type=dynamodb.AttributeType.STRING
            )
        )

        index_items_handler = _lambda.Function(
            self, 'IndexItems',
            runtime=_lambda.Runtime.PYTHON_3_7,
            code=_lambda.Code.asset('lambda'),
            handler='items.index',
            memory_size=128,
            environment={
                'DEMO_TABLE_NAME': demo_table.table_name
            }
        )

        store_item_handler = _lambda.Function(
            self, 'StoreItem',
            runtime=_lambda.Runtime.PYTHON_3_7,
            code=_lambda.Code.asset('lambda'),
            handler='items.store',
            memory_size=128,
            environment={
                'DEMO_TABLE_NAME': demo_table.table_name
            }
        )

        index_items_integration = api_gateway.LambdaIntegration(index_items_handler)
        store_item_integration = api_gateway.LambdaIntegration(store_item_handler)

        items = api.root.add_resource("items")
        items.add_method("GET", index_items_integration)
        items.add_method("POST", store_item_integration)

        get_item_handler = _lambda.Function(
            self, 'GetItem',
            runtime=_lambda.Runtime.PYTHON_3_7,
            code=_lambda.Code.asset('lambda'),
            handler='item.get',
            memory_size=128,
            environment={
                'DEMO_TABLE_NAME': demo_table.table_name
            }
        )

        update_item_handler = _lambda.Function(
            self, 'UpdateItem',
            runtime=_lambda.Runtime.PYTHON_3_7,
            code=_lambda.Code.asset('lambda'),
            handler='item.update',
            memory_size=128,
            environment={
                'DEMO_TABLE_NAME': demo_table.table_name
            }
        )

        delete_item_handler = _lambda.Function(
            self, 'DeleteItem',
            runtime=_lambda.Runtime.PYTHON_3_7,
            code=_lambda.Code.asset('lambda'),
            handler='item.delete',
            memory_size=128,
            environment={
                'DEMO_TABLE_NAME': demo_table.table_name
            }
        )

        get_item_integration = api_gateway.LambdaIntegration(get_item_handler)
        update_item_integration = api_gateway.LambdaIntegration(update_item_handler)
        delete_item_integration = api_gateway.LambdaIntegration(delete_item_handler)

        item = items.add_resource("{item}")
        item.add_method("GET", get_item_integration)
        item.add_method("POST", update_item_integration)
        item.add_method("DELETE", delete_item_integration)

        demo_table.grant_read_data(get_item_handler)
        demo_table.grant_read_data(index_items_handler)
        demo_table.grant_write_data(update_item_handler)
        demo_table.grant_write_data(store_item_handler)
        demo_table.grant_write_data(delete_item_handler)

