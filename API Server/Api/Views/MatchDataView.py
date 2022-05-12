from django.db.models import Q
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
                    'success': True
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
            MatchLog = list(
                MatchData.objects.filter(
                    Q(mc_Driver=MemberObj) &
                    Q(mc_Match=True)
                ).values()
            )

            if MatchLog:
                response_json = {
                    'data': MatchLog
                }
            else:
                response_json = {
                    'err': 'MatchData does not exist'
                }
        else:
            MatchLog = list(
                MatchData.objects.filter(
                    Q(mc_Driver=MemberObj) &
                    Q(mc_Match=False)
                ).values()
            )

            if MatchLog:
                response_json = {
                    'data': MatchLog
                }
            else:
                response_json = {
                    'err': 'MatchData does not exist'
                }
        return JsonResponse(response_json)

    def put(self, request):
        MemberObj = CheckUserID(request)
        tempdata = JSONParser().parse(request)
        tempdata['mc_Driver'] = MemberObj.user_Id
        match_serializer = MatchDataSerializer(data=tempdata)
        if match_serializer.is_valid():
            match_serializer.save()
            response_json = {
                'success': True
            }
        else:
            response_json = {
                'err': match_serializer.errors
            }

        return JsonResponse(response_json)

    def delete(self, request):
        MemberObj = CheckUserID(request)
        tempdata = JSONParser().parse(request)
        delData = MatchData.objects.filter(
            Q(mc_Driver=MemberObj) & Q(mc_Match=False)
        )
        if delData:
            delData.delete()
            response_json = {
                'success': True
            }
        else:
            response_json = {
                'err': "MatchData does not exist"
            }

        return JsonResponse(response_json)
