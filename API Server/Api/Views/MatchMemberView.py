from django.db.models import Q
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView

from ..Validation.CookieJWT import CheckUserID
from ..models import MatchData, MatchMember, LogPoint, Member
from ..serializers import MatchDataSerializer, MatchMemberSerializer


class MatchMemberView(APIView):
    def post(self, request):
        MemberObj = CheckUserID(request)
        tempdata = JSONParser().parse(request)
        tempdata['mm_Member'] = MemberObj.user_Id
        point_amount = MemberObj.user_Point - tempdata['mm_Price']
        matchdata = MatchData.objects.get(mc_Driver=tempdata['mm_Driver'])
        print(point_amount)

        if matchdata:
            tempdata['mm_Driver'] = matchdata.mc_Driver
            matchmember_serializer = MatchMemberSerializer(data=tempdata)
            if matchmember_serializer.is_valid():
                MemberObj.user_Point = point_amount
                MemberObj.save()
                pointTable = LogPoint(
                    pot_Id=Member.objects.get(user_Id=MemberObj.user_Id),
                    pot_Amount=point_amount,
                    pot_Reason="결제",
                    pot_Change=tempdata['mm_Price'])
                pointTable.save()
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
                'err': ''
            }
        return JsonResponse(response_json)
