from django.db.models import Q
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from ..models import Member, MatchData, MatchMember, LogPoint
from ..FunctionModules.CookieJWT import CheckUserID


class MatchView(APIView):
    def post(self, request):
        UserObj = CheckUserID(request)

        # user=운전자
        if UserObj.user_Driver:
            DriverLog = list(
                MatchData.objects.filter(
                    Q(mc_Driver=UserObj.user_Id) &
                    Q(mc_Match=False)
                ).values('id')
            )[0]['id']

            MemberLog = list(
                MatchMember.objects.filter(
                    Q(mm_Driver=UserObj.user_Id) &
                    Q(mm_Match=False)
                ).values('id')
            )[0]['id']

            DriverObj = MatchData.objects.get(id=DriverLog)
            MemberObj = MatchMember.objects.get(id=MemberLog)
            # DriverObj.mc_Match = True
            MemberObj.mm_Match = True
            MemberObj.save()
            PointMember = Member.objects.get(user_Id=MemberObj.mm_Member)
            MemberAmount = PointMember.user_Point - DriverObj.mc_Price
            DriverAmount = UserObj.user_Point + DriverObj.mc_Price

            PointMember.user_Point = MemberAmount
            PointMember.save()

            UserObj.user_Point = DriverAmount
            UserObj.save()

            MemberPointTable = LogPoint(
                pot_Id=Member.objects.get(user_Id=PointMember.user_Id),
                pot_Amount=MemberAmount,
                pot_Reason='매칭 결제',
                pot_Change=DriverObj.mc_Price
            )
            MemberPointTable.save()

            DriverPointTable = LogPoint(
                pot_Id=Member.objects.get(user_Id=UserObj.user_Id),
                pot_Amount=DriverAmount,
                pot_Reason='매칭 충전',
                pot_Change=DriverObj.mc_Price
            )
            DriverPointTable.save()
            response_json = {
                'success': True
            }
        else:
            response_json = {
                'err': '운전자가 아닙니다.'
            }
        return JsonResponse(response_json)

