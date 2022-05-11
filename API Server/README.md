<h1 align="center"> 🚗 I-GO(아이고) 웹 클라이언트 </h1>

## 🖥️ Collabrator

<table>
  <tr>
    <td align="center"><a href="https://github.com/hod0ri"><img src="https://avatars.githubusercontent.com/u/65306839?v=4" width="100px;" alt="이미지"/><br /><sub><b>hod0ri</b></sub></a><br />😿API Server</td>
    <td align="center"><a href="https://github.com/9u4a"><img src="https://avatars.githubusercontent.com/u/81855010?v=4" width="100px;" alt=""/><br /><sub><b>9u4a</b></sub></a><br />😿API Server</td>
  </tr>
</table>

## Back-end stack

- Django (Python 3.9)
- Postgresql

## Folder path

```py
./API Server
    |- /igoAPI                # 프로젝트 루트 디렉터리
    |- /Api                   # API 서버
        |- /Documentation     # API Swagger 문서 디렉터리
        |- /Validations       # 내부 인증 메서드
        |- /Views             # API View 모듈화
```

## Convention

1. 변수 및 메서드명은 CamelCase를 사용한다.
2. 각 모델의 Attribute는 Snake_Case를 사용한다.
3. 길어지는 코드에 대해서는 모듈로 나누어서 관리한다.

## Django

### Django Setting

|          Env Setting           |   value    |
| :------------------------: | :--------: |
| DATABASE_ENGINE |    django.db.backends.postgresql    |
| DATABASE_NAME |    igoData    |
| DATABASE_USER |    postgres(root)    |
| DATABASE_PASSWORD |    1234    |
|             TIME_ZONE             | Asia/Seoul |
|Library|[Require-Libraries](https://github.com/Hod0ri/2022-Capstone-IGO/blob/main/API%20Server/requirements.txt)|

## API Information (Git Document)
---
### 😆 회원 처리 (/user)
<details>
<summary>1. 회원 가입 (POST)</summary>

### Request Form

|     TAG     |      value      | required |
| :---------: | :-------------: | :------: |
|   API URL   |      /user      |    -     |
|   Method    |      POST       |    -     |
|   user_Id   |     String      |    ✔️     |
|  user_Nick  |     String      |    ✔️     |
|  user_Name  |     String      |    ✔️     |
| user_Driver |     Boolean     |    ✔️     |
| user_Phone  |     String      |    ✔️     |
| user_Email  |     String      |    ✔️     |

### Response Form

|     TAG     |      value      | Example |
| :---------: | :-------------: | :------: |
|   success  |      String    |    false     |
|   err   |     String      |    user_Nick is not Defined     |
</details>

<details>
<summary>2. 로그인 (GET)</summary>

### Request Form

|     TAG     |      value      | required |
| :---------: | :-------------: | :------: |
|   API URL   |      /user      |    -     |
|   Method    |      GET       |    -     |
|   token (inCookie)   |     String      |    ✔️     |

### Response Form

|     TAG     |      value      | Example |
| :---------: | :-------------: | :------: |
|   success  |      String    |    false     |
|   user_Nick  |      String    |    None     |
|   errMsg   |     String      |    'user_Nick is not Defined'     |

</details>
<details>
<summary>3. 회원 정보 수정 (PUT)</summary>

### Request Form

|     TAG     |      value      | required |
| :---------: | :-------------: | :------: |
|   API URL   |      /user      |    -     |
|   Method    |      POST       |    -     |
|   token (inCookie)   |     String      |    ✔️     |
|  user_Nick  |     String      |    ✔️     |
|  user_Name  |     String      |    ✔️     |
| user_Driver |     Boolean     |    ✔️     |
| user_Phone  |     String      |    ✔️     |
| user_Email  |     String      |    ✔️     |

### Response Form

|     TAG     |      value      | Example |
| :---------: | :-------------: | :------: |
|   success  |      String    |    false     |
|   err   |     String      |    user_Phone is not Defined     |
</details>
<details>
<summary>4. 회원 탈퇴 (DELETE)</summary>

### Request Form

|     TAG     |      value      | required |
| :---------: | :-------------: | :------: |
|   API URL   |      /user      |    -     |
|   Method    |      GET       |    -     |
|   token (inCookie)   |     String      |    ✔️     |

### Response Form

|     TAG     |      value      | Example |
| :---------: | :-------------: | :------: |
|   success  |      String    |    true     |
|   errMsg   |     String      |    ''     |

</details>
<details>
<summary>5. 아이디 찾기 (GET)</summary>

### Request Form

|     TAG     |      value      | required |
| :---------: | :-------------: | :------: |
|   API URL   |      /ems      |    -     |
|   Method    |      GET       |    -     |
|   user_Name   |     String      |    ✔️     |
|   user_Email   |     String      |    ✔️     |
|   user_Phone   |     String      |    ✔️     |

### Response Form

|     TAG     |      value      | Example |
| :---------: | :-------------: | :------: |
|   success  |      String    |    true     |
|   user_Id  |      String    |    user1     |
|   errMsg   |     String      |    ''     |

</details>

<br />

### 💸 포인트 처리 (/point)
<details>
<summary>1. 포인트 변동 (POST)</summary>

### Request Form

|     TAG     |      value      | required |
| :---------: | :-------------: | :------: |
|   API URL   |      /point      |    -     |
|   Method    |      POST       |    -     |
|   token (inCookie)   |     String      |    ✔️     |
|  pot_Date  |     datetime      |    ✔️     |
|  pot_Change  |     Integer      |    ✔️     |
| pot_Reason  |     String      |    ✔️     |

### Response Form

|     TAG     |      value      | Example |
| :---------: | :-------------: | :------: |
|   success  |      String    |    true     |
|   result | Integer | 3000 |
|   err   |     String      |    ''     |
</details>

<details>
<summary>2. 포인트 로그 조회 (GET)</summary>

### Request Form

|     TAG     |      value      | required |
| :---------: | :-------------: | :------: |
|   API URL   |      /point      |    -     |
|   Method    |      GET       |    -     |
|   token (inCookie)   |     String      |    ✔️     |
### Response Form

|     TAG     |      value      | Example |
| :---------: | :-------------: | :------: |
|   success  |      String    |    true     |
|   result | Json | All Log |
|   err   |     String      |    ''     |

### Log Form

|     TAG     |      value      | Example |
| :---------: | :-------------: | :------: |
|  pot_Date  |     datetime      |    2022-01-01 00:00:00     |
|  pot_Change  |     Integer      |    +1000     |
| pot_Reason  |     String      |    충전     |
| pot_Amount | Integer | 3000 |
</details>
<br />

### 🚩 신고 처리 (/issue)
<details>
<summary>1. 신고 등록 (POST)</summary>

### Request Form

|     TAG     |      value      | required |
| :---------: | :-------------: | :------: |
|   API URL   |      /issue      |    -     |
|   Method    |      POST       |    -     |
|   token (inCookie)   |     String      |    ✔️     |
|  ns_Target  |     String      |    ✔️     |
|  ns_Reason  |     String      |    ✔️     |
| ns_Etc  |     String      |    ✔️     |

### Response Form

|     TAG     |      value      | Example |
| :---------: | :-------------: | :------: |
|   success  |      String    |    true     |
|   err   |     String      |    ''     |
</details>

<details>
<summary>2. 신고 조회 (GET)</summary>

### Request Form

|     TAG     |      value      | required |
| :---------: | :-------------: | :------: |
|   API URL   |      /issue      |    -     |
|   Method    |      GET       |    -     |
|   token (inCookie)   |     String      |    ✔️     |

### Response Form

|     TAG     |      value      | Example |
| :---------: | :-------------: | :------: |
|   success  |      String    |    true     |
|   result | Json | All Log |
|   err   |     String      |    ''     |

### Log Form

|     TAG     |      value      | Example |
| :---------: | :-------------: | :------: |
|  ns_Date  |     datetime      |    2022-01-01 00:00:00     |
|  ns_Target  |     String      |    user2     |
| ns_Reason  |     String      |    노쇼     |
| ns_Etc | String | '' |
| ns_Status | String | 접수 대기 |
</details>