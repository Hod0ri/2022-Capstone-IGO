from rest_framework import serializers
from ..models import Member, LogPoint


class MemberParameter(serializers.ModelSerializer):
    user_Id = serializers.CharField(help_text='User\'s ID')
    user_Nick = serializers.CharField(help_text='User\'s Nick Name')
    user_Name = serializers.CharField(help_text='User\'s Real Name')
    user_Driver = serializers.IntegerField(help_text='Whether the user has driver Permission', default=0)
    user_Point = serializers.IntegerField(help_text='Point what user has', default=0)
    user_Phone = serializers.CharField(help_text='User\'s Phone Number')
    user_Email = serializers.CharField(help_text='User\'s Email Address')

    class Meta:
        model = Member
        fields = '__all__'


class MemberCookieParameter(serializers.ModelSerializer):
    user_Id = serializers.CharField(help_text='User\'s ID')

    class Meta:
        model = Member
        fields = ['user_Id']
