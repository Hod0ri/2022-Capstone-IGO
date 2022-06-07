from django.http import JsonResponse
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView

from ..serializers import LogPointSerializer
from ..models import LogPoint
from ..FunctionModules.CookieJWT import CheckUserID
from datetime import datetime

class LogPointView(APIView):
    def post(self, request):
        UserObj = CheckUserID(request)
        tempdata = JSONParser().parse(request)

        if "add" in tempdata['pot_Reason']:
            pointAmount = UserObj.user_Point + tempdata['pot_Change']
            UserObj.user_Point = pointAmount
            tempdata['pot_Amount'] = pointAmount
            tempdata['pot_Id'] = UserObj.user_Id
            tempdata['pot_Date'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        elif "use" in tempdata['pot_Reason']:
            pointAmount = UserObj.user_Point - tempdata['pot_Change']
            if pointAmount >= 0:
                UserObj.user_Point = pointAmount
                tempdata['pot_Amount'] = pointAmount
                tempdata['pot_Id'] = UserObj.user_Id
                tempdata['pot_Date'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            else:
                response_json = {
                    'success': False,
                    'err': "Point 부족"
                }
                return JsonResponse(response_json, status=status.HTTP_400_BAD_REQUEST)
        else:
            response_json = {
                'success': False,
                'err': 'pot_Reason err'
            }
            return JsonResponse(response_json, status=status.HTTP_400_BAD_REQUEST)

        point_serializer = LogPointSerializer(data=tempdata)
        if point_serializer.is_valid():
            point_serializer.save()
            UserObj.save()
            response_json = {
                'success': True,
                'result': UserObj.user_Point,
                'err': ''
            }
            return JsonResponse(response_json, status=status.HTTP_201_CREATED)
        else:
            response_json = {
                'success': False,
                'err': point_serializer.errors
            }
            return JsonResponse(response_json, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        UserObj = CheckUserID(request)  
        try:
            logAll = list(LogPoint.objects.filter(pot_Id=UserObj).values(
                'pot_Date', 'pot_Reason', 'pot_Change', 'pot_Amount'))
        except:
            LogPoint.objects.create(pot_Id=UserObj.user_Id, pot_Amount=0, pot_Reason='add', pot_Change=0)

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
                'err': ' LogPoint does not exist'
            }
            return JsonResponse(response_json, status=status.HTTP_404_NOT_FOUND)
