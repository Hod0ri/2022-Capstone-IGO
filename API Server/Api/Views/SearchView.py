from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView

from Api.FunctionModules.CookieJWT import CheckUserID
from Api.models import MatchData


class SearchView(APIView):
    def get(self, request):
        if CheckUserID(request):
            goal = request.GET.get['goal']
            arrive = request.GET.get['arrive']
            if goal:
                SearchGoal = list(MatchData.objects.filter(mc_Goal=goal))
                if SearchGoal:
                    response_json = {
                        'success': True,
                        'data': SearchGoal,
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
                SearchArrive = list(MatchData.objects.filter(mc_Arrive=arrive))
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
