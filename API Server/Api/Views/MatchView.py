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
            if DriverObj.mc_Count == 0:
                response_json = {
                    'success': False,
                    'err': '매칭 인원이 초과 되었습니다.'
                }
            else:
                DriverObj.mc_Count -= 1
                if DriverObj.mc_Count == 0:
                    DriverObj.mc_Match = True
                DriverObj.save()
                MemberObj.mm_Match = True
                MemberObj.save()
                PointMember = Member.objects.get(user_Id=MemberObj.mm_Member)
                MemberAmount = PointMember.user_Point - MemberObj.mm_Price
                DriverAmount = UserObj.user_Point + MemberObj.mm_Price

                PointMember.user_Point = MemberAmount
                PointMember.save()

                UserObj.user_Point = DriverAmount
                UserObj.save()

                MemberPointTable = LogPoint(
                    pot_Id=Member.objects.get(user_Id=PointMember.user_Id),
                    pot_Amount=MemberAmount,
                    pot_Reason='매칭 결제',
                    pot_Change=MemberObj.mm_Price
                )
                MemberPointTable.save()

                DriverPointTable = LogPoint(
                    pot_Id=Member.objects.get(user_Id=UserObj.user_Id),
                    pot_Amount=DriverAmount,
                    pot_Reason='매칭 충전',
                    pot_Change=MemberObj.mm_Price
                )
                DriverPointTable.save()
                response_json = {
                    'success': True,
                    'err': ''
                }
        else:
            response_json = {
                'success': False,
                'err': '운전자가 아닙니다.'
            }
        return JsonResponse(response_json)

    def get(self, request):
        UserObj = CheckUserID(request)
        if UserObj.user_Driver:
            MatchLog = list(
                MatchMember.objects.filter(
                    Q(mm_Driver=UserObj.user_Id) &
                    Q(mm_Match=True)
                ).values(
                    'mm_Driver', 'mm_Member', 'mm_Pickup', 'mm_Goal', 'mm_Arrive', 'mm_Price', 'mm_Match'
                )
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
            MemberLog = list(
                MatchMember.objects.filter(
                    Q(mm_Member=UserObj.user_Id) &
                    Q(mm_Match=True)
                ).values(
                    'mm_Driver', 'mm_Member', 'mm_Pickup', 'mm_Goal', 'mm_Arrive', 'mm_Price', 'mm_Match'
                )
            )
            if MemberLog:
                response_json = {
                    'success': True,
                    'data': MemberLog,
                    'err': ''
                }
            else:
                response_json = {
                    'success': False,
                    'err': 'MatchData does not exist'
                }
        return JsonResponse(response_json)
