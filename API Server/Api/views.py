from django.http import JsonResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .FunctionModules.validators import CheckValidAccount
from .serializers import MemberSerializer
from .models import Member
from .FunctionModules.CookieJWT import CheckUserID
from .Documentation.Swagger_Serializer import MemberParameter, MemberCookieParameter


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
