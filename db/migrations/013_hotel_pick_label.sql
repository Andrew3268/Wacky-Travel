-- 추천 호텔 리뷰의 카드/본문 픽 라벨
ALTER TABLE posts ADD COLUMN hotel_pick_label TEXT DEFAULT '';
