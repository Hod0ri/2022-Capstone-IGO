from rest_framework import serializers
from .models import HireCustomer, HireDriver, Member, UpdatePoint


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['user_Id', 'user_Name', 'user_Nick', 'user_Driver', 'user_Phone', 'user_Email']


class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UpdatePoint
        fields = '__all__'


class HireDriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = HireDriver
        fields = '__all__'


class HireCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = HireCustomer
        fields = '__all__'
