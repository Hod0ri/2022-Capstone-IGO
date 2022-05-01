from django.db import models


class Member(models.Model):
    """회원 정보 테이블
    @:parameter
        user_Id : 유저 고유 ID
        user_Nick : 유저 닉네임
        user_Name : 유저 이름
        user_Driver : 사용자 운전자 등급 부여 여부
        user_Phone : 사용자 전화번호
        user_Email : 사용자 이메일
    """
    user_Id = models.CharField(max_length=50, primary_key=True)
    user_Nick = models.CharField(max_length=10, unique=True)
    user_Name = models.CharField(max_length=10)
    user_Driver = models.IntegerField()
    user_Phone = models.CharField(max_length=30, unique=True)
    user_Email = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.user_Id

    class Meta:
        db_table = 'TB_MEMBER'


class MemberPoint(models.Model):
    user_Id = models.ForeignKey(
        "Member", related_name="MemberId",
        on_delete=models.CASCADE, db_column="user_Id",
        primary_key=True
    )
    user_Point = models.IntegerField(default=0)

    def __str__(self):
        return self.user_Id

    class Meta:
        db_table = 'TB_POINT'


class LogPoint(models.Model):
    """포인트 로그 테이블
        @:parameter
            pot_Id : 유저 고유 ID
            pot_Amount : 포인트 변경 전 보유량
            pot_date : 포인트 변동 일시
            pot_Reason : 포인트 변동 사유
            pot_Change : 포인트 변동량
    """
    pot_Id = models.ForeignKey(
        "Member", related_name="MemberID",
        on_delete=models.CASCADE, db_column="pot_Id"
    )
    pot_Amount = models.ForeignKey(
        "MemberPoint", related_name="MemberAmount",
        on_delete=models.CASCADE, db_column="pot_Amount"
    )
    pot_date = models.DateTimeField(auto_now_add=True)
    pot_Reason = models.CharField(max_length=20)
    pot_Change = models.IntegerField()

    def __str__(self):
        return self.pot_Id

    class Meta:
        db_table = 'TB_LOGPOINT'


class MatchData(models.Model):
    """매칭 목록 테이블
    @:parameter
        mc_Driver : 운전자 ID
        mc_Arrive : 출발 시간
        mc_Goal : 도착 장소
        mc_Price : 요금
        mc_Desc : 비고
    """
    mc_Driver =models.ForeignKey(
        "Member", related_name="MemberMatch",
        on_delete=models.CASCADE, db_column="mc_Driver",
        primary_key=True
    )
    mc_Arrive = models.DateTimeField()
    mc_Goal = models.CharField(max_length=50, null=True)
    mc_Price = models.IntegerField()
    mc_Desc = models.CharField(max_length=50, null=True)

    def __str__(self):
        return self.mc_Driver

    class Meta:
        db_table = 'TB_MATCHING'


class MatchMember(models.Model):
    """매칭 간 사용자-운전자 목록 테이블
    @:parameter
        mm_Driver : 운전자 ID
        mm_Member{n} : 탑승자 {n}
        mm_Pickup{n} : 탑승자{n} 픽업 장소
    """
    mm_Driver = models.ForeignKey(
        "Member", related_name="MemMatDri",
        on_delete=models.CASCADE, db_column="mm_Driver",
        primary_key=True
    )
    mm_Member1 = models.ForeignKey(
        "Member", related_name="MemMat1",
        on_delete=models.CASCADE, db_column="mm_Member1",
        unique=True
    )
    mm_Pickup1 = models.CharField(max_length=50)
    mm_Member2 = models.ForeignKey(
        "Member", related_name="MemMat2",
        on_delete=models.CASCADE, db_column="mm_Member2",
        unique=True, null=True
    )
    mm_Pickup2 = models.CharField(max_length=50, null=True)
    mm_Member3 = models.ForeignKey(
        "Member", related_name="MemMat3",
        on_delete=models.CASCADE, db_column="mm_Member3"
    )
    mm_Pickup3 = models.CharField(max_length=50, null=True)
    mm_Member4 = models.ForeignKey(
        "Member", related_name="MemMat4",
        on_delete=models.CASCADE, db_column="mm_Member4",
        unique=True, null=True
    )
    mm_Pickup4 = models.CharField(max_length=50, null=True)

    def __str__(self):
        return self.mm_Driver

    class Meta:
        db_table = 'TB_MATCHINGMEM'


class NoshowIssue(models.Model):
    """노쇼 신고 테이블
    @:parameter
        ns_Id : 회원ID
        ns_Date : 신고시간
        ns_Targer : 피신고자 ID
        ns_Reason : 사유 카테고리
        ns_Etc : 특이사항
        ns_Status : 처리 여부
    """
    ns_Id = models.ForeignKey(
        "Member", related_name="MemberIssue",
        on_delete=models.CASCADE, db_column='ns_Id',
        primary_key=True
    )
    ns_Date = models.DateTimeField(auto_now_add=True)
    ns_Target = models.ForeignKey(
        "Member", related_name="MemberTarget",
        on_delete=models.CASCADE, db_column='ns_Target'
    )
    ns_Reason = models.CharField(max_length=50)
    ns_Etc = models.CharField(max_length=300, null=True)
    ns_Statis = models.CharField(max_length=50, default='접수대기')

    def __str__(self):
        return self.ns_Id

    class Meta:
        db_table = 'TB_NOSHOW'
