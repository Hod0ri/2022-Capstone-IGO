import http

from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from .models import Member, UpdatePoint, HireDriver, HireCustomer
from rest_framework.views import APIView
from .serializers import MemberSerializer, UpdateSerializer, HireDriverSerializer, HireCustomerSerializer
import jwt
from jwt import ExpiredSignatureError
from .vaildators import CheckVaildAccount
from rest_framework import status


class Jwt_Checker_Middleware:
    secret_key = ''

    def checkVaild(self, request):
        cookie = request.getCookie()
        token = cookie.jwt
        try:
            jwt.decode(token, self.secret_key, algorithms='HS256')
            return None
        except ExpiredSignatureError:
            return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)


# Create your views here.
class UserView(APIView):
    def post(self, request):
        # Jwt_Checker_Middleware.checkVaild(request)
        # return Response("test ok", status=200)
        tempdata = JSONParser().parse(request)
        member_serializer = MemberSerializer(data=tempdata)

        if member_serializer.is_valid():
            if len(CheckVaildAccount(tempdata)) == 0:
                member_serializer.save()
                response_json = {
                    'err': ''
                }
            else:
                response_json = {
                    'err': CheckVaildAccount(tempdata)
                }
            return JsonResponse(response_json)

    def get(self, request):
        return Response("test ok", status=200)

    def put(self, request, **kwargs):
        if kwargs.get('user_Id') is None:
            return Response("Invalid request", status=status.HTTP_400_BAD_REQUEST)
        else:
            member_id = kwargs.get('user_Id')
            member_object = Member.objects.get(user_Id=member_id)

            update_member_serializer = MemberSerializer(member_object, data=request.data)
            if update_member_serializer.is_valid():
                if len(CheckVaildAccount(request.data)) == 0:
                    update_member_serializer.save()
                    return Response(status=status.HTTP_200_OK)
                else:
                    response_json = {
                        'err': CheckVaildAccount(request.data)
                    }
                    return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response("test ok", status=200)

    def delete(self, request, **kwargs):
        if kwargs.get('user_Id') is None:
            return Response("Invalid request", status=status.HTTP_400_BAD_REQUEST)
        else:
            delete_id = kwargs.get('user_Id')
            delete_object = Member.objects.get(user_Id=delete_id)
            delete_object.delete()
        return Response(status=status.HTTP_200_OK)
