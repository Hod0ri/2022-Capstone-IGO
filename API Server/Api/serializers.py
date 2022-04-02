from rest_framework import serializers
from .models import HireCustomer, HireDriver, Location, Member, UpdatePoint


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


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
