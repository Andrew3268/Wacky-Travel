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
    coordinates: { lat: 37.5665, lng: 126.9780 },
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
  locationMap: {
    enabled: true,
    defaultCategory: "attractions",
    categories: [
      {
        key: "attractions",
        label: "주요 명소",
        items: [
          {
            id: "sample-attraction",
            nameKo: "샘플 명소",
            nameEn: "Sample Attraction",
            type: "landmark",
            coordinates: { lat: 37.5700, lng: 126.9800 },
            distance: { valueKm: 0.5, label: "약 500m" },
            travel: { walkMinutes: 7, driveMinutes: 3, sourceType: "route" }
          }
        ]
      },
      {
        key: "restaurants",
        label: "맛집",
        items: [
          {
            id: "sample-restaurant",
            nameKo: "샘플 맛집",
            type: "restaurant",
            coordinates: { lat: 37.5640, lng: 126.9750 },
            distance: { valueKm: 0.4, label: "약 400m" },
            travel: { walkMinutes: 6, driveMinutes: 3, sourceType: "estimated" }
          }
        ]
      }
    ]
  },
  sections: [
    {
      number: "01",
      id: "location",
      label: "숙박 위치",
      heading: "도심과 주요 권역을 연결하는 위치",
      blocks: [
        { type: "paragraph", text: "호텔이 도시 안에서 어디에 있는지 설명합니다." },
        { type: "paragraphRich", parts: [{ text: "도심은 걷고, " }, { text: "외곽은 차량을 섞습니다.", strong: true }] },
        {
          type: "locationSummary",
          title: "위치를 한눈에 보면",
          items: [
            { label: "숙소 위치", value: "도심 중심" },
            { label: "도심 접근", value: "도보 이동 중심" },
            { label: "여행 스타일", value: "도보와 차량을 섞는 일정" },
            { label: "장점", value: "여러 권역을 한 숙소에서 연결" }
          ]
        },
        { type: "subheading", text: "이 위치가 특히 좋은 일정" },
        { type: "paragraph", text: "도심과 외곽을 함께 보는 일정에 좋습니다." },
        { type: "subheading", text: "이 위치가 아쉬울 수 있는 경우" },
        { type: "paragraph", text: "한 지역에만 머무는 일정에는 장점이 줄어듭니다." }
      ]
    },
    {
      number: "02",
      id: "attractions-transport",
      label: "명소·교통",
      heading: "호텔 주변 이동",
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
assert.match(rendered, /hrj-chapter--location/);
assert.match(rendered, /data-hrj-location-summary/);
assert.match(rendered, /위치를 한눈에 보면/);
assert.match(rendered, /숙소 위치/);
assert.match(rendered, /hrj-location-fit__item--good/);
assert.match(rendered, /hrj-location-fit__item--caution/);
assert.match(rendered, /data-hrj-location-map/);
assert.match(rendered, /data-hrj-map-tab="attractions"/);
assert.match(rendered, /data-hrj-map-tab="restaurants"/);
assert.doesNotMatch(rendered, /hrj-location-map__eyebrow/);
assert.doesNotMatch(rendered, /호텔을 기준으로 주요 명소와 맛집의 위치를 한눈에 확인할 수 있습니다/);
assert.match(rendered, /<div class="hrj-location-map__head">[\s\S]*?<h3>호텔 주변 지도<\/h3>[\s\S]*?<div class="hrj-map-tabs"/);
assert.match(rendered, /data-hrj-map-center/);
assert.match(rendered, /data-hrj-map-all/);
assert.match(rendered, /샘플 명소/);
assert.match(rendered, /샘플 맛집/);
assert.doesNotMatch(rendered, /도보 약 7분 · 차량 약 3분/);
assert.doesNotMatch(rendered, /Sample Attraction/);
assert.doesNotMatch(rendered, /약 500m/);
assert.doesNotMatch(rendered, /약 400m/);
assert.match(rendered, /반복해서 언급된 장점/);
assert.match(rendered, /반복해서 언급된 단점/);
assert.match(rendered, /객실 선택 가이드/);
assert.match(rendered, /도심 여행용 호텔/);
assert.match(rendered, /객실·요금 확인하기/);
assert.match(rendered, /hrj-basic-info__cta/);
assert.match(rendered, /hrj-booking-overview/);
assert.match(rendered, /hrj-booking-overview__media[\s\S]*?<figure class="hrj-hero">대표 이미지<\/figure>[\s\S]*?hrj-basic-info/);
assert.doesNotMatch(rendered, /class="hrj-location-table"/);
assert.ok(rendered.indexOf('data-hrj-location-map') < rendered.indexOf('hrj-access-summary'), 'location map should replace locationTable before accessSummary');
assert.doesNotMatch(rendered, /<div class="hrj-decision-section__title">예약 전 체크<\/div>/);
assert.doesNotMatch(rendered, /<div class="hrj-decision-section__title">객실 선택 포인트<\/div>/);
assert.doesNotMatch(rendered, /hrj-mobile-decision/);
assert.doesNotMatch(rendered, /hrj-sidebar/);
assert.doesNotMatch(rendered, /hrj-mobile-toc/);
assert.doesNotMatch(rendered, /이 글의 목차/);
assert.doesNotMatch(rendered, /innerHTML|document\.getElementById|<script/i);
assert.match(getHotelReviewPlainText(sample), /객실별 차이가 있습니다/);
assert.match(getHotelReviewPlainText(sample), /여러 권역을 한 숙소에서 연결/);

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

const legacyV10 = structuredClone(sample);
legacyV10.schemaVersion = "hotel-review-v1.0";
delete legacyV10.locationMap;
delete legacyV10.hotel.coordinates;
assert.equal(validateHotelReviewData(legacyV10).ok, true);
const legacyRendered = renderHotelReviewLayout(legacyV10);
assert.match(legacyRendered, /class="hrj-location-table"/);

const invalidMap = structuredClone(sample);
invalidMap.locationMap.categories[0].items[0].coordinates.lat = 123;
assert.equal(validateHotelReviewData(invalidMap).ok, false);
assert.match(validateHotelReviewData(invalidMap).errors.join("\n"), /coordinates/);

const invalidMapSource = structuredClone(sample);
invalidMapSource.locationMap.categories[0].items[0].travel.sourceType = "guess";
assert.equal(validateHotelReviewData(invalidMapSource).ok, false);
assert.match(validateHotelReviewData(invalidMapSource).errors.join("\n"), /sourceType/);

console.log("Hotel review JSON check passed: v1.1 map schema, v1.0 compatibility, block coverage, metadata derivation, escaping, and server HTML rendering.");
