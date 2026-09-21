import assert from "node:assert/strict";
import {
  HOTEL_REVIEW_BLOCK_TYPES,
  HOTEL_REVIEW_SCHEMA_VERSION,
  deriveHotelReviewPostFields,
  getHotelReviewPlainText,
  renderHotelReviewLayout,
  validateHotelReviewData,
  validateHotelReviewJson
} from "../lib/posts/hotel-review-json.js";

const sample = {
  schemaVersion: HOTEL_REVIEW_SCHEMA_VERSION,
  slug: "sample-hotel-seoul",
  hotel: {
    nameKo: "샘플 호텔",
    nameEn: "Sample Hotel",
    country: "대한민국",
    city: "서울",
    area: "도심",
    grade: "5성급",
    type: "도심형 호텔",
    roomCount: "300실",
    airport: "공항 약 50km"
  },
  seo: {
    title: "샘플 호텔 리뷰",
    description: "샘플 호텔의 위치, 객실과 장단점을 정리합니다."
  },
  article: {
    title: "샘플 호텔 리뷰",
    intro: ["호텔 리뷰 소개 문장입니다."],
    featuredImage: { src: "", alt: "샘플 호텔 대표 이미지" },
    basicInfo: [{ label: "호텔 유형", value: "도심형 5성급 호텔" }],
    quickPoints: [{ label: "위치", value: "도심 이동이 편리함" }]
  },
  sections: [
    {
      number: "01",
      id: "overview",
      label: "개요",
      heading: "호텔 개요",
      blocks: [
        { type: "paragraph", text: "일반 문단" },
        { type: "paragraphRich", parts: [{ text: "강조 ", strong: false }, { text: "내용", strong: true }] },
        { type: "subheading", text: "세부 제목" },
        { type: "locationTable", rows: [["명소", "약 1km"]] },
        { type: "accessSummary", title: "이동 요약", items: [{ level: "도보", places: "명소", desc: "걸어서 이동" }] },
        { type: "insight", label: "핵심", text: "이동이 편리합니다." },
        { type: "reviewProsCons", title: "장단점", pros: [{ title: "장점", text: "넓어요" }], cons: [{ title: "단점", text: "소음" }], summary: "객실별 차이가 있습니다." },
        { type: "roomOptions", title: "객실 선택", items: [{ title: "리버뷰", desc: "전망 중시" }] },
        { type: "fitGrid", good: ["도심 여행"], bad: ["해변 휴양"] },
        { type: "finalVerdict", eyebrow: "한 문장 정리", title: "도심 여행용 호텔", text: "동선이 편리합니다." }
      ]
    }
  ]
};

const validation = validateHotelReviewData(sample);
assert.deepEqual(validation, { ok: true, errors: [] });
assert.equal(validateHotelReviewJson(JSON.stringify(sample)).ok, true);
assert.equal(new Set(sample.sections.flatMap((section) => section.blocks.map((block) => block.type))).size, HOTEL_REVIEW_BLOCK_TYPES.length);

const derived = deriveHotelReviewPostFields(sample, { cover_image: "https://cdn.example.com/fallback.webp" });
assert.equal(derived.slug, sample.slug);
assert.equal(derived.title, sample.article.title);
assert.equal(derived.meta_description, sample.seo.description);
assert.equal(derived.summary, sample.article.intro[0]);
assert.equal(derived.cover_image, "https://cdn.example.com/fallback.webp");
assert.equal(derived.hotel_hero.name, sample.hotel.nameKo);
assert.equal(derived.hotel_hero.star_rating, "5");

const withJsonImage = structuredClone(sample);
withJsonImage.article.featuredImage.src = "https://images.example.com/hotel.webp";
assert.equal(deriveHotelReviewPostFields(withJsonImage, { cover_image: "https://cdn.example.com/fallback.webp" }).cover_image, "https://images.example.com/hotel.webp");

const rendered = renderHotelReviewLayout(sample, {
  updatedDate: "2026-09-21",
  coverImageHtml: '<figure class="hrj-hero">대표 이미지</figure>',
  availabilityUrl: "https://example.com/hotel",
  affiliateDisclosureHtml: '<p class="post-affiliate-disclosure">제휴 안내</p>'
});
assert.match(rendered, /class="hotel-review-json-page"/);
assert.match(rendered, /<h1 class="hrj-title">샘플 호텔 리뷰<\/h1>/);
assert.match(rendered, /반복해서 언급된 장점/);
assert.match(rendered, /반복해서 언급된 단점/);
assert.match(rendered, /객실 선택 가이드/);
assert.match(rendered, /도심 여행용 호텔/);
assert.match(rendered, /객실·요금 확인하기/);
assert.match(rendered, /hrj-decision-card/);
assert.match(rendered, /예약 전 체크/);
assert.match(rendered, /객실 선택 포인트/);
assert.doesNotMatch(rendered, /hrj-mobile-decision/);
assert.match(rendered, /<nav class="hrj-mobile-toc"[\s\S]*?<ul>[\s\S]*?01\. 개요[\s\S]*?<\/ul>/);
assert.doesNotMatch(rendered, /<nav class="hrj-mobile-toc"[\s\S]*?<ol>/);
assert.doesNotMatch(rendered, /innerHTML|document\.getElementById|<script/i);
assert.match(getHotelReviewPlainText(sample), /객실별 차이가 있습니다/);

const malicious = structuredClone(sample);
malicious.article.title = '<img src=x onerror="alert(1)">';
const escaped = renderHotelReviewLayout(malicious);
assert.doesNotMatch(escaped, /<img src=x onerror/);
assert.match(escaped, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/);

const invalidVersion = structuredClone(sample);
invalidVersion.schemaVersion = "hotel-review-v9";
assert.equal(validateHotelReviewData(invalidVersion).ok, false);

const unknownBlock = structuredClone(sample);
unknownBlock.sections[0].blocks[0].type = "html";
const unknownValidation = validateHotelReviewData(unknownBlock);
assert.equal(unknownValidation.ok, false);
assert.match(unknownValidation.errors.join("\n"), /지원하지 않는 블록/);

console.log("Hotel review JSON check passed: schema validation, block coverage, metadata derivation, image fallback, escaping, and server HTML rendering.");
