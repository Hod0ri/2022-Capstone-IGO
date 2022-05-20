from django.db.models import Q
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView

from ..serializers import MatchDataSerializer, MatchMemberSerializer
from ..models import MatchData, MatchMember
from ..FunctionModules.CookieJWT import CheckUserID


class MatchLogView(APIView):
    def post(self, request):
        UserObj = CheckUserID(request)
        tempdata = JSONParser().parse(request)

        # user=운전자
        if UserObj.user_Driver:
            tempdata['mc_Driver'] = UserObj.user_Id
            match_serializer = MatchDataSerializer(data=tempdata)
            if match_serializer.is_valid():
                match_serializer.save()
                response_json = {
                    'success': True,
                    'err': ''
                }
            else:
                response_json = {
                    'success': False,
                    'err': match_serializer.errors
                }

        # user=탑승자
        else:
            tempdata['mm_Member'] = UserObj.user_Id
            matchdata = MatchData.objects.get(mc_Driver=tempdata['mm_Driver'])

            if matchdata:
                tempdata['mm_Driver'] = matchdata.mc_Driver
                matchmember_serializer = MatchMemberSerializer(data=tempdata)
                if matchmember_serializer.is_valid():
                    matchmember_serializer.save()
                    response_json = {
                        'success': True,
                        'err': ''
                    }
                else:
                    response_json = {
                        'success': False,
                        'err': matchmember_serializer.errors
                    }
            else:
                response_json = {
                    'success': False,
                    'err': 'MatchData does not exist'
                }
        return JsonResponse(response_json)

    def get(self, request):
        UserObj = CheckUserID(request)

        # user = 운전자
        if UserObj.user_Driver:
            MatchLog = list(
                MatchData.objects.filter(Q(mc_Driver=UserObj.user_Id)).values()
            )
            if MatchLog:
                response_json = {
                    'success': True,
                    'data': MatchLog,
                    'err': ''
                }
            else:
                response_json = {
                    'success': False,
                    'err': 'MatchData does not exist'
                }
        # user = 탑승자
        else:
            MatchLog = list(
                MatchMember.objects.filter(Q(mm_Member=UserObj.user_Id)).values()
            )
            if MatchLog:
                response_json = {
                    'success': True,
                    'data': MatchLog,
                    'err': ''
                }
            else:
                response_json = {
                    'success': False,
                    'err': 'MatchMember does not exist'
                }

        return JsonResponse(response_json)

    def put(self, request):
        UserObj = CheckUserID(request)
        tempdata = JSONParser().parse(request)
        tempdata['mc_Driver'] = UserObj.user_Id

        if UserObj.user_Driver:
            match_serializer = MatchDataSerializer(data=tempdata)
            if match_serializer.is_valid():
                match_serializer.save()
                response_json = {
                    'success': True,
                    'err': ''
                }
            else:
                response_json = {
                    'success': False,
                    'err': match_serializer.errors
                }
        else:
            tempdata['mm_Member'] = UserObj.user_Id
            matchdata = MatchData.objects.get(mc_Driver=tempdata['mm_Driver'])

            if matchdata:
                tempdata['mm_Driver'] = matchdata.mc_Driver
                matchmember_serializer = MatchMemberSerializer(data=tempdata)
                if matchmember_serializer.is_valid():
                    matchmember_serializer.save()
                    response_json = {
                        'success': True,
                        'err': ''
                    }
                else:
                    response_json = {
                        'success': False,
                        'err': matchmember_serializer.errors
                    }
            else:
                response_json = {
                    'success': False,
                    'err': 'MatchData does not exist'
                }

        return JsonResponse(response_json)

    def delete(self, request):
        UserObj = CheckUserID(request)
        tempdata = JSONParser().parse(request)

        if UserObj.user_Driver:
            MatchDataDel = MatchData.objects.get(mc_Driver=UserObj)
            MatchDataDel.delete()
            response_json = {
                'success': True,
                'err': ''
            }
        else:
            MatchMemberDel = MatchMember.objects.get(mm_Member=UserObj)
            MatchMemberDel.delete()
            response_json = {
                'success': True,
                'err': ''
            }
        return JsonResponse(response_json)