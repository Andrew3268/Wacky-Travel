import { escapeHtml } from "../../functions/_utils.js";

export const HOTEL_REVIEW_SCHEMA_VERSION = "hotel-review-v1.1";
export const HOTEL_REVIEW_SCHEMA_VERSIONS = Object.freeze(["hotel-review-v1.0", "hotel-review-v1.1"]);
const HOTEL_REVIEW_SCHEMA_SET = new Set(HOTEL_REVIEW_SCHEMA_VERSIONS);
export const HOTEL_REVIEW_BLOCK_TYPES = Object.freeze([
  "paragraph",
  "paragraphRich",
  "subheading",
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
      guest_rating: "",
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

export function renderHotelReviewBlock(block = {}) {
  switch (text(block.type)) {
    case "paragraph":
      return `<p>${escapeHtml(text(block.text))}</p>`;
    case "paragraphRich":
      return `<p>${renderRich(block.parts)}</p>`;
    case "subheading":
      return `<h3>${escapeHtml(text(block.text))}</h3>`;
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
            <div><div class="hrj-access-summary__places">${escapeHtml(text(item?.places))}</div><div class="hrj-access-summary__desc">${escapeHtml(text(item?.desc))}</div></div>
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
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 14 7.2-2.2L7 5.2 8.7 4l5.5 6.5 4.7-1.5c1.3-.4 2.3.1 2.6.9.3.9-.4 1.7-1.7 2.1l-4.8 1.5-1 8-2 .6-1.8-7.3L4 16z"/></svg>`;
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

function renderLocationMapListItem(item = {}, categoryKey = "") {
  const type = mapIconKind(item.type);
  return `<button class="hrj-map-place" type="button" data-hrj-map-place="${escapeHtml(text(item.id))}" data-map-category="${escapeHtml(text(categoryKey))}">
    <span class="hrj-map-place__icon hrj-map-place__icon--${type}">${renderMapSvg(item.type)}</span>
    <span class="hrj-map-place__body"><strong>${escapeHtml(text(item.nameKo))}</strong></span>
    <span class="hrj-map-place__arrow" aria-hidden="true">›</span>
  </button>`;
}

export function renderHotelReviewLocationMap(data = {}) {
  const config = locationMapConfig(data);
  if (!config) return "";
  const safeConfig = escapeHtml(JSON.stringify(config));
  const hasEstimated = config.categories.some((category) => array(category.items).some((item) => text(item?.travel?.sourceType) === "estimated"));
  return `<section class="hrj-location-map" data-hrj-location-map data-map-config="${safeConfig}" aria-label="호텔 주변 지도">
    <div class="hrj-location-map__head">
      <div><span class="hrj-location-map__eyebrow">MAP</span><h3>호텔 주변 지도</h3><p>호텔을 기준으로 주요 명소와 맛집의 위치를 한눈에 확인할 수 있습니다.</p></div>
    </div>
    <div class="hrj-map-tabs" role="tablist" aria-label="지도 장소 분류">${config.categories.map((category) => {
      const active = text(category.key) === config.defaultCategory;
      return `<button type="button" class="hrj-map-tab${active ? " is-active" : ""}" role="tab" aria-selected="${active ? "true" : "false"}" data-hrj-map-tab="${escapeHtml(text(category.key))}">${escapeHtml(text(category.label))}<span>${array(category.items).length}</span></button>`;
    }).join("")}</div>
    <div class="hrj-map-canvas-wrap">
      <div class="hrj-map-controls" aria-label="지도 보기 범위">
        <button type="button" class="hrj-map-control" data-hrj-map-center aria-label="호텔을 지도 중심으로 보기">호텔 중심</button>
        <button type="button" class="hrj-map-control" data-hrj-map-all aria-label="현재 분류의 모든 장소 보기">전체 보기</button>
      </div>
      <div class="hrj-map-skeleton" data-hrj-map-skeleton><span></span><p>지도를 불러오는 중입니다.</p></div>
      <div class="hrj-map-canvas" data-hrj-map-canvas aria-label="${escapeHtml(config.hotel.name)} 주변 위치 지도"></div>
    </div>
    <div class="hrj-map-panels">${config.categories.map((category) => {
      const active = text(category.key) === config.defaultCategory;
      return `<div class="hrj-map-panel${active ? " is-active" : ""}" data-hrj-map-panel="${escapeHtml(text(category.key))}"${active ? "" : " hidden"}>${array(category.items).map((item) => renderLocationMapListItem(item, category.key)).join("")}</div>`;
    }).join("")}</div>
    <p class="hrj-map-note">${hasEstimated ? "일부 도보·차량 시간은 좌표 기반 예상값이며 실제 도로와 교통 상황에 따라 달라질 수 있습니다. " : ""}지도는 사용자 현재 위치를 사용하지 않습니다.</p>
  </section>`;
}

export function renderHotelReviewToc(data = {}) {
  return array(data.sections).map((section) => `<li><a href="#${escapeHtml(text(section?.id))}">${escapeHtml(text(section?.number))}. ${escapeHtml(text(section?.label))}</a></li>`).join("");
}

export function renderHotelReviewSections(data = {}) {
  const mapHtml = renderHotelReviewLocationMap(data);
  return array(data.sections).map((section) => {
    const blocks = array(section?.blocks);
    const isAttractionsTransport = text(section?.id) === "attractions-transport";
    let insertedMap = false;
    const body = blocks.map((block) => {
      const type = text(block?.type);

      // locationMap data가 있으면 기존 locationTable 자리를 지도로 대체한다.
      // 기존 v1.0처럼 locationMap이 없는 글에서는 locationTable을 그대로 유지한다.
      if (isAttractionsTransport && type === "locationTable" && mapHtml) {
        if (insertedMap) return "";
        insertedMap = true;
        return mapHtml;
      }

      return renderHotelReviewBlock(block);
    }).join("");

    const sectionBody = isAttractionsTransport && mapHtml && !insertedMap
      ? `${mapHtml}${body}`
      : body;

    return `
    <section class="hrj-chapter" id="${escapeHtml(text(section?.id))}">
      <div class="hrj-chapter-index">${escapeHtml(text(section?.number))}. ${escapeHtml(text(section?.label))}</div>
      <h2>${escapeHtml(text(section?.heading))}</h2>
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
  array(data?.article?.quickPoints).forEach((item) => { push(item?.label); push(item?.value); });
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
      array(block?.items).forEach((item) => { push(item?.level); push(item?.places); push(item?.desc); push(item?.title); push(item?.text); });
      array(block?.pros).forEach((item) => { push(item?.title); push(item?.text); });
      array(block?.cons).forEach((item) => { push(item?.title); push(item?.text); });
      array(block?.good).forEach(push); array(block?.bad).forEach(push);
    });
  });
  return chunks.join(" ");
}

export function renderHotelReviewLayout(data = {}, options = {}) {
  const hotel = isObject(data.hotel) ? data.hotel : {};
  const article = isObject(data.article) ? data.article : {};
  const basicInfo = array(article.basicInfo);
  const quickPoints = array(article.quickPoints);
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
              <h2 class="hrj-basic-info__title">예약 전 확인할 기본 정보</h2>
              <p class="hrj-basic-info__desc">숙소 선택 전에 빠르게 확인하면 좋은 객관적인 정보만 정리했습니다.</p>
              <div class="hrj-basic-info__grid">${basicInfo.map((item) => `<div class="hrj-basic-info__item"><span class="hrj-basic-info__label">${escapeHtml(text(item?.label))}</span><span class="hrj-basic-info__value">${escapeHtml(text(item?.value))}</span></div>`).join("")}</div>
              ${basicInfoCta}
            </div>
          </section>
          ${affiliateDisclosureHtml}
          <section class="hrj-quick-card">
            <div class="hrj-quick-card__head"><div><h2>한눈에 보는 핵심 포인트</h2><p class="hrj-quick-card__desc">숙소를 고를 때 먼저 확인할 내용을 간단히 정리했습니다.</p></div><span>${escapeHtml(text(hotel.grade))}</span></div>
            <div class="hrj-quick-grid">${quickPoints.map((item) => `<div class="hrj-quick-item"><div class="hrj-quick-item__label">${escapeHtml(text(item?.label))}</div><div class="hrj-quick-item__value">${escapeHtml(text(item?.value))}</div></div>`).join("")}</div>
          </section>
          <div class="hrj-content">${renderHotelReviewSections(data)}</div>
          ${text(options.relatedPostsHtml) ? `<div class="hrj-related">${options.relatedPostsHtml}</div>` : ""}
        </div>
      </article>
    </div>
  </main>`;
}
