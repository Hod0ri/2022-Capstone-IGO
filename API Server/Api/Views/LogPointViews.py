from django.http import JsonResponse
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from ..Validation.validators import CheckValidAccount
from ..serializers import LogPointSerializer
from ..models import Member, LogPoint
from ..Validation.CookieJWT import CheckUserID


class LogPointView(APIView):
    def post(self, request):
        MemberObj = CheckUserID(request)
        tempdata = JSONParser().parse(request)
        point_serializer = LogPointSerializer(data=tempdata)
        if point_serializer.is_valid():
            if "add" in tempdata['pot_Reason']:
                pointAmount = MemberObj.user_Point + tempdata['pot_Change']
                MemberObj.user_Point = pointAmount
                point_serializer.save()
                MemberObj.save()
            elif "minus" in tempdata['pot_Reason']:
                pointAmount = MemberObj.user_Point - tempdata['pot_Change']
                if pointAmount >= 0:
                    MemberObj.user_Point = pointAmount
                    point_serializer.save()
                    MemberObj.save()
                else:
                    response_json = {
                        'err': "Point 부족"
                    }
                    return JsonResponse(response_json)
            response_json = {
                'success': True
            }
        else:
            response_json = {
                'err': point_serializer.errors
            }
        return JsonResponse(response_json)

