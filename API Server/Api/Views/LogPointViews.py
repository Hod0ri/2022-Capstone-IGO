from django.http import JsonResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView

from ..serializers import LogPointSerializer
from ..models import LogPoint
from ..Validation.CookieJWT import CheckUserID
from ..Documentation.Swagger_Serializer import LogPointParameter


class LogPointView(APIView):
    @swagger_auto_schema(tags=['포인트 변동 (Point POST)'], query_serializer=LogPointParameter, responses={200: 'Success'})
    def post(self, request):
        '''
            Create Log what to change user Point
        '''
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

    @swagger_auto_schema(tags=['포인트 조회 (Point GET)'], query_serializer=LogPointParameter, responses={200: 'Success'})

    def get(self, request):
        '''
            Select(Show) Log what to change user Point
        '''
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
