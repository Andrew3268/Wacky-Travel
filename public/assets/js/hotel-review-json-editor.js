(() => {
  const SCHEMA_VERSION = "hotel-review-v1.0";
  const BLOCK_TYPES = new Set(["paragraph","paragraphRich","subheading","locationTable","accessSummary","insight","reviewProsCons","roomOptions","fitGrid","finalVerdict"]);
  const $ = (id) => document.getElementById(id);
  let data = null;
  let fileName = "";
  let loadedLegacy = false;

  const text = (value = "") => String(value ?? "").trim();
  const arr = (value) => Array.isArray(value) ? value : [];
  const obj = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);
  const normalizeContentType = (value = "") => {
    const raw = text(value).toLowerCase().replace(/\s+/g, "_");
    if (["hotel_intro","hotel-review","hotel_review","추천_호텔_리뷰","추천호텔리뷰"].includes(raw)) return "hotel_intro";
    return raw;
  };
  const isHotelType = () => normalizeContentType($("content_type")?.value || "") === "hotel_intro";
  const getFormat = () => text($("content_format")?.value || "markdown").toLowerCase() === "json" ? "json" : "markdown";
  const isJsonMode = () => isHotelType() && getFormat() === "json";


  function extractTripcomSidebarUrl(value = "") {
    const raw = String(value || "").trim();
    if (!raw) return "";
    const iframeMatch = raw.match(/<iframe\b[^>]*\bsrc\s*=\s*(["'])(.*?)\1/i);
    return String(iframeMatch?.[2] || raw)
      .replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;|&apos;/gi, "'")
      .trim();
  }

  function validateTripcomInput(value = "") {
    const candidate = extractTripcomSidebarUrl(value);
    if (!candidate) return { ok:true, url:"", error:"" };
    try {
      const url = new URL(candidate);
      if (url.protocol !== "https:" || url.hostname.toLowerCase() !== "kr.trip.com" || !url.pathname.startsWith("/partners/ad/")) {
        return { ok:false, url:"", error:"kr.trip.com/partners/ad/ 형식의 트립닷컴 제휴 iframe만 사용할 수 있습니다." };
      }
      url.hash = "";
      return { ok:true, url:url.toString(), error:"" };
    } catch (_) {
      return { ok:false, url:"", error:"트립닷컴 iframe 코드 또는 올바른 제휴 URL을 입력해 주세요." };
    }
  }

  function buildTripcomIframeCode(url = "") {
    const safe = String(url || "").trim();
    if (!safe) return "";
    return `<iframe border="0" src="${safe}" style="width:320px;height:320px" frameborder="0" scrolling="no" style="border:none"></iframe>`;
  }

  function renderTripcomStatus() {
    const input = $("hotelReviewTripcomCode");
    const status = $("hotelReviewTripcomStatus");
    if (!input || !status) return { ok:true, url:"", error:"" };
    const result = validateTripcomInput(input.value);
    status.classList.toggle("is-valid", result.ok && Boolean(result.url));
    status.classList.toggle("is-error", !result.ok);
    if (!String(input.value || "").trim()) {
      status.textContent = "코드를 입력하지 않으면 기존 호텔 정보 카드가 표시됩니다.";
    } else if (result.ok) {
      status.textContent = "트립닷컴 제휴 코드 확인 완료 · 첫 번째 사이드바 카드에 표시됩니다.";
    } else {
      status.textContent = result.error;
    }
    return result;
  }

  function validateTripcomForSave() {
    if (!isHotelType()) return { ok:true, url:"", errors:[] };
    const result = renderTripcomStatus();
    return result.ok
      ? { ok:true, url:result.url, errors:[] }
      : { ok:false, url:"", errors:[result.error || "트립닷컴 제휴 코드를 확인해 주세요."] };
  }

  function validate(input) {
    const errors = [];
    if (!obj(input)) return { ok:false, errors:["호텔 리뷰 JSON 최상위 값은 객체여야 합니다."] };
    if (text(input.schemaVersion) !== SCHEMA_VERSION) errors.push(`schemaVersion은 '${SCHEMA_VERSION}'이어야 합니다.`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(text(input.slug))) errors.push("slug는 영문 소문자·숫자·하이픈 형식이어야 합니다.");
    if (!obj(input.hotel)) errors.push("hotel 객체가 필요합니다.");
    else {
      if (!text(input.hotel.nameKo)) errors.push("hotel.nameKo가 필요합니다.");
      if (!text(input.hotel.country)) errors.push("hotel.country가 필요합니다.");
      if (!text(input.hotel.city)) errors.push("hotel.city가 필요합니다.");
    }
    if (!obj(input.seo) || !text(input.seo.title) || !text(input.seo.description)) errors.push("seo.title과 seo.description이 필요합니다.");
    if (!obj(input.article)) errors.push("article 객체가 필요합니다.");
    else {
      if (!text(input.article.title)) errors.push("article.title이 필요합니다.");
      if (!arr(input.article.intro).length) errors.push("article.intro가 1개 이상 필요합니다.");
      if (!arr(input.article.basicInfo).length) errors.push("article.basicInfo가 1개 이상 필요합니다.");
      if (!arr(input.article.quickPoints).length) errors.push("article.quickPoints가 1개 이상 필요합니다.");
    }
    if (!arr(input.sections).length) errors.push("sections가 1개 이상 필요합니다.");
    const ids = new Set();
    arr(input.sections).forEach((section, si) => {
      if (!obj(section)) { errors.push(`sections[${si}]는 객체여야 합니다.`); return; }
      if (!text(section.id) || !text(section.number) || !text(section.label) || !text(section.heading)) errors.push(`sections[${si}]의 number/id/label/heading이 필요합니다.`);
      if (ids.has(text(section.id))) errors.push(`sections[${si}].id가 중복되었습니다.`);
      ids.add(text(section.id));
      if (!arr(section.blocks).length) errors.push(`sections[${si}].blocks가 1개 이상 필요합니다.`);
      arr(section.blocks).forEach((block, bi) => {
        const type = text(block?.type);
        if (!BLOCK_TYPES.has(type)) errors.push(`sections[${si}].blocks[${bi}].type '${type || "(없음)"}'은 지원하지 않습니다.`);
        if (type === "reviewProsCons" && (!arr(block?.pros).length || !arr(block?.cons).length)) errors.push(`sections[${si}].blocks[${bi}] reviewProsCons에는 pros와 cons가 모두 필요합니다.`);
      });
    });
    return { ok: errors.length === 0, errors };
  }

  function setStatus(message, state = "") {
    const status = $("hotelReviewJsonStatus");
    const drop = $("hotelReviewJsonDrop");
    if (status) {
      status.textContent = message;
      status.classList.toggle("is-valid", state === "valid");
      status.classList.toggle("is-error", state === "error");
    }
    if (drop) {
      drop.classList.toggle("is-valid", state === "valid");
      drop.classList.toggle("is-error", state === "error");
    }
  }

  function setField(id, value, { onlyIfEmpty = false } = {}) {
    const el = $(id);
    if (!el) return;
    if (onlyIfEmpty && text(el.value)) return;
    el.value = value ?? "";
    el.dispatchEvent(new Event("input", { bubbles:true }));
    if (el.tagName === "SELECT") el.dispatchEvent(new Event("change", { bubbles:true }));
  }

  function applyJsonToForm(input) {
    if (!input) return;
    setField("title", text(input.article?.title || input.seo?.title));
    setField("meta_description", text(input.seo?.description));
    setField("summary", arr(input.article?.intro).map(text).filter(Boolean)[0] || text(input.seo?.description));
    const featured = obj(input.article?.featuredImage) ? input.article.featuredImage : {};
    if (text(featured.src)) setField("cover_image", text(featured.src));
    if (text(featured.alt)) setField("cover_image_alt", text(featured.alt));
    setField("heroHotelName", text(input.hotel?.nameKo));
    setField("heroHotelNameEn", text(input.hotel?.nameEn));
    setField("heroHotelLocationType", text(input.hotel?.area));
    const grade = text(input.hotel?.grade).match(/([1-5])/i)?.[1] || "";
    if (grade) setField("heroHotelStarRating", grade);
    updateSlugPreview();
  }

  function updateSlugPreview() {
    const preview = $("slugPreview");
    if (preview && isJsonMode() && data?.slug) preview.value = text(data.slug);
  }

  function renderSummary() {
    const summary = $("hotelReviewJsonSummary");
    if (!summary) return;
    if (!data) { summary.innerHTML = ""; return; }
    const items = [
      ["파일", fileName || "저장된 JSON"],
      ["스키마", text(data.schemaVersion)],
      ["호텔", text(data.hotel?.nameKo)],
      ["도시", [text(data.hotel?.country), text(data.hotel?.city)].filter(Boolean).join(" · ")],
      ["슬러그", text(data.slug)],
      ["섹션", `${arr(data.sections).length}개`]
    ];
    summary.innerHTML = items.map(([label,value]) => `<div class="hotel-review-json-editor__summary-item"><span class="hotel-review-json-editor__summary-label">${escapeHtml(label)}</span><span class="hotel-review-json-editor__summary-value">${escapeHtml(value)}</span></div>`).join("");
  }

  function escapeHtml(value = "") {
    return String(value).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  }

  function setData(input, name = "") {
    const result = validate(input);
    if (!result.ok) {
      data = null;
      fileName = name || "";
      const hidden = $("hotelReviewJsonValue");
      if (hidden) hidden.value = "";
      renderSummary();
      setStatus(`JSON 검증 실패\n- ${result.errors.slice(0,8).join("\n- ")}${result.errors.length > 8 ? `\n외 ${result.errors.length - 8}개` : ""}`, "error");
      syncVisibility();
      return result;
    }
    data = input;
    fileName = name || fileName || "저장된 JSON";
    loadedLegacy = false;
    if ($("content_format")) $("content_format").value = "json";
    if ($("hotelReviewJsonValue")) $("hotelReviewJsonValue").value = JSON.stringify(input);
    applyJsonToForm(input);
    renderSummary();
    setStatus(`JSON 검증 완료 · ${arr(input.sections).length}개 섹션 · ${text(input.hotel?.nameKo)}`, "valid");
    syncVisibility();
    document.dispatchEvent(new CustomEvent("hotel-review-json-change", { detail:{ data:input } }));
    return result;
  }

  async function readFile(file) {
    if (!file) return;
    try {
      const raw = await file.text();
      const parsed = JSON.parse(raw);
      setData(parsed, file.name);
    } catch (error) {
      data = null;
      if ($("hotelReviewJsonValue")) $("hotelReviewJsonValue").value = "";
      renderSummary();
      setStatus(`JSON 파일을 읽지 못했습니다. ${error?.message || "문법을 확인해 주세요."}`, "error");
    }
  }

  function setReadonlyForJsonMode(enabled) {
    for (const id of ["title","meta_description","summary"]) {
      const el = $(id);
      if (!el) continue;
      el.readOnly = Boolean(enabled);
      el.setAttribute("aria-readonly", enabled ? "true" : "false");
    }
  }

  function syncVisibility() {
    const hotel = isHotelType();
    const formatEl = $("content_format");
    if (hotel && formatEl && !text(formatEl.value)) formatEl.value = loadedLegacy ? "markdown" : "json";
    const jsonMode = hotel && getFormat() === "json";
    const editor = $("hotelReviewJsonEditor");
    if (editor) { editor.hidden = !hotel; editor.setAttribute("aria-hidden", hotel ? "false" : "true"); }
    const legacyNotice = $("hotelReviewLegacyNotice");
    if (legacyNotice) legacyNotice.hidden = !(hotel && !jsonMode && loadedLegacy);
    const tripcomSection = $("hotelReviewTripcomSection");
    if (tripcomSection) tripcomSection.hidden = !jsonMode;
    const markdownIds = ["contentMarkdownSection","contentLinkManager","faqMarkdownField","inlineImageEditorCard","markdownTocCard"];
    markdownIds.forEach((id) => { const el=$(id); if (el) { el.hidden = jsonMode; el.setAttribute("aria-hidden", jsonMode ? "true" : "false"); } });
    setReadonlyForJsonMode(jsonMode);
    updateSlugPreview();
  }

  function setHotelModeDefault() {
    if (!isHotelType()) {
      if ($("content_format")) $("content_format").value = "markdown";
      syncVisibility();
      return;
    }
    if (!loadedLegacy && $("content_format") && !data) $("content_format").value = "json";
    syncVisibility();
  }

  function loadFromServer(item = {}) {
    setField("hotelReviewPickLabel", text(item.hotel_pick_label || ""));
    setField("hotelReviewPriceUrl", text(item.hotel_hero?.price_url || ""));
    setField("heroHotelPriceUrl", text(item.hotel_hero?.price_url || ""));
    const tripcomUrl = text(item.tripcom_sidebar_ad_url || "");
    if ($("hotelReviewTripcomCode")) $("hotelReviewTripcomCode").value = buildTripcomIframeCode(tripcomUrl);
    renderTripcomStatus();
    const format = text(item.content_format || "markdown").toLowerCase() === "json" ? "json" : "markdown";
    if ($("content_format")) $("content_format").value = format;
    if (format === "json") {
      loadedLegacy = false;
      let parsed = null;
      try { parsed = obj(item.content_json) ? item.content_json : JSON.parse(text(item.content_json || "{}")); } catch (_) {}
      if (parsed) setData(parsed, "저장된 JSON");
      else {
        data = null;
        setStatus("저장된 JSON을 읽지 못했습니다. 새 JSON 파일을 업로드해 주세요.", "error");
      }
    } else {
      loadedLegacy = normalizeContentType(item.content_type || "") === "hotel_intro";
      data = null;
      if ($("hotelReviewJsonValue")) $("hotelReviewJsonValue").value = "";
      setStatus(loadedLegacy ? "기존 Markdown 방식으로 저장된 추천 호텔 리뷰입니다. 그대로 수정할 수 있으며, JSON 파일을 업로드하면 새 JSON 방식으로 전환됩니다." : "JSON 파일을 선택해 주세요.");
    }
    syncVisibility();
  }

  function validateForSave() {
    if (!isJsonMode()) return { ok:true, errors:[] };
    const raw = text($("hotelReviewJsonValue")?.value || "");
    if (!raw) return { ok:false, errors:["추천 호텔 리뷰 JSON 파일을 업로드해 주세요."] };
    try {
      const parsed = JSON.parse(raw);
      const result = validate(parsed);
      if (result.ok) data = parsed;
      return result;
    } catch (_) {
      return { ok:false, errors:["호텔 리뷰 JSON 문법이 올바르지 않습니다."] };
    }
  }

  function getPayload() {
    const tripcom = validateTripcomInput($("hotelReviewTripcomCode")?.value || "");
    return {
      content_format: isJsonMode() ? "json" : "markdown",
      content_json: isJsonMode() ? text($("hotelReviewJsonValue")?.value || "") : "",
      tripcom_sidebar_ad_url: isHotelType() && tripcom.ok ? tripcom.url : ""
    };
  }

  function renderAdminPreview() {
    if (!data) return "";
    const intro = arr(data.article?.intro).map((p) => `<p class="hotel-review-json-preview__intro">${escapeHtml(text(p))}</p>`).join("");
    const quick = arr(data.article?.quickPoints).slice(0,6).map((item) => `<div class="hotel-review-json-preview__item"><small>${escapeHtml(text(item?.label))}</small>${escapeHtml(text(item?.value))}</div>`).join("");
    const sections = arr(data.sections).map((section) => `<div class="hotel-review-json-preview__section">${escapeHtml(text(section?.number))}. ${escapeHtml(text(section?.label))} · ${escapeHtml(text(section?.heading))}</div>`).join("");
    return `<div class="hotel-review-json-preview"><article class="hotel-review-json-preview__paper"><div class="hotel-review-json-preview__eyebrow">${escapeHtml(text(data.hotel?.city))} 호텔 리뷰 · JSON SSR</div><h1>${escapeHtml(text(data.article?.title))}</h1>${intro}<div class="hotel-review-json-preview__grid">${quick}</div><div class="hotel-review-json-preview__sections">${sections}</div></article></div>`;
  }

  function init() {
    $("hotelReviewJsonFile")?.addEventListener("change", (event) => readFile(event.target.files?.[0]));
    $("hotelReviewPriceUrl")?.addEventListener("input", () => {
      if ($("heroHotelPriceUrl")) $("heroHotelPriceUrl").value = $("hotelReviewPriceUrl").value;
    });
    $("hotelReviewTripcomCode")?.addEventListener("input", renderTripcomStatus);
    $("content_type")?.addEventListener("change", setHotelModeDefault);
    setHotelModeDefault();
  }

  window.HotelReviewJsonEditor = {
    init,
    isJsonMode,
    syncVisibility,
    loadFromServer,
    validateForSave,
    validateTripcomForSave,
    getPayload,
    getData: () => data,
    getSlug: () => isJsonMode() ? text(data?.slug) : "",
    renderAdminPreview,
    validate,
    setData
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once:true });
  else init();
})();
