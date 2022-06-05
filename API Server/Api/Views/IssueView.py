from django.http import JsonResponse
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from datetime import datetime

from ..serializers import IssueSerializer
from ..models import NoshowIssue
from ..FunctionModules.CookieJWT import CheckUserID


class IssueView(APIView):
    def post(self, request):
        UserObj = CheckUserID(request)
        tempdata = JSONParser().parse(request)
        tempdata['ns_Id'] = UserObj.user_Id
        tempdata['ns_Date'] = datetime.now().strftime('%Y-%m-%d %H:%M')
        issue_serializer = IssueSerializer(data=tempdata)
        if issue_serializer.is_valid():
            issue_serializer.save()
            response_json = {
                'success': True,
                'err': ''
            }
            return JsonResponse(response_json, status=status.HTTP_201_CREATED)
        else:
            response_json = {
                'success': False,
                'err': issue_serializer.errors
            }
            return JsonResponse(response_json, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        UserObj = CheckUserID(request)
        logAll = list(NoshowIssue.objects.filter(ns_Id=UserObj).values(
            'ns_Reason', 'ns_Target', 'ns_Etc', 'ns_Date', 'ns_Status'
        ))
        if logAll:
            response_json = {
                'success': True,
                'result': logAll,
                'err': ''
            }
            return JsonResponse(response_json, status=status.HTTP_200_OK)
        else:
            response_json = {
                'success': False,
                'err': 'NoshowIssue does not exist'
            }
            return JsonResponse(response_json, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request):
        UserObj = CheckUserID(request)
        delData = NoshowIssue.objects.get(ns_Id=UserObj)
        try:
            delData.delete()
            response_json = {
                'success': True,
                'err': ''
            }
            return JsonResponse(response_json, status=status.HTTP_200_OK)
        except:
            response_json = {'success': False, 'err': '신고를 삭제할 수 없습니다.'}
            return JsonResponse(response_json, status=status.HTTP_400_BAD_REQUEST)

