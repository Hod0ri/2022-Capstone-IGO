from django.http import JsonResponse, HttpResponse
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

import jwt
from jwt import ExpiredSignatureError

from .UserMethod.validators import CheckValidAccount
from .models import Member
from .UserMethod.CookieJWT import CheckUserID
from .serializers import MemberSerializer


# 유저 엔드 포인트
class UserView(APIView):
    def post(self, request):
        """POST 회원가입(추가) 포인트
            @description
            회원 추가를 위한 Login Server - API Server 간 Post 통신
        """
        tempdata = JSONParser().parse(request)
        tempdata['user_Driver'] = 1 if tempdata.get('user_Driver') else 0
        member_serializer = MemberSerializer(data=tempdata)
        if member_serializer.is_valid():
            if not CheckValidAccount(tempdata):
                member_serializer.save()
                response_json = {
                    'err': ''
                }
            else:
                response_json = {
                    'err': CheckValidAccount(tempdata)
                }
        return JsonResponse(response_json)

    def get(self, request):
        """GET 로그인 포인트
            @description
            로그인을 위한 Login Server - API Server 간 GET 통신
        """

        # 쿠키에서 user_ID 추출
        user_Id = CheckUserID(request)

        try:
            ms = MemberSerializer(Member.objects.get(user_Id=user_Id))
            return JsonResponse(ms.data)
        except Member.DoesNotExist:
            response_json = {
                'err': 'Member.DoesNotExist'
            }
        return JsonResponse(response_json)

    def put(self, request):
        """PUT 정보 수정 포인트
            @description
            회원 정보 수정을 위한 API Server - Client Server 간 PUT 통신
        """
        tempdata = JSONParser().parse(request)
        tempdata['user_Driver'] = 1 if tempdata.get('user_Driver') else 0
        temp_id = tempdata.get('user_Id')
        userdata = Member.objects.get(user_Id=temp_id)
        member_update_serializer = MemberSerializer(userdata, data=tempdata)
        if member_update_serializer.is_valid():
            # if not CheckValidAccount(tempdata):
            member_update_serializer.save()
        return Response(member_update_serializer.data, status=status.HTTP_200_OK)

    def delete(self, request):
        """DELETE 탈퇴 포인트
            @description
            회원 탈퇴를 위한 Login Server - API Server 간 DELETE 통신
        """
        user_Id = CheckUserID(request)
        userdata = Member.objects.get(user_Id=user_Id)
        userdata.delete()
        return Response(status=status.HTTP_200_OK)
