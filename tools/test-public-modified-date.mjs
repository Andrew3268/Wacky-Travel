import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd());
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

const schema = read("db/schema.sql");
const migration = read("db/migrations/017_post_public_modified_date.sql");
const editHtml = read("public/edit.html");
const editJs = read("public/assets/js/edit.js");
const postApi = read("functions/api/posts/[slug].js");
const postPage = read("functions/post/[slug].js");
const sitemap = read("functions/sitemap.xml.js");

check(/content_modified_at\s+TEXT/.test(schema), "posts 스키마에 content_modified_at이 없습니다.");
check(/ALTER TABLE posts ADD COLUMN content_modified_at/.test(migration), "공개 수정일 마이그레이션이 없습니다.");
check(/id="refresh_public_modified_date"/.test(editHtml), "편집 화면에 공개 수정일 갱신 체크박스가 없습니다.");
check(/refresh_public_modified_date:\s*Boolean/.test(editJs), "편집 요청에 공개 수정일 선택값이 포함되지 않습니다.");
check(/refreshPublicModifiedDate[\s\S]*\?\s*now[\s\S]*current\.content_modified_at/.test(postApi), "체크 여부에 따른 공개 수정일 유지 로직이 없습니다.");
check(/dateModified:\s*updatedIso\s*\|\|\s*publicModifiedAt/.test(postPage), "BlogPosting dateModified가 공개 수정일을 사용하지 않습니다.");
check(/formatDate\(publicModifiedAt\)/.test(postPage), "화면 수정일이 공개 수정일을 사용하지 않습니다.");
check(/lastmod:\s*item\.content_modified_at/.test(sitemap), "사이트맵 lastmod가 공개 수정일을 사용하지 않습니다.");

if (failures.length) {
  console.error("공개 수정일 검사 실패:");
  failures.forEach((item) => console.error(`- ${item}`));
  process.exit(1);
}
console.log("공개 수정일 선택 기능 검사 통과");
