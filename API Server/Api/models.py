from django.db import models

class Member(models.Model):
    """회원 정보 테이블
    @:parameter
        user_Id : 유저 고유 ID
        user_Nick : 유저 닉네임
        user_Name : 유저 이름
        user_Driver : 사용자 운전자 등급 부여 여부
        user_Phone : 사용자 전화번호
        user_Point : 사용자 보유 포인트
        user_Email : 사용자 이메일
    """
    user_Id = models.CharField(max_length=50, primary_key=True)
    user_Nick = models.CharField(max_length=10, unique=True)
    user_Name = models.CharField(max_length=10)
    user_Driver = models.IntegerField(default=0)
    user_Phone = models.CharField(max_length=30, unique=True)
    user_Point = models.IntegerField(default=0)
    user_Email = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.user_Id

    class Meta:
        db_table = 'TB_MEMBER'


class LogPoint(models.Model):
    """포인트 로그 테이블
        @:parameter
            pot_Id : 유저 고유 ID
            pot_Date : 포인트 변동 일시
            pot_Amount : 변동 후 포인트
            pot_Reason : 포인트 변동 사유
            pot_Change : 포인트 변동량
    """
    pot_Id = models.ForeignKey(
        "Member", related_name="MemberID",
        on_delete=models.CASCADE, db_column="pot_Id"
    )
    pot_Date = models.DateTimeField(auto_now_add=True)
    pot_Amount = models.IntegerField(null=True)
    pot_Reason = models.CharField(max_length=20)
    pot_Change = models.IntegerField()

    def __str__(self):
        return self.pot_Id

    class Meta:
        db_table = 'TB_LOGPOINT'
        ordering = ['-pot_Date']


class MatchData(models.Model):
    """매칭 목록 테이블
    @:parameter
        mc_Driver : 운전자 ID
        mc_Arrive : 출발 장소
        mc_ArriveTime : 출발 시간
        mc_Goal : 도착 장소
        mc_Price : 요금
        mc_Desc : 비고
        mc_Match : 매칭 여부
        mc_Count : 매칭 할 인원
    """
    mc_Driver = models.ForeignKey(
        "Member", related_name="MemberMatch",
        on_delete=models.CASCADE, db_column="mc_Driver"
    )
    mc_Arrive = models.CharField(max_length=50)
    mc_ArriveTime = models.DateTimeField(null=True)
    mc_Goal = models.CharField(max_length=50)
    mc_Price = models.IntegerField()
    mc_Desc = models.CharField(max_length=300, null=True)
    mc_Match = models.BooleanField(default=False)
    mc_Count = models.IntegerField(default=3)

    def __str__(self):
        return self.mc_Driver

    class Meta:
        db_table = 'TB_MATCHING'


class MatchMember(models.Model):
    """매칭 간 사용자-운전자 목록 테이블
    @:parameter
        mm_Driver : 운전자 ID
        mm_Member : 탑승자
        mm_Pickup : 탑승자 픽업 장소
        mm_Goal : 도착 장소
        mm_Arrive : 출발 시간
        mm_Price : 요금
        mm_Match : 매칭 여부
    """
    mm_Driver = models.ForeignKey(
        "Member", related_name="MemDriver",
        on_delete=models.CASCADE, db_column="mm_Driver"
    )
    mm_Member = models.ForeignKey(
        "Member", related_name="MemMat",
        on_delete=models.CASCADE, db_column="mm_Member"
    )
    mm_Pickup = models.CharField(max_length=50)
    mm_Goal = models.CharField(max_length=50)
    mm_Arrive = models.DateTimeField()
    mm_Price = models.IntegerField()
    mm_Match = models.BooleanField()

    def __str__(self):
        return self.mm_Driver

    class Meta:
        db_table = 'TB_MATCHINGMEM'


class NoshowIssue(models.Model):
    """노쇼 신고 테이블
    @:parameter
        ns_Id : 회원ID
        ns_Date : 신고시간
        ns_Target : 피신고자 ID
        ns_Reason : 사유 카테고리
        ns_Etc : 특이사항
        ns_Status : 처리 여부
    """
    ns_Id = models.ForeignKey(
        "Member", related_name="MemberIssue",
        on_delete=models.CASCADE, db_column='ns_Id'
    )
    ns_Date = models.DateTimeField(auto_now_add=True)
    ns_Target = models.ForeignKey(
        "Member", related_name="MemberTarget",
        on_delete=models.CASCADE, db_column='ns_Target'
    )
    ns_Reason = models.CharField(max_length=50)
    ns_Etc = models.CharField(max_length=300, null=True)
    ns_Status = models.CharField(max_length=50, default='접수대기')

    def __str__(self):
        return self.ns_Id

    class Meta:
        db_table = 'TB_NOSHOW'
