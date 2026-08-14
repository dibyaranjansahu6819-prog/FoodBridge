from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is None:
        return response

    message = "Request failed."

    if "detail" in response.data:
        message = response.data["detail"]

    elif isinstance(response.data, dict):
        message = "Validation failed."

    response.data = {
        "success": False,
        "message": message,
        "errors": response.data,
    }

    return response