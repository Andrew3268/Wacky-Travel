-- 여행 노출 설정 관리 확장
-- 글 종류 / 나라 선택 항목을 관리자 화면에서 관리하기 위한 테이블입니다.
-- 도시 테이블(destinations)의 보조 컬럼은 런타임 ensureTravelSettingsTables()에서 안전하게 보강됩니다.

CREATE TABLE IF NOT EXISTS content_types (
  slug TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  description TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_content_types_sort_order ON content_types(sort_order ASC, label ASC);

CREATE TABLE IF NOT EXISTS countries (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_countries_sort_order ON countries(sort_order ASC, name ASC);


INSERT OR IGNORE INTO content_types (slug, label, description, sort_order, is_active, created_at, updated_at)
VALUES
  ('top5_series', '여행 스타일별 호텔 추천', '여행 스타일에 맞춰 호텔을 비교해볼 수 있는 추천 콘텐츠', 1, 1, datetime('now'), datetime('now')),
  ('hotel_intro', '추천 호텔 리뷰', '호텔 하나를 차분히 살펴보는 소개 콘텐츠', 2, 1, datetime('now'), datetime('now')),
  ('travel_tip', '여행이 쉬워지는 작은 팁', '여행 준비와 이동에 도움이 되는 작은 팁', 3, 1, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO countries (slug, name, sort_order, is_active, created_at, updated_at)
SELECT DISTINCT
  CASE TRIM(country)
    WHEN '베트남' THEN 'vietnam'
    WHEN '일본' THEN 'japan'
    WHEN '태국' THEN 'thailand'
    WHEN '대한민국' THEN 'korea'
    WHEN '한국' THEN 'korea'
    ELSE LOWER(REPLACE(TRIM(country), ' ', '-'))
  END AS slug,
  TRIM(country) AS name,
  100,
  1,
  datetime('now'),
  datetime('now')
FROM destinations
WHERE TRIM(COALESCE(country, '')) <> '';

INSERT OR IGNORE INTO countries (slug, name, sort_order, is_active, created_at, updated_at)
VALUES
  ('vietnam', '베트남', 1, 1, datetime('now'), datetime('now')),
  ('japan', '일본', 2, 1, datetime('now'), datetime('now')),
  ('thailand', '태국', 3, 1, datetime('now'), datetime('now'));
