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
/src
  |--- models   # mongodb models ( Schema )
  |--- routes   
*/
```
