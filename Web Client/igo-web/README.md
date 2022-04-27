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
