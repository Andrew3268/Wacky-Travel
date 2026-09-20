import { escapeHtml } from "../../functions/_utils.js";

export const HOTEL_REVIEW_SCHEMA_VERSION = "hotel-review-v1.0";
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

  if (text(data.schemaVersion) !== HOTEL_REVIEW_SCHEMA_VERSION) {
    errors.push(`schemaVersion은 '${HOTEL_REVIEW_SCHEMA_VERSION}'이어야 합니다.`);
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
  }

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

export function renderHotelReviewToc(data = {}) {
  return array(data.sections).map((section) => `<li><a href="#${escapeHtml(text(section?.id))}">${escapeHtml(text(section?.number))}. ${escapeHtml(text(section?.label))}</a></li>`).join("");
}

export function renderHotelReviewSections(data = {}) {
  return array(data.sections).map((section) => `
    <section class="hrj-chapter" id="${escapeHtml(text(section?.id))}">
      <div class="hrj-chapter-index">${escapeHtml(text(section?.number))}. ${escapeHtml(text(section?.label))}</div>
      <h2>${escapeHtml(text(section?.heading))}</h2>
      ${array(section?.blocks).map(renderHotelReviewBlock).join("")}
    </section>
  `).join("");
}

export function getHotelReviewPlainText(data = {}) {
  const chunks = [];
  const push = (value) => { const v = text(value); if (v) chunks.push(v); };
  push(data?.article?.title);
  array(data?.article?.intro).forEach(push);
  array(data?.article?.basicInfo).forEach((item) => { push(item?.label); push(item?.value); });
  array(data?.article?.quickPoints).forEach((item) => { push(item?.label); push(item?.value); });
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
  const toc = renderHotelReviewToc(data);
  const intro = array(article.intro).map((item) => `<p class="hrj-lede">${escapeHtml(text(item))}</p>`).join("");
  const published = text(options.publishedDate);
  const updated = text(options.updatedDate);
  const meta = [text(hotel.city) ? `${text(hotel.city)} 호텔 리뷰` : "호텔 리뷰", updated ? `업데이트 ${updated}` : (published ? `발행 ${published}` : "")].filter(Boolean);
  const imageHtml = text(options.coverImageHtml);
  const affiliateDisclosureHtml = text(options.affiliateDisclosureHtml);
  const availabilityUrl = safeHttpUrl(options.availabilityUrl);
  const availabilityButton = availabilityUrl
    ? `<a class="hrj-side-cta" href="${escapeHtml(availabilityUrl)}" target="_blank" rel="sponsored noopener noreferrer">잔여 객실 확인</a>`
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
            ${imageHtml}
            ${affiliateDisclosureHtml}
          </header>
          <section class="hrj-basic-info">
            <h2 class="hrj-basic-info__title">예약 전 확인할 기본 정보</h2>
            <p class="hrj-basic-info__desc">등급·규모·객실 크기처럼 예약 전에 확인할 객관적인 호텔 정보입니다.</p>
            <div class="hrj-basic-info__grid">${basicInfo.map((item) => `<div class="hrj-basic-info__item"><span class="hrj-basic-info__label">${escapeHtml(text(item?.label))}</span><span class="hrj-basic-info__value">${escapeHtml(text(item?.value))}</span></div>`).join("")}</div>
          </section>
          <section class="hrj-quick-card">
            <div class="hrj-quick-card__head"><div><h2>한눈에 보는 핵심 포인트</h2><p class="hrj-quick-card__desc">숙소를 고를 때 먼저 확인할 내용을 간단히 정리했습니다.</p></div><span>${escapeHtml(text(hotel.grade))}</span></div>
            <div class="hrj-quick-grid">${quickPoints.map((item) => `<div class="hrj-quick-item"><div class="hrj-quick-item__label">${escapeHtml(text(item?.label))}</div><div class="hrj-quick-item__value">${escapeHtml(text(item?.value))}</div></div>`).join("")}</div>
          </section>
          <nav class="hrj-mobile-toc" aria-label="이 글의 목차"><div class="hrj-mobile-toc__title">이 글의 목차</div><ol>${toc}</ol></nav>
          <div class="hrj-content">${renderHotelReviewSections(data)}</div>
          ${text(options.relatedPostsHtml) ? `<div class="hrj-related">${options.relatedPostsHtml}</div>` : ""}
        </div>
      </article>
      <aside class="hrj-sidebar" aria-label="호텔 리뷰 요약">
        <div class="hrj-sidecard">
          <div class="hrj-hotel-mini__name">${escapeHtml(text(hotel.nameKo))}</div>
          <div class="hrj-hotel-mini">
            ${text(hotel.nameEn) ? `<div class="hrj-hotel-mini__row"><span>영문명</span><span>${escapeHtml(text(hotel.nameEn))}</span></div>` : ""}
            ${text(hotel.area) ? `<div class="hrj-hotel-mini__row"><span>지역</span><span>${escapeHtml(text(hotel.area))}</span></div>` : ""}
            ${text(hotel.grade) ? `<div class="hrj-hotel-mini__row"><span>등급</span><span>${escapeHtml(text(hotel.grade))}</span></div>` : ""}
            ${text(hotel.type) ? `<div class="hrj-hotel-mini__row"><span>유형</span><span>${escapeHtml(text(hotel.type))}</span></div>` : ""}
            ${text(hotel.airport) ? `<div class="hrj-hotel-mini__row"><span>공항</span><span>${escapeHtml(text(hotel.airport))}</span></div>` : ""}
          </div>
          ${availabilityButton}
        </div>
        <div class="hrj-sidecard"><div class="hrj-sidecard__title">이 글의 목차</div><ul class="hrj-side-toc">${toc}</ul></div>
        ${text(options.sidebarAdHtml) ? `<div class="hrj-sidecard">${options.sidebarAdHtml}</div>` : ""}
      </aside>
    </div>
  </main>`;
}
