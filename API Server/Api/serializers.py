from rest_framework import serializers
from .models import Member, LogPoint, MatchMember, MatchData, NoshowIssue


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

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatchData
        fields = '__all__'

class MatchMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatchMember
        fields = '__all__'

class NoshowSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoshowIssue
        fields = '__all__'