<h1 align="center"> π I-GO(μμ΄κ³ ) λ‘κ·ΈμΈ μλ²</h1>

## π₯οΈ Collabrator

<table align="center">
  <tr>
    <td align="center"><a href="https://github.com/SOPLAY"><img src="https://avatars.githubusercontent.com/u/40691745?v=4" width="100px;" alt="μ΄λ―Έμ§"/><br /><sub><b>SOPLAY</b></sub></a><br />π­Web -FullStack</td>
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

#### ssl μΈμ¦μ

> nginx μ ssl μΈμ¦μλ nginx/ssl ν΄λ μμ igo.pem, igo.key νμΌμ μμΉ μν¨λ€.

</details>

### mongoDB

<details>

### mongodb env

|          envName           | defaultValue |
| :------------------------: | :----------: |
| MONGO_INITDB_ROOT_USERNAME |     root     |
| MONGO_INITDB_ROOT_PASSWORD |     root     |
|             TZ             |  Asia/Seoul  |

#### compass μ μ μ£Όμ

###### `url = mongodb://USERNAME:PASSWORD@mongodbUrl:port/`

```
mongodb://root:root@localhost:27017/
```

</br>

#### mongoose μ μ μ£Όμ

```
mongodb://root:root@localhost:27017/loginService?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false
```

</details>

## api

### 1. νμκ°μ ( post )

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

### 1-2. λλ€μ μ€λ³΅ νμΈ ( get )

<details>
<summary>Request</summary>

|   TAG   |           value           | required |
| :-----: | :-----------------------: | :------: |
| API URL | /api/auth/user/check/nick |    -     |
|  query  |         user_Nick         |    v     |
| Method  |            GET            |    -     |

###### μμ²­ urlμ μ΅μ’ ννλ λ€μκ³Ό κ°λ€.

```
https://λλ©μΈ/api/auth/user/check/nick?user_Nick=νμΈν λλ€μ
```

</details>

<details>
<summary>Response</summary>

|   TAG   |  value  |   note   |
| :-----: | :-----: | :------: |
| success | boolean |    -     |
| isUsing | boolean | μ¬μ©μ¬λΆ |

</details>

---

### 2. λ‘κ·ΈμΈ ( get )

> ##### case 1. μ΅μ΄ λ‘κ·ΈμΈ μμ²­

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

> ##### case 2. accessToken κ°±μ 

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

### 3. νμ μμ  ( put )

##### λ§μ½ νμ μμ μ΄ μ΄λ€μ§λ€λ©΄ accessTokenμ μ¬λ°κΈ λ°μμ μ λ³΄λ₯Ό μ΅μ ν ν΄μΌνλ€.

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

### 4. νμ νν΄ ( delete )

##### νμ νν΄μ λμμ μΏ ν€λ°μ΄ν° μ­μ κ° μ§νλλ€.

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

### 5. λ‘κ·Έμμ ( get )

##### λ‘κ·Έμμμ μ€ν¨λ accessTokenμ΄ κ²μ¦μ€ν¨κ° μμΈμ΄λ€.

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
