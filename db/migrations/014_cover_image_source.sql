-- 대표 이미지 출처 및 아고다 이미지 메타데이터
ALTER TABLE posts ADD COLUMN cover_image_source TEXT DEFAULT 'r2';
ALTER TABLE posts ADD COLUMN cover_image_link_url TEXT DEFAULT '';
ALTER TABLE posts ADD COLUMN cover_image_srcset TEXT DEFAULT '';
