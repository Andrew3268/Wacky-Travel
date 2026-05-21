-- 인덱스 여행지 허브 나라별 인기 도시 정렬 순서 관리
-- 실제 컬럼 보강은 lib/travel/travel-settings.js의 ensureTravelSettingsTables()에서
-- 중복 컬럼 오류를 안전하게 무시하는 방식으로 처리합니다.
-- 관련 컬럼: home_featured_order

CREATE INDEX IF NOT EXISTS idx_destinations_home_featured_country_order
ON destinations(country, home_featured, home_featured_order ASC, sort_order ASC, name ASC);
