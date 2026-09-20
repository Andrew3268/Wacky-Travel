-- Hotel review JSON content support
ALTER TABLE posts ADD COLUMN content_format TEXT DEFAULT 'markdown';
ALTER TABLE posts ADD COLUMN content_json TEXT DEFAULT '';

UPDATE posts
SET content_format = 'markdown'
WHERE TRIM(COALESCE(content_format, '')) = '';
