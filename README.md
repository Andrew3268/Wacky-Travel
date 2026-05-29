# Wacky Travel SSR Blog

Wacky Travel은 독립적으로 운영되는 여행 제휴마케팅/애드센스 블로그입니다.  
Cloudflare Pages Functions + D1 + SSR + Edge Cache 구조로 여행지 허브, 호텔 추천 글, 일반 여행 글을 빠르게 출력하도록 구성되어 있습니다.

## 핵심 구조

```text
functions/
  post/[slug].js                  일반 여행 글 SSR
  destinations/[slug].js          여행지 허브 SSR
  api/                            관리자/글/여행지 설정 API

lib/travel/
  travel-utils.js                 여행 공통 헤더/푸터/SEO head
  seo-jsonld.js                   JSON-LD 생성

db/
  schema.sql                      D1 기본 스키마
  seed.sql                        샘플 여행 데이터
```

## V24 변경 요약

- 도시 상세 페이지에서 `top5_series`, `hotel_intro`, `hotel_roundup`, `hotel_review` 글은 호텔 추천 카드 영역에만 카드형으로 노출됩니다.
- 일반 여행 팁 글은 기존처럼 `travel-list__item` 리스트형으로 유지됩니다.
- 여행 스타일별 호텔 추천 글의 `destination_slug`가 비어 있어도 제목, 요약, 태그, 카테고리에 도시명이 포함되면 해당 도시 페이지 호텔 추천 카드에 보완 노출됩니다.
- 글 대표 이미지 수정 후 도시 페이지와 글 상세 페이지에 즉시 반영되도록 글 수정일 기반 캐시 키와 이미지 버전 파라미터를 적용했습니다.

## V28 변경 요약

- 도시 상세 페이지 호텔 탭의 초기 SSR 노출 개수를 3개로 조정했습니다.
- 더보기 클릭 시 각 탭에서 최대 3개씩만 추가 로드되도록 조정했습니다.
- V27 테스트용 후쿠오카 더미 데이터 마이그레이션과 seed 반영분을 제거했습니다.

## Cloudflare D1 설정

```text
Cloudflare Pages 프로젝트명: wacky-travel
D1 데이터베이스명: wacky-travel-db
D1 바인딩명: TRAVEL_DB
```

`wrangler.toml` 예시:

```toml
name = "wacky-travel"
compatibility_date = "2026-03-25"
pages_build_output_dir = "public"

[[d1_databases]]
binding = "TRAVEL_DB"
database_name = "wacky-travel-db"
database_id = "YOUR_D1_DATABASE_ID"
```

## 실행 명령어

```bash
npm install
npm run dev
```

원격 D1에 테이블과 샘플 데이터를 넣을 때:

```bash
npx wrangler d1 execute wacky-travel-db --remote --file=./db/schema.sql
npx wrangler d1 execute wacky-travel-db --remote --file=./db/seed.sql
```

## 배포 설정

Cloudflare Pages에서 GitHub 저장소를 연결한 뒤 아래처럼 설정합니다.

```text
Framework preset: None
Build command: 비워두기
Build output directory: public
D1 binding name: TRAVEL_DB
D1 database: wacky-travel-db
```

## 확인 URL

```text
/
/destinations/danang
/post/danang-hotel-location-guide
/sitemap.xml
```

## 운영 전 수정할 값

- `wrangler.toml`의 `database_id`
- `db/seed.sql`의 제휴 링크 `YOUR_CID`, `YOUR_ID`
- 실제 도메인을 연결한 뒤 `functions/post/[slug].js`, `functions/sitemap.xml.js`, `public/robots.txt`의 기본 도메인

## 주의

- 이 프로젝트의 D1 바인딩은 `TRAVEL_DB`입니다.
- 이 프로젝트의 데이터베이스 바인딩 이름은 반드시 `TRAVEL_DB`로 유지하세요.
- `node_modules`는 압축파일과 GitHub에 올리지 않습니다. `npm install`로 다시 설치합니다.
