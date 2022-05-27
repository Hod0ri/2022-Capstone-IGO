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

        if UserObj.user_Driver:
            DriverLog = MatchData.objects.filter(
                Q(mc_Driver=UserObj.user_Id) &
                Q(mc_Match=False)
            )
            if DriverLog:
                response_json = {
                    "success": False,
                    "err": "Match가 완료된 후 새로 게시 가능합니다."
                }
                return JsonResponse(response_json)
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
        else:
            MemberLog = MatchMember.objects.filter(
                Q(mm_Member=UserObj.user_Id) &
                Q(mm_Match=False)
            )
            if MemberLog:
                response_json = {
                    "success": False,
                    "err": "Match가 완료된 후 새로 게시 가능합니다."
                }
                return JsonResponse(response_json)
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
            DriverLog = list(
                MatchData.objects.filter(
                    Q(mc_Driver=UserObj.user_Id) &
                    Q(mc_Match=False)
                ).values('id')
            )[0]['id']
            MatchDataDel = MatchData.objects.get(id=DriverLog)
            MatchDataDel.delete()
            response_json = {
                'success': True,
                'err': ''
            }
        else:
            MemberLog = list(
                MatchMember.objects.filter(
                    Q(mm_Driver=UserObj.user_Id) &
                    Q(mm_Match=False)
                ).values('id')
            )[0]['id']
            MatchMemberDel = MatchMember.objects.get(id=MemberLog)
            MatchMemberDel.delete()
            response_json = {
                'success': True,
                'err': ''
            }
        return JsonResponse(response_json)
