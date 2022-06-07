import jwt
from django.http import HttpResponse
from jwt import ExpiredSignatureError
from ..models import Member



def CheckUserID(request):
    token = ""
    for s in request.META['HTTP_COOKIE'].split(';'):
        if s.strip()[0:4]=='jwt=':
            token = s[4:]
            break
    try:
        token = jwt.decode(token, 'secret-key', algorithms='HS256')
        MemberObj = Member.objects.get(pk=token['user_Id'])
    except ExpiredSignatureError:
        return HttpResponse(status=401)
    return MemberObj
