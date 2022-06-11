from django.http import JsonResponse
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from django.db.models import Q

from ..models import Member

class EmsView(APIView):
    def get(self, request):
        try:
            user_Name = request.GET.get('user_Name')
            user_Email = request.GET.get('user_Email')
            user_Phone = request.GET.get('user_Phone')

            user_Id = str(list(
                Member.objects.filter(
                    Q(user_Phone=user_Phone) &
                    Q(user_Email=user_Email) &
                    Q(user_Name=user_Name)
                ).values('user_Id')
            )[0]['user_Id'])

            response_json = {
                'success': True,
                'user_Id': user_Id,
                'err': ''
            }
            return JsonResponse(response_json, status=status.HTTP_200_OK)
        except:
            response_json = {
                'success': False,
                'err': 'Member.DoesNotExist'
            }
            return JsonResponse(response_json, status=status.HTTP_404_NOT_FOUND)
