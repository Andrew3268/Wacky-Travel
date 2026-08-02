-- 도시 메인 동적 콘텐츠 조회 최적화
CREATE INDEX IF NOT EXISTS idx_posts_destination_status_updated
ON posts(destination_slug, status, updated_at DESC, published_at DESC);
