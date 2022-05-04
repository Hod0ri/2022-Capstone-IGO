<h1 align="center"> 🚗 I-GO(아이고) 웹 클라이언트 </h1>

## 🖥️ Collabrator

<table>
  <tr>
    <td align="center"><a href="https://github.com/SOPLAY"><img src="https://avatars.githubusercontent.com/u/40691745?v=4" width="100px;" alt="이미지"/><br /><sub><b>SOPLAY</b></sub></a><br />🌭Web -FullStack</td>
    <td align="center"><a href="https://github.com/UBamtol"><img src="https://avatars.githubusercontent.com/u/98325285?v=4" width="100px;" alt="이미지"/><br /><sub><b>UBamtol</b></sub></a><br />🦄Front-End</td>
    <td align="center"><a href="https://github.com/Mallang-Mallang"><img src="https://avatars.githubusercontent.com/u/70959328?v=4" width="100px;" alt=""/><br /><sub><b>Mallang-Mallang</b></sub></a><br />🦄Front-End</td>
    <td align="center"><a href="https://github.com/sayeeeo"><img src="https://avatars.githubusercontent.com/u/93313508?v=4" width="100px;" alt=""/><br /><sub><b>sayeeeo</b></sub></a><br />🖼️UI/UX</td>
  </tr>
</table>

## Front-end stack

- react
- next ( with React-dom )
- recoil
- styled-components
- axios
- swr

## Folder path

```js
./core
    |- /components
    |- /hooks
    |- /atoms

./pages     //라우트할 파일

./styles    //글로벌 스타일 정의

./ssl       //인증서

./public

```

## Convention

1. html 태그가 들어간 .js 는 .jsx 확장자로 작성
2. 모든 components 는 React Arrow Function Component 로 작성한다.
3. components 경우 중첩 컨포넌트의 경우 폴더 내의 index.js에 통합
4. components 의 파일명은 UpperCamelCase로 작성

## Before Starting

### ssl ( https 개발환경 )

```
ssl폴더에 도메인.key, 도메인.crt 파일 복사
```

### 의존성 패키지 설치

```
yarn
```

### 개발 서버 시작

```
yarn dev
```
