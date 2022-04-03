from django.shortcuts import render
from rest_framework.response import Response
from .models import Member, UpdatePoint, HireDriver, HireCustomer
from rest_framework.views import APIView
from .serializers import MemberSerializer, UpdatePointSerializer, HireDriverSerializer, HireCustomerSerializer

# Create your views here.
class UserSequenceView(APIView):
    pass