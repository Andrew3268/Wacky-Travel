-- 런타임 쿼리에서 status 컬럼을 직접 비교할 수 있도록 기존 값을 한 번 정규화합니다.

UPDATE posts
SET status = CASE
  WHEN LOWER(TRIM(REPLACE(REPLACE(REPLACE(REPLACE(COALESCE(status, ''), CHAR(9), ''), CHAR(10), ''), CHAR(13), ''), '　', '')))
       IN ('draft', 'private', '비공개', '초안', '임시저장', '임시 저장')
    THEN 'draft'
  ELSE 'published'
END;

UPDATE destinations
SET status = CASE
  WHEN LOWER(TRIM(REPLACE(REPLACE(REPLACE(REPLACE(COALESCE(status, ''), CHAR(9), ''), CHAR(10), ''), CHAR(13), ''), '　', '')))
       IN ('draft', 'private', '비공개', '초안', '임시저장', '임시 저장')
    THEN 'draft'
  ELSE 'published'
END;

UPDATE hotels
SET status = CASE
  WHEN LOWER(TRIM(REPLACE(REPLACE(REPLACE(REPLACE(COALESCE(status, ''), CHAR(9), ''), CHAR(10), ''), CHAR(13), ''), '　', '')))
       IN ('draft', 'private', '비공개', '초안', '임시저장', '임시 저장')
    THEN 'draft'
  ELSE 'published'
END;

CREATE INDEX IF NOT EXISTS idx_posts_status_updated
ON posts(status, updated_at DESC, published_at DESC);
