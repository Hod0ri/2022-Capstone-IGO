from rest_framework import serializers
from .models import Member, LogPoint


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'


class LoginMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['user_Id']


class LogPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogPoint
        fields = '__all__'

