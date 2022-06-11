from django.core.exceptions import FieldDoesNotExist, FieldError
from django.db.models import Q
from django.http import JsonResponse
from rest_framework import status
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
            DriverLog = list(MatchData.objects.filter(
                Q(mc_Driver=UserObj.user_Id) &
                Q(mc_Match=False)
            ).values())
            if DriverLog:
                response_json = {
                    "success": False,
                    "err": "Match가 완료된 후 새로 게시 가능합니다."
                }
                return JsonResponse(response_json, status=status.HTTP_400_BAD_REQUEST)
            else:
                tempdata['mc_Driver'] = UserObj.user_Id
                match_serializer = MatchDataSerializer(data=tempdata)
                if match_serializer.is_valid():
                    match_serializer.save()
                    response_json = {
                        'success': True,
                        'err': ''
                    }
                    return JsonResponse(response_json, status=status.HTTP_201_CREATED)
                else:
                    response_json = {
                        'success': False,
                        'err': match_serializer.errors
                    }
                    return JsonResponse(response_json, status=status.HTTP_400_BAD_REQUEST)
        else:
            MemberLog = list(MatchMember.objects.filter(
                Q(mm_Member=UserObj.user_Id) &
                Q(mm_Match=False)
            ).values())
            if MemberLog:
                response_json = {
                    "success": False,
                    "err": "Match가 완료된 후 새로 게시 가능합니다."
                }
                return JsonResponse(response_json, status=status.HTTP_400_BAD_REQUEST)
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
                        return JsonResponse(response_json, status=status.HTTP_201_CREATED)
                    else:
                        response_json = {
                            'success': False,
                            'err': matchmember_serializer.errors
                        }
                        return JsonResponse(response_json, status=status.HTTP_400_BAD_REQUEST)
                else:
                    response_json = {
                        'success': False,
                        'err': 'MatchData does not exist'
                    }
                    return JsonResponse(response_json, status=status.HTTP_400_BAD_REQUEST)

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

                return JsonResponse(response_json, status=status.HTTP_200_OK)
            else:
                response_json = {
                    'success': False,
                    'err': 'MatchData does not exist'
                }
                return JsonResponse(response_json, status=status.HTTP_404_NOT_FOUND)
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
                return JsonResponse(response_json, status=status.HTTP_200_OK)
            else:
                response_json = {
                    'success': False,
                    'err': 'MatchMember does not exist'
                }
                return JsonResponse(response_json, status=status.HTTP_404_NOT_FOUND)

    def put(self, request):
        UserObj = CheckUserID(request)
        tempdata = JSONParser().parse(request)

        if UserObj.user_Driver:
            tempdata['mc_Driver'] = UserObj.user_Id
            tempdata['mc_Match'] = False

            match_serializer = MatchDataSerializer(data=tempdata)
            if match_serializer.is_valid():
                match_serializer.save()
                response_json = {
                    'success': True,
                    'err': ''
                }
                return JsonResponse(response_json, status=status.HTTP_201_CREATED)
            else:
                response_json = {
                    'success': False,
                    'err': match_serializer.errors
                }
                return JsonResponse(response_json, status=status.HTTP_400_BAD_REQUEST)
        else:
            tempdata['mm_Member'] = UserObj.user_Id
            matchdata = MatchData.objects.get(mc_Driver=tempdata['mm_Driver'])

            if matchdata:
                tempdata['mm_Driver'] = matchdata.mc_Driver
                tempdata['mm_Match'] = False

                matchmember_serializer = MatchMemberSerializer(data=tempdata)
                if matchmember_serializer.is_valid():
                    matchmember_serializer.save()
                    response_json = {
                        'success': True,
                        'err': ''
                    }
                    return JsonResponse(response_json, status=status.HTTP_201_CREATED)
                else:
                    response_json = {
                        'success': False,
                        'err': matchmember_serializer.errors
                    }
                    return JsonResponse(response_json, status=status.HTTP_400_BAD_REQUEST)
            else:
                response_json = {
                    'success': False,
                    'err': 'MatchData does not exist'
                }
                return JsonResponse(response_json, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request):
        UserObj = CheckUserID(request)
        try:
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
                return JsonResponse(response_json, status=status.HTTP_200_OK)
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
                return JsonResponse(response_json, status=status.HTTP_200_OK)
        except FieldDoesNotExist:
            response_json = {
                'success': False,
                'err': 'FieldDoesNotExist'
            }
            return JsonResponse(response_json, status=status.HTTP_404_NOT_FOUND)
        except FieldError:
            response_json = {
                'success': False,
                'err': 'FieldError'
            }
            return JsonResponse(response_json, status=status.HTTP_404_NOT_FOUND)
