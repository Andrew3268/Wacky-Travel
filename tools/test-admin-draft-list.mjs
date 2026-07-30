import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { onRequestGet } from '../functions/api/admin/post-list.js';

class D1Statement {
  constructor(db, sql) { this.db = db; this.sql = sql; this.values = []; }
  bind(...values) { this.values = values; return this; }
  run() {
    const stmt = this.db.prepare(this.sql);
    const result = stmt.run(...this.values);
    return Promise.resolve({ success: true, meta: { changes: result.changes, last_row_id: result.lastInsertRowid } });
  }
  all() {
    const stmt = this.db.prepare(this.sql);
    return Promise.resolve({ success: true, results: stmt.all(...this.values) });
  }
  first() {
    const stmt = this.db.prepare(this.sql);
    return Promise.resolve(stmt.get(...this.values) || null);
  }
}
class D1Mock {
  constructor(db) { this.db = db; }
  prepare(sql) { return new D1Statement(this.db, sql); }
}

const db = new DatabaseSync(':memory:');
db.exec(readFileSync(new URL('../db/schema.sql', import.meta.url), 'utf8'));
const now = new Date().toISOString();
const token = 'test-session-token';
const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
const tokenHash = Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
db.prepare(`INSERT INTO admin_users (email,password_hash,created_at,updated_at) VALUES (?,?,?,?)`).run('admin@example.com','hash',now,now);
db.prepare(`INSERT INTO admin_sessions (token_hash,admin_id,expires_at,created_at) VALUES (?,?,?,?)`).run(tokenHash,1,new Date(Date.now()+86400000).toISOString(),now);

const insert = db.prepare(`INSERT INTO posts (
slug,title,category,meta_description,summary,content_md,status,content_type,destination_slug,published_at,updated_at
) VALUES (?,?,?,?,?,?,?,?,?,?,?)`);
insert.run('draft-normal','정상 초안','','','','내용','draft','travel_tip','fukuoka',now,now);
insert.run('draft-korean','한글 상태 초안','','','','내용',' 초안\n','travel_tip','osaka',now,now);
insert.run('published-one','발행 글','','','','내용','published','travel_tip','tokyo',now,now);

const request = new Request('https://bestayable.com/api/admin/post-list?status=draft&page=1&per_page=24', {
  headers: { cookie: `admin_session=${encodeURIComponent(token)}` }
});
const response = await onRequestGet({ env: { TRAVEL_DB: new D1Mock(db) }, request });
const json = await response.json();
if (response.status !== 200) throw new Error(`unexpected status ${response.status}`);
if (json.counts.draft !== 2) throw new Error(`draft count mismatch: ${json.counts.draft}`);
if (json.items.length !== 2) throw new Error(`draft items mismatch: ${json.items.length}`);
if (!json.items.every((item) => item.status === 'draft')) throw new Error('status normalization failed');
console.log(JSON.stringify({ status: response.status, counts: json.counts, slugs: json.items.map((item) => item.slug) }, null, 2));
