from django.http import JsonResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from ..Validation.validators import CheckValidAccount
from ..serializers import MemberSerializer
from ..models import Member
from ..Validation.CookieJWT import CheckUserID
from ..Documentation.Swagger_Serializer import MemberParameter, MemberCookieParameter


# 유저 엔드 포인트
class UserView(APIView):
    @swagger_auto_schema(tags=['회원 가입 (User POST)'], query_serializer=MemberParameter, responses={200: 'Success'})
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
                    'success': True
                }
            else:
                response_json = {
                    'success': False,
                    'err': CheckValidAccount(tempdata)
                }
        return JsonResponse(response_json)

    @swagger_auto_schema(tags=['회원 조회 (User GET)'], query_serializer=MemberCookieParameter, responses={200: 'Success'})
    def get(self, request):
        """
            Login Server to API Server GET Communication for Login
        """

        userData = CheckUserID(request)

        try:
            ms = MemberSerializer(userData)
            response_json = {
                'success': True,
                'user_Nick': ms.data['user_Nick']
            }
            return JsonResponse(response_json)
        except Member.DoesNotExist:
            response_json = {
                'success': False,
                'err': 'Member.DoesNotExist'
            }
        return JsonResponse(response_json)

    @swagger_auto_schema(tags=['회원 정보 수정 (User PUT)'], query_serializer=MemberParameter, responses={200: 'Success'})
    def put(self, request):
        """
            API Server to Client Server PUT communication for member information modification
        """
        tempdata = JSONParser().parse(request)
        tempdata['user_Driver'] = 1 if tempdata.get('user_Driver') else 0
        userdata = tempdata.get('user_Id')
        member_update_serializer = MemberSerializer(userdata, data=tempdata)
        if member_update_serializer.is_valid():
            if not CheckValidAccount(tempdata):
                member_update_serializer.save()
                response_json = {
                    'success': True
                }
            else:
                response_json = {
                    'err': CheckValidAccount(tempdata)
                }
        return Response(member_update_serializer.data, status=status.HTTP_200_OK)


    @swagger_auto_schema(tags=['회원 삭제 (User DELETE)'], query_serializer=MemberCookieParameter, responses={200: 'Success'})
    def delete(self, request):
        """
            Login Server - DELETE communication between API Servers for membership withdrawal
        """
        userdata = CheckUserID(request)
        userdata.delete()
        response_json = {
            'success': True
        }
        return JsonResponse(response_json)
