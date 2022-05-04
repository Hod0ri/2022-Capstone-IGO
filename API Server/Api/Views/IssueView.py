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
from ..Documentation.Swagger_Serializer import IssueParameter


# 유저 엔드 포인트
class IssueView(APIView):
    @swagger_auto_schema(tags=['신고 등록 (Issue POST)'], query_serializer=IssueParameter, responses={200: 'Success'})
    def post(self, request):
        """
            Web Server to API Server Post Communication for Issue Report
        """
        user_Id = CheckUserID(request)

        response_json = {
            'success': True
        }
        return JsonResponse(response_json)

    @swagger_auto_schema(tags=['신고 조회 (Issue GET)'], query_serializer=IssueParameter, responses={200: 'Success'})
    def get(self, request):
        """
            Web Server to API Server GET Communication for Issue Check
        """

        user_Id = CheckUserID(request)

        response_json = {
            'success': False,
            'err': 'Member.DoesNotExist'
        }
        return JsonResponse(response_json)


    @swagger_auto_schema(tags=['신고 삭제 (Issue DELETE)'], query_serializer=IssueParameter, responses={200: 'Success'})
    def delete(self, request):
        user_Id = CheckUserID(request)

        """
            Web Server - DELETE communication between API Servers for Issue Clear/Delete
        """
        response_json = {
            'success': True
        }
        return JsonResponse(response_json)
