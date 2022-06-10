from django.db.models import Q
from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView

from Api.FunctionModules.CookieJWT import CheckUserID
from Api.models import MatchData


class SearchView(APIView):
    def get(self, request):
        UserObj = CheckUserID(request)
        if request:
            arrive = request.GET.get('arrive')
            if arrive:
                SearchArrive = list(MatchData.objects.filter(
                    Q(mc_Arrive=arrive) &
                    ~Q(mc_Driver=UserObj.user_Id) &
                    Q(mc_Match=False)
                ).values(
                    "mc_Driver", "mc_Arrive", "mc_ArriveTime", "mc_Goal", "mc_Price", "mc_Desc", "mc_Count"
                ))
                if SearchArrive:
                    response_json = {
                        'success': True,
                        'data': SearchArrive,
                        'err': ''
                    }
                    return JsonResponse(response_json, status=status.HTTP_200_OK)
                else:
                    response_json = {
                        'success': False,
                        'err': 'MatchData Does Not Exist'
                    }
                    return JsonResponse(response_json, status=status.HTTP_404_NOT_FOUND)

            else:
                SearchAll = list(MatchData.objects.filter(~Q(mc_Driver=UserObj.user_Id) & Q(mc_Match=False)).values(
                    "mc_Driver", "mc_Arrive", "mc_ArriveTime", "mc_Goal", "mc_Price", "mc_Desc", "mc_Count"
                ))
                if SearchAll:
                    response_json = {
                        'success': True,
                        'data': SearchAll,
                        'err': ''
                    }
                    return JsonResponse(response_json, status=status.HTTP_200_OK)
                else:
                    response_json = {
                        'success': False,
                        'err': 'MatchData Does Not Exist'
                    }
                    return JsonResponse(response_json, status=status.HTTP_404_NOT_FOUND)
        else:
            response_json = {
                'success': False,
                'err': 'Member Does Not Exist'
            }
            return JsonResponse(response_json, status=status.HTTP_404_NOT_FOUND)
