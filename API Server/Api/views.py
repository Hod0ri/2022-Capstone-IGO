from django.http import JsonResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .Validation.validators import CheckValidAccount
from .serializers import MemberSerializer, LogPointSerializer
from .models import Member, LogPoint
from .Validation.CookieJWT import CheckUserID
from .Documentation.Swagger_Serializer import MemberParameter, MemberCookieParameter


# 유저 엔드 포인트
class UserView(APIView):
    @swagger_auto_schema(tags=['회원 가입 (User POST)'], query_serializer=MemberParameter, responses={200: 'Success'})
    def post(self, request):
        """
            Login Server to API Server Post Communication for Adding Members
        """

        tempdata = JSONParser().parse(request)
        tempdata['user_Driver'] = 1 if tempdata.get('user_Driver') else 0
        member_serializer = MemberSerializer(data=tempdata)
        if member_serializer.is_valid():
            if not CheckValidAccount(tempdata):
                member_serializer.save()
                response_json = {
                    'success': True
                }
            else:
                response_json = {
                    'success': False,
                    'err': CheckValidAccount(tempdata)
                }
        return JsonResponse(response_json)

    @swagger_auto_schema(tags=['회원 조회 (User GET)'], query_serializer=MemberCookieParameter, responses={200: 'Success'})
    def get(self, request):
        """
            Login Server to API Server GET Communication for Login
        """

        user_Id = CheckUserID(request)

        try:
            ms = MemberSerializer(Member.objects.get(user_Id=user_Id))
            response_json = {
                'success': True,
                'user_Nick': ms.data['user_Nick']
            }
            return JsonResponse(response_json)
        except Member.DoesNotExist:
            response_json = {
                'success': False,
                'err': 'Member.DoesNotExist'
            }
        return JsonResponse(response_json)

    @swagger_auto_schema(tags=['회원 정보 수정 (User PUT)'], query_serializer=MemberParameter, responses={200: 'Success'})
    def put(self, request):
        """
            API Server to Client Server PUT communication for member information modification
        """
        tempdata = JSONParser().parse(request)
        tempdata['user_Driver'] = 1 if tempdata.get('user_Driver') else 0
        temp_id = tempdata.get('user_Id')
        userdata = Member.objects.get(user_Id=temp_id)
        member_update_serializer = MemberSerializer(userdata, data=tempdata)
        if member_update_serializer.is_valid():
            if not CheckValidAccount(tempdata):
                member_update_serializer.save()
                response_json = {
                    'success': True
                }
            else:
                response_json = {
                    'err': CheckValidAccount(tempdata)
                }
        return Response(member_update_serializer.data, status=status.HTTP_200_OK)


    @swagger_auto_schema(tags=['회원 삭제 (User DELETE)'], query_serializer=MemberCookieParameter, responses={200: 'Success'})
    def delete(self, request):
        """
            Login Server - DELETE communication between API Servers for membership withdrawal
        """
        user_Id = CheckUserID(request)
        userdata = Member.objects.get(user_Id=user_Id)
        userdata.delete()
        response_json = {
            'success': True
        }
        return JsonResponse(response_json)


# class PointView(APIView):
#     def post(self, request):
#         tempdata = JSONParser().parse(request)
#         # if "사용" in tempdata['pot_Reason']:
#         #
#         # elif "충전" in tempdata['pot_Reason']:
#
#         point_serializer = LogPointSerializer(data=tempdata)
#
#         if point_serializer.is_valid():
#             point_serializer.save()
#             response_json = {
#                 'success': True
#             }
#         else:
#             response_json = {
#                 'err': point_serializer.errors
#             }
#         return JsonResponse(response_json)
#
#     def get(self, request):
#         tempdata = JSONParser().parse(request)
#         temp_id = tempdata.get('user_Id')
#         try:
#             pointdata = LogPointSerializer(LogPoint.objects.get(pot_Id=temp_id))
#             response_json = pointdata.data
#             return JsonResponse(response_json)
#         except Member.DoesNotExist:
#             response_json = {
#                 'success': False,
#                 'err': 'Member.DoesNotExist'
#             }
#         return JsonResponse(response_json)
#
#     def put(self, request):
#         tempdata = JSONParser().parse(request)
#         temp_id = tempdata.get('pot_Id')
#         userdata = LogPoint.objects.get(pot_Id=temp_id)
#         point_update_serializer = LogPointSerializer(userdata, data=tempdata)
#         if point_update_serializer.is_valid():
#             point_update_serializer.save()
#             response_json = {
#                 'success': True,
#                 'pot_Id': tempdata['pot_Id'],
#                 'pot_Amount': tempdata['pot_Amount'],
#                 'pot_date': tempdata['pot_date'],
#                 'pot_Reason': tempdata['pot_Reason'],
#                 'pot_change': tempdata['pot_change']
#             }
#         else:
#             response_json = {
#                 'err': ''
#             }
#         return JsonResponse(response_json)
#
#     def delete(self, request):
#         tempdata = JSONParser().parse(request)
#         temp_id = tempdata.get('pot_Id')
#         userdata = LogPoint.objects.get(pot_Id=temp_id)
#         userdata.delete()
#         response_json = {
#             'success': True
#         }
#         return JsonResponse(response_json)
