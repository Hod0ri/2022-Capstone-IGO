import jwt
from django.http import HttpResponse
from jwt import ExpiredSignatureError
from ..models import Member


def CheckUserID(request):
    token = request.COOKIES['jwt']
    try:
        token = jwt.decode(token, 'secret-key', algorithms='HS256')
        MemberObj = Member.objects.get(pk=token['user_Id'])
    except ExpiredSignatureError:
        return HttpResponse(status=401)
    return MemberObj

