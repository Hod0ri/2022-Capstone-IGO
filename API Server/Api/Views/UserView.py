from django.http import JsonResponse
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView

from ..FunctionModules.validators import CheckValidAccount
from ..serializers import MemberSerializer
from ..models import Member
from ..FunctionModules.CookieJWT import CheckUserID


# 유저 엔드 포인트
class UserView(APIView):
    def post(self, request):
        tempdata = JSONParser().parse(request)
        tempdata['user_Driver'] = 1 if tempdata.get('user_Driver') else 0
        member_serializer = MemberSerializer(data=tempdata)
        if member_serializer.is_valid():
            if len(CheckValidAccount(tempdata)) == 0:
                member_serializer.save()
                response_json = {
                    'success': True,
                    'err': ''
                }
                return JsonResponse(response_json, status=status.HTTP_201_CREATED)
            else:
                response_json = {
                    'success': False,
                    'err': CheckValidAccount(tempdata)
                }
                return JsonResponse(response_json, status=status.HTTP_400_BAD_REQUEST)
        else:
            response_json = {
                'success': False,
                'err': member_serializer.errors
            }
            return JsonResponse(response_json, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        UserObj = CheckUserID(request)
        try:
            ms = MemberSerializer(UserObj)
            response_json = {
                'success': True,
                'user_Nick': ms.data['user_Nick'],
                'err': ''
            }
            return JsonResponse(response_json, status=status.HTTP_200_OK)
        except Member.DoesNotExist:
            response_json = {
                'success': False,
                'err': '사용자를 찾을 수 없습니다.'
            }
        return JsonResponse(response_json, status=status.HTTP_404_NOT_FOUND)

    def put(self, request):
        UserObj = CheckUserID(request)
        tempdata = JSONParser().parse(request)
        print(tempdata)
        tempdata['user_Driver'] = 1 if tempdata.get('user_Driver') else 0
        tempdata['user_Name'] = UserObj.user_Name
        tempdata['user_Id'] = UserObj.user_Id
        member_update_serializer = MemberSerializer(UserObj, data=tempdata)
        if member_update_serializer.is_valid():
            if len(CheckValidAccount(tempdata)) == 0:
                member_update_serializer.save()
                response_json = {
                    'success': True,
                    'err': ''
                }
                return JsonResponse(response_json, status=status.HTTP_201_CREATED)
            else:
                response_json = {
                    'success': False,
                    'err': CheckValidAccount(tempdata)
                }
                return JsonResponse(response_json, status=status.HTTP_400_BAD_REQUEST)
        else:
            response_json = {
                'success': False,
                'err': member_update_serializer.errors
            }
            return JsonResponse(response_json, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        UserObj = CheckUserID(request)
        try:
            UserObj.delete()
            response_json = {
                'success': True,
                'err': ''
            }
            return JsonResponse(response_json, status=status.HTTP_200_OK)
        except:
            response_json = {
                'success': False,
                'err': '사용자를 찾을 수 없습니다.'
            }
            return JsonResponse(response_json, status=status.HTTP_404_NOT_FOUND)
