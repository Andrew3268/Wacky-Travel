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

// 외부 API에서도 Travel by Mood 메타데이터가 노출되지 않아야 한다.
assert(/onRequestGet\(\{ env, request \}\)[\s\S]*requireAdmin\(env, request\)/.test(curationApi), "curation-items GET이 관리자 인증 없이 열려 있습니다.");
assert(/requiresAdmin\s*=\s*adminRequested\s*\|\|\s*requestedStatus\s*!==\s*["']published["']\s*\|\|\s*Boolean\(moodTag\)/.test(postsApi), "mood_tag 필터가 관리자 전용으로 제한되지 않았습니다.");
assert(/\$\{admin \? ["']mood_tags_json,["'] : ["']["']\}/.test(postsApi), "공개 /api/posts 응답에서 mood_tags_json을 제외하는 조건이 없습니다.");
assert.equal((postsApi.match(/\$\{admin \? ["']mood_tags_json,["'] : ["']["']\}/g) || []).length, 1, "mood_tags_json 공개 차단 조건이 쓰기 SQL까지 잘못 적용됐습니다.");
assert(/INSERT INTO posts \([\s\S]*hotel_pick_label,[\s\S]*mood_tags_json,[\s\S]*situation_tags_json/.test(postsApi), "관리자 Add/Edit의 mood_tags_json 저장 컬럼이 손상됐습니다.");

const [{ onRequestGet: getCurationItems }, { onRequestGet: getPosts }] = await Promise.all([
  import(new URL("../functions/api/curation-items.js", import.meta.url)),
  import(new URL("../functions/api/posts.js", import.meta.url))
]);

const anonymousCurationResponse = await getCurationItems({
  env: { TRAVEL_DB: {} },
  request: new Request("https://bestayable.com/api/curation-items")
});
assert.equal(anonymousCurationResponse.status, 401, "비로그인 사용자가 curation-items를 조회할 수 있습니다.");

const adminDb = {
  prepare(sql) {
    const text = String(sql || "");
    return {
      async all() {
        if (text.includes("FROM curation_items")) {
          return { results: [{ id: 1, type: "mood", slug: "ocean-rest", name: "바다를 보며 쉬는 여행", sort_order: 1, is_active: 1 }] };
        }
        return { results: [] };
      },
      bind() {
        return {
          async first() {
            if (text.includes("FROM admin_sessions")) {
              return { id: 1, email: "admin@example.com", token_hash: "test", expires_at: "2999-01-01T00:00:00.000Z" };
            }
            return null;
          },
          async all() {
            if (text.includes("FROM curation_items")) {
              return { results: [{ id: 1, type: "mood", slug: "ocean-rest", name: "바다를 보며 쉬는 여행", sort_order: 1, is_active: 1 }] };
            }
            return { results: [] };
          }
        };
      }
    };
  }
};
const adminCurationResponse = await getCurationItems({
  env: { TRAVEL_DB: adminDb },
  request: new Request("https://bestayable.com/api/curation-items", { headers: { cookie: "admin_session=test-session" } })
});
assert.equal(adminCurationResponse.status, 200, "관리자 로그인 후 curation-items 조회가 막혔습니다.");
const adminCurationJson = await adminCurationResponse.json();
assert.equal(adminCurationJson.items?.[0]?.slug, "ocean-rest", "관리자 Add/Edit용 mood 목록 응답이 손상됐습니다.");

const anonymousMoodFilterResponse = await getPosts({
  env: { TRAVEL_DB: {} },
  request: new Request("https://bestayable.com/api/posts?mood_tag=ocean-rest")
});
assert.equal(anonymousMoodFilterResponse.status, 401, "비로그인 사용자가 mood_tag 필터를 사용할 수 있습니다.");

console.log("Travel by Mood admin-only metadata policy: OK");
