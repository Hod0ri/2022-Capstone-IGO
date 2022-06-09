<h1 align="center"> 🚗 I-GO(아이고) 로그인 서버</h1>

## 🖥️ Collabrator

<table align="center">
  <tr>
    <td align="center"><a href="https://github.com/SOPLAY"><img src="https://avatars.githubusercontent.com/u/40691745?v=4" width="100px;" alt="이미지"/><br /><sub><b>SOPLAY</b></sub></a><br />🌭Web -FullStack</td>
</table>

## FilePath

```js
/*
/db                     # mongodb data
   |--- /data
/nginx                  # nginx conf files
   |--- /conf.d
   |--- /ssl            # nginx ssl files
/server
  |--- /src
        |--- /models    # mongodb models ( Schema )
        |--- /routes   
*/
```

### Nginx

<details>

#### ssl 인증서

> nginx 의 ssl 인증서는 nginx/ssl 폴더 안에 igo.pem, igo.key 파일을 위치 시킨다.

</details>

### mongoDB

<details>

### mongodb env

|          envName           |   value    |
| :------------------------: | :--------: |
| MONGO_INITDB_ROOT_USERNAME |    root    |
| MONGO_INITDB_ROOT_PASSWORD |    root    |
|             TZ             | Asia/Seoul |

#### compass 접속 주소

###### `url = mongodb://USERNAME:PASSWORD@mongodbUrl:port/`

```
mongodb://root:root@localhost:27017/
```

</br>

#### mongoose 접속 주소

```
mongodb://root:root@localhost:27017/loginService?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false
```

</details>

## api

### 1. 회원가입 ( post )

<details>
<summary>Request</summary>

|     TAG     |      value      | required |
| :---------: | :-------------: | :------: |
|   API URL   | /api/auth/user/ |    -     |
|   Method    |      POST       |    -     |
|   user_Id   |     String      |    v     |
|  user_Nick  |     String      |    v     |
|  user_Name  |     String      |    v     |
| user_Driver |     String      |    v     |
| user_Phone  |     String      |    v     |
| user_Email  |     String      |    v     |
|   user_Pw   |     String      |    v     |

</details>

<details>
<summary>Response</summary>

|    TAG    |  value  |     note      |
| :-------: | :-----: | :-----------: |
|  success  | boolean |       -       |
| user_Nick | String  | success state |
|    err    | String  |   err state   |

</details>

---

### 2. 로그인 ( get )

> ##### case 1. 최초 로그인 요청

<details>
<summary>Request</summary>

|   TAG   |        value         | required |
| :-----: | :------------------: | :------: |
| API URL | /api/auth/user/login |    -     |
| Method  |         POST         |    -     |
| user_Id |        String        |    v     |
| user_Pw |        String        |    v     |

</details>

<details>
<summary>Response</summary>

|    TAG    |  value  |     note      |
| :-------: | :-----: | :-----------: |
|  success  | boolean |       -       |
| user_Nick | String  | success state |
|    err    | String  |   err state   |

</details>

> ##### case 2. accessToken 갱신

<details>
<summary>Request</summary>

|   TAG   |      value      | required |
| :-----: | :-------------: | :------: |
| API URL | /api/auth/user/ |    -     |
| Method  |       GET       |    -     |

</details>

<details>
<summary>Response</summary>

|    TAG    |  value  |     note      |
| :-------: | :-----: | :-----------: |
|  success  | boolean |       -       |
| user_Nick | String  | success state |
|    err    | String  |   err state   |

</details>

---

### 3. 회원 수정 ( put )

##### 만약 회원 수정이 이뤄진다면 accessToken을 재발급 받아서 정보를 최신화 해야한다.

<details>
<summary>Request</summary>

|     TAG     |      value      | required |
| :---------: | :-------------: | :------: |
|   API URL   | /api/auth/user/ |    -     |
|   Method    |       PUT       |    -     |
|  user_Nick  |     String      |    -     |
| user_Driver |     String      |    -     |
| user_Phone  |     String      |    -     |
| user_Email  |     String      |    -     |
|   user_Pw   |     String      |    -     |

</details>

<details>
<summary>Response</summary>

|   TAG   |  value  |   note    |
| :-----: | :-----: | :-------: |
| success | boolean |     -     |
|   err   | String  | err state |

</details>

---

### 4. 회원 탈퇴 ( delete )

##### 회원 탈퇴와 동시에 쿠키데이터 삭제가 진행된다.

<details>
<summary>Request</summary>

|   TAG   |      value      | required |
| :-----: | :-------------: | :------: |
| API URL | /api/auth/user/ |    -     |
| Method  |     DELETE      |    -     |
| user_Pw |     String      |    v     |

</details>

<details>
<summary>Response</summary>

|   TAG   |  value  |   note    |
| :-----: | :-----: | :-------: |
| success | boolean |     -     |
|   err   | String  | err state |

</details>

---

### 5. 로그아웃 ( get )

##### 로그아웃의 실패는 accessToken이 검증실패가 원인이다.

<details>
<summary>Request</summary>

|   TAG   |         value         | required |
| :-----: | :-------------------: | :------: |
| API URL | /api/auth/user/logout |    -     |
| Method  |          GET          |    -     |

</details>

<details>
<summary>Response</summary>

|   TAG   |  value  |   note    |
| :-----: | :-----: | :-------: |
| success | boolean |     -     |
|   err   | String  | err state |

</details>

---

### 5. 닉네임 중복 확인 ( get )

<details>
<summary>Request</summary>

|   TAG   |           value           | required |
| :-----: | :-----------------------: | :------: |
| API URL | /api/auth/user/check/nick |    -     |
|  query  |         user_Nick         |    v     |
| Method  |            GET            |    -     |

###### 요청 url의 최종 형태는 다음과 같다.

```
https://도메인/api/auth/user/check/nick?user_Nick=확인할닉네임
```

</details>

<details>
<summary>Response</summary>

|   TAG   |  value  |   note   |
| :-----: | :-----: | :------: |
| success | boolean |    -     |
| isUsing | boolean | 사용여부 |

</details>
