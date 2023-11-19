from datetime import datetime
import utils


def greet(event, context):
    response = f"Hi!!! Greetings from CDK. You have hit {event.get('path')} at {datetime.now().isoformat()}"
    return utils.respond_success({
        "message": response
    })
