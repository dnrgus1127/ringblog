# RingBlog : 나만의 블로그

블로그 사이트를 구현해보고 기존의 사이트에서 추가되었으면 하는 기능들을 구현해본 블로그 프로젝트 입니다. 프로젝트 시작 당시 주로 사용하던 블로그인 벨로그를 참고하여 포스트 구독, 시리즈 구독, 댓글 모아보기, 폰트 및 글꼴 설정 기능들을 구현해본 프로젝트입니다. 

> 개발기간 : 2023.03 ~2023.05

## 기술 스택
## Languages, Libraries, Frameworks
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=javascript&logoColor=white">
<img src="https://img.shields.io/badge/react query-FF4154?style=for-the-badge&logo=javascript&logoColor=white">
<img src="https://img.shields.io/badge/styled component-DB7093?style=for-the-badge&logo=javascript&logoColor=white">

## Environment
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
<img src="https://img.shields.io/badge/visual studio code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">



## 프로젝트 후기
리액트를 공부하기 시작하며 제작한 토이 프로젝트로 리액트의 훅(useEffect나 메모이제이션에 대한 이해 부족)이나 컴포넌트 분리에 미흡하지만 프로젝트를 진행하며 다음과 같은 경험을 쌓을 수 있었습니다.

### Fetch API(비동기 통신)과 RTK(Tanstack) Query(HTTP 요청 캐싱)
  - useInfiniteQuery를 이용한 무한 스크롤 구현 (+ throttle과 debouce의 사용 )
  - useQuries를 이용한 병렬 쿼리로 시리즈 로딩 지연시간 단축
  - staleTime과 cacheTime을 이용한 API 요청 횟수 최적화
### Styled-component를 이용한 CSS-in-JS
  - styled-component의 themeProvider를 이용한 다크모드 구현
  - 동적 스타일링을 이용하여 상황에 맞는 CSS 적용
  - 데이터 요청과 컴포넌트 레이아웃을 분리하여 컴포넌트 재사용성 증가
### React-Markdown을 이용한 마크다운 파싱 및 
  - remark와 remark-gfm을 이용하여 마크다운 파싱을 이용한 포스트 작성 기능 구현
  - syntax-highliter를 이용하여 코드 스타일링 적용
  - 마크다운을 파싱하여 포스트 헤딩 태그 네비게이터 구현
### express.js로 백엔드를 구성하여 프론트와 백엔드 사이의 통신에 대해 경험
  - MySQL과 통신하여 포스트및 계정 정보 저장 기능 구현
  - REST API를 구현하여 포스트 및 유저 정보를 제공하는 기능 구현
    - HTTP 메소드와 REST API 대한 이해가 부족함이 많았음
  - OAUTH2를 이용하여 소셜 로그인 구현 및 세션을 이용한 로그인 상태 유지
### 기타
  - Redux를 이용하여 컴포넌트 분리에 의한 props drilling 해결과 상태관리 오동작 방지(개발자 실수 방지)
  - React Router를 이용하여 SPA에서의 경로 이동, 히스토리 기억 기능 추가






## 디렉터리 구조

```dir
├── README.md
├── package-lock.json
├── package.json
├── .gitignore
├── src
│   ├── component // 재사용 가능한 컴포넌트
│   ├── container // 데이터의 fetching, 로직과 관련된 컴포넌트
│   ├── Hooks // 커스텀 훅들
│   ├── images // assets
│   ├── lib // 공통으로 사용되는 함수들
│   ├── Pages // 페이지 컴포넌트
│   ├── store // redux state
│   ├── theme // 테마(다크, 라이트) 관련 폴더
│   ├── App.js
│   ├── index.js
└──
```
