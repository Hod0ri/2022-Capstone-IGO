from rest_framework import serializers
from .models import Member, LogPoint


class LogPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogPoint
        fields = '__all__'

    def to_representation(self, instance):
        self.fields['pot_Id'] = MemberSerializer(read_only=False)
        return super(LogPointSerializer, self).to_representation(instance)


class MemberSerializer(serializers.ModelSerializer):
    member = LogPointSerializer(many=True, read_only=False)

    class Meta:
        model = Member
        fields = '__all__'


class LoginMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['user_Id']

