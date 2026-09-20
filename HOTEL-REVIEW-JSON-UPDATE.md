# Be Stayable 추천 호텔 리뷰 JSON 전환

## 적용 내용

- `추천 호텔 리뷰(hotel_intro)` 신규 글은 `hotel-review-v1.0` JSON 파일 업로드 방식으로 작성합니다.
- 일반 여행 글과 기존 추천 호텔 리뷰 Markdown 데이터는 기존 `content_md` SSR 경로를 그대로 유지합니다.
- JSON 추천 호텔 리뷰는 D1의 `content_json`을 서버에서 파싱해 완성 HTML로 SSR합니다. 브라우저에서 JSON을 fetch한 뒤 `innerHTML`로 본문을 만드는 방식이 아닙니다.
- 공개 페이지 디자인은 `hotel-review-json-mvp-room-review-pros-cons` MVP의 레이아웃/스타일을 기준으로 전용 CSS와 서버 렌더러에 이식했습니다.
- `article.featuredImage.src`가 비어 있으면 관리자에서 설정한 기존 대표 이미지를 사용합니다.
- 발행 상태, 도시/지역 연결, Travel by Mood, 호텔 픽 라벨, 예약·제휴 링크 등 운영용 메타데이터는 기존 DB 필드로 계속 관리합니다.

## 배포 순서

기존 원격 D1 DB에는 먼저 신규 컬럼을 추가한 뒤 Pages를 배포하는 순서를 권장합니다.

```bash
npm install
npm run d1:migrate:hotel-review-json:remote
npm run deploy
```

로컬 개발 DB에서 먼저 확인하려면:

```bash
npm install
npm run d1:migrate:hotel-review-json
npm run dev
```

## 신규 DB 컬럼

- `posts.content_format` : `markdown` 또는 `json`, 기본값 `markdown`
- `posts.content_json` : 호텔 리뷰 JSON 원본 문자열

기존 행은 기본값 `markdown`으로 유지되므로 기존 글을 변환할 필요가 없습니다.

## JSON 기준

현재 입력 기준 스키마는 다음과 같습니다.

```text
hotel-review-v1.0
```

지원 블록:

- paragraph
- paragraphRich
- subheading
- locationTable
- accessSummary
- insight
- reviewProsCons
- roomOptions
- fitGrid
- finalVerdict

관리자 업로드와 서버 저장 단계에서 모두 스키마를 검증합니다. 서버 검증이 최종 기준입니다.

## 테스트

```bash
npm run check:hotel-review-json
npm run check:hotel-review-json-ssr
npm run check:syntax
```

첨부된 `melia-vinpearl-danang-riverfront.hotel-review` 구조로 실제 검증했으며 `hotel-review-v1.0` 스키마와 지원 블록이 정상 통과합니다.
