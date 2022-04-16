import http

from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Member, UpdatePoint, HireDriver, HireCustomer
from .serializers import MemberSerializer, UpdateSerializer, HireDriverSerializer, HireCustomerSerializer
from API.UserMethod.validators import CheckValidAccount


# Create your views here.
class UserView(APIView):
    def post(self, request):
        tempdata = JSONParser().parse(request)
        tempdata['user_Driver'] = 1 if tempdata.get('user_Driver') else 0
        member_serializer = MemberSerializer(data=tempdata)
        if member_serializer.is_valid():
            if not CheckValidAccount(tempdata):
                member_serializer.save()
                response_json = {
                    'err': ''
                }
            else:
                response_json = {
                    'err': CheckValidAccount(tempdata)
                }
        return JsonResponse(response_json)

    def get(self, request):
        tempdata = JSONParser().parse(request)
        temp_id = tempdata.get('user_Id')
        try:
            ms = MemberSerializer(Member.objects.get(user_Id=temp_id))
            return JsonResponse(ms.data)
        except Member.DoesNotExist:
            response_json = {
                'err': 'Member.DoesNotExist'
            }
        return JsonResponse(response_json)

    def put(self, request):
        tempdata = JSONParser().parse(request)
        tempdata['user_Driver'] = 1 if tempdata.get('user_Driver') else 0
        temp_id = tempdata.get('user_Id')
        userdata = Member.objects.get(user_Id=temp_id)
        member_update_serializer = MemberSerializer(userdata, data=tempdata)
        if member_update_serializer.is_valid():
            # if not CheckValidAccount(tempdata):
            member_update_serializer.save()
        return Response(member_update_serializer.data, status=status.HTTP_200_OK)

    def delete(self, request):
        tempdata = JSONParser().parse(request)
        temp_id = tempdata.get('user_Id')
        userdata = Member.objects.get(user_Id=temp_id)
        userdata.delete()
        return Response(status=status.HTTP_200_OK)
