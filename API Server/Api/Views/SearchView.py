from django.http import JsonResponse
from rest_framework.views import APIView

from Api.FunctionModules.CookieJWT import CheckUserID
from Api.models import MatchData


class SearchView(APIView):
    def get(self, request):
        if CheckUserID(request):
            goal = request.GET.get('goal')
            arrive = request.GET.get('arrive')
            if goal:
                SearchGoal =list(MatchData.objects.filter(mc_goal=goal))
                if SearchGoal:
                    response_json = {
                        'success': True,
                        'data': SearchGoal,
                        'err': ''
                    }
                else:
                    response_json = {
                        'success': False,
                        'err': 'MatchData Does Not Exist'
                    }
            else:
                SearchArrive = list(MatchData.objects.filter(mc_Arrive=arrive))
                if SearchArrive:
                    response_json = {
                        'success': True,
                        'data': SearchArrive,
                        'err': ''
                    }
                else:
                    response_json = {
                        'success': False,
                        'err': 'MatchData Does Not Exist'
                    }
        else:
            response_json = {
                'success': False,
                'err': 'Member Does Not Exist'
            }
        return JsonResponse(response_json)
