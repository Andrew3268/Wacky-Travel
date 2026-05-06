# Wacky Travel SSR Blog

Wacky Travel은 독립적으로 운영되는 여행 제휴마케팅/애드센스 블로그입니다.  
Cloudflare Pages Functions + D1 + SSR + Edge Cache 구조로 여행지 허브, 호텔 목록, 호텔 상세, 일반 여행 글을 빠르게 출력하도록 구성되어 있습니다.

## 핵심 구조

```text
functions/
  post/[slug].js                  일반 여행 글 SSR
  destinations/[slug].js          여행지 허브 SSR
  hotels/[destination].js         여행지별 호텔 목록 SSR
  hotels/[destination]/[slug].js  호텔 상세 SSR
  api/                            관리자/글/여행지/호텔 API

lib/travel/
  travel-utils.js                 여행 공통 헤더/푸터/SEO head
  seo-jsonld.js                   JSON-LD 생성

db/
  schema.sql                      D1 기본 스키마
  seed.sql                        샘플 여행 데이터
```

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
/hotels/danang
/hotels/danang/wink-hotel-danang-centre
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
