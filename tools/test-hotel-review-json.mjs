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
    locationType: "중심가 인근",
    coordinates: { lat: 37.5665, lng: 126.9780 },
    grade: "5성급",
    guestRating: "9.0",
    reviewCount: 1245,
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
    basicInfo: [
      { label: "조식", value: "포함" },
      { label: "짐 보관", value: "가능" },
      { label: "체크인·체크아웃", value: "15:00 · 11:00" },
      { label: "무료 취소", value: "가능" },
      { label: "24시간 프런트", value: "운영" }
    ],
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
            id: "sample-station",
            nameKo: "샘플역",
            type: "transport",
            coordinates: { lat: 37.5670, lng: 126.9785 },
            distance: { valueKm: 0.3, label: "약 300m" },
            travel: { walkMinutes: 5, driveMinutes: 2, sourceType: "route" }
          },
          {
            id: "sample-attraction",
            nameKo: "샘플 명소",
            nameEn: "Sample Attraction",
            type: "landmark",
            coordinates: { lat: 37.5700, lng: 126.9800 },
            distance: { valueKm: 0.5, label: "약 500m" },
            travel: { walkMinutes: 7, driveMinutes: 3, sourceType: "route" }
          },
          {
            id: "sample-shopping",
            nameKo: "샘플 쇼핑거리",
            type: "shopping",
            coordinates: { lat: 37.5680, lng: 126.9790 },
            distance: { valueKm: 0.6, label: "약 600m" },
            travel: { walkMinutes: 8, driveMinutes: 3, sourceType: "route" }
          },
          {
            id: "sample-airport",
            nameKo: "샘플 국제공항",
            type: "airport",
            coordinates: { lat: 37.4602, lng: 126.4407 },
            distance: { valueKm: 18.2, label: "약 18.2km" },
            travel: { driveMinutes: 22, sourceType: "route" }
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
        { type: "airportJourney", title: "공항에서 호텔까지 여정", accessLabel: "접근성 무난한 편", summary: "샘플 국제공항에서 호텔까지는 차량으로 약 22분 정도입니다.", stats: [{ label: "추천 이동", value: "차량 이동" }, { label: "예상 소요", value: "약 22분" }, { label: "환승", value: "없음" }, { label: "이동 부담", value: "낮은 편" }] },
        { type: "reviewProsCons", title: "장단점", pros: [{ title: "장점", text: "넓어요" }], cons: [{ title: "단점", text: "소음" }], summary: "객실별 차이가 있습니다." },
        { type: "roomOptions", title: "객실 선택", items: [{ title: "리버뷰", desc: "전망 중시" }] },
        { type: "finalVerdict", eyebrow: "한 문장 정리", title: "도심 여행용 호텔", text: "동선이 편리합니다." }
      ]
    },
    {
      number: "06",
      id: "fit",
      label: "숙소 선택",
      heading: "도보 관광과 도심 생활권 활용을 우선하는 여행에 잘 맞는 숙소",
      blocks: [
        { type: "fitGrid", good: ["관광·맛집·쇼핑을 함께 즐기고 도보 이동 비중이 높은 일정"], bad: ["해변 휴양"] },
        { type: "insight", label: "선택 기준", text: "위치와 외부 동선을 우선하는 일정에 잘 맞습니다." }
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
assert.match(rendered, /class="hrj-location-summary"/);
assert.doesNotMatch(rendered, /data-hrj-location-summary-copy|hrj-location-summary__copy|위치 요약 복사/);
assert.match(rendered, /위치를 한눈에 보면/);
assert.match(rendered, /숙소 위치/);
assert.match(rendered, /hrj-location-fit__item--good/);
assert.match(rendered, /hrj-location-fit__item--caution/);
assert.match(rendered, /<h3 class="hrj-section-subheading hrj-section-subheading--compact">이 위치가 특히 좋은 일정<\/h3>/);
assert.doesNotMatch(rendered, /hrj-location-fit__icon/);
assert.match(rendered, /<h3 class="hrj-section-subheading">세부 제목<\/h3>/);
assert.match(rendered, /hrj-chapter--fit/);
assert.match(rendered, /class="hrj-fit-editorial"/);
assert.match(rendered, /잘 맞는 여행 스타일/);
assert.match(rendered, /잘 맞지 않는 여행 스타일/);
assert.match(rendered, /hrj-fit-editorial__title hrj-section-subheading hrj-section-subheading--fit/);
assert.match(rendered, /class="hrj-fit-criterion"/);
assert.match(rendered, /선택 기준/);
assert.doesNotMatch(rendered, /hrj-fit-box--good|hrj-fit-box--bad/);
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
assert.match(rendered, /hrj-chapter--attractions-transport/);
assert.match(rendered, /<h2>호텔 주변 이동<\/h2>\s*<p class="hrj-attractions-transport-summary">이동이 편리합니다\.<\/p>/);
assert.doesNotMatch(rendered, /<aside class="hrj-insight">/);
assert.match(rendered, /data-hrj-airport-journey/);
assert.match(rendered, /공항에서 호텔까지 여정/);
assert.match(rendered, /접근성 무난한 편/);
assert.doesNotMatch(rendered, /가장 추천/);
assert.doesNotMatch(rendered, /hrj-airport-journey__methods-head|공항에서 호텔까지 가는 방법/);
assert.doesNotMatch(rendered, /hrj-airport-journey__methods|data-hrj-airport-method-toggle|data-hrj-airport-method-more|hrj-airport-method/);
assert.doesNotMatch(rendered, /도보 약 7분 · 차량 약 3분/);
assert.doesNotMatch(rendered, /Sample Attraction/);
assert.doesNotMatch(rendered, /약 500m/);
assert.doesNotMatch(rendered, /약 400m/);
assert.match(rendered, /반복해서 언급된 장점/);
assert.match(rendered, /반복해서 언급된 단점/);
assert.match(rendered, /hrj-review-box__count">1가지<\/span>/);
assert.match(rendered, /hrj-review-analysis__summary-label">핵심 요약<\/div>/);
assert.match(rendered, /hrj-room-card__title">객실 선택<\/strong>/);
assert.match(rendered, /객실 선택 가이드/);
assert.match(rendered, /도심 여행용 호텔/);
assert.match(rendered, /잔여 객실 확인하기/);
assert.match(rendered, /hrj-basic-info__cta/);
assert.match(rendered, /hrj-basic-info__action[\s\S]*?잔여 객실 확인하기[\s\S]*?<p class="post-affiliate-disclosure">제휴 안내<\/p>/);
assert.match(rendered, /data-hrj-inline-booking-cta/);
assert.match(rendered, /hrj-booking-cta__icon/);
assert.match(rendered, /data-hrj-mobile-booking-cta/);
assert.equal((rendered.match(/제휴 안내/g) || []).length, 1);
assert.doesNotMatch(rendered, /객실 타입과 요금은 예약 시점에 따라 달라질 수 있습니다/);
assert.match(rendered, /hrj-booking-overview/);
assert.doesNotMatch(rendered, /숙소 선택 전에 빠르게 확인하면 좋은 객관적인 정보/);
assert.match(rendered, /hrj-basic-info__meta/);
assert.match(rendered, /중심가 인근/);
assert.match(rendered, /5성급/);
assert.match(rendered, /hrj-basic-info__meta-star[^>]*>★<\/span>9\.0\+/);
assert.doesNotMatch(rendered, /평점 좋음|리뷰 충분/);
assert.match(rendered, /hrj-basic-info__facts/);
assert.match(rendered, /hrj-basic-info__facts-title">기본 정보<\/div>/);
assert.match(rendered, /hrj-basic-info__fact--breakfast[\s\S]*?hrj-basic-info__fact-label">조식<\/span>[\s\S]*?hrj-basic-info__fact-value">포함<\/strong>/);
assert.match(rendered, /hrj-basic-info__fact--luggage[\s\S]*?hrj-basic-info__fact-label">짐 보관<\/span>[\s\S]*?hrj-basic-info__fact-value">가능<\/strong>/);
assert.match(rendered, /hrj-basic-info__fact--cancellation[\s\S]*?hrj-basic-info__fact-label">무료 취소<\/span>[\s\S]*?hrj-basic-info__fact-value">가능<\/strong>/);
assert.match(rendered, /hrj-basic-info__fact--frontdesk[\s\S]*?hrj-basic-info__fact-label">24시간 프런트<\/span>[\s\S]*?hrj-basic-info__fact-value">운영<\/strong>/);
assert.match(rendered, /hrj-basic-info__fact--checkin hrj-basic-info__fact--wide[\s\S]*?hrj-basic-info__fact-label">체크인 · 체크아웃<\/span>[\s\S]*?hrj-basic-info__fact-value">15:00 · 11:00<\/strong>/);
const featureOrder = [
  rendered.indexOf('hrj-basic-info__fact--breakfast'),
  rendered.indexOf('hrj-basic-info__fact--luggage'),
  rendered.indexOf('hrj-basic-info__fact--cancellation'),
  rendered.indexOf('hrj-basic-info__fact--frontdesk'),
  rendered.indexOf('hrj-basic-info__fact--checkin')
];
assert.ok(featureOrder.every((index) => index >= 0));
assert.deepEqual([...featureOrder].sort((a, b) => a - b), featureOrder);
assert.doesNotMatch(rendered, /hrj-basic-info__grid--stay|hrj-basic-info__grid--location/);
assert.doesNotMatch(rendered, /<span class="hrj-basic-info__label">가까운 역<\/span>/);
assert.match(rendered, /한눈에 보는 핵심 포인트/);
for (const label of ["핫플 접근성", "맛집 접근성", "쇼핑 접근성", "대중교통 접근성", "공항에서 호텔까지 접근성", "이런 여행에 잘 맞아요"]) {
  assert.match(rendered, new RegExp(label));
}
assert.match(rendered, /6가지 핵심 체크/);
assert.match(rendered, /hrj-quick-item--hotspot hrj-quick-item--grade-good[\s\S]*?hrj-quick-item__top[\s\S]*?<span class="hrj-quick-item__value">좋음<\/span>/);
assert.match(rendered, /hrj-quick-item--dining hrj-quick-item--grade-normal[\s\S]*?hrj-quick-item__top[\s\S]*?<span class="hrj-quick-item__value">보통<\/span>/);
assert.match(rendered, /hrj-quick-item--shopping hrj-quick-item--grade-good/);
assert.match(rendered, /hrj-quick-item--airport hrj-quick-item--grade-normal[\s\S]*?hrj-quick-item__top[\s\S]*?<span class="hrj-quick-item__value">보통<\/span>/);
assert.match(rendered, /관광·맛집·쇼핑 중심 일정/);
assert.match(rendered, /hrj-quick-item__top/);
assert.doesNotMatch(rendered, /hrj-quick-item__hint/);
assert.match(rendered, /hrj-quick-item__desc/);

// v3.12 regression: JSON raw rating must survive an empty SSR option, and quickPoints.desc must render.
const v312Sample = structuredClone(sample);
delete v312Sample.hotel.locationType;
v312Sample.hotel.area = "난바·도톤보리 생활권";
v312Sample.hotel.guestRating = 8.7;
v312Sample.article.basicInfo = [
  { label: "위치 유형", value: "중심가 인근" },
  { label: "조식", value: "포함" },
  { label: "짐 보관", value: "가능" },
  { label: "체크인·체크아웃", value: "15:00 · 11:00" },
  { label: "무료 취소", value: "가능" },
  { label: "24시간 프런트", value: "운영" }
];
v312Sample.article.quickPoints = [
  { label: "핫플 접근성", value: "좋음", desc: "도톤보리·쿠로몬시장 등 주요 관광권을 걸어서 연결하기 좋은 편입니다." },
  { label: "맛집 접근성", value: "좋음", desc: "숙소 주변 외식 선택지를 도보로 이용하기 좋은 편입니다." },
  { label: "쇼핑 접근성", value: "좋음", desc: "난바와 신사이바시 주요 쇼핑권을 관광 동선과 함께 이용하기 좋습니다." },
  { label: "대중교통 접근성", value: "좋음", desc: "가까운 역을 이용해 주요 관광지역으로 이동하기 편한 편입니다." },
  { label: "공항에서 호텔까지 접근성", value: "보통", desc: "공항에서 전철로 이동한 뒤 짧은 도보 구간을 연결하는 방식입니다." },
  { label: "이런 여행에 잘 맞아요", value: "관광·맛집·쇼핑 중심 일정", desc: "숙소 주변을 걸어서 둘러보고 필요할 때 지하철을 섞는 도보 관광형 여행에 잘 맞습니다." }
];
assert.equal(validateHotelReviewData(v312Sample).ok, true);
const v312Rendered = renderHotelReviewLayout(v312Sample, { guestRating: "", locationType: "" });
assert.match(v312Rendered, /hrj-basic-info__meta-star[^>]*>★<\/span>8\.7\+/);
assert.match(v312Rendered, /hrj-basic-info__meta-item--location[^>]*>중심가 인근<\/span>/);
assert.match(v312Rendered, /hrj-basic-info__fact--frontdesk[\s\S]*?hrj-basic-info__fact-label">24시간 프런트<\/span>[\s\S]*?hrj-basic-info__fact-value">운영<\/strong>/);
assert.match(v312Rendered, /이런 여행에 잘 맞아요[\s\S]*?관광·맛집·쇼핑 중심 일정[\s\S]*?hrj-quick-item__desc">숙소 주변을 걸어서 둘러보고 필요할 때 지하철을 섞는 도보 관광형 여행에 잘 맞습니다\.<\/p>/);
assert.match(getHotelReviewPlainText(v312Sample), /도보 관광형 여행에 잘 맞습니다/);
assert.doesNotMatch(rendered, /객실 선택<\/h3>/);
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
assert.doesNotMatch(getHotelReviewPlainText(sample), /공항에서 호텔까지 바로 이동합니다|사전 픽업/);


const legacyQuickOverview = structuredClone(sample);
legacyQuickOverview.article.quickPoints = [
  { label: "위치 성격", value: "도톤보리와 주요 명소를 걸어서 연결하기 좋은 위치" },
  { label: "이동 방식", value: "닛폰바시역까지 도보 약 5분이라 지하철 이동이 편리함" },
  { label: "생활 편의", value: "편의점과 드럭스토어, 쇼핑 시설을 이용하기 편리함" },
  { label: "객실 선택", value: "2인은 21㎡ 이상 객실이 편리함" },
  { label: "가족·친구 여행", value: "도보 관광과 먹거리 일정을 함께 즐기는 여행에 잘 맞음" },
  { label: "주의할 점", value: "도로 방향 객실은 밤 시간대 소음이 변수일 수 있음" }
];
const legacyQuickRendered = renderHotelReviewLayout(legacyQuickOverview);
for (const label of ["핫플 접근성", "맛집 접근성", "쇼핑 접근성", "대중교통 접근성", "공항에서 호텔까지 접근성", "이런 여행에 잘 맞아요"]) {
  assert.match(legacyQuickRendered, new RegExp(label));
}
assert.doesNotMatch(legacyQuickRendered, /<h3 class="hrj-quick-item__label">객실 선택<\/h3>/);
assert.match(legacyQuickRendered, /6가지 핵심 체크/);

const standardizedAccess = structuredClone(sample);
standardizedAccess.article.quickPoints = [
  { label: "핫플 접근성", value: "나쁨", hint: "주요 명소까지 별도 이동" },
  { label: "맛집 접근성", value: "아쉬움", hint: "외식권까지 이동 필요" },
  { label: "쇼핑 접근성", value: "무난함", hint: "짧은 이동 필요" },
  { label: "대중교통 접근성", value: "보통", hint: "역 도보 약 12분" },
  { label: "공항에서 호텔까지 접근성", value: "무난함", hint: "전철 약 55분" },
  { label: "이런 여행에 잘 맞아요", value: "도보 관광 중심 일정", hint: "도보 관광형" }
];
const standardizedRendered = renderHotelReviewLayout(standardizedAccess);
assert.match(standardizedRendered, /hrj-quick-item--hotspot hrj-quick-item--grade-caution[\s\S]*?<span class="hrj-quick-item__value">아쉬움<\/span>/);
assert.match(standardizedRendered, /hrj-quick-item--shopping hrj-quick-item--grade-normal[\s\S]*?<span class="hrj-quick-item__value">보통<\/span>/);
assert.doesNotMatch(standardizedRendered.match(/<section class="hrj-quick-card"[\s\S]*?<\/section>/)?.[0] || "", />나쁨<|>무난함</);

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
