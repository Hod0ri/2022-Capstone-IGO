from django.http import JsonResponse
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .Validation.validators import CheckValidAccount
from .serializers import MemberSerializer, LogPointSerializer
from .models import Member, LogPoint
from .Validation.CookieJWT import CheckUserID


# 유저 엔드 포인트
class UserView(APIView):
    def post(self, request):
        """POST 회원가입(추가) 포인트
            @description
            회원 추가를 위한 Login Server - API Server 간 Post 통신
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

    def get(self, request):
        """GET 로그인 포인트
            @description
            로그인을 위한 Login Server - API Server 간 GET 통신
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

    def put(self, request):
        """PUT 정보 수정 포인트
            @description
            회원 정보 수정을 위한 API Server - Client Server 간 PUT 통신
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

    def delete(self, request):
        """DELETE 탈퇴 포인트
            @description
            회원 탈퇴를 위한 Login Server - API Server 간 DELETE 통신
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
