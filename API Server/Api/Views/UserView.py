from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView

from ..FunctionModules.validators import CheckValidAccount
from ..serializers import MemberSerializer
from ..models import Member
from ..FunctionModules.CookieJWT import CheckUserID


# 유저 엔드 포인트
class UserView(APIView):
    def post(self, request):
        """
            Login Server to API Server Post Communication for Adding Members
        """
        tempdata = JSONParser().parse(request)
        tempdata['user_Driver'] = 1 if tempdata.get('user_Driver') else 0
        member_serializer = MemberSerializer(data=tempdata)
        if member_serializer.is_valid():
            if not CheckValidAccount(tempdata):
                member_serializer.save()
                response_json = {
                    'success': True,
                    'err': ''
                }
            else:
                response_json = {
                    'success': False,
                    'err': CheckValidAccount(tempdata)
                }
        else:
            response_json = {
                'success': False,
                'err': member_serializer.errors
            }
        return JsonResponse(response_json)

    def get(self, request):
        """
            Login Server to API Server GET Communication for Login
        """
        userData = CheckUserID(request)
        try:
            ms = MemberSerializer(userData)
            response_json = {
                'success': True,
                'user_Nick': ms.data['user_Nick'],
                'err': ''
            }
            return JsonResponse(response_json)
        except Member.DoesNotExist:
            response_json = {
                'success': False,
                'err': '사용자를 찾을 수 없습니다.'
            }
        return JsonResponse(response_json)

    def put(self, request):
        """
            API Server to Client Server PUT communication for member information modification
        """
        userData = CheckUserID(request)
        tempdata = JSONParser().parse(request)
        tempdata['user_Driver'] = 1 if tempdata.get('user_Driver') else 0
        member_update_serializer = MemberSerializer(userData, data=tempdata)
        if member_update_serializer.is_valid():
            if not CheckValidAccount(tempdata):
                member_update_serializer.save()
                response_json = {
                    'success': True,
                    'err': ''
                }
            else:
                response_json = {
                    'success': False,
                    'err': CheckValidAccount(tempdata)
                }
        else:
            response_json = {
                'success': False,
                'err': member_update_serializer.errors
            }
        return JsonResponse(response_json)

    def delete(self, request):
        """
            Login Server - DELETE communication between API Servers for membership withdrawal
        """
        userdata = CheckUserID(request)
        try:
            userdata.delete()
            response_json = {
                'success': True,
                'err': ''
            }
        except:
            response_json = {
                'success': False,
                'err': '사용자를 찾을 수 없습니다.'
            }
        return JsonResponse(response_json)
