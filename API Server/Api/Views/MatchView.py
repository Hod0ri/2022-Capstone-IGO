from django.db.models import Q
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from ..models import Member, MatchData, MatchMember, LogPoint
from ..FunctionModules.CookieJWT import CheckUserID


class MatchView(APIView):
    def post(self, request):
        MemberObj = CheckUserID(request)
        tempdata = JSONParser().parse(request)

        # user=운전자
        if MemberObj.user_Driver:
            DriverLog = MatchData.objects.get(mc_Driver=MemberObj, mc_Match=False)
            MemberLog = MatchMember.objects.get(mm_Driver=MemberObj, mm_Match=False)

            if DriverLog and MemberLog:
                DriverLog.mc_Match = True
                DriverLog.save()

                MemberLog.mm_Match = True
                MemberLog.save()

                PointMember = Member.objects.get(user_Id=MemberLog.mm_Member)
                MemberAmount = PointMember.user_Point - DriverLog.mm_Price
                DriverAmount = MemberObj.user_Point + DriverLog.mm_Price

                PointMember.user_Point = MemberAmount
                PointMember.save()

                MemberObj.user_Point = DriverAmount
                MemberObj.save()

                MemberPointTable = LogPoint(
                    pot_Id=Member.objects.get(user_Id=PointMember.user_Id),
                    pot_Amount=MemberAmount,
                    pot_Reason='매칭 결제',
                    pot_Change=DriverLog.mc_Price
                )
                MemberPointTable.save()

                DriverPointTable = LogPoint(
                    pot_Id=Member.objects.get(user_Id=MemberObj.user_Id),
                    pot_Amount=DriverAmount,
                    pot_Reason='매칭 충전',
                    pot_Change=DriverLog.mc_Price
                )
                DriverPointTable.save()
                response_json = {
                    'success': True
                }
            else:
                response_json = {
                    'err': 'MatchData and MatchMember Does Not Exist'
                }
        # user=탑승자
        else:
            response_json = {
                'err': '운전자가 아닙니다.'
            }
        return JsonResponse(response_json)

