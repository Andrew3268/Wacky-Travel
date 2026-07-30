# 도시 Hotels Pick 초안 카드 표시 수정

## 반영 내용

- 관리자 로그인 상태의 `/destinations/도시/` Hotels Pick에서 발행 글과 초안 글을 함께 조회
- 초안 카드는 `초안` 배지를 표시
- 초안 카드 링크는 `/post/슬러그/?preview=1` 관리자 전용 미리보기 사용
- 일반 방문자는 기존처럼 Hotels Pick 관리자 섹션이 노출되지 않음
- 비로그인 상태에서 `include_drafts=1` API 요청 시 401 반환
- 공개 호텔 아카이브 및 사이트맵은 계속 발행 글만 조회
- Travel Contents에는 이번 변경을 적용하지 않음
- 15개 도시 메인 페이지의 JS/CSS 캐시 버전 갱신

## 주요 변경 파일

- `functions/api/destination-posts.js`
- `public/assets/js/posts.js`
- `public/assets/css/travel.css`
- `public/destinations/*/index.html` 15개

## 검증

- 비로그인 초안 API 접근 401 확인
- 공개 조회 SQL은 published 전용 확인
- 관리자 조회 SQL은 published + draft 확인
- 초안 카드 배지 및 preview 링크 확인
- 15개 도시 캐시 버전 반영 확인
- HTML 181개 SEO 검사 오류 0, 경고 0
- 인라인 스크립트 32개 통과
- JavaScript 78개 문법 검사 통과
- 정적 도시 라우팅 15개 통과
