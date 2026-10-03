import { escapeHtml } from "../../functions/_utils.js";

export const HOTEL_REVIEW_SCHEMA_VERSION = "hotel-review-v1.1";
export const HOTEL_REVIEW_SCHEMA_VERSIONS = Object.freeze(["hotel-review-v1.0", "hotel-review-v1.1"]);
const HOTEL_REVIEW_SCHEMA_SET = new Set(HOTEL_REVIEW_SCHEMA_VERSIONS);
export const HOTEL_REVIEW_BLOCK_TYPES = Object.freeze([
  "paragraph",
  "paragraphRich",
  "subheading",
  "locationSummary",
  "airportJourney",
  "locationTable",
  "accessSummary",
  "insight",
  "reviewProsCons",
  "roomOptions",
  "fitGrid",
  "finalVerdict"
]);

const HOTEL_REVIEW_BLOCK_SET = new Set(HOTEL_REVIEW_BLOCK_TYPES);

function text(value = "") {
  return String(value ?? "").trim();
}

function array(value) {
  return Array.isArray(value) ? value : [];
}

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function stripGrade(value = "") {
  const raw = text(value);
  const match = raw.match(/([1-5])\s*성급/);
  return match ? match[1] : raw;
}

function safeHttpUrl(value = "") {
  const raw = text(value);
  return /^https?:\/\//i.test(raw) ? raw : "";
}

function number(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function isValidLatitude(value) {
  const parsed = number(value);
  return parsed !== null && parsed >= -90 && parsed <= 90;
}

function isValidLongitude(value) {
  const parsed = number(value);
  return parsed !== null && parsed >= -180 && parsed <= 180;
}

function hasValidCoordinates(value) {
  return isObject(value) && isValidLatitude(value.lat) && isValidLongitude(value.lng);
}

const HOTEL_REVIEW_MAP_SOURCE_TYPES = new Set(["route", "estimated"]);
const HOTEL_REVIEW_MAP_ITEM_TYPES = new Set([
  "airport",
  "attraction",
  "landmark",
  "beach",
  "nature",
  "shopping",
  "market",
  "museum",
  "park",
  "transport",
  "convenience",
  "restaurant",
  "cafe",
  "other"
]);

function validateOptionalMinutes(errors, value, path) {
  if (value === undefined || value === null || value === "") return;
  const parsed = number(value);
  if (parsed === null || parsed < 0 || parsed > 10000) errors.push(`${path}는 0 이상의 숫자여야 합니다.`);
}

function validateLocationMap(data, errors) {
  if (data.locationMap === undefined) return;
  const map = data.locationMap;
  if (!isObject(map)) {
    errors.push("locationMap은 객체여야 합니다.");
    return;
  }
  if (map.enabled !== undefined && typeof map.enabled !== "boolean") errors.push("locationMap.enabled는 Boolean 값이어야 합니다.");
  if (map.enabled === false) return;

  if (!hasValidCoordinates(data.hotel?.coordinates)) {
    errors.push("locationMap을 사용하려면 hotel.coordinates.lat/lng의 유효한 좌표가 필요합니다.");
  }

  validateText(errors, map.defaultCategory, "locationMap.defaultCategory", { max: 80 });
  if (!array(map.categories).length) errors.push("locationMap.categories가 1개 이상 필요합니다.");

  const categoryKeys = new Set();
  const itemIds = new Set();
  array(map.categories).forEach((category, categoryIndex) => {
    const path = `locationMap.categories[${categoryIndex}]`;
    if (!isObject(category)) {
      errors.push(`${path}는 객체여야 합니다.`);
      return;
    }
    validateText(errors, category.key, `${path}.key`, { max: 80 });
    validateText(errors, category.label, `${path}.label`, { max: 120 });
    const key = text(category.key);
    if (key && !/^[a-z0-9][a-z0-9_-]*$/.test(key)) errors.push(`${path}.key는 영문 소문자·숫자·하이픈·언더스코어만 사용할 수 있습니다.`);
    if (key && categoryKeys.has(key)) errors.push(`${path}.key '${key}'가 중복되었습니다.`);
    if (key) categoryKeys.add(key);
    if (!array(category.items).length) errors.push(`${path}.items가 1개 이상 필요합니다.`);

    array(category.items).forEach((item, itemIndex) => {
      const itemPath = `${path}.items[${itemIndex}]`;
      if (!isObject(item)) {
        errors.push(`${itemPath}는 객체여야 합니다.`);
        return;
      }
      validateText(errors, item.id, `${itemPath}.id`, { max: 160 });
      validateText(errors, item.nameKo, `${itemPath}.nameKo`, { max: 240 });
      validateText(errors, item.nameLocal, `${itemPath}.nameLocal`, { required: false, max: 300 });
      validateText(errors, item.nameEn, `${itemPath}.nameEn`, { required: false, max: 300 });
      validateText(errors, item.type, `${itemPath}.type`, { max: 80 });
      const itemId = text(item.id);
      if (itemId && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(itemId)) errors.push(`${itemPath}.id는 영문 소문자·숫자·하이픈 형식이어야 합니다.`);
      if (itemId && itemIds.has(itemId)) errors.push(`${itemPath}.id '${itemId}'가 중복되었습니다.`);
      if (itemId) itemIds.add(itemId);
      const itemType = text(item.type);
      if (itemType && !HOTEL_REVIEW_MAP_ITEM_TYPES.has(itemType)) errors.push(`${itemPath}.type '${itemType}'은 지원하지 않는 지도 장소 유형입니다.`);
      if (!hasValidCoordinates(item.coordinates)) errors.push(`${itemPath}.coordinates.lat/lng가 올바르지 않습니다.`);

      if (item.distance !== undefined) {
        if (!isObject(item.distance)) errors.push(`${itemPath}.distance는 객체여야 합니다.`);
        else {
          if (item.distance.valueKm !== undefined && item.distance.valueKm !== null && item.distance.valueKm !== "") {
            const km = number(item.distance.valueKm);
            if (km === null || km < 0 || km > 20000) errors.push(`${itemPath}.distance.valueKm는 0 이상의 숫자여야 합니다.`);
          }
          validateText(errors, item.distance.label, `${itemPath}.distance.label`, { required: false, max: 120 });
        }
      }

      if (item.travel !== undefined) {
        if (!isObject(item.travel)) errors.push(`${itemPath}.travel은 객체여야 합니다.`);
        else {
          validateOptionalMinutes(errors, item.travel.walkMinutes, `${itemPath}.travel.walkMinutes`);
          validateOptionalMinutes(errors, item.travel.driveMinutes, `${itemPath}.travel.driveMinutes`);
          const sourceType = text(item.travel.sourceType);
          if (sourceType && !HOTEL_REVIEW_MAP_SOURCE_TYPES.has(sourceType)) errors.push(`${itemPath}.travel.sourceType은 'route' 또는 'estimated'만 사용할 수 있습니다.`);
        }
      }
    });
  });

  const defaultCategory = text(map.defaultCategory);
  if (defaultCategory && !categoryKeys.has(defaultCategory)) {
    errors.push(`locationMap.defaultCategory '${defaultCategory}'에 해당하는 category가 없습니다.`);
  }
}

export function normalizeHotelReviewContentFormat(value = "") {
  return text(value).toLowerCase() === "json" ? "json" : "markdown";
}

export function parseHotelReviewJson(value) {
  if (isObject(value)) return value;
  const raw = text(value);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return isObject(parsed) ? parsed : null;
  } catch (_) {
    return null;
  }
}

function validateText(errors, value, path, { required = true, max = 2000 } = {}) {
  const raw = text(value);
  if (required && !raw) errors.push(`${path} 값이 필요합니다.`);
  if (raw.length > max) errors.push(`${path} 값이 너무 깁니다.`);
}

function validateBlock(block, sectionIndex, blockIndex, errors) {
  const path = `sections[${sectionIndex}].blocks[${blockIndex}]`;
  if (!isObject(block)) {
    errors.push(`${path}는 객체여야 합니다.`);
    return;
  }
  const type = text(block.type);
  if (!HOTEL_REVIEW_BLOCK_SET.has(type)) {
    errors.push(`${path}.type '${type || "(없음)"}'은 지원하지 않는 블록입니다.`);
    return;
  }

  if (["paragraph", "subheading"].includes(type)) {
    validateText(errors, block.text, `${path}.text`, { max: 8000 });
    return;
  }

  if (type === "paragraphRich") {
    if (!array(block.parts).length) errors.push(`${path}.parts가 필요합니다.`);
    array(block.parts).forEach((part, index) => {
      if (!isObject(part)) errors.push(`${path}.parts[${index}]는 객체여야 합니다.`);
      else validateText(errors, part.text, `${path}.parts[${index}].text`, { max: 4000 });
    });
    return;
  }

  if (type === "locationSummary") {
    validateText(errors, block.title, `${path}.title`, { max: 200 });
    const items = array(block.items);
    if (items.length < 3 || items.length > 5) errors.push(`${path}.items는 3~5개여야 합니다.`);
    items.forEach((item, index) => {
      if (!isObject(item)) {
        errors.push(`${path}.items[${index}]는 객체여야 합니다.`);
        return;
      }
      validateText(errors, item.label, `${path}.items[${index}].label`, { max: 120 });
      validateText(errors, item.value, `${path}.items[${index}].value`, { max: 600 });
    });
    return;
  }

  if (type === "airportJourney") {
    validateText(errors, block.title, `${path}.title`, { max: 200 });
    validateText(errors, block.accessLabel, `${path}.accessLabel`, { required: false, max: 120 });
    validateText(errors, block.summary, `${path}.summary`, { max: 3000 });
    const stats = array(block.stats);
    if (stats.length < 3 || stats.length > 4) errors.push(`${path}.stats는 3~4개여야 합니다.`);
    stats.forEach((item, index) => {
      if (!isObject(item)) { errors.push(`${path}.stats[${index}]는 객체여야 합니다.`); return; }
      validateText(errors, item.label, `${path}.stats[${index}].label`, { max: 120 });
      validateText(errors, item.value, `${path}.stats[${index}].value`, { max: 300 });
    });
    return;
  }

  if (type === "locationTable") {
    if (!array(block.rows).length) errors.push(`${path}.rows가 필요합니다.`);
    array(block.rows).forEach((row, index) => {
      if (!Array.isArray(row) || row.length < 2 || !text(row[0]) || !text(row[1])) {
        errors.push(`${path}.rows[${index}]는 [장소, 거리/이동정보] 구조여야 합니다.`);
      }
    });
    return;
  }

  if (type === "accessSummary") {
    validateText(errors, block.title, `${path}.title`, { max: 300 });
    if (!array(block.items).length) errors.push(`${path}.items가 필요합니다.`);
    array(block.items).forEach((item, index) => {
      validateText(errors, item?.level, `${path}.items[${index}].level`, { max: 120 });
      validateText(errors, item?.places, `${path}.items[${index}].places`, { max: 500 });
      validateText(errors, item?.desc, `${path}.items[${index}].desc`, { max: 1500 });
    });
    return;
  }

  if (type === "insight") {
    validateText(errors, block.label, `${path}.label`, { max: 120 });
    validateText(errors, block.text, `${path}.text`, { max: 2000 });
    return;
  }

  if (type === "reviewProsCons") {
    validateText(errors, block.title, `${path}.title`, { max: 300 });
    if (!array(block.pros).length) errors.push(`${path}.pros가 필요합니다.`);
    if (!array(block.cons).length) errors.push(`${path}.cons가 필요합니다.`);
    for (const key of ["pros", "cons"]) {
      array(block[key]).forEach((item, index) => {
        validateText(errors, item?.title, `${path}.${key}[${index}].title`, { max: 200 });
        validateText(errors, item?.text, `${path}.${key}[${index}].text`, { max: 2000 });
      });
    }
    validateText(errors, block.summary, `${path}.summary`, { required: false, max: 3000 });
    return;
  }

  if (type === "roomOptions") {
    validateText(errors, block.title, `${path}.title`, { max: 300 });
    if (!array(block.items).length) errors.push(`${path}.items가 필요합니다.`);
    array(block.items).forEach((item, index) => {
      validateText(errors, item?.title, `${path}.items[${index}].title`, { max: 200 });
      validateText(errors, item?.desc, `${path}.items[${index}].desc`, { max: 1000 });
    });
    return;
  }

  if (type === "fitGrid") {
    if (!array(block.good).length) errors.push(`${path}.good이 필요합니다.`);
    if (!array(block.bad).length) errors.push(`${path}.bad가 필요합니다.`);
    return;
  }

  if (type === "finalVerdict") {
    validateText(errors, block.eyebrow, `${path}.eyebrow`, { max: 120 });
    validateText(errors, block.title, `${path}.title`, { max: 500 });
    validateText(errors, block.text, `${path}.text`, { max: 2000 });
  }
}

export function validateHotelReviewData(data) {
  const errors = [];
  if (!isObject(data)) return { ok: false, errors: ["호텔 리뷰 JSON 최상위 값은 객체여야 합니다."] };

  if (!HOTEL_REVIEW_SCHEMA_SET.has(text(data.schemaVersion))) {
    errors.push(`schemaVersion은 ${HOTEL_REVIEW_SCHEMA_VERSIONS.map((version) => `'${version}'`).join(" 또는 ")}이어야 합니다.`);
  }
  validateText(errors, data.slug, "slug", { max: 160 });
  if (text(data.slug) && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(text(data.slug))) {
    errors.push("slug는 영문 소문자·숫자·하이픈만 사용할 수 있습니다.");
  }

  if (!isObject(data.hotel)) errors.push("hotel 객체가 필요합니다.");
  else {
    validateText(errors, data.hotel.nameKo, "hotel.nameKo", { max: 200 });
    validateText(errors, data.hotel.nameEn, "hotel.nameEn", { required: false, max: 200 });
    validateText(errors, data.hotel.country, "hotel.country", { max: 120 });
    validateText(errors, data.hotel.city, "hotel.city", { max: 120 });
    validateText(errors, data.hotel.area, "hotel.area", { required: false, max: 200 });
    validateText(errors, data.hotel.grade, "hotel.grade", { required: false, max: 80 });
    validateText(errors, data.hotel.guestRating, "hotel.guestRating", { required: false, max: 40 });
    if (data.hotel.reviewCount !== undefined && data.hotel.reviewCount !== null && data.hotel.reviewCount !== "") {
      const reviewCount = normalizeNumericValue(data.hotel.reviewCount);
      if (reviewCount === null || reviewCount < 0) errors.push("hotel.reviewCount는 0 이상의 숫자여야 합니다.");
    }
    if (data.hotel.coordinates !== undefined && !hasValidCoordinates(data.hotel.coordinates)) {
      errors.push("hotel.coordinates.lat/lng가 올바르지 않습니다.");
    }
  }

  validateLocationMap(data, errors);

  if (!isObject(data.seo)) errors.push("seo 객체가 필요합니다.");
  else {
    validateText(errors, data.seo.title, "seo.title", { max: 220 });
    validateText(errors, data.seo.description, "seo.description", { max: 500 });
  }

  if (!isObject(data.article)) errors.push("article 객체가 필요합니다.");
  else {
    validateText(errors, data.article.title, "article.title", { max: 240 });
    if (!array(data.article.intro).length) errors.push("article.intro가 1개 이상 필요합니다.");
    array(data.article.intro).forEach((item, index) => validateText(errors, item, `article.intro[${index}]`, { max: 3000 }));
    if (data.article.featuredImage !== undefined && !isObject(data.article.featuredImage)) errors.push("article.featuredImage는 객체여야 합니다.");
    if (!array(data.article.basicInfo).length) errors.push("article.basicInfo가 1개 이상 필요합니다.");
    array(data.article.basicInfo).forEach((item, index) => {
      validateText(errors, item?.label, `article.basicInfo[${index}].label`, { max: 120 });
      validateText(errors, item?.value, `article.basicInfo[${index}].value`, { max: 600 });
    });
    if (!array(data.article.quickPoints).length) errors.push("article.quickPoints가 1개 이상 필요합니다.");
    array(data.article.quickPoints).forEach((item, index) => {
      validateText(errors, item?.label, `article.quickPoints[${index}].label`, { max: 120 });
      validateText(errors, item?.value, `article.quickPoints[${index}].value`, { max: 1000 });
      validateText(errors, item?.hint, `article.quickPoints[${index}].hint`, { required: false, max: 120 });
    });
  }

  if (!array(data.sections).length) errors.push("sections가 1개 이상 필요합니다.");
  const seenIds = new Set();
  array(data.sections).forEach((section, sectionIndex) => {
    const path = `sections[${sectionIndex}]`;
    if (!isObject(section)) {
      errors.push(`${path}는 객체여야 합니다.`);
      return;
    }
    validateText(errors, section.number, `${path}.number`, { max: 20 });
    validateText(errors, section.id, `${path}.id`, { max: 120 });
    validateText(errors, section.label, `${path}.label`, { max: 120 });
    validateText(errors, section.heading, `${path}.heading`, { max: 400 });
    const id = text(section.id);
    if (id && seenIds.has(id)) errors.push(`${path}.id '${id}'가 중복되었습니다.`);
    if (id) seenIds.add(id);
    if (!array(section.blocks).length) errors.push(`${path}.blocks가 1개 이상 필요합니다.`);
    array(section.blocks).forEach((block, blockIndex) => validateBlock(block, sectionIndex, blockIndex, errors));
  });

  return { ok: errors.length === 0, errors };
}

export function validateHotelReviewJson(value) {
  const data = parseHotelReviewJson(value);
  if (!data) return { ok: false, errors: ["유효한 JSON 파일이 아닙니다."], data: null };
  const result = validateHotelReviewData(data);
  return { ...result, data };
}

export function deriveHotelReviewPostFields(data = {}, fallback = {}) {
  const hotel = isObject(data.hotel) ? data.hotel : {};
  const seo = isObject(data.seo) ? data.seo : {};
  const article = isObject(data.article) ? data.article : {};
  const intro = array(article.intro).map(text).filter(Boolean);
  const image = isObject(article.featuredImage) ? article.featuredImage : {};
  const title = text(article.title) || text(seo.title) || text(fallback.title);
  const description = text(seo.description) || intro[0] || text(fallback.meta_description);
  const summary = intro[0] || text(fallback.summary) || description;
  const jsonImage = safeHttpUrl(image.src);
  const fallbackImage = safeHttpUrl(fallback.cover_image);
  const coverImage = jsonImage || fallbackImage;
  const coverAlt = text(image.alt) || text(fallback.cover_image_alt) || `${text(hotel.nameKo) || title} 대표 이미지`;
  const slug = text(data.slug) || text(fallback.slug);
  const quickPoints = array(article.quickPoints);
  const keyPointKeys = ["attractions", "transport", "airport", "dining_shopping", "signature"];
  const keyPoints = quickPoints.slice(0, 5).map((item, index) => ({
    key: keyPointKeys[index] || "signature",
    text: text(item?.value)
  })).filter((item) => item.text);

  return {
    slug,
    title,
    seo_title: text(seo.title) || title,
    meta_description: description,
    summary,
    cover_image: coverImage,
    cover_image_alt: coverAlt,
    hotel_hero: {
      slug,
      name: text(hotel.nameKo),
      name_en: text(hotel.nameEn),
      area: text(hotel.area),
      star_rating: stripGrade(hotel.grade),
      guest_rating: text(hotel.guestRating),
      badges: [],
      key_points: keyPoints,
      summary,
      price_url: ""
    }
  };
}

function renderRich(parts = []) {
  return array(parts).map((part) => {
    const value = escapeHtml(text(part?.text));
    return part?.strong ? `<strong>${value}</strong>` : value;
  }).join("");
}

function renderReviewList(items = []) {
  return array(items).map((item) => `
    <div class="hrj-review-item">
      <div class="hrj-review-item__title">${escapeHtml(text(item?.title))}</div>
      <div class="hrj-review-item__text">${escapeHtml(text(item?.text))}</div>
    </div>
  `).join("");
}

function renderAirportJourney(block = {}) {
  const stats = array(block.stats);
  const accessLabel = text(block.accessLabel);
  const friendlyStatLabel = (label = "") => {
    const value = text(label);
    if (value === "마지막 도보" || value === "도보 이동" || value === "도보") return "역에서 호텔까지";
    return value;
  };
  return `<div class="hrj-airport-journey" data-hrj-airport-journey>
    <div class="hrj-airport-journey__head">
      <h3>${escapeHtml(text(block.title || "공항에서 호텔까지"))}</h3>
      ${accessLabel ? `<span class="hrj-airport-journey__status">${escapeHtml(accessLabel)}</span>` : ""}
    </div>
    <p class="hrj-airport-journey__summary">${escapeHtml(text(block.summary))}</p>
    <div class="hrj-airport-journey__stats">${stats.map((item) => `
      <div class="hrj-airport-journey__stat"><span>${escapeHtml(friendlyStatLabel(item?.label))}</span><strong>${escapeHtml(text(item?.value))}</strong></div>`).join("")}
    </div>
  </div>`;
}

function airportMapItem(data = {}) {
  for (const category of array(data?.locationMap?.categories)) {
    const found = array(category?.items).find((item) => text(item?.type) === "airport");
    if (found) return found;
  }
  return null;
}

function isLegacyAirportHeading(value = "") {
  const heading = text(value).replace(/\s+/g, "");
  return heading.includes("공항") && (heading.includes("이동") || heading.includes("호텔까지") || heading.includes("기차역"));
}

function richBlockPlainText(block = {}) {
  if (text(block?.type) === "paragraph") return text(block.text);
  if (text(block?.type) === "paragraphRich") return array(block.parts).map((part) => text(part?.text)).filter(Boolean).join("");
  return "";
}

function legacyAirportJourneyBlock(data = {}, paragraphBlock = {}) {
  const airport = airportMapItem(data);
  const driveMinutes = number(airport?.travel?.driveMinutes);
  if (!airport || driveMinutes === null || driveMinutes > 30) return null;
  const distance = text(airport?.distance?.label);
  const summary = richBlockPlainText(paragraphBlock);
  return {
    type: "airportJourney",
    title: "공항에서 호텔까지 여정",
    accessLabel: driveMinutes <= 20 ? "접근성 좋은 편" : "접근성 무난한 편",
    summary: summary || `${text(airport?.nameKo) || "공항"}에서 호텔까지${distance ? ` ${distance},` : ""} 차량으로 약 ${driveMinutes}분 정도입니다.`,
    stats: [
      { label: "추천 이동", value: "차량 이동" },
      { label: "예상 소요", value: `약 ${driveMinutes}분` },
      { label: "환승", value: "없음" },
      { label: "이동 부담", value: driveMinutes <= 20 ? "낮은 편" : "보통" }
    ],
  };
}

export function renderHotelReviewBlock(block = {}) {
  switch (text(block.type)) {
    case "paragraph":
      return `<p>${escapeHtml(text(block.text))}</p>`;
    case "paragraphRich":
      return `<p>${renderRich(block.parts)}</p>`;
    case "subheading":
      return `<h3>${escapeHtml(text(block.text))}</h3>`;
    case "locationSummary":
      return `<div class="hrj-location-summary">
        <div class="hrj-location-summary__head">
          <h3>${escapeHtml(text(block.title || "위치를 한눈에 보면"))}</h3>
        </div>
        <div class="hrj-location-summary__table">${array(block.items).map((item) => `
          <div class="hrj-location-summary__row"><div class="hrj-location-summary__label">${escapeHtml(text(item?.label))}</div><div class="hrj-location-summary__value">${escapeHtml(text(item?.value))}</div></div>`).join("")}
        </div>
      </div>`;
    case "airportJourney":
      return renderAirportJourney(block);
    case "locationTable":
      return `<div class="hrj-location-table">${array(block.rows).map((row) => `
        <div class="hrj-location-row"><div>${escapeHtml(text(row?.[0]))}</div><div>${escapeHtml(text(row?.[1]))}</div></div>
      `).join("")}</div>`;
    case "accessSummary":
      return `<div class="hrj-access-summary">
        <div class="hrj-access-summary__title">${escapeHtml(text(block.title))}</div>
        <div class="hrj-access-summary__list">${array(block.items).map((item) => `
          <div class="hrj-access-summary__item">
            <div class="hrj-access-summary__level">${escapeHtml(text(item?.level))}</div>
            <div class="hrj-access-summary__places">${escapeHtml(text(item?.places))}</div>
            <div class="hrj-access-summary__desc">${escapeHtml(text(item?.desc))}</div>
          </div>`).join("")}</div>
      </div>`;
    case "insight":
      return `<aside class="hrj-insight"><span class="hrj-insight__label">${escapeHtml(text(block.label || "핵심"))}</span><p>${escapeHtml(text(block.text))}</p></aside>`;
    case "reviewProsCons":
      return `<div class="hrj-review-analysis">
        <div class="hrj-review-analysis__title">${escapeHtml(text(block.title))}</div>
        <div class="hrj-review-analysis__grid">
          <div class="hrj-review-box"><div class="hrj-review-box__label">반복해서 언급된 장점</div>${renderReviewList(block.pros)}</div>
          <div class="hrj-review-box hrj-review-box--cons"><div class="hrj-review-box__label">반복해서 언급된 단점</div>${renderReviewList(block.cons)}</div>
        </div>
        ${text(block.summary) ? `<div class="hrj-review-analysis__summary">${escapeHtml(text(block.summary))}</div>` : ""}
      </div>`;
    case "roomOptions":
      return `<div class="hrj-room-card">
        <div class="hrj-room-card__top"><strong>${escapeHtml(text(block.title))}</strong><span>객실 선택 가이드</span></div>
        <div class="hrj-room-grid">${array(block.items).map((item) => `<div class="hrj-room-option"><div class="hrj-room-option__title">${escapeHtml(text(item?.title))}</div><div class="hrj-room-option__desc">${escapeHtml(text(item?.desc))}</div></div>`).join("")}</div>
      </div>`;
    case "fitGrid":
      return `<div class="hrj-fit-grid">
        <div class="hrj-fit-box hrj-fit-box--good"><div class="hrj-fit-box__title">잘 맞는 여행</div><ul>${array(block.good).map((item) => `<li>${escapeHtml(text(item))}</li>`).join("")}</ul></div>
        <div class="hrj-fit-box hrj-fit-box--bad"><div class="hrj-fit-box__title">다른 숙소와 비교해볼 여행</div><ul>${array(block.bad).map((item) => `<li>${escapeHtml(text(item))}</li>`).join("")}</ul></div>
      </div>`;
    case "finalVerdict":
      return `<div class="hrj-final-verdict"><div class="hrj-final-verdict__eyebrow">${escapeHtml(text(block.eyebrow))}</div><div class="hrj-final-verdict__title">${escapeHtml(text(block.title))}</div><p>${escapeHtml(text(block.text))}</p></div>`;
    default:
      return "";
  }
}

function mapIconKind(type = "") {
  const value = text(type);
  if (value === "airport") return "airport";
  if (value === "restaurant" || value === "cafe") return "food";
  return "place";
}

function renderMapSvg(type = "place") {
  const kind = mapIconKind(type);
  if (kind === "airport") {
    // 기존 호텔 핵심 포인트에서 사용 중인 공항 SVG와 동일한 아이콘을 재사용한다.
    return `<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M28 15.2 18.5 11V5.8a2.5 2.5 0 0 0-5 0V11L4 15.2v2.6l9.5-1.8v6.2l-3.2 2.1v2l5.7-1.3 5.7 1.3v-2l-3.2-2.1V16l9.5 1.8v-2.6Z"></path></svg>`;
  }
  if (kind === "food") {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v7M4.5 3v4.5A2.5 2.5 0 0 0 7 10M9.5 3v4.5A2.5 2.5 0 0 1 7 10M7 10v11"/><path d="M16 3c2.1 2.1 2.4 6.2 0 8.5V21M16 3v8.5"/></svg>`;
  }
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z"/><circle cx="12" cy="10" r="2.2"/></svg>`;
}

function locationMapConfig(data = {}) {
  const map = isObject(data.locationMap) ? data.locationMap : null;
  const hotel = isObject(data.hotel) ? data.hotel : {};
  if (!map || map.enabled === false || !hasValidCoordinates(hotel.coordinates)) return null;
  const sourceCategories = array(map.categories).filter((category) => isObject(category) && array(category.items).length);
  if (!sourceCategories.length) return null;
  const categories = sourceCategories.map((category) => ({
    key: text(category.key),
    label: text(category.label),
    items: array(category.items).filter((item) => isObject(item) && hasValidCoordinates(item.coordinates)).map((item) => ({
      id: text(item.id),
      nameKo: text(item.nameKo),
      type: text(item.type),
      coordinates: { lat: item.coordinates.lat, lng: item.coordinates.lng },
      ...(isObject(item.travel) ? {
        travel: {
          ...(number(item.travel.walkMinutes) !== null ? { walkMinutes: item.travel.walkMinutes } : {}),
          ...(number(item.travel.driveMinutes) !== null ? { driveMinutes: item.travel.driveMinutes } : {}),
          ...(text(item.travel.sourceType) ? { sourceType: text(item.travel.sourceType) } : {})
        }
      } : {})
    }))
  })).filter((category) => category.items.length);
  if (!categories.length) return null;
  return {
    hotel: {
      name: text(hotel.nameKo),
      lat: hotel.coordinates.lat,
      lng: hotel.coordinates.lng
    },
    defaultCategory: text(map.defaultCategory) || text(categories[0]?.key),
    categories
  };
}

function renderLocationMapListItem(item = {}, categoryKey = "", index = 0) {
  const type = mapIconKind(item.type);
  const token = type === "airport" ? renderMapSvg(item.type) : escapeHtml(String(index + 1));
  const walkMinutes = number(item?.travel?.walkMinutes);
  const driveMinutes = number(item?.travel?.driveMinutes);
  const travelMeta = [
    walkMinutes !== null ? `<span>도보 약 ${escapeHtml(String(Math.round(walkMinutes)))}분</span>` : "",
    driveMinutes !== null ? `<span>차량 약 ${escapeHtml(String(Math.round(driveMinutes)))}분</span>` : ""
  ].filter(Boolean).join("");
  return `<button class="hrj-map-place hrj-map-place--${type}" type="button" data-hrj-map-place="${escapeHtml(text(item.id))}" data-map-category="${escapeHtml(text(categoryKey))}" data-map-order="${index + 1}">
    <span class="hrj-map-place__num hrj-map-place__num--${type}" aria-hidden="true">${token}</span>
    <span class="hrj-map-place__body">
      <strong>${escapeHtml(text(item.nameKo))}</strong>
      ${travelMeta ? `<span class="hrj-map-place__travel">${travelMeta}</span>` : ""}
    </span>
  </button>`;
}

export function renderHotelReviewLocationMap(data = {}) {
  const config = locationMapConfig(data);
  if (!config) return "";
  const safeConfig = escapeHtml(JSON.stringify(config));
  const hasEstimated = config.categories.some((category) => array(category.items).some((item) => text(item?.travel?.sourceType) === "estimated"));
  return `<section class="hrj-location-map" data-hrj-location-map data-map-config="${safeConfig}" aria-label="호텔 주변 지도">
    <div class="hrj-location-map__head">
      <h3>호텔 주변 지도</h3>
      <div class="hrj-map-tabs" role="tablist" aria-label="지도 장소 분류">${config.categories.map((category) => {
        const active = text(category.key) === config.defaultCategory;
        return `<button type="button" class="hrj-map-tab${active ? " is-active" : ""}" role="tab" aria-selected="${active ? "true" : "false"}" data-hrj-map-tab="${escapeHtml(text(category.key))}">${escapeHtml(text(category.label))}<span>${array(category.items).length}</span></button>`;
      }).join("")}</div>
    </div>
    <div class="hrj-map-canvas-wrap">
      <div class="hrj-map-controls" aria-label="지도 보기 범위">
        <button type="button" class="hrj-map-control" data-hrj-map-center aria-label="호텔을 지도 중심으로 보기">호텔 중심</button>
        <button type="button" class="hrj-map-control" data-hrj-map-all aria-label="현재 분류의 모든 장소 보기">전체 보기</button>
      </div>
      <div class="hrj-map-skeleton" data-hrj-map-skeleton><span></span><p>지도를 불러오는 중입니다.</p></div>
      <div class="hrj-map-canvas" data-hrj-map-canvas aria-label="${escapeHtml(config.hotel.name)} 주변 위치 지도"></div>
      <div class="hrj-map-panels">${config.categories.map((category) => {
        const active = text(category.key) === config.defaultCategory;
        return `<div class="hrj-map-panel${active ? " is-active" : ""}" data-hrj-map-panel="${escapeHtml(text(category.key))}"${active ? "" : " hidden"}>${array(category.items).map((item, index) => renderLocationMapListItem(item, category.key, index)).join("")}</div>`;
      }).join("")}</div>
    </div>
    <p class="hrj-map-note">${hasEstimated ? "일부 도보·차량 시간은 좌표 기반 예상값이며 실제 도로와 교통 상황에 따라 달라질 수 있습니다. " : ""}지도는 사용자 현재 위치를 사용하지 않습니다.</p>
  </section>`;
}

export function renderHotelReviewToc(data = {}) {
  return array(data.sections).map((section) => `<li><a href="#${escapeHtml(text(section?.id))}">${escapeHtml(text(section?.number))}. ${escapeHtml(text(section?.label))}</a></li>`).join("");
}

function locationFitKind(value = "") {
  const title = text(value);
  if (title === "이 위치가 특히 좋은 일정") return "good";
  if (title === "이 위치가 아쉬울 수 있는 경우") return "caution";
  return "";
}

function renderLocationFitText(block = {}) {
  if (text(block.type) === "paragraphRich") return renderRich(block.parts);
  return escapeHtml(text(block.text));
}

function renderHotelReviewLocationBlocks(blocks = []) {
  const source = array(blocks);
  const html = [];
  let index = 0;

  while (index < source.length) {
    const block = source[index] || {};
    const kind = text(block.type) === "subheading" ? locationFitKind(block.text) : "";
    if (!kind) {
      html.push(renderHotelReviewBlock(block));
      index += 1;
      continue;
    }

    const fitItems = [];
    while (index < source.length) {
      const heading = source[index] || {};
      const fitKind = text(heading.type) === "subheading" ? locationFitKind(heading.text) : "";
      const content = source[index + 1] || {};
      const contentType = text(content.type);
      if (!fitKind || !["paragraph", "paragraphRich"].includes(contentType)) break;
      fitItems.push({ kind: fitKind, title: text(heading.text), content });
      index += 2;
    }

    if (!fitItems.length) {
      html.push(renderHotelReviewBlock(block));
      index += 1;
      continue;
    }

    html.push(`<div class="hrj-location-fit">${fitItems.map((item) => `
      <article class="hrj-location-fit__item hrj-location-fit__item--${item.kind}">
        <div class="hrj-location-fit__head"><span class="hrj-location-fit__icon" aria-hidden="true">${item.kind === "good" ? "✓" : "–"}</span><h3>${escapeHtml(item.title)}</h3></div>
        <p class="hrj-location-fit__desc">${renderLocationFitText(item.content)}</p>
      </article>`).join("")}
    </div>`);
  }

  return html.join("");
}


function splitEditorialSentences(value = "") {
  const raw = text(value);
  if (!raw) return [];
  const matches = raw.match(/[^.!?]+[.!?]?/g) || [];
  return matches.map((item) => text(item)).filter(Boolean);
}

function plainEditorialBlockText(block = {}) {
  const type = text(block?.type);
  if (type === "paragraph") return text(block.text);
  if (type === "paragraphRich") return array(block.parts).map((part) => text(part?.text)).filter(Boolean).join("");
  return "";
}

function renderShoppingFoodBlocks(blocks = []) {
  const source = array(blocks);
  const editorial = source.filter((block) => ["paragraph", "paragraphRich"].includes(text(block?.type)));
  if (!editorial.length) return source.map((block) => renderHotelReviewBlock(block)).join("");

  const firstText = plainEditorialBlockText(editorial[0]);
  const firstSentences = splitEditorialSentences(firstText);
  const lead = firstSentences[0] || firstText;
  const returnText = firstSentences.slice(1).join(" ");
  const shoppingText = plainEditorialBlockText(editorial[1]);
  const diningText = plainEditorialBlockText(editorial[2]);

  const items = [
    diningText ? { label: "외식 생활권", value: "주변 식당·카페 이용", desc: diningText } : null,
    shoppingText ? { label: "쇼핑 동선", value: "주요 상권과 연결", desc: shoppingText } : null,
    returnText ? { label: "숙소 복귀", value: "저녁 일정 후 복귀 동선", desc: returnText } : null
  ].filter(Boolean);

  // If the legacy paragraph structure cannot safely provide summary items,
  // keep the original blocks instead of inventing information.
  if (!lead || items.length < 2) return source.map((block) => renderHotelReviewBlock(block)).join("");

  const consumed = new Set(editorial.slice(0, 3));
  const remainder = source.filter((block) => !consumed.has(block)).map((block) => renderHotelReviewBlock(block)).join("");

  return `<p class="hrj-editorial-lead">${escapeHtml(lead)}</p>
    <div class="hrj-lifestyle-summary" role="list">${items.map((item) => `
      <article class="hrj-lifestyle-summary__item" role="listitem">
        <div class="hrj-lifestyle-summary__label">${escapeHtml(item.label)}</div>
        <div class="hrj-lifestyle-summary__value">${escapeHtml(item.value)}</div>
        <p class="hrj-lifestyle-summary__desc">${escapeHtml(item.desc)}</p>
      </article>`).join("")}
    </div>${remainder}`;
}

function renderHotelFeaturesBlocks(blocks = []) {
  const source = array(blocks);
  if (!source.length) return "";

  const html = [];
  let index = 0;
  const firstType = text(source[0]?.type);
  if (["paragraph", "paragraphRich"].includes(firstType)) {
    const lead = plainEditorialBlockText(source[0]);
    if (lead) html.push(`<p class="hrj-editorial-lead">${escapeHtml(lead)}</p>`);
    index = 1;
  }

  const features = [];
  const fallback = [];
  while (index < source.length) {
    const block = source[index] || {};
    const type = text(block.type);
    if (type === "subheading") {
      const next = source[index + 1] || {};
      const nextType = text(next.type);
      if (["paragraph", "paragraphRich"].includes(nextType)) {
        const desc = plainEditorialBlockText(next);
        if (text(block.text) && desc) features.push({ title: text(block.text), desc });
        index += 2;
        continue;
      }
    }
    fallback.push(renderHotelReviewBlock(block));
    index += 1;
  }

  if (features.length) {
    html.push(`<div class="hrj-feature-list">${features.map((item) => `
      <article class="hrj-feature-item">
        <h3 class="hrj-feature-item__title">${escapeHtml(item.title)}</h3>
        <p class="hrj-feature-item__text">${escapeHtml(item.desc)}</p>
      </article>`).join("")}
    </div>`);
  }
  html.push(...fallback);
  return html.join("");
}

function renderAttractionsTransportBlocks(data = {}, blocks = [], mapHtml = "") {
  const html = [];
  let insertedMap = false;
  let summary = "";
  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    const type = text(block?.type);

    // In 02 명소·교통, insight is promoted to the H2 lead paragraph instead of
    // rendering as a separate card lower in the section. Skip every insight
    // block here to avoid duplicate summaries; the first non-empty one wins.
    if (type === "insight") {
      if (!summary) summary = text(block?.text);
      continue;
    }

    if (type === "locationTable" && mapHtml) {
      if (!insertedMap) { html.push(mapHtml); insertedMap = true; }
      continue;
    }
    if (type === "subheading" && isLegacyAirportHeading(block?.text)) {
      const next = blocks[index + 1];
      const legacy = legacyAirportJourneyBlock(data, next);
      if (legacy && ["paragraph", "paragraphRich"].includes(text(next?.type))) {
        html.push(renderAirportJourney(legacy));
        index += 1;
        continue;
      }
    }
    html.push(renderHotelReviewBlock(block));
  }
  return { html: html.join(""), insertedMap, summary };
}

export function renderHotelReviewSections(data = {}) {
  const mapHtml = renderHotelReviewLocationMap(data);
  return array(data.sections).map((section) => {
    const blocks = array(section?.blocks);
    const sectionId = text(section?.id);
    const isLocation = sectionId === "location";
    const isAttractionsTransport = sectionId === "attractions-transport";
    const isShoppingFood = sectionId === "shopping-food";
    const isHotelFeatures = sectionId === "hotel-features";
    const attractionRender = isAttractionsTransport ? renderAttractionsTransportBlocks(data, blocks, mapHtml) : null;
    const body = isLocation
      ? renderHotelReviewLocationBlocks(blocks)
      : isAttractionsTransport
        ? attractionRender.html
        : isShoppingFood
          ? renderShoppingFoodBlocks(blocks)
          : isHotelFeatures
            ? renderHotelFeaturesBlocks(blocks)
            : blocks.map((block) => renderHotelReviewBlock(block)).join("");

    const sectionBody = isAttractionsTransport && mapHtml && !attractionRender.insertedMap
      ? `${mapHtml}${body}`
      : body;

    return `
    <section class="hrj-chapter${isLocation ? " hrj-chapter--location" : ""}${isAttractionsTransport ? " hrj-chapter--attractions-transport" : ""}${isShoppingFood ? " hrj-chapter--shopping-food" : ""}${isHotelFeatures ? " hrj-chapter--hotel-features" : ""}" id="${escapeHtml(sectionId)}">
      <div class="hrj-chapter-index">${escapeHtml(text(section?.number))}. ${escapeHtml(text(section?.label))}</div>
      <h2>${escapeHtml(text(section?.heading))}</h2>
      ${isAttractionsTransport && text(attractionRender?.summary) ? `<p class="hrj-attractions-transport-summary">${escapeHtml(text(attractionRender.summary))}</p>` : ""}
      ${sectionBody}
    </section>
  `;
  }).join("");
}

function findHotelReviewBlock(data = {}, type = "") {
  for (const section of array(data.sections)) {
    for (const block of array(section?.blocks)) {
      if (text(block?.type) === type) return block;
    }
  }
  return null;
}


export function getHotelReviewPlainText(data = {}) {
  const chunks = [];
  const push = (value) => { const v = text(value); if (v) chunks.push(v); };
  push(data?.article?.title);
  array(data?.article?.intro).forEach(push);
  array(data?.article?.basicInfo).forEach((item) => { push(item?.label); push(item?.value); });
  array(data?.article?.quickPoints).forEach((item) => { push(item?.label); push(item?.value); push(item?.hint); });
  array(data?.locationMap?.categories).forEach((category) => {
    push(category?.label);
    array(category?.items).forEach((item) => {
      push(item?.nameKo); push(item?.nameLocal); push(item?.nameEn); push(item?.distance?.label);
    });
  });
  array(data?.sections).forEach((section) => {
    push(section?.label); push(section?.heading);
    array(section?.blocks).forEach((block) => {
      push(block?.title); push(block?.label); push(block?.heading); push(block?.text); push(block?.summary); push(block?.eyebrow);
      array(block?.parts).forEach((part) => push(part?.text));
      array(block?.rows).flat().forEach(push);
      array(block?.items).forEach((item) => { push(item?.label); push(item?.value); push(item?.level); push(item?.places); push(item?.desc); push(item?.title); push(item?.text); });
      array(block?.stats).forEach((item) => { push(item?.label); push(item?.value); });
      array(block?.pros).forEach((item) => { push(item?.title); push(item?.text); });
      array(block?.cons).forEach((item) => { push(item?.title); push(item?.text); });
      array(block?.good).forEach(push); array(block?.bad).forEach(push);
    });
  });
  return chunks.join(" ");
}


const QUICK_OVERVIEW_ORDER = ["hotspot", "dining", "transit", "convenience", "fit", "caution"];
const QUICK_OVERVIEW_LABELS = {
  hotspot: "핫플 접근성",
  dining: "맛집 접근성",
  transit: "대중교통 접근성",
  convenience: "생활 편의",
  fit: "이런 여행에 잘 맞아요",
  caution: "예약 전 체크"
};

function quickOverviewCategory(label = "") {
  const value = text(label).replace(/\s+/g, "");
  if (!value) return "";
  if (/맛집|식당|외식|카페/.test(value)) return "dining";
  if (/대중교통|교통접근|역접근|이동방식|이동편의/.test(value)) return "transit";
  if (/생활편의|편의시설|주변편의/.test(value)) return "convenience";
  if (/이런여행|추천여행|여행유형|가족·?친구여행|잘맞는여행/.test(value)) return "fit";
  if (/주의|예약전체크|체크포인트/.test(value)) return "caution";
  if (/핫플|명소접근|관광접근|위치성격|관광동선|^위치$/.test(value)) return "hotspot";
  return "";
}

function quickOverviewHint(category = "", value = "", supplied = "") {
  const explicit = text(supplied);
  if (explicit) return explicit;
  const body = text(value);
  const walkMatch = body.match(/(?:도보|걸어서)\s*(?:약\s*)?(\d+)\s*분/);
  const stationMatch = body.match(/([가-힣A-Za-z0-9·]+역)[^\d]{0,18}(?:도보|걸어서)\s*(?:약\s*)?(\d+)\s*분/);

  if (category === "hotspot") {
    if (walkMatch) return `핫플 도보 ${walkMatch[1]}분권`;
    if (/도보권|걸어서|도보/.test(body)) return "주요 핫플 도보권";
    return "관광 동선 확인";
  }
  if (category === "dining") {
    if (walkMatch) return `맛집 도보 ${walkMatch[1]}분권`;
    if (/많|풍부|밀집/.test(body)) return "맛집 선택지 많음";
    return "주변 맛집 확인";
  }
  if (category === "transit") {
    if (stationMatch) return `${stationMatch[1]} 도보 ${stationMatch[2]}분`;
    if (walkMatch) return `교통 거점 도보 ${walkMatch[1]}분`;
    return "대중교통 동선 확인";
  }
  if (category === "convenience") {
    if (/편의점|드럭스토어|쇼핑|마트/.test(body)) return "편의시설 이용 편리";
    return "생활 편의 확인";
  }
  if (category === "fit") {
    if (/도보/.test(body)) return "도보 관광형";
    if (/가족/.test(body)) return "가족 여행형";
    if (/커플/.test(body)) return "커플 여행형";
    return "추천 여행 유형";
  }
  if (category === "caution") {
    if (/소음/.test(body)) return "소음 확인 필요";
    if (/교통|이동/.test(body)) return "이동 동선 확인";
    return "예약 전 확인";
  }
  return "";
}

function diningQuickPointFromMap(data = {}) {
  const categories = array(data?.locationMap?.categories);
  const diningCategory = categories.find((category) => {
    const key = text(category?.key).toLowerCase();
    const label = text(category?.label);
    return /restaurant|food|dining|cafe/.test(key) || /맛집|식당|음식|카페/.test(label);
  });
  if (!diningCategory) return null;

  const items = array(diningCategory.items).filter((item) => isObject(item));
  if (!items.length) return null;
  const walkTimes = items
    .map((item) => number(item?.travel?.walkMinutes))
    .filter((minutes) => minutes !== null && minutes >= 0);
  const within15 = walkTimes.filter((minutes) => minutes <= 15).length;

  if (within15 > 0) {
    return {
      category: "dining",
      value: `호텔 주변 지도에 정리된 맛집 중 ${within15}곳이 도보 15분 이내라 식사 동선을 짜기 편한 편이에요.`,
      hint: `도보 15분 내 ${within15}곳`
    };
  }

  return {
    category: "dining",
    value: `호텔 주변 지도에 맛집 ${items.length}곳이 정리돼 있어 숙소 주변 식사 선택지를 비교하기 좋아요.`,
    hint: `주변 맛집 ${items.length}곳`
  };
}

function buildQuickOverview(data = {}) {
  const selected = new Map();
  const quickPoints = array(data?.article?.quickPoints);

  quickPoints.forEach((item) => {
    const category = quickOverviewCategory(item?.label);
    if (!category || selected.has(category)) return;
    const value = text(item?.value);
    if (!value) return;
    selected.set(category, {
      category,
      value,
      hint: quickOverviewHint(category, value, item?.hint)
    });
  });

  if (!selected.has("dining")) {
    const dining = diningQuickPointFromMap(data);
    if (dining) selected.set("dining", dining);
  }

  return QUICK_OVERVIEW_ORDER
    .map((category) => selected.get(category))
    .filter(Boolean)
    .map((item) => ({ ...item, label: QUICK_OVERVIEW_LABELS[item.category] }));
}


function normalizeBinaryFact(value = "", positivePattern, negativePattern) {
  const raw = text(value);
  if (!raw) return "";
  if (negativePattern.test(raw)) return false;
  if (positivePattern.test(raw)) return true;
  return "";
}

function normalizeBreakfastFact(value = "") {
  const state = normalizeBinaryFact(
    value,
    /(?:조식\s*)?(?:포함|제공|무료)/i,
    /(?:미포함|불포함|별도|유료|제공\s*안|없음)/i
  );
  return state === true ? "포함" : (state === false ? "미포함" : "");
}

function normalizeLuggageFact(value = "") {
  const state = normalizeBinaryFact(
    value,
    /(?:가능|제공|보관\s*가능|맡길\s*수)/i,
    /(?:불가능|불가|제공\s*안|없음|보관\s*안)/i
  );
  return state === true ? "가능" : (state === false ? "불가능" : "");
}

function normalizeNumericValue(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const match = text(value).replace(/,/g, "").match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function ratingSummaryLabel(value = "") {
  const score = normalizeNumericValue(value);
  if (score === null) return "";
  const normalized = score <= 5 ? score * 2 : score;
  if (normalized >= 8.5) return "평점 좋음";
  if (normalized >= 7.5) return "평점 보통";
  return "평점 아쉬움";
}

function reviewVolumeLabel(value = "") {
  const count = normalizeNumericValue(value);
  if (count === null) return "";
  if (count >= 300) return "리뷰 충분";
  if (count >= 100) return "리뷰 보통";
  return "리뷰 적음";
}

function locationMapItems(data = {}) {
  return array(data?.locationMap?.categories).flatMap((category) =>
    array(category?.items).filter((item) => isObject(item)).map((item) => ({ ...item, categoryKey: text(category?.key), categoryLabel: text(category?.label) }))
  );
}

function sortByTravelPriority(items = []) {
  return [...items].sort((a, b) => {
    const aWalk = number(a?.travel?.walkMinutes);
    const bWalk = number(b?.travel?.walkMinutes);
    if (aWalk !== null || bWalk !== null) return (aWalk ?? 99999) - (bWalk ?? 99999);
    const aDistance = number(a?.distance?.valueKm);
    const bDistance = number(b?.distance?.valueKm);
    return (aDistance ?? 99999) - (bDistance ?? 99999);
  });
}

function locationFactFromItem(item = {}) {
  const name = text(item?.nameKo) || text(item?.nameLocal) || text(item?.nameEn);
  if (!name) return null;
  const walk = number(item?.travel?.walkMinutes);
  const distance = text(item?.distance?.label);
  return { value: name, sub: walk !== null ? `도보 약 ${Math.round(walk)}분` : distance };
}

function buildHeroLocationFacts(data = {}, quickPoints = []) {
  const items = locationMapItems(data);
  const transport = sortByTravelPriority(items.filter((item) => text(item?.type) === "transport"))[0];
  let station = transport ? locationFactFromItem(transport) : null;

  if (!station) {
    const transitQuick = quickPoints.find((item) => text(item?.category) === "transit");
    const body = text(transitQuick?.value);
    const stationMatch = body.match(/([가-힣A-Za-z0-9·\- ]+역)/);
    const walkMatch = body.match(/(?:도보|걸어서)\s*(?:약\s*)?(\d+)\s*분/);
    if (stationMatch) station = { value: stationMatch[1].trim(), sub: walkMatch ? `도보 약 ${walkMatch[1]}분` : text(transitQuick?.hint) };
  }

  const attractions = items.filter((item) => {
    const type = text(item?.type);
    return ["attraction", "landmark", "market", "museum", "park", "shopping", "beach", "nature"].includes(type);
  });
  const hotspotQuick = quickPoints.find((item) => text(item?.category) === "hotspot");
  const explicitHotspotRaw = `${text(hotspotQuick?.value)} ${text(hotspotQuick?.hint)}`.trim();
  let hotspotValue = "";
  if (/(?:매우\s*)?좋음/.test(explicitHotspotRaw)) hotspotValue = "좋음";
  else if (/보통|무난/.test(explicitHotspotRaw)) hotspotValue = "보통";
  else if (/나쁨|아쉬움|불편/.test(explicitHotspotRaw)) hotspotValue = "나쁨";

  const attractionWalkTimes = attractions
    .map((item) => number(item?.travel?.walkMinutes))
    .filter((minutes) => minutes !== null && minutes >= 0);
  const attractionDistances = attractions
    .map((item) => number(item?.distance?.valueKm))
    .filter((distance) => distance !== null && distance >= 0);
  const hotspotWithin10 = attractionWalkTimes.filter((minutes) => minutes <= 10).length;
  const hotspotWithin15 = attractionWalkTimes.filter((minutes) => minutes <= 15).length;
  const hotspotWithin20 = attractionWalkTimes.filter((minutes) => minutes <= 20).length;
  const hotspotWithin15Km = attractionDistances.filter((distance) => distance <= 1.5).length;

  if (!hotspotValue && attractions.length) {
    if (hotspotWithin10 >= 1 || hotspotWithin15 >= 2) hotspotValue = "좋음";
    else if (hotspotWithin20 >= 1 || hotspotWithin15Km >= 1) hotspotValue = "보통";
    else if (attractionWalkTimes.length || attractionDistances.length) hotspotValue = "나쁨";
  }

  if (!hotspotValue && explicitHotspotRaw) {
    if (/도보권|걸어서|도보\s*(?:관광|이동|연결)|가까/.test(explicitHotspotRaw)) hotspotValue = "좋음";
    else if (/차량|대중교통|지하철|버스/.test(explicitHotspotRaw)) hotspotValue = "보통";
    else if (/멀|별도\s*이동|이동\s*부담/.test(explicitHotspotRaw)) hotspotValue = "나쁨";
  }

  const explicitHotspotEvidence = text(hotspotQuick?.hint);
  const numericHotspotEvidence = /(?:도보|걸어서)[^\d]{0,12}\d+[^곳]{0,12}곳|\d+(?:\.\d+)?\s*km[^곳]{0,12}\d+\s*곳/.test(explicitHotspotEvidence)
    ? explicitHotspotEvidence
    : "";
  const nearestHotspot = sortByTravelPriority(attractions)[0];
  const nearestHotspotWalk = number(nearestHotspot?.travel?.walkMinutes);
  const nearestHotspotDistance = text(nearestHotspot?.distance?.label);
  const hotspotSub = hotspotValue
    ? (hotspotWithin10 > 0 ? `도보 10분 내 ${hotspotWithin10}곳`
      : (hotspotWithin15 > 0 ? `도보 15분 내 ${hotspotWithin15}곳`
        : (hotspotWithin20 > 0 ? `도보 20분 내 ${hotspotWithin20}곳`
          : (numericHotspotEvidence || (nearestHotspotWalk !== null ? `가까운 핫플 도보 약 ${Math.round(nearestHotspotWalk)}분` : nearestHotspotDistance)))))
    : "";

  const diningQuick = quickPoints.find((item) => text(item?.category) === "dining");
  const explicitDining = text(diningQuick?.value).match(/^(?:매우\s*)?(좋음|보통|아쉬움)$/)?.[0] || "";
  const restaurants = items.filter((item) => ["restaurant", "cafe"].includes(text(item?.type)));
  const walkTimes = restaurants.map((item) => number(item?.travel?.walkMinutes)).filter((v) => v !== null);
  const within10 = walkTimes.filter((v) => v <= 10).length;
  const within15 = walkTimes.filter((v) => v <= 15).length;
  let diningValue = explicitDining;
  if (!diningValue && restaurants.length) {
    diningValue = (within10 >= 2 || within15 >= 3) ? "좋음" : (within15 >= 1 ? "보통" : "아쉬움");
  }
  const nearestDining = sortByTravelPriority(restaurants)[0];
  const nearestDiningWalk = number(nearestDining?.travel?.walkMinutes);
  const diningSub = diningValue
    ? (within10 >= 2 ? `도보 10분 내 ${within10}곳` : (within15 >= 1 ? `도보 15분 내 ${within15}곳` : (nearestDiningWalk !== null ? `가까운 맛집 도보 약 ${Math.round(nearestDiningWalk)}분` : "")))
    : "";

  return [
    station ? { label: "가까운 역", ...station } : null,
    hotspotValue ? { label: "핫플 접근성", value: hotspotValue, sub: hotspotSub } : null,
    diningValue ? { label: "맛집 접근성", value: diningValue, sub: diningSub } : null
  ].filter(Boolean);
}

export function renderHotelReviewLayout(data = {}, options = {}) {
  const hotel = isObject(data.hotel) ? data.hotel : {};
  const article = isObject(data.article) ? data.article : {};
  const basicInfo = array(article.basicInfo);
  const quickPoints = buildQuickOverview(data);
  const intro = array(article.intro).map((item) => `<p class="hrj-lede">${escapeHtml(text(item))}</p>`).join("");
  const published = text(options.publishedDate);
  const updated = text(options.updatedDate);
  const meta = [text(hotel.city) ? `${text(hotel.city)} 호텔 리뷰` : "호텔 리뷰", updated ? `업데이트 ${updated}` : (published ? `발행 ${published}` : "")].filter(Boolean);
  const imageHtml = text(options.coverImageHtml);
  const affiliateDisclosureHtml = text(options.affiliateDisclosureHtml);
  const availabilityUrl = safeHttpUrl(options.availabilityUrl);
  const basicInfoCta = availabilityUrl
    ? `<div class="hrj-basic-info__action"><a class="hrj-basic-info__cta" href="${escapeHtml(availabilityUrl)}" target="_blank" rel="sponsored noopener noreferrer">객실·요금 확인하기</a><span>객실 타입과 요금은 예약 시점에 따라 달라질 수 있습니다.</span></div>`
    : "";

  const findBasicInfoValue = (...needles) => {
    const item = basicInfo.find((entry) => {
      const label = text(entry?.label);
      return needles.some((needle) => label.includes(needle));
    });
    return text(item?.value);
  };

  const combinedCheckInOut = findBasicInfoValue("체크인·체크아웃", "체크인/체크아웃");
  const separateCheckIn = basicInfo.find((entry) => /체크인/.test(text(entry?.label)) && !/체크아웃/.test(text(entry?.label)));
  const separateCheckOut = basicInfo.find((entry) => /체크아웃/.test(text(entry?.label)) && !/체크인/.test(text(entry?.label)));
  const checkInOutValue = combinedCheckInOut || [text(separateCheckIn?.value), text(separateCheckOut?.value)].filter(Boolean).join(" · ");
  const breakfastValue = normalizeBreakfastFact(findBasicInfoValue("조식"));
  const luggageValue = normalizeLuggageFact(findBasicInfoValue("짐 보관", "수하물 보관", "캐리어 보관"));

  const stayFacts = [
    breakfastValue ? { label: "조식", value: breakfastValue } : null,
    luggageValue ? { label: "짐 보관", value: luggageValue } : null,
    checkInOutValue ? { label: "체크인 · 체크아웃", value: checkInOutValue } : null
  ].filter(Boolean);

  const locationFacts = buildHeroLocationFacts(data, quickPoints);
  const ratingRaw = options.guestRating ?? hotel.guestRating ?? hotel.guest_rating ?? findBasicInfoValue("투숙객 평점", "호텔 평점", "평점");
  const reviewCountRaw = options.reviewCount ?? hotel.reviewCount ?? hotel.review_count ?? findBasicInfoValue("리뷰 수", "리뷰수", "후기 수", "후기수");
  const overviewMeta = [
    text(hotel.grade),
    ratingSummaryLabel(ratingRaw),
    reviewVolumeLabel(reviewCountRaw)
  ].filter(Boolean);

  const overviewEyebrow = [text(hotel.country), text(hotel.city), text(hotel.area)].filter(Boolean).join(" · ");

  return `
  <main id="main-content" class="hotel-review-json-page">
    ${text(options.draftPreviewBannerHtml)}
    <div class="hrj-shell">
      <article class="hrj-article">
        <div class="hrj-article__inner">
          <div class="hrj-breadcrumb"><span>${escapeHtml(text(hotel.country))}</span><span>›</span><span>${escapeHtml(text(hotel.city))}</span><span>›</span><span>${escapeHtml(text(hotel.nameKo))}</span></div>
          <header class="hrj-header">
            <h1 class="hrj-title">${escapeHtml(text(article.title))}</h1>
            ${intro}
            <div class="hrj-meta">${meta.map((item, index) => index === 0 ? `<span class="hrj-meta__tag">${escapeHtml(item)}</span>` : `<span>${escapeHtml(item)}</span>`).join("")}</div>
          </header>
          <section class="hrj-booking-overview" aria-label="예약 전 확인할 기본 정보">
            <div class="hrj-booking-overview__media">${imageHtml}</div>
            <div class="hrj-basic-info">
              ${overviewEyebrow ? `<div class="hrj-basic-info__eyebrow">${escapeHtml(overviewEyebrow)}</div>` : ""}
              <h2 class="hrj-basic-info__title">${escapeHtml(text(hotel.nameKo) || "예약 전 확인할 기본 정보")}</h2>
              ${overviewMeta.length ? `<div class="hrj-basic-info__meta" aria-label="호텔 등급 및 평가 요약">${overviewMeta.map((item) => `<span class="hrj-basic-info__meta-item">${escapeHtml(item)}</span>`).join("")}</div>` : ""}
              ${stayFacts.length ? `<div class="hrj-basic-info__grid hrj-basic-info__grid--stay${locationFacts.length ? "" : " hrj-basic-info__grid--last"}">${stayFacts.map((item) => `<div class="hrj-basic-info__item"><span class="hrj-basic-info__label">${escapeHtml(text(item.label))}</span><span class="hrj-basic-info__value">${escapeHtml(text(item.value))}</span></div>`).join("")}</div>` : ""}
              ${locationFacts.length ? `<div class="hrj-basic-info__grid hrj-basic-info__grid--location hrj-basic-info__grid--last">${locationFacts.map((item) => `<div class="hrj-basic-info__item"><span class="hrj-basic-info__label">${escapeHtml(text(item.label))}</span><span class="hrj-basic-info__value">${escapeHtml(text(item.value))}</span>${text(item.sub) ? `<span class="hrj-basic-info__sub">${escapeHtml(text(item.sub))}</span>` : ""}</div>`).join("")}</div>` : ""}
              ${basicInfoCta}
            </div>
          </section>
          ${affiliateDisclosureHtml}
          ${quickPoints.length ? `<section class="hrj-quick-card" aria-labelledby="hrjQuickOverviewTitle">
            <div class="hrj-quick-card__head"><div><h2 id="hrjQuickOverviewTitle">한눈에 보는 핵심 포인트</h2><p class="hrj-quick-card__desc">숙소 주변 환경과 이동 편의, 어떤 여행에 잘 맞는지 빠르게 확인해보세요.</p></div><span class="hrj-quick-card__badge">${quickPoints.length}가지 핵심 체크</span></div>
            <div class="hrj-quick-grid">${quickPoints.map((item) => `<article class="hrj-quick-item hrj-quick-item--${escapeHtml(text(item?.category))}"><div class="hrj-quick-item__top"><h3 class="hrj-quick-item__label">${escapeHtml(text(item?.label))}</h3>${text(item?.hint) ? `<span class="hrj-quick-item__hint">${escapeHtml(text(item?.hint))}</span>` : ""}</div><p class="hrj-quick-item__value">${escapeHtml(text(item?.value))}</p></article>`).join("")}</div>
          </section>` : ""}
          <div class="hrj-content">${renderHotelReviewSections(data)}</div>
          ${text(options.relatedPostsHtml) ? `<div class="hrj-related">${options.relatedPostsHtml}</div>` : ""}
        </div>
      </article>
    </div>
  </main>`;
}
