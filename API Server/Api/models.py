from django.db import models


# Create your models here.
class Member(models.Model):
    user_Id = models.CharField(max_length=50, primary_key=True)
    user_Nick = models.CharField(max_length=10, unique=True)
    user_Name = models.CharField(max_length=10)
    user_Driver = models.IntegerField()
    user_Phone = models.CharField(max_length=30)
    user_Points = models.IntegerField(default=0)
    user_Grade = models.IntegerField(default=0)
    user_Email = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.user_Id

    class Meta:
        db_table = 'TB_MEMBER'


class UpdatePoint(models.Model):
    pot_Id = models.ForeignKey(
        "Member", related_name="MemberPoint",
        on_delete=models.CASCADE, db_column="pot_Id",
        primary_key=True
    )
    pot_date = models.DateTimeField(auto_now_add=True)
    pot_Amount = models.IntegerField()
    pot_Reason = models.CharField(max_length=20, null=True)

    def __str__(self):
        return self.pot_Id

    class Meta:
        db_table = 'TB_LOGPOINT'


class HireDriver(models.Model):
    hire_Id = models.ForeignKey(
        "Member", related_name="MemberHD",
        on_delete=models.CASCADE, db_column="hire_Id",
        primary_key=True
    )
    hire_Date = models.DateTimeField(auto_now_add=True)
    hire_Loc1 = models.CharField(max_length=12)
    hire_Loc2 = models.CharField(max_length=12, null=True)
    hire_Loc3 = models.CharField(max_length=12, null=True)
    hire_Loc4 = models.CharField(max_length=12, null=True)
    hire_Loc5 = models.CharField(max_length=12, null=True)
    hire_Goal = models.CharField(max_length=12)
    hire_etc = models.CharField(max_length=300, null=True)

    def __str__(self):
        return self.hire_Id

    class Meta:
        db_table = 'TB_HIREDRIVER'


class HireCustomer(models.Model):
    hc_Id = models.ForeignKey(
        "Member", related_name="MemberHC",
        on_delete=models.CASCADE, db_column="hc_Id",
        primary_key=True
    )
    hc_Date = models.DateTimeField(auto_now_add=True)
    hc_Loc1 = models.CharField(max_length=12)
    hc_Loc2 = models.CharField(max_length=12, null=True)
    hc_Loc3 = models.CharField(max_length=12, null=True)
    hc_Goal = models.CharField(max_length=12)
    hc_Price = models.IntegerField(null=True)
    hc_etc = models.CharField(max_length=300, null=True)

    def __str__(self):
        return self.hc_Id

    class Meta:
        db_table = 'TB_HIRECUSTOMER'
