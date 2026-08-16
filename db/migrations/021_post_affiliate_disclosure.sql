-- Post 대표 이미지 아래에 표시할 제휴마케팅 안내 문구
ALTER TABLE posts ADD COLUMN affiliate_disclosure TEXT DEFAULT '';
