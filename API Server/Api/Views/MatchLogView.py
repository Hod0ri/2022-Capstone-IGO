from django.db.models import Q
from django.http import JsonResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from ..Validation.validators import CheckValidAccount
from ..serializers import MemberSerializer, MatchDataSerializer, MatchMemberSerializer
from ..models import Member, MatchData, MatchMember
from ..Validation.CookieJWT import CheckUserID


class MatchLogView(APIView):
    def post(self, request):
        MemberObj = CheckUserID(request)
        tempdata = JSONParser().parse(request)

        # user=운전자
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

        # user=탑승자
        else:
            tempdata['mm_Member'] = MemberObj.user_Id
            matchdata = MatchData.objects.get(mc_Driver=tempdata['mm_Driver'])

            if matchdata:
                tempdata['mm_Driver'] = matchdata.mc_Driver
                matchmember_serializer = MatchMemberSerializer(data=tempdata)
                if matchmember_serializer.is_valid():
                    matchmember_serializer.save()
                    response_json = {
                        'success': True
                    }
                else:
                    response_json = {
                        'err': matchmember_serializer.errors
                    }
            else:
                response_json = {
                    'err': 'MatchData does not exist'
                }
        return JsonResponse(response_json)

    def get(self, request):
        MemberObj = CheckUserID(request)

        # user = 운전자
        if MemberObj.user_Driver:
            MatchLog = list(
                MatchData.objects.filter(Q(mc_Driver=MemberObj)).values()
            )
            if MatchLog:
                response_json = {
                    'data': MatchLog
                }
            else:
                response_json = {
                    'err': 'MatchData does not exist'
                }
        # user = 탑승자
        else:
            MatchLog = list(
                MatchMember.objects.filter(Q(mm_Member=MemberObj)).values()
            )
            if MatchLog:
                response_json = {
                    'data': MatchLog
                }
            else:
                response_json = {
                    'err': 'MatchMember does not exist'
                }

        return JsonResponse(response_json)