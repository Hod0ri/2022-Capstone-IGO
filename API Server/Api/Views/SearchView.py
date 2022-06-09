from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView

from Api.FunctionModules.CookieJWT import CheckUserID
from Api.models import MatchData


class SearchView(APIView):
    def get(self, request):
        if CheckUserID(request):
            arrive = str(request.GET.get('arrive'))
            if arrive:
                SearchArrive = list(MatchData.objects.filter(mc_Arrive=arrive).values())
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
            response_json = {
                'success': False,
                'err': 'Member Does Not Exist'
            }
            return JsonResponse(response_json, status=status.HTTP_404_NOT_FOUND)
