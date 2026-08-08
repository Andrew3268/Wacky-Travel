import { onRequestGet } from "../functions/sitemap.xml.js";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const destinationRows = [
  { slug: "da-nang", name: "다낭", city: "다낭", updated_at: "2026-08-08T00:00:00.000Z" },
  { slug: "bangkok", name: "방콕", city: "방콕", updated_at: "2026-08-08T00:00:00.000Z" }
];

const db = {
  prepare(sql) {
    return {
      async all() {
        if (/FROM\s+destinations/i.test(sql)) return { results: destinationRows };
        if (/FROM\s+posts/i.test(sql)) return { results: [] };
        return { results: [] };
      }
    };
  }
};

const response = await onRequestGet({
  env: { TRAVEL_DB: db, SITE_ORIGIN: "https://bestayable.com" },
  request: new Request("https://bestayable.com/sitemap.xml")
});

const xml = await response.text();
assert(xml.includes("https://bestayable.com/destinations/da-nang/"), "실제 정적 도시 페이지가 사이트맵에서 누락되었습니다.");
assert(!xml.includes("https://bestayable.com/destinations/bangkok/"), "정적 페이지가 없는 도시 URL이 사이트맵에 포함되었습니다.");

console.log("Sitemap destination-root guard: OK");
