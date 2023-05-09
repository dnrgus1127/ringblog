# RingBlog

velog처럼 마크다운을 이용해서 게시글을 작성하고 기록할 수 있는 블로그 서비스

## 개발 목적

- React에 대한 숙련도 상승
- Express.js 서버를 이용한 crud 기능 구현 경험

> 개발기간 : 2023.01 ~2023.06

## 프로젝트 소개

## 화면 구성

## 주요 기능

## 디렉터리 구조

```
├── README.md
├── package-lock.json
├── package.json
├── strapi-backend :
│   ├── README.md
│   ├── api : db model, api 관련 정보 폴더
│   │   ├── about
│   │   ├── course
│   │   └── lecture
│   ├── config : 서버, 데이터베이스 관련 정보 폴더
│   │   ├── database.js
│   │   ├── env : 배포 환경(NODE_ENV = production) 일 때 설정 정보 폴더
│   │   ├── functions : 프로젝트에서 실행되는 함수 관련 정보 폴더
│   │   └── server.js
│   ├── extensions
│   │   └── users-permissions : 권한 정보
│   ├── favicon.ico
│   ├── package-lock.json
│   ├── package.json
│   └── public
│       ├── robots.txt
│       └── uploads : 강의 별 사진
└── voluntain-app : 프론트엔드
```
