-- 도시 카드와 도시 상세 hero 관리 필드 안내
-- SQLite/D1의 ALTER TABLE ADD COLUMN은 IF NOT EXISTS를 안정적으로 사용할 수 없어서,
-- 실제 컬럼 보강은 lib/travel/travel-settings.js의 ensureTravelSettingsTables()에서
-- 중복 컬럼 오류를 안전하게 무시하는 방식으로 처리합니다.
-- 관련 컬럼: card_title, card_description, card_image, card_image_alt,
-- hero_eyebrow, hero_title, hero_summary, hero_image, hero_image_alt

CREATE INDEX IF NOT EXISTS idx_destinations_country_sort ON destinations(country, sort_order ASC, name ASC);
