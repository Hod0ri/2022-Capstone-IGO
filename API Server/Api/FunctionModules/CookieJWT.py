import jwt
from django.http import HttpResponse
from jwt import ExpiredSignatureError
from ..models import Member
import os


def CheckUserID(request):
    
    secret_key = os.environ.get('SECRET_JWT_KEY')
    if secret_key == None:
        secret_key = 'secret-key'

    token = ""
    for s in request.META['HTTP_COOKIE'].split(';'):
        if s.strip()[0:4]=='jwt=':
            token = s.strip()[4:]
            break
    try:
        token = jwt.decode(token, secret_key, algorithms='HS256')
        MemberObj = Member.objects.get(pk=token['user_Id'])
    except ExpiredSignatureError:
        return HttpResponse(status=401)
    return MemberObj
