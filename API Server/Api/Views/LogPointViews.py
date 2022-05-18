from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView

from ..serializers import LogPointSerializer
from ..models import LogPoint
from ..FunctionModules.CookieJWT import CheckUserID


class LogPointView(APIView):
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
                    'success': False,
                    'err': "Point 부족"
                }
                return JsonResponse(response_json)

        point_serializer = LogPointSerializer(data=tempdata)
        if point_serializer.is_valid():
            point_serializer.save()
            MemberObj.save()
            response_json = {
                'success': True,
                'result': MemberObj.user_Point,
                'err': ''
            }
        else:
            response_json = {
                'success': False,
                'err': point_serializer.errors
            }
        return JsonResponse(response_json)

    def get(self, request):
        '''
            Select(Show) Log what to change user Point
        '''
        MemberObj = CheckUserID(request)
        logAll = LogPoint.objects.filter(pot_Id=MemberObj).values('pot_Date', 'pot_Reason', 'pot_Change', 'pot_Amount')
        if logAll:
            response_json = {
                'success': True,
                'result': list(logAll),
                'err': ''
            }
        else:
            response_json = {
                'success': False,
                'err': ' LogPoint does not exist'
            }
        return JsonResponse(response_json)
