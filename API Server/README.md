<h1 align="center"> ๐ I-GO(์์ด๊ณ ) ์น ํด๋ผ์ด์ธํธ </h1>

## ๐ฅ๏ธ Collabrator

<table>
  <tr>
    <td align="center"><a href="https://github.com/hod0ri"><img src="https://avatars.githubusercontent.com/u/65306839?v=4" width="100px;" alt="์ด๋ฏธ์ง"/><br /><sub><b>hod0ri</b></sub></a><br />๐ฟAPI Server</td>
    <td align="center"><a href="https://github.com/9u4a"><img src="https://avatars.githubusercontent.com/u/81855010?v=4" width="100px;" alt=""/><br /><sub><b>9u4a</b></sub></a><br />๐ฟAPI Server</td>
  </tr>
</table>

## Back-end stack

- Django (Python 3.9)
- Postgresql

## Folder path

```py
./API Server
    |- /igoAPI                # ํ๋ก์ ํธ ๋ฃจํธ ๋๋ ํฐ๋ฆฌ
    |- /Api                   # API ์๋ฒ
        |- /Documentation     # API Swagger ๋ฌธ์ ๋๋ ํฐ๋ฆฌ
        |- /Validations       # ๋ด๋ถ ์ธ์ฆ ๋ฉ์๋
        |- /Views             # API View ๋ชจ๋ํ
```

## Convention

1. ๋ณ์ ๋ฐ ๋ฉ์๋๋ช์ CamelCase๋ฅผ ์ฌ์ฉํ๋ค.
2. ๊ฐ ๋ชจ๋ธ์ Attribute๋ Snake_Case๋ฅผ ์ฌ์ฉํ๋ค.
3. ๊ธธ์ด์ง๋ ์ฝ๋์ ๋ํด์๋ ๋ชจ๋๋ก ๋๋์ด์ ๊ด๋ฆฌํ๋ค.

## Django

### Django Setting

|    Env Setting    |                                                  value                                                   |
| :---------------: | :------------------------------------------------------------------------------------------------------: |
|  DATABASE_ENGINE  |                                      django.db.backends.postgresql                                       |
|   DATABASE_NAME   |                                                 igoData                                                  |
|   DATABASE_USER   |                                              postgres(root)                                              |
| DATABASE_PASSWORD |                                                   1234                                                   |
|     TIME_ZONE     |                                                Asia/Seoul                                                |
|      Library      | [Require-Libraries](https://github.com/Hod0ri/2022-Capstone-IGO/blob/main/API%20Server/requirements.txt) |

## API Information (Git Document)

---

### ๐ ํ์ ์ฒ๋ฆฌ (/user)

<details>
<summary>1. ํ์ ๊ฐ์ (POST)</summary>

### Request Form

|     TAG     |  value  | required |
| :---------: | :-----: | :------: |
|   API URL   |  /user  |    -     |
|   Method    |  POST   |    -     |
|   user_Id   | String  |    โ๏ธ    |
|  user_Nick  | String  |    โ๏ธ    |
|  user_Name  | String  |    โ๏ธ    |
| user_Driver | Boolean |    โ๏ธ    |
| user_Phone  | String  |    โ๏ธ    |
| user_Email  | String  |    โ๏ธ    |

### Response Form

|   TAG   | value  |         Example          |
| :-----: | :----: | :----------------------: |
| success | String |          false           |
|   err   | String |      user_Nick error     |

</details>

<details>
<summary>2. ๋ก๊ทธ์ธ (GET)</summary>

### Request Form

|       TAG        | value  | required |
| :--------------: | :----: | :------: |
|     API URL      | /user  |    -     |
|      Method      |  GET   |    -     |
| token (inCookie) | String |    โ๏ธ    |

### Response Form

|    TAG    | value  |          Example           |
| :-------: | :----: | :------------------------: |
|  success  | String |           true             |
| user_Nick | String |            junseong        |
|   err     | String | '' |

</details>
<details>
<summary>3. ํ์ ์ ๋ณด ์์  (PUT)</summary>

### Request Form

|       TAG        |  value  | required |
| :--------------: | :-----: | :------: |
|     API URL      |  /user  |    -     |
|      Method      |  PUT   |    -     |
| token (inCookie) | String  |    โ๏ธ    |
|    user_Nick     | String  |    โ๏ธ    |
|   user_Driver    | Boolean |    โ๏ธ    |
|    user_Phone    | String  |    โ๏ธ    |
|    user_Email    | String  |    โ๏ธ    |

### Response Form

|   TAG   | value  |          Example          |
| :-----: | :----: | :-----------------------: |
| success | String |           true           |
|   err   | String |  ''                  |

</details>
<details>
<summary>4. ํ์ ํํด (DELETE)</summary>

### Request Form

|       TAG        | value  | required |
| :--------------: | :----: | :------: |
|     API URL      | /user  |    -     |
|      Method      |  DELETE|    -     |
| token (inCookie) | String |    โ๏ธ   |

### Response Form

|   TAG   | value  | Example |
| :-----: | :----: | :-----: |
| success | String |  true   |
| err  | String |   ''    |

</details>
<details>
<summary>5. ์์ด๋ ์ฐพ๊ธฐ (GET)</summary>

### Request Form

|    TAG     | value  | required |
| :--------: | :----: | :------: |
|  API URL   |  /ems  |    -     |
|   Method   |  GET   |    -     |
| user_Name  | String |    โ๏ธ    |
| user_Email | String |    โ๏ธ    |
| user_Phone | String |    โ๏ธ    |

### Response Form

|   TAG   | value  | Example |
| :-----: | :----: | :-----: |
| success | String |  true   |
| user_Id | String |  user1  |
| errMsg  | String |   ''    |

</details>

<br />

### ๐ธ ํฌ์ธํธ ์ฒ๋ฆฌ (/point)

<details>
<summary>1. ํฌ์ธํธ ๋ณ๋ (POST)</summary>

### Request Form

|       TAG        |  value   | required |
| :--------------: | :------: | :------: |
|     API URL      |  /point  |    -     |
|      Method      |   POST   |    -     |
| token (inCookie) |  String  |    โ๏ธ    |
|    pot_Change    | Integer  |    โ๏ธ    |
|    pot_Reason    |  String  |    โ๏ธ    |

### Response Form

|   TAG   |  value  | Example |
| :-----: | :-----: | :-----: |
| success | String  |  true   |
| result  | Integer |  3000   |
|   err   | String  |   ''    |

</details>

<details>
<summary>2. ํฌ์ธํธ ๋ก๊ทธ ์กฐํ (GET)</summary>

### Request Form

|       TAG        | value  | required |
| :--------------: | :----: | :------: |
|     API URL      | /point |    -     |
|      Method      |  GET   |    -     |
| token (inCookie) | String |    โ๏ธ    |

### Response Form

|   TAG   | value  | Example |
| :-----: | :----: | :-----: |
| success | String |  true   |
| result  |  Json  |  All log |
|   err   | String |   ''    |

### Log Form

|    TAG     |  value   |       Example        |
| :--------: | :------: | :------------------: |
|  pot_Date  | datetime | 2022-05-27T09:31:00Z |
| pot_Reason |  String  |         add          |
| pot_Change | Integer  |        10000         |
| pot_Amount | Integer  |        30000         |

</details>
<br />

### ๐ฉ ์ ๊ณ  ์ฒ๋ฆฌ (/issue)

<details>
<summary>1. ์ ๊ณ  ๋ฑ๋ก (POST)</summary>

### Request Form

|       TAG        | value  | required |
| :--------------: | :----: | :------: |
|     API URL      | /issue |    -     |
|      Method      |  POST  |    -     |
| token (inCookie) | String |    โ๏ธ    |
|    ns_Target     | String |    โ๏ธ    |
|    ns_Reason     | String |    โ๏ธ    |
|      ns_Etc      | String |    โ๏ธ    |

### Response Form

|   TAG   | value  | Example |
| :-----: | :----: | :-----: |
| success | String |  true   |
|   err   | String |   ''    |

</details>

<details>
<summary>2. ์ ๊ณ  ์กฐํ (GET)</summary>

### Request Form

|       TAG        | value  | required |
| :--------------: | :----: | :------: |
|     API URL      | /issue |    -     |
|      Method      |  GET   |    -     |
| token (inCookie) | String |    โ๏ธ    |

### Response Form

|   TAG   | value  | Example |
| :-----: | :----: | :-----: |
| success | String |  true   |
| result  |  Json  | All Log |
|   err   | String |   ''    |

### Log Form

|    TAG    |  value   |       Example        |
| :-------: | :------: | :------------------: |
|  ns_Date  | datetime | 2022-05-27T09:58:00Z |
| ns_Target |  String  |        user2         |
| ns_Reason |  String  |         ๋ธ์ผ         |
|  ns_Etc   |  String  |          ''          |
| ns_Status |  String  |      ์ ์ ๋๊ธฐ       |

</details>
<br />

### ๐ ๋งค์นญ ๊ด๋ฆฌ (/matchlog)

<details>
<summary>1. ๋งค์นญ ๋ฑ๋ก (POST)</summary>

## user = ์ด์ ์

### Request Form

|       TAG        |   value   | required |
| :--------------: | :-------: | :------: |
|     API URL      | /matchlog |    -     |
|      Method      |   POST    |    -     |
| token (inCookie) |  String   |    โ๏ธ    |
|    mc_Arrive     |  String   |    โ๏ธ    |
|  mc_ArriveTime   |   Time    |    โ๏ธ    |
|     mc_Goal      |  String   |          |
|     mc_Price     |  Integer  |    โ๏ธ    |
|     mc_Desc      |  String   |          |
|     mc_Match     |  Boolean  |    โ๏ธ   |
|     mc_Count     |  Integer  |          |

### Response Form

|   TAG   | value  | Example |
| :-----: | :----: | :-----: |
| success | String |  true   |
|   err   | String |   ''    |

<br />

## user = ํ์น์

### Request Form

|       TAG        |   value   | required |
| :--------------: | :-------: | :------: |
|     API URL      | /matchlog |    -     |
|      Method      |   POST    |    -     |
| token (inCookie) |  String   |    โ๏ธ    |
|    mm_Driver     |  String   |    โ๏ธ    |
|    mm_ArriveTime  |   Time   |    โ๏ธ   |
|    mm_Arrive     |  String   |    โ๏ธ    |
|     mm_Goal      |  String   |          |
|     mm_Match     |  Boolean  |    โ๏ธ    |

### Response Form

|   TAG   | value  | Example |
| :-----: | :----: | :-----: |
| success | String |  true   |
|   err   | String |   ''    |

</details>
<details>
<summary>2. ๋งค์นญ ์กฐํ (GET)</summary>

### Request Form

|       TAG        |   value   | required |
| :--------------: | :-------: | :------: |
|     API URL      | /matchlog |    -     |
|      Method      |    GET    |    -     |
| token (inCookie) |  String   |    โ๏ธ    |

### Response Form

|   TAG   | value  | Example |
| :-----: | :----: | :-----: |
| success | String |  true   |
|  data   |  Json  | All Log |
|   err   | String |   ''    |

### Log Form(user = ์ด์ ์)

|      TAG      |  value  |     Example      |
| :-----------: | :-----: | :--------------: |
|   mc_Driver   | String  |      user1       |
|   mc_Arrive   | String  |     ๋ธ๋์ง์ญ     |
| mc_ArriveTime |  Time   | 2022-05-30 10:00 |
|    mc_Goal    | String  |      ๋๋ฆผ๋      |
|   mc_Price    | Integer |       3000       |
|    mc_Desc    | String  |                  |
|   mc_Match    | Boolean |      false       |
|   mc_Count    | Integer |        4         |

### Log Form(user = ํ์น์)

|    TAG    |  value  |     Example      |
| :-------: | :-----: | :--------------: |
| mm_Driver | String  |      user1       |
| mm_Member | String  |      user2       |
| mm_ArriveTime |  Time   | 2022-05-30 10:10 |
| mm_Arrive | String  |     ๋ณด๋ผ๋งค์ญ     |
|  mm_Goal  | String  |      ๋๋ฆผ๋      |
| mm_Match  | Boolean |      false       |

</details>
<details>

<summary>3. ๋งค์นญ ์์  (PUT)</summary>

## user = ์ด์ ์

### Request Form

|       TAG        |   value   | required |
| :--------------: | :-------: | :------: |
|     API URL      | /matchlog |    -     |
|      Method      |    PUT    |    -     |
| token (inCookie) |  String   |    โ๏ธ    |
|    mc_Arrive     |  String   |    โ๏ธ    |
|  mc_ArriveTime   |   Time    |    โ๏ธ    |
|     mc_Goal      |  String   |          |
|     mc_Price     |  Integer  |    โ๏ธ    |
|     mc_Desc      |  String   |          |
|     mc_Match     |  Boolean  |          |
|     mc_Count     |  Integer  |          |

### Response Form

|   TAG   | value  | Example |
| :-----: | :----: | :-----: |
| success | String |  true   |
|   err   | String |   ''    |

<br>

## user = ํ์น์

### Request Form

|       TAG        |   value   | required |
| :--------------: | :-------: | :------: |
|     API URL      | /matchlog |    -     |
|      Method      |    PUT    |    -     |
| token (inCookie) |  String   |    โ๏ธ    |
|    mm_Driver     |  String   |    โ๏ธ    |
|    mm_ArriveTime     |   Time    |    โ๏ธ    |
|    mm_Arrive     |  String   |    โ๏ธ    |
|     mm_Goal      |  String   |          |
|     mm_Match     |  Boolean  |          |

### Response Form

|   TAG   | value  | Example |
| :-----: | :----: | :-----: |
| success | String |  true   |
|   err   | String |   ''    |

</details>
<details>

<summary>4. ๋งค์นญ ์ญ์  (DELETE)</summary>

### Request Form

|       TAG        |   value   | required |
| :--------------: | :-------: | :------: |
|     API URL      | /matchlog |    -     |
|      Method      |  DELETE   |    -     |
| token (inCookie) |  String   |    โ๏ธ    |

### Response Form

|   TAG   | value  | Example |
| :-----: | :----: | :-----: |
| success | String |  true   |
|   err   | String |   ''    |

</details>
<br />

### ๐ ๋งค์นญ ๊ด๋ฆฌ (/match)

<details>
<summary>1. ๋งค์นญ ๋ฑ๋ก (POST)</summary>

### Request Form

|       TAG        | value  | required |
| :--------------: | :----: | :------: |
|     API URL      | /match |    -     |
|      Method      |  POST  |    -     |
| token (inCookie) | String |    โ๏ธ    |

### Response Form

|   TAG   | value  | Example |
| :-----: | :----: | :-----: |
| success | String |  true   |
|   err   | String |   ''    |

</details>

<details>
<summary>2. ๋งค์นญ ์กฐํ (GET)</summary>

### Request Form

|       TAG        | value  | required |
| :--------------: | :----: | :------: |
|     API URL      | /match |    -     |
|      Method      |  GET   |    -     |
| token (inCookie) | String |    โ๏ธ    |

### Response Form

|   TAG   | value  | Example  |
| :-----: | :----: | :------: |
| success | String |   true   |
|  data   |  Json  | MatchLog |
|   err   | String |    ''    |

### Log Form(user = ์ด์ ์)

|    TAG    |  value  |     Example      |
| :-------: | :-----: | :--------------: |
| mm_Driver | String  |      user1 (user)      |
| mm_Member | String  |      user2       |
| mm_ArriveTime |  Time   | 2022-05-30 10:10 |
| mm_Arrive | String  |     ๋ณด๋ผ๋งค์ญ     |
|  mm_Goal  | String  |      ๋๋ฆผ๋      |
| mm_Match  | Boolean |       true       |

### Log Form(user = ํ์น์)

|    TAG    |  value  |     Example      |
| :-------: | :-----: | :--------------: |
| mm_Driver | String  |      user1       |
| mm_Member | String  |      user2(user)       |
| mm_ArriveTime |  Time   | 2022-05-30 10:10 |
| mm_Arrive | String  |     ๋ณด๋ผ๋งค์ญ     |
|  mm_Goal  | String  |      ๋๋ฆผ๋      |
| mm_Match  | Boolean |       true       |

</details>
<br />

### ๐ ์ถ๋ฐ,๋์ฐฉ ์กฐํ (/search)

<details>
<summary>1. ์ถ๋ฐ,๋์ฐฉ ์กฐํ (GET)</summary>

### Request Form

|       TAG        |  value  | required |
| :--------------: | :-----: | :------: |
|     API URL      | /search |    -     |
|      Method      |   GET   |    -     |
| token (inCookie) | String  |    โ๏ธ    |
|   queryString(arrive)    | String  |    โ๏ธ    |

### Response Form

|   TAG   | value  | Example |
| :-----: | :----: | :-----: |
| success | String |  true   |
|   data   | String |   All log   |
|   err   | String |   ''    |

### Log Form

|    TAG    |  value  |     Example      |
| :-------: | :-----: | :--------------: |
|     mc_Driver     |  String   |          |
|    mc_Arrive     |  String   |    โ๏ธ    |
|  mc_ArriveTime   |   Time    |    โ๏ธ    |
|     mc_Goal      |  String   |          |
|     mc_Price     |  Integer  |    โ๏ธ    |
|     mc_Desc      |  String   |          |
|     mc_Count     |  Integer  |          |

</details>
