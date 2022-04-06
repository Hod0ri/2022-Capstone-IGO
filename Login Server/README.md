<h1 align="center"> 🚗 I-GO(아이고) 로그인 서버</h1>

## 🖥️ Collabrator

<table align="center">
  <tr>
    <td align="center"><a href="https://github.com/SOPLAY"><img src="https://avatars.githubusercontent.com/u/40691745?v=4" width="100px;" alt="이미지"/><br /><sub><b>SOPLAY</b></sub></a><br />🌭Web -FullStack</td>
</table>

## mongodb env

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

## FilePath

```js
/*
/db                     # mongodb data
   |--- /data
/nginx                  # nginx conf files
   |--- /conf.d
/server
  |--- /src
        |--- /models    # mongodb models ( Schema )
        |--- /routes   
*/
```

## api

### 1. 회원가입 ( post )

|     TAG     |      value      | required |
| :---------: | :-------------: | :------: |
|   API URL   | /api/auth/user/ |    -     |
|   Method    |      POST       |    -     |
|   user_ID   |     String      |    v     |
|  user_Nick  |     String      |    v     |
|  user_Name  |     String      |    v     |
| user_Driver |     String      |    v     |
| user_Phone  |     String      |    v     |
| user_Email  |     String      |    v     |
|   user_Pw   |     String      |    v     |

---

### 2. 로그인 ( get )

|   TAG   |      value      | required |
| :-----: | :-------------: | :------: |
| API URL | /api/auth/user/ |    -     |
| Method  |      POST       |    -     |
| user_ID |     String      |    v     |
| user_Pw |     String      |    v     |

---

### 3. 회원 수정 ( put )

|     TAG     |      value      | required |
| :---------: | :-------------: | :------: |
|   API URL   | /api/auth/user/ |    -     |
|   Method    |       PUT       |    -     |
|  user_Nick  |     String      |    -     |
| user_Driver |     String      |    -     |
| user_Phone  |     String      |    -     |
| user_Email  |     String      |    -     |
|   user_Pw   |     String      |    -     |

---

### 4. 회원 탈퇴 ( delete )

|   TAG   |      value      | required |
| :-----: | :-------------: | :------: |
| API URL | /api/auth/user/ |    -     |
| Method  |     DELETE      |    -     |
| user_Pw |     String      |    v     |

---

### 5. 로그아웃 ( get )

|   TAG   |         value         | required |
| :-----: | :-------------------: | :------: |
| API URL | /api/auth/user/logout |    -     |
| Method  |          GET          |    -     |
