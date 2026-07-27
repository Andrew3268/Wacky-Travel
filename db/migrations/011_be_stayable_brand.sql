-- 기존 D1의 서비스 표시명을 Be Stayable로 갱신합니다.
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

INSERT INTO site_settings (key, value, updated_at)
VALUES ('site_name', 'Be Stayable', datetime('now'))
ON CONFLICT(key) DO UPDATE SET
  value = excluded.value,
  updated_at = excluded.updated_at;
