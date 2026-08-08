import { onRequestGet } from "../functions/sitemap.xml.js";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const missingDestinationSlugs = [
  "bangkok",
  "pattaya",
  "phuket",
  "chiang-mai",
  "koh-samui",
  "cebu",
  "boracay",
  "bohol",
  "manila",
  "clark"
];

const destinationRows = [
  { slug: "da-nang", name: "다낭", city: "다낭", updated_at: "2026-08-08T00:00:00.000Z" },
  ...missingDestinationSlugs.map((slug) => ({
    slug,
    name: slug,
    city: slug,
    updated_at: "2026-06-13T00:00:00.000Z"
  }))
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
assert(xml.includes("<lastmod>2026-08-08</lastmod>"), "정적 도시 페이지의 lastmod가 반영되지 않았습니다.");

for (const slug of missingDestinationSlugs) {
  assert(
    !xml.includes(`https://bestayable.com/destinations/${slug}/`),
    `정적 페이지가 없는 도시 URL이 사이트맵에 포함되었습니다: ${slug}`
  );
}

assert(response.headers.get("cache-control")?.includes("no-store"), "sitemap 캐시 방지 헤더가 누락되었습니다.");
console.log("Sitemap destination-root guard: OK");
