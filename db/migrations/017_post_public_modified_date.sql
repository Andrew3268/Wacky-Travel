-- 공개 페이지와 구조화 데이터에 사용할 콘텐츠 수정일을 내부 저장 시각과 분리합니다.

ALTER TABLE posts ADD COLUMN content_modified_at TEXT DEFAULT '';

UPDATE posts
SET content_modified_at = published_at
WHERE content_modified_at IS NULL OR TRIM(content_modified_at) = '';
