from rest_framework import serializers
from ..models import Member, NoshowIssue, LogPoint


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

class FindIDParm(serializers.ModelSerializer):
    user_Name = serializers.CharField(help_text='User\'s Real Name')
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

class IssueParameter(serializers.ModelSerializer):
    ns_Id = serializers.CharField(help_text='Reporter ID')
    ns_Date = serializers.DateTimeField(help_text='Report Date Time')
    ns_Target = serializers.CharField(help_text='Respondent ID')
    ns_Reason = serializers.CharField(help_text='Report Reason')
    ns_Etc = serializers.CharField(help_text='ETC...')
    ns_Status = serializers.CharField(help_text='Report processing status', default='접수대기')

    class Meta:
        model = NoshowIssue
        fields = '__all__'

class LogPointParameter(serializers.ModelSerializer):
    pot_Id = serializers.CharField(help_text='User ID')
    pot_date = serializers.DateTimeField(help_text='Datetime to Change Point')
    pot_Reason = serializers.CharField(help_text='Change Reason')
    pot_Change = serializers.CharField(help_text='Amount of Change')

    class Meta:
        model = LogPoint
        fields = '__all__'