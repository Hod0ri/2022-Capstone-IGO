from datetime import datetime
from django.http import JsonResponse
from django.core import serializers
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from ..Validation.validators import CheckValidAccount
from ..serializers import LogPointSerializer, MemberSerializer
from ..models import Member, LogPoint
from ..Validation.CookieJWT import CheckUserID


class LogPointView(APIView):
    def post(self, request):
        MemberObj = CheckUserID(request)
        tempdata = JSONParser().parse(request)

        if "add" in tempdata['pot_Reason']:
            pointAmount = MemberObj.user_Point + tempdata['pot_Change']
            MemberObj.user_Point = pointAmount
            tempdata['pot_Amount'] = pointAmount
            tempdata['pot_Id'] = MemberObj.user_Id

        elif "use" in tempdata['pot_Reason']:
            pointAmount = MemberObj.user_Point - tempdata['pot_Change']
            if pointAmount >= 0:
                MemberObj.user_Point = pointAmount
                tempdata['pot_Amount'] = pointAmount
                tempdata['pot_Id'] = MemberObj.user_Id
            else:
                response_json = {
                    'err': "Point 부족"
                }
                return JsonResponse(response_json)

        point_serializer = LogPointSerializer(data=tempdata)
        if point_serializer.is_valid():
            point_serializer.save()
            MemberObj.save()
            response_json = {
                'success': True
            }
        else:
            response_json = {
               'err': point_serializer.errors
            }
        return JsonResponse(response_json)

    def get(self, request):
        MemberObj = CheckUserID(request)
        logAll = LogPoint.objects.filter(pot_Id=MemberObj).values('pot_Date', 'pot_Reason', 'pot_Change', 'pot_Amount')
        if logAll:
            response_json = {
                'data': list(logAll)
            }
        else:
            response_json = {
                'err': ' LogPoint does not exist'
            }
        return JsonResponse(response_json)
