import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

async function exists(url) {
  try { await access(url); return true; } catch { return false; }
}

const [home, headers, routes, sitemap, middleware, addHtml, editHtml, addJs, editJs, curationApi, postsApi, adminItems] = await Promise.all([
  readFile(new URL("../public/index.html", import.meta.url), "utf8"),
  readFile(new URL("../public/_headers", import.meta.url), "utf8"),
  readFile(new URL("../public/_routes.json", import.meta.url), "utf8"),
  readFile(new URL("../functions/sitemap.xml.js", import.meta.url), "utf8"),
  readFile(new URL("../functions/_middleware.js", import.meta.url), "utf8"),
  readFile(new URL("../public/add.html", import.meta.url), "utf8"),
  readFile(new URL("../public/edit.html", import.meta.url), "utf8"),
  readFile(new URL("../public/assets/js/add.js", import.meta.url), "utf8"),
  readFile(new URL("../public/assets/js/edit.js", import.meta.url), "utf8"),
  readFile(new URL("../functions/api/curation-items.js", import.meta.url), "utf8"),
  readFile(new URL("../functions/api/posts.js", import.meta.url), "utf8"),
  readFile(new URL("../public/admin/items.html", import.meta.url), "utf8")
]);

assert(!/travel-by-mood|home-travel-mood|data-admin-home-mood/i.test(home), "홈에 공개 Travel by Mood 코드가 남아 있습니다.");
assert(!/travel-by-mood|ocean-rest/i.test(headers), "_headers에 Travel by Mood 공개 규칙이 남아 있습니다.");
assert(!/travel-by-mood|ocean-rest/i.test(routes), "_routes.json에 Travel by Mood 공개 라우트가 남아 있습니다.");
assert(!/travel-by-mood|ocean-rest|OCEAN_REST/i.test(sitemap), "sitemap 코드에 Travel by Mood 공개 로직이 남아 있습니다.");
assert(!/travel-by-mood|ocean-rest|OCEAN_REST/i.test(middleware), "middleware에 Travel by Mood 공개 로직이 남아 있습니다.");
assert.equal(await exists(new URL("../public/travel-by-mood/", import.meta.url)), false, "Travel by Mood 공개 페이지 디렉터리가 남아 있습니다.");
assert.equal(await exists(new URL("../public/assets/js/travel-mood-ocean-rest.js", import.meta.url)), false, "Travel by Mood 공개 JS가 남아 있습니다.");
assert.equal(await exists(new URL("../public/assets/css/travel-mood.css", import.meta.url)), false, "Travel by Mood 공개 CSS가 남아 있습니다.");

for (const [label, text] of [["add.html", addHtml], ["edit.html", editHtml]]) {
  assert(/Travel by Mood/i.test(text), `${label}: Travel by Mood 선택 UI가 사라졌습니다.`);
}
for (const [label, text] of [["add.js", addJs], ["edit.js", editJs]]) {
  assert(/mood_tags|loadHotelCurationItems|getCheckedCurationValues/i.test(text), `${label}: mood 선택/저장 코드가 사라졌습니다.`);
}
assert(/DEFAULTS[\s\S]*mood[\s\S]*ocean-rest/.test(curationApi), "관리자 mood taxonomy API가 사라졌습니다.");
assert(/mood_tags_json/.test(postsApi), "게시글 mood_tags 저장 구조가 사라졌습니다.");
assert(/Travel by Mood/.test(adminItems), "관리자 Travel by Mood 항목 관리 UI가 사라졌습니다.");

console.log("Travel by Mood admin-only metadata policy: OK");
