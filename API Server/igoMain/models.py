from django.db import models

# Create your models here.
class Location(models.Model):
    loc_Id = models.ForeignKey("Member", related_name="Member", ondelete=models.CASCADE, db_column="loc_Id",  primary_key=True)
    # 탑승 희망 장소 5가지 (1개는 필수)
    loc_Pri = models.CharField(max_length=12)
    loc_Sec = models.CharField(max_length=12, null=True)
    loc_Thi = models.CharField(max_length=12, null=True)
    loc_For = models.CharField(max_length=12, null=True)
    loc_Fif = models.CharField(max_length=12, null=True)

    def __str__(self):
        return self.message

    class Meta:
        db_table = 'TB_LOCATION'

class Member(models.Model):
    user_Id = models.CharField(max_length=50, primary_key=True)
    user_Nick = models.CharField(max_length=12, unique=True)
    user_Name = models.CharField(max_length=7)
    # 운전 기사 권한 유무
    user_Driver = models.BooleanField()
    user_Point = models.IntegerField(default=0)
    # 사용자 평점
    user_grade = models.IntegerField(default=0)

    def __str__(self):
        return self.message

    class Meta:
        db_table = 'TB_MEMBER'

class UpdatePoint(models.Model):
    pot_Id = models.ForeignKey("Member", related_name="Member", ondelete=models.CASCADE, db_column="pot_Id",  primary_key=True)
    pot_date = models.DateTimeField(auto_now_add=True)
    pot_Amount = models.IntegerField()

    def __str__(self):
        return self.message

    class Meta:
        db_table = 'TB_LOGPOINT'
    