from django.http import JsonResponse
from rest_framework.views import APIView

from Api.models import MatchData


class SearchView(APIView):
    def get(self, request):
        goal = request.GET.get('goal')
        arrive = request.GET.get('arrive')

        if goal:
            SearchGoal =list(MatchData.objects.filter(mc_goal=goal))
            response_json = {
                'success': True,
                'data': list(SearchGoal),
                'err': ''
            }
        else:
            SearchArrive = list(MatchData.objects.filter(mc_Arrive=arrive))
            response_json = {
                'success': True,
                'data': list(SearchArrive),
                'err': ''
            }

        return JsonResponse(response_json)
