from django.http import JsonResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q

from ..Validation.validators import CheckValidAccount
from ..serializers import MemberSerializer
from ..models import Member

class EmsView(APIView):
    def get(self, request):
        """
            Find ID to User Info
        """
        tempdata = JSONParser().parse(request)
        try:
            ms = Member.objects.filter(
                Q(user_Phone=tempdata['user_Phone']) & Q(user_Email=tempdata['user_Email']) & Q(user_Name=tempdata['user_Name'])
                )
            user_Id = ms.data['user_Id']
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