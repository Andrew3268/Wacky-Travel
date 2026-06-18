# Wacky Travel

- v11: 오사카·도쿄·삿포로·오키나와 hotel-location-survey 결과 정확도 보정 로직 추가 및 결과 문구 일부 개선. SSR Blog

Wacky Travel은 독립적으로 운영되는 여행 제휴마케팅/애드센스 블로그입니다.  
Cloudflare Pages Functions + D1 + SSR + Edge Cache 구조로 여행지 허브, 호텔 추천 글, 일반 여행 글을 빠르게 출력하도록 구성되어 있습니다.


## wackytravel-v1.12 변경 요약

- 일본 5개 도시 메인 index 페이지 Area Guide에서 `wt-city-area-panel__eyebrow`와 `wt-city-area-panel__decision span`의 좌우 패딩을 0으로 조정했습니다.
- 데스크탑에서 Area Guide의 정보 그리드와 한 줄 판단 영역 사이, 한 줄 판단 영역 하단 간격을 줄였습니다.
- 압축파일에는 `README.md` 외 별도 Markdown 문서를 포함하지 않도록 정리했습니다.

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

## V29 변경 요약

- index 메인 페이지에서 `여행 스타일별 호텔 추천` 섹션은 `top5_series` 글이 1개 이상 있을 때만 노출되도록 변경했습니다.
- index 메인 페이지에서 `최신 여행 글` 섹션은 최신 글 데이터가 1개 이상 있을 때만 노출되도록 변경했습니다.
- 글이 없을 때 기존에 보이던 빈 안내 카드 대신 섹션 내부 콘텐츠를 비우고 섹션 전체를 숨기도록 조정했습니다.
- 숨겨진 섹션으로 이동하는 상단 메뉴/히어로 CTA도 글 존재 여부에 맞춰 함께 노출되도록 보완했습니다.

## V30 변경 요약

- `/countries/나라` 페이지의 `최근 업데이트된 나라 여행 관련 글` 영역에서 콘텐츠가 없는 `travel-content-section`은 렌더링되지 않도록 변경했습니다.
- 나라 페이지의 `top5_series`, `hotel_intro`, `travel_tip` 하위 섹션은 각 분류에 글이 1개 이상 있을 때만 노출됩니다.
- 세 분류 모두 글이 없을 경우 `최근 업데이트된 나라 여행 관련 글` 부모 섹션까지 함께 숨겨 빈 영역이 남지 않도록 보완했습니다.

## V31 변경 요약

- `/destinations/도시` 페이지의 `hotel-tabs__nav` 버튼은 연결된 글이 1개 이상 있는 분류만 출력되도록 변경했습니다.
- `top5_series` 글이 없으면 `여행 스타일별 호텔 추천` 탭 버튼과 패널이 렌더링되지 않습니다.
- `hotel_intro` 글이 없으면 `추천 호텔 리뷰` 탭 버튼과 패널이 렌더링되지 않습니다.
- 두 호텔 분류가 모두 비어 있을 경우 `호텔 추천` 섹션 전체가 숨겨져 빈 탭 영역이 남지 않도록 보완했습니다.
- `/destinations/도시` 페이지의 `도시명 여행 콘텐츠` 섹션은 일반 여행 콘텐츠가 1개 이상 있을 때만 노출되도록 변경했습니다.
- 여행 콘텐츠가 없을 때 기존 빈 안내 카드가 보이지 않도록 제거했습니다.

## V32 변경 요약

- `add.html`과 `edit.html`의 `호텔 히어로 정보` 입력 섹션은 글 종류가 `추천 호텔 리뷰`(`hotel_intro`)일 때만 노출되도록 변경했습니다.
- 글 종류가 `여행 스타일별 호텔 추천` 또는 `여행이 쉬워지는 작은 팁` 등 다른 값일 때는 `card editor-option-card editor-hotel-hero-card` 섹션이 화면에 표시되지 않습니다.
- 데이터 로딩 전에도 호텔 히어로 섹션이 잠깐 보이지 않도록 초기 HTML에 `hidden` 처리를 추가했습니다.
- 비호텔 글로 저장할 때는 호텔 히어로 연결값이 저장 payload에 남지 않도록 정리했습니다.
- 미리보기에서도 `추천 호텔 리뷰` 글이 아닐 경우 호텔 히어로 패널이 표시되지 않도록 맞췄습니다.

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
