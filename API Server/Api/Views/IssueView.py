from django.http import JsonResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from datetime import datetime

from ..serializers import IssueSerializer, MemberSerializer
from ..models import NoshowIssue, Member
from ..Validation.CookieJWT import CheckUserID
from ..Documentation.Swagger_Serializer import IssueParameter


# 유저 엔드 포인트
class IssueView(APIView):
    @swagger_auto_schema(tags=['신고 등록 (Issue POST)'], query_serializer=IssueParameter, responses={200: 'Success'})
    def post(self, request):
        """
            Web Server to API Server Post Communication for Issue Report
        """
        MemberObj = CheckUserID(request)
        tempdata = JSONParser().parse(request)
        tempdata['ns_Id'] = MemberObj.user_Id
        tempdata['ns_Date'] = datetime.now()
        issue_serializer = IssueSerializer(data=tempdata)
        if issue_serializer.is_valid():
            issue_serializer.save()
            response_json = {
                'success': ''
            }
        else:
            response_json = {
                'err': issue_serializer.errors
            }
        return JsonResponse(response_json)

    @swagger_auto_schema(tags=['신고 조회 (Issue GET)'], query_serializer=IssueParameter, responses={200: 'Success'})
    def get(self, request):
        """
            Web Server to API Server GET Communication for Issue Check
        """
        MemberObj= CheckUserID(request)
        logAll = NoshowIssue.objects.filter(ns_Id=MemberObj).values('ns_Reason', 'ns_Target', 'ns_Etc',
                                                                    'ns_Date', 'ns_Status')
        if logAll:
            response_json = {
                'data': list(logAll)
            }
        else:
            response_json = {
                'err': 'NoshowIssue does not exist'
            }
        return JsonResponse(response_json)

    @swagger_auto_schema(tags=['신고 삭제 (Issue DELETE)'], query_serializer=IssueParameter, responses={200: 'Success'})
    def delete(self, request):
        """
            Web Server - DELETE communication between API Servers for Issue Clear/Delete
        """
        MemberObj = CheckUserID(request)
        delData = NoshowIssue.objects.get(ns_Id=MemberObj)
        delData.delete()
        response_json = {
            'success': True
        }
        return JsonResponse(response_json)
