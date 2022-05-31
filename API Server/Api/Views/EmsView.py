from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from django.db.models import Q

from ..models import Member

class EmsView(APIView):
    def get(self, request):
        tempdata = JSONParser().parse(request)
        try:
            user_Id = str(list(
                Member.objects.filter(
                    Q(user_Phone=tempdata['user_Phone']) &
                    Q(user_Email=tempdata['user_Email']) &
                    Q(user_Name=tempdata['user_Name'])
                ).values('user_Id')
            )[0]['user_Id'])

            response_json = {
                'success': True,
                'user_Id' : user_Id,
                'err': ''
            }
        except:
            response_json = {
                'success': False,
                'err': 'Member.DoesNotExist'
            }
            
        return JsonResponse(response_json)