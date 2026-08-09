-- 추천 호텔 리뷰 메인 이미지 아래 핵심 포인트 요약
ALTER TABLE hotels ADD COLUMN key_points_json TEXT DEFAULT '[]';
