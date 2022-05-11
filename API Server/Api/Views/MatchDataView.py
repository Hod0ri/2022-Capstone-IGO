from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView

from ..Validation.CookieJWT import CheckUserID
from ..models import MatchData
from ..serializers import MatchDataSerializer


class MatchDataView(APIView):
    def post(self, request):
        MemberObj = CheckUserID(request)
        tempdata = JSONParser().parse(request)
        if MemberObj.user_Driver:
            tempdata['mc_Driver'] = MemberObj.user_Id
            match_serializer = MatchDataSerializer(data=tempdata)
            if match_serializer.is_valid():
                match_serializer.save()
                response_json = {
                    'success': ''
                }
            else:
                response_json = {
                    'err': match_serializer.errors
                }
        else:
            response_json = {
                "err": "Driver err"
            }
        return JsonResponse(response_json)
    def get(self, request):
        MemberObj = CheckUserID(request)
        tempdata = JSONParser().parse(request)
        if tempdata['mc_Match']:
            MatchLog = MatchData.objects.filter(mc_Driver=MemberObj,mc_Match=True).values()
            if MatchLog:
                response_json = {
                    'data': list(MatchLog)
                }
            else:
                response_json = {
                    'err': 'MatchData does not exist'
                }
        else:
            response_json = {
                'err': 'MatchData does not exist'
            }
            return JsonResponse(response_json)
    # def put(self, request):
    #     return JsonResponse(response_json)
    # def delete(self, request):
    #     return JsonResponse(response_json)