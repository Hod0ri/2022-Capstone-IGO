import jwt
from django.http import HttpResponse
from jwt import ExpiredSignatureError


def CheckUserID(request):
    token = request.COOKIES['jwt']
    try:
        token = jwt.decode(token, 'secret-key', algorithms='HS256')
    except ExpiredSignatureError:
        return HttpResponse(status=401)
    return token['user_Id']
