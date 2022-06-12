# SOPLAY

### Role

- Project Management
- Implement Web Application
- Implement Login Server
- Deployment Environment Configuration
- Build CI/CD Pipeline
-

### To Done

카풀 공유 플랫폼에서 동작하는 Login API , Nginx ,Web-Page ,CI/CD 설계 및 구현을 했다.

모든 배포는 docker-compose를 통해 도커라이징 상태로 진행된다.

Ngnix WAS를 서버의 모든 통신의 맨 앞단에 두고 내부에서는 http 통신을 하지만 외부로 나갈때는 ssl 인증서와 reverse proxy를 통해 443 포트 요청만 ssl 인증서를 탑재하여 https 통신을 구현했다.

jwt with session cookie 인증 구현

### Mistake and Limit

로그인을 빠르게 구현하다 보니 jwt의 인증과정을 잘못 이해해서 accessToken은 cookie, refreshToken은 signedCookie에 넣었는데 알고보니 auth라는 헤더를 사용하여 처리 할 수 있다는 것을 마지막에 알아서 처리를 못했다.

로그인에 대한 인증과 인가 과정에서 커스텀 Hooks을 만들었는데 아직 Hooks에 대한 이해가 부족하다 => 커스텀Hook을 더욱 공부해야할거 같다.

KakaoNav REST API를 사용하는중 갑자기 클라이언트 사이드에서 동작이 막혔는데 공식 문서를 잘 보니 클라이언트 사이드에서는 사용하지 말라는 글을 읽지 못하고 클라이언트 사이드에서 구현을 한게 아쉬웠다.

Cookie의 경우 개발단계에서 사용하려면 도메인이 다르다면 Access-Control-Allow-Credentials CORS 오류가 발생 하는데 이를 생각을 못하고 구현을 했었다.

이 부분은 ajax요청 -> node 서버 에서 kakaoNav ajax요청 -> 응답값 return 의 형태로 해결했다.

Docker 작성중 경로상 공백으로 인한 오류를 헨들링하는데 너무 많은 시간을 소모 했다 -> 다음부트는 프로젝트 진행시 공백이 있을경우 초반에 수정하는 방향으로 진행을 해야 한다는걸 깨달았다.

docker-compose를 작성하면서 내부에 link를 줄 경우 외부로 port 를 export 하지 않아도 된다는 것을 마지막에 깨달았다.

마지막으로 처음으로 git action 을 사용한 CI/CD를 구현했는데 이과정에서 테스트가 불가능 해서 레포에 올리고 하는 방식으로 하다보니 시간이 소모가 많이 됬다.
물론 배포 과정에서 도커 허브를 사용하려 했으나 비공개 저장소는 유료과금 정책이 있어서 git action cloude에서 빌드 후 web 빌드 파일만 따로 서버로 scp를 통해 전송하는 로직을 구현했습니다.

### Retrospect

2번재로 진행한 캡스톤 프로젝트였다.
이번엔 진행하면서 UI/UX가 실 구현 기능과 맞지 않아서 생각보다 많은 시간이 소요되었습니다.
아직도 보면 UI가 아쉬운 부분이 많이있지만 그래도 구현을 하면서 부족한 부분을 깨닫고 이를 보환하면서 프로젝트를 진행했습니다.

이번에 구현을 하면서 http와 https의 관계와 통신상에서 이루어 지는 헤더에 대해 공부하고 인증의 과정은 생각보다 많은 방식이 있다는 것을 알게 되었습니다.

도커 + CI/CD를 하면서 느낀점이지만 도커라이징을 통한 비공개 저장소를 통한 CI/CD를 진행한다면 더욱 과정이 쉬워질것이라는 것을 느꼈습니다.

다만 Next.js를 기반으로 개발을 하다보니 이렇게 서버를 따로 두고 작성하는것은 Next.js를 제대로 활용하지 못하는 느낌을 받아서 다음번에 프로젝트를 할때는 Next.js + TypeScript + NextAuth + Prisma ORM 을 사용하여 프로젝트를 진행해 보려고 합니다.
