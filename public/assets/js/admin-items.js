const $ = (id) => document.getElementById(id);

const DEFAULT_TRAVEL_CONTENT_TYPES = [
  { slug: "top5_series", label: "여행 스타일별 호텔 추천", description: "여행 스타일에 맞춰 호텔을 비교해볼 수 있는 추천 콘텐츠" },
  { slug: "hotel_intro", label: "호텔 하나씩 살펴보기", description: "호텔 하나를 차분히 살펴보는 소개 콘텐츠" },
  { slug: "travel_tip", label: "여행이 쉬워지는 작은 팁", description: "여행 준비와 이동에 도움이 되는 작은 팁" }
];

let travelContentTypeItems = [...DEFAULT_TRAVEL_CONTENT_TYPES];
let countryItems = [];
let destinationItems = [];
let regionItems = [];
let recommendationCategoryItems = [];
let destinationCountryFilter = "all";
let regionCountryFilter = "all";

function escapeHtml(value = "") {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeText(value = "") {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function slugify(str) {
  return String(str || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-가-힣]/g, "")
    .replace(/\-+/g, "-")
    .replace(/^\-+|\-+$/g, "");
}

function countryToSlug(value) {
  const raw = normalizeText(value);
  if (!raw) return "";
  const alias = { 베트남: "vietnam", 일본: "japan", 태국: "thailand", 필리핀: "philippines", 대만: "taiwan", 한국: "korea", 대한민국: "korea" }[raw];
  if (alias) return alias;
  return slugify(raw.replace(/&/g, " and "));
}

function getCountrySlugFromDestination(destination) {
  return String(destination?.country_slug || destination?.countrySlug || "").trim() || countryToSlug(destination?.country || "");
}

function getCountryNameBySlug(slug) {
  const found = countryItems.find((item) => String(item.slug || "") === String(slug || ""));
  return found?.name || normalizeText(slug);
}

function getDestinationLabel(destination) {
  if (!destination) return "";
  const city = String(destination.city || destination.name || "").trim();
  const name = String(destination.name || "").trim();
  return city && name && city !== name ? `${name} (${city})` : (name || city || destination.slug || "");
}

function getDestinationBySlug(slug = "") {
  return destinationItems.find((item) => String(item.slug || "") === String(slug || "")) || null;
}

function getRegionLabel(region) {
  return String(region?.name || region?.slug || "").trim();
}

function getRegionDestinationSlug(region) {
  return String(region?.destination_slug || region?.destinationSlug || "").trim();
}

function getRegionCountrySlug(region) {
  return String(region?.country_slug || region?.countrySlug || "").trim() || getCountrySlugFromDestination(getDestinationBySlug(getRegionDestinationSlug(region)));
}

function getRecommendationCategoryLabel(category) {
  return String(category?.name || category?.slug || "").trim();
}

function getRecommendationCategoryDescription(category) {
  return String(category?.description || "").trim();
}

function sortByOrderThenName(a, b, labelGetter) {
  const orderA = Number(a.sort_order ?? 0) || 0;
  const orderB = Number(b.sort_order ?? 0) || 0;
  if (orderA !== orderB) return orderA - orderB;
  return labelGetter(a).localeCompare(labelGetter(b), "ko");
}

function isActiveCountry(country) {
  return Number(country?.is_active ?? 1) !== 0;
}

function getCountryTabItems() {
  return [...countryItems]
    .filter(isActiveCountry)
    .sort((a, b) => sortByOrderThenName(a, b, (item) => item.name || item.slug || ""));
}

function ensureCountryFilterValue(currentValue) {
  if (!currentValue || currentValue === "all") return "all";
  return getCountryTabItems().some((country) => String(country.slug || "") === String(currentValue)) ? currentValue : "all";
}

function countDestinationsByCountry(countrySlug = "") {
  return destinationItems.filter((item) => {
    const active = Number(item.is_active ?? 1) !== 0 && String(item.status || "published") !== "draft";
    return active && getCountrySlugFromDestination(item) === String(countrySlug || "");
  }).length;
}

function countRegionsByCountry(countrySlug = "") {
  return regionItems.filter((item) => {
    const active = Number(item.is_active ?? 1) !== 0;
    return active && getRegionCountrySlug(item) === String(countrySlug || "");
  }).length;
}

function renderCountryTabs(targetId, selectedValue, dataName, counter) {
  const tabEl = $(targetId);
  if (!tabEl) return;
  const countries = getCountryTabItems();
  const totalCount = countries.reduce((sum, country) => sum + counter(country.slug || ""), 0);
  const buttons = [
    `<button class="admin-country-tab${selectedValue === "all" ? " is-active" : ""}" type="button" role="tab" aria-selected="${selectedValue === "all" ? "true" : "false"}" data-${dataName}="all">전체 <span>${totalCount}</span></button>`,
    ...countries.map((country) => {
      const slug = String(country.slug || "");
      const active = selectedValue === slug;
      return `<button class="admin-country-tab${active ? " is-active" : ""}" type="button" role="tab" aria-selected="${active ? "true" : "false"}" data-${dataName}="${escapeHtml(slug)}">${escapeHtml(country.name || slug)} <span>${counter(slug)}</span></button>`;
    })
  ];
  tabEl.innerHTML = buttons.join("");
}

let itemStatusTimer = null;

function setStatus(message = "", isError = false) {
  const el = $("itemManagerStatus");
  if (!el) return;
  window.clearTimeout(itemStatusTimer);
  el.textContent = message;
  el.classList.toggle("is-error", Boolean(message && isError));
  el.classList.toggle("is-success", Boolean(message && !isError));
  el.classList.toggle("is-visible", Boolean(message));
  if (message) {
    const delay = isError ? 5200 : 3200;
    itemStatusTimer = window.setTimeout(() => {
      el.classList.remove("is-visible");
    }, delay);
  }
}

function focusField(id) {
  const field = $(id);
  if (!field) return;
  field.focus({ preventScroll: true });
  field.classList.add("is-invalid");
  window.setTimeout(() => field.classList.remove("is-invalid"), 1400);
}

function showRequiredMessage(message, fieldId) {
  setStatus(message || "값을 입력해 주세요.", true);
  if (fieldId) focusField(fieldId);
}

async function requestTravelSettingsApi(method = "GET", payload = null) {
  const options = {
    method,
    credentials: "same-origin",
    cache: "no-store",
    headers: { Accept: "application/json" }
  };
  if (payload && method !== "GET") {
    options.headers["content-type"] = "application/json";
    options.body = JSON.stringify(payload);
  }
  const res = await fetch(`/api/travel-settings?ts=${Date.now()}`, options);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || "항목 관리 요청에 실패했습니다.");
  return json;
}

async function loadTravelSettings(message = "") {
  try {
    const json = await requestTravelSettingsApi("GET");
    travelContentTypeItems = Array.isArray(json.content_types) && json.content_types.length ? json.content_types : [...DEFAULT_TRAVEL_CONTENT_TYPES];
    countryItems = Array.isArray(json.countries) ? json.countries : [];
    destinationItems = Array.isArray(json.destinations) ? json.destinations : [];
    regionItems = Array.isArray(json.regions) ? json.regions : [];
    recommendationCategoryItems = Array.isArray(json.recommendation_categories) ? json.recommendation_categories : [];
    renderAll();
    setStatus(message || "항목 정보를 불러왔습니다.");
  } catch (error) {
    setStatus(error.message || "항목 정보를 불러오지 못했습니다.", true);
  }
}

function activeCount(items) {
  return items.filter((item) => Number(item.is_active ?? 1) !== 0 && String(item.status || "published") !== "draft").length;
}

function renderOverview() {
  const contentTypeCount = $("itemContentTypeCount");
  const countryCount = $("itemCountryCount");
  const destinationCount = $("itemDestinationCount");
  const regionCount = $("itemRegionCount");
  const recommendationCategoryCount = $("itemRecommendationCategoryCount");
  if (contentTypeCount) contentTypeCount.textContent = String(activeCount(travelContentTypeItems));
  if (countryCount) countryCount.textContent = String(activeCount(countryItems));
  if (destinationCount) destinationCount.textContent = String(activeCount(destinationItems));
  if (regionCount) regionCount.textContent = String(activeCount(regionItems));
  if (recommendationCategoryCount) recommendationCategoryCount.textContent = String(activeCount(recommendationCategoryItems));
}

function renderContentTypeManager() {
  const listEl = $("travelContentTypeList");
  if (!listEl) return;
  const items = [...travelContentTypeItems].sort((a, b) => sortByOrderThenName(a, b, (item) => item.label || item.slug || ""));
  listEl.innerHTML = items.length
    ? items.map((item) => {
      const inactive = Number(item.is_active ?? 1) === 0;
      return `
        <div class="category-manager__item admin-items-list-item ${inactive ? "is-inactive" : ""}">
          <div>
            <div class="category-manager__name">${escapeHtml(item.label || item.slug)}</div>
            <div class="small">slug: ${escapeHtml(item.slug || "")} ${inactive ? " · 미사용" : ""}</div>
            ${item.description ? `<div class="small">${escapeHtml(item.description)}</div>` : ""}
          </div>
          <div class="category-manager__actions">
            <button class="btn" type="button" data-travel-edit-content-type="${escapeHtml(item.slug || "")}">수정</button>
            <button class="btn" type="button" data-travel-delete-content-type="${escapeHtml(item.slug || "")}">삭제</button>
          </div>
        </div>`;
    }).join("")
    : '<div class="category-manager__empty small">등록된 글 종류가 없습니다.</div>';
}

function renderCountryManager() {
  const listEl = $("travelCountryList");
  if (listEl) {
    const items = [...countryItems].sort((a, b) => sortByOrderThenName(a, b, (item) => item.name || item.slug || ""));
    listEl.innerHTML = items.length
      ? items.map((item) => {
        const inactive = Number(item.is_active ?? 1) === 0;
        return `
          <div class="category-manager__item admin-items-list-item ${inactive ? "is-inactive" : ""}">
            <div>
              <div class="category-manager__name">${escapeHtml(item.name || item.slug)}</div>
              <div class="small">slug: ${escapeHtml(item.slug || "")} ${inactive ? " · 미사용" : ""}</div>
            </div>
            <div class="category-manager__actions">
              <button class="btn" type="button" data-travel-edit-country="${escapeHtml(item.slug || "")}">수정</button>
              <button class="btn" type="button" data-travel-deactivate-country="${escapeHtml(item.slug || "")}">비활성화</button>
              <button class="btn btn--danger" type="button" data-travel-remove-country="${escapeHtml(item.slug || "")}">삭제</button>
            </div>
          </div>`;
      }).join("")
      : '<div class="category-manager__empty small">등록된 나라가 없습니다.</div>';
  }

  const activeCountries = countryItems.filter((item) => Number(item.is_active ?? 1) !== 0);
  ["newDestinationCountry", "newRegionCountry"].forEach((id) => {
    const selectEl = $(id);
    if (!selectEl) return;
    const current = selectEl.value || "";
    selectEl.innerHTML = [
      '<option value="">나라 선택</option>',
      ...activeCountries.map((country) => `<option value="${escapeHtml(country.slug || "")}">${escapeHtml(country.name || country.slug || "")}</option>`)
    ].join("");
    if (current && activeCountries.some((country) => String(country.slug || "") === current)) selectEl.value = current;
  });
}

function renderRegionDestinationSelect() {
  const selectEl = $("newRegionDestination");
  if (!selectEl) return;
  const selectedCountrySlug = $("newRegionCountry")?.value || "";
  const current = selectEl.value || "";
  const destinations = destinationItems
    .filter((item) => Number(item.is_active ?? 1) !== 0 && String(item.status || "published") !== "draft")
    .filter((item) => !selectedCountrySlug || getCountrySlugFromDestination(item) === selectedCountrySlug)
    .sort((a, b) => getDestinationLabel(a).localeCompare(getDestinationLabel(b), "ko"));
  selectEl.innerHTML = [
    '<option value="">도시 선택</option>',
    ...destinations.map((item) => `<option value="${escapeHtml(item.slug || "")}">${escapeHtml(getDestinationLabel(item))}</option>`)
  ].join("");
  if (current && destinations.some((destination) => String(destination.slug || "") === current)) selectEl.value = current;
}


function renderDestinationManager() {
  destinationCountryFilter = ensureCountryFilterValue(destinationCountryFilter);
  renderCountryTabs("destinationCountryTabs", destinationCountryFilter, "admin-destination-country-tab", countDestinationsByCountry);
  const listEl = $("travelDestinationList");
  if (!listEl) return;
  const items = [...destinationItems]
    .filter((item) => destinationCountryFilter === "all" || getCountrySlugFromDestination(item) === destinationCountryFilter)
    .sort((a, b) => sortByOrderThenName(a, b, getDestinationLabel));
  listEl.innerHTML = items.length
    ? items.map((item) => {
      const inactive = Number(item.is_active ?? 1) === 0 || String(item.status || "published") === "draft";
      return `
        <div class="category-manager__item admin-items-list-item ${inactive ? "is-inactive" : ""}">
          <div>
            <div class="category-manager__name">${escapeHtml(getDestinationLabel(item))}</div>
            <div class="small">${escapeHtml(item.country || getCountryNameBySlug(getCountrySlugFromDestination(item)) || "나라 미지정")} · slug: ${escapeHtml(item.slug || "")} ${inactive ? " · 미사용" : ""}</div>
          </div>
          <div class="category-manager__actions">
            <button class="btn" type="button" data-travel-edit-destination="${escapeHtml(item.slug || "")}">수정</button>
            <button class="btn" type="button" data-travel-deactivate-destination="${escapeHtml(item.slug || "")}">비활성화</button>
            <button class="btn btn--danger" type="button" data-travel-remove-destination="${escapeHtml(item.slug || "")}">삭제</button>
          </div>
        </div>`;
    }).join("")
    : '<div class="category-manager__empty small">선택한 나라에 등록된 도시가 없습니다.</div>';
}

function renderRegionManager() {
  regionCountryFilter = ensureCountryFilterValue(regionCountryFilter);
  renderRegionDestinationSelect();
  renderCountryTabs("regionCountryTabs", regionCountryFilter, "admin-region-country-tab", countRegionsByCountry);
  const listEl = $("travelRegionList");
  if (!listEl) return;
  const items = [...regionItems]
    .filter((item) => regionCountryFilter === "all" || getRegionCountrySlug(item) === regionCountryFilter)
    .sort((a, b) => {
      const countryCompare = getRegionCountrySlug(a).localeCompare(getRegionCountrySlug(b), "ko");
      if (countryCompare !== 0) return countryCompare;
      const destinationCompare = getRegionDestinationSlug(a).localeCompare(getRegionDestinationSlug(b), "ko");
      if (destinationCompare !== 0) return destinationCompare;
      return sortByOrderThenName(a, b, getRegionLabel);
    });
  listEl.innerHTML = items.length
    ? items.map((item) => {
      const inactive = Number(item.is_active ?? 1) === 0;
      const destination = getDestinationBySlug(getRegionDestinationSlug(item));
      const countryName = getCountryNameBySlug(getRegionCountrySlug(item)) || item.country_name || "나라 미지정";
      const destinationLabel = getDestinationLabel(destination) || item.destination_name || getRegionDestinationSlug(item) || "도시 미지정";
      return `
        <div class="category-manager__item admin-items-list-item ${inactive ? "is-inactive" : ""}">
          <div>
            <div class="category-manager__name">${escapeHtml(getRegionLabel(item))}</div>
            <div class="small">${escapeHtml(countryName)} · ${escapeHtml(destinationLabel)} · slug: ${escapeHtml(item.slug || "")} ${inactive ? " · 미사용" : ""}</div>
          </div>
          <div class="category-manager__actions">
            <button class="btn" type="button" data-travel-edit-region="${escapeHtml(item.slug || "")}" data-travel-region-destination="${escapeHtml(getRegionDestinationSlug(item))}">수정</button>
            <button class="btn" type="button" data-travel-deactivate-region="${escapeHtml(item.slug || "")}" data-travel-region-destination="${escapeHtml(getRegionDestinationSlug(item))}">비활성화</button>
            <button class="btn btn--danger" type="button" data-travel-remove-region="${escapeHtml(item.slug || "")}" data-travel-region-destination="${escapeHtml(getRegionDestinationSlug(item))}">삭제</button>
          </div>
        </div>`;
    }).join("")
    : '<div class="category-manager__empty small">선택한 나라에 등록된 지역이 없습니다.</div>';
}

function renderRecommendationCategoryManager() {
  const listEl = $("travelRecommendationCategoryList");
  if (!listEl) return;
  const items = [...recommendationCategoryItems]
    .sort((a, b) => sortByOrderThenName(a, b, getRecommendationCategoryLabel));
  listEl.innerHTML = items.length
    ? items.map((item) => {
      const inactive = Number(item.is_active ?? 1) === 0;
      return `
        <div class="category-manager__item admin-items-list-item ${inactive ? "is-inactive" : ""}">
          <div>
            <div class="category-manager__name">${escapeHtml(getRecommendationCategoryLabel(item))}</div>
            <div class="small">slug: ${escapeHtml(item.slug || "")} ${inactive ? " · 미사용" : ""}</div>
            ${getRecommendationCategoryDescription(item) ? `<div class="small">${escapeHtml(getRecommendationCategoryDescription(item))}</div>` : ""}
          </div>
          <div class="category-manager__actions">
            <button class="btn" type="button" data-travel-edit-recommendation-category="${escapeHtml(item.slug || "")}">수정</button>
            <button class="btn" type="button" data-travel-deactivate-recommendation-category="${escapeHtml(item.slug || "")}">비활성화</button>
            <button class="btn btn--danger" type="button" data-travel-remove-recommendation-category="${escapeHtml(item.slug || "")}">삭제</button>
          </div>
        </div>`;
    }).join("")
    : '<div class="category-manager__empty small">등록된 추천 카테고리가 없습니다.</div>';
}
function renderAll() {
  renderOverview();
  renderContentTypeManager();
  renderCountryManager();
  renderDestinationManager();
  renderRegionManager();
  renderRecommendationCategoryManager();
}

async function afterChanged(message) {
  await loadTravelSettings(message);
}

async function addTravelContentType() {
  const label = normalizeText($("newContentTypeLabel")?.value || "");
  const slug = slugify($("newContentTypeSlug")?.value || label);
  const description = normalizeText($("newContentTypeDescription")?.value || "");
  if (!label) return showRequiredMessage("글 종류 이름을 입력해 주세요.", "newContentTypeLabel");
  if (!slug) return showRequiredMessage("사용 가능한 글 종류 slug를 입력해 주세요.", "newContentTypeSlug");
  try {
    await requestTravelSettingsApi("POST", { entity: "content_type", slug, label, description });
    ["newContentTypeLabel", "newContentTypeSlug", "newContentTypeDescription"].forEach((id) => { if ($(id)) $(id).value = ""; });
    await afterChanged("글 종류가 추가되었습니다.");
  } catch (error) {
    setStatus(error.message || "글 종류 추가에 실패했습니다.", true);
  }
}

async function editTravelContentType(slug) {
  const item = travelContentTypeItems.find((entry) => String(entry.slug || "") === String(slug || ""));
  if (!item) return;
  const nextLabel = window.prompt("글 종류 이름", item.label || "");
  if (nextLabel === null) return;
  const nextSlug = window.prompt("글 종류 slug", item.slug || "");
  if (nextSlug === null) return;
  const nextDescription = window.prompt("설명", item.description || "");
  if (nextDescription === null) return;
  try {
    await requestTravelSettingsApi("PUT", {
      entity: "content_type",
      current_slug: item.slug,
      slug: slugify(nextSlug),
      label: normalizeText(nextLabel),
      description: normalizeText(nextDescription),
      is_active: Number(item.is_active ?? 1)
    });
    await afterChanged("글 종류가 수정되었습니다.");
  } catch (error) {
    setStatus(error.message || "글 종류 수정에 실패했습니다.", true);
  }
}

async function deleteTravelContentType(slug) {
  const item = travelContentTypeItems.find((entry) => String(entry.slug || "") === String(slug || ""));
  const ok = window.confirm(`'${item?.label || slug}' 글 종류를 삭제할까요?\n기존 글의 값은 보존되지만 선택 목록에서는 사라집니다.`);
  if (!ok) return;
  try {
    await requestTravelSettingsApi("DELETE", { entity: "content_type", slug });
    await afterChanged("글 종류가 삭제되었습니다.");
  } catch (error) {
    setStatus(error.message || "글 종류 삭제에 실패했습니다.", true);
  }
}

async function addTravelCountry() {
  const name = normalizeText($("newCountryName")?.value || "");
  const slug = slugify($("newCountrySlug")?.value || name);
  if (!name) return showRequiredMessage("나라 이름을 입력해 주세요.", "newCountryName");
  if (!slug) return showRequiredMessage("사용 가능한 나라 slug를 입력해 주세요.", "newCountrySlug");
  try {
    await requestTravelSettingsApi("POST", { entity: "country", slug, name });
    ["newCountryName", "newCountrySlug"].forEach((id) => { if ($(id)) $(id).value = ""; });
    await afterChanged("나라가 추가되었습니다.");
  } catch (error) {
    setStatus(error.message || "나라 추가에 실패했습니다.", true);
  }
}

async function editTravelCountry(slug) {
  const item = countryItems.find((entry) => String(entry.slug || "") === String(slug || ""));
  if (!item) return;
  const nextName = window.prompt("나라 이름", item.name || "");
  if (nextName === null) return;
  const nextSlug = window.prompt("나라 slug", item.slug || "");
  if (nextSlug === null) return;
  try {
    await requestTravelSettingsApi("PUT", {
      entity: "country",
      current_slug: item.slug,
      slug: slugify(nextSlug),
      name: normalizeText(nextName),
      is_active: Number(item.is_active ?? 1)
    });
    await afterChanged("나라가 수정되었습니다.");
  } catch (error) {
    setStatus(error.message || "나라 수정에 실패했습니다.", true);
  }
}

async function deactivateTravelCountry(slug) {
  const item = countryItems.find((entry) => String(entry.slug || "") === String(slug || ""));
  const ok = window.confirm(`'${item?.name || slug}' 나라를 비활성화할까요?\n도시는 삭제되지 않지만 선택 목록에서는 제외됩니다.`);
  if (!ok) return;
  try {
    await requestTravelSettingsApi("DELETE", { entity: "country", slug });
    await afterChanged("나라가 비활성화되었습니다.");
  } catch (error) {
    setStatus(error.message || "나라 비활성화에 실패했습니다.", true);
  }
}

async function removeTravelCountry(slug) {
  const item = countryItems.find((entry) => String(entry.slug || "") === String(slug || ""));
  const ok = window.confirm(`'${item?.name || slug}' 나라를 완전히 삭제할까요?\n도시와 글의 기존 연결값은 유지되지만, 나라 관리 목록에서는 제거됩니다.`);
  if (!ok) return;
  try {
    await requestTravelSettingsApi("DELETE", { entity: "country", slug, hard_delete: 1 });
    await afterChanged("나라가 삭제되었습니다.");
  } catch (error) {
    setStatus(error.message || "나라 삭제에 실패했습니다.", true);
  }
}

async function addTravelDestination() {
  const countrySlug = $("newDestinationCountry")?.value || "";
  const countryName = getCountryNameBySlug(countrySlug);
  const name = normalizeText($("newDestinationName")?.value || "");
  const city = normalizeText($("newDestinationCity")?.value || name);
  const slug = slugify($("newDestinationSlug")?.value || name);
  if (!countrySlug) return showRequiredMessage("나라를 선택해 주세요.", "newDestinationCountry");
  if (!name) return showRequiredMessage("도시 표시 이름을 입력해 주세요.", "newDestinationName");
  if (!slug) return showRequiredMessage("사용 가능한 도시 slug를 입력해 주세요.", "newDestinationSlug");
  try {
    await requestTravelSettingsApi("POST", { entity: "destination", slug, name, city, country_slug: countrySlug, country: countryName, status: "published" });
    ["newDestinationName", "newDestinationCity", "newDestinationSlug", "newRegionName", "newRegionSlug"].forEach((id) => { if ($(id)) $(id).value = ""; });
    await afterChanged("도시가 추가되었습니다.");
  } catch (error) {
    setStatus(error.message || "도시 추가에 실패했습니다.", true);
  }
}

async function editTravelDestination(slug) {
  const item = destinationItems.find((entry) => String(entry.slug || "") === String(slug || ""));
  if (!item) return;
  const nextName = window.prompt("도시 표시 이름", item.name || "");
  if (nextName === null) return;
  const nextSlug = window.prompt("도시 slug", item.slug || "");
  if (nextSlug === null) return;
  const nextCity = window.prompt("도시명", item.city || item.name || "");
  if (nextCity === null) return;
  const currentCountrySlug = getCountrySlugFromDestination(item);
  const nextCountrySlug = window.prompt("나라 slug", currentCountrySlug);
  if (nextCountrySlug === null) return;
  const countryName = getCountryNameBySlug(nextCountrySlug);
  try {
    await requestTravelSettingsApi("PUT", {
      entity: "destination",
      current_slug: item.slug,
      slug: slugify(nextSlug),
      name: normalizeText(nextName),
      city: normalizeText(nextCity),
      country_slug: nextCountrySlug,
      country: countryName,
      status: item.status || "published",
      is_active: Number(item.is_active ?? 1),
      sort_order: Number(item.sort_order ?? 0) || 0,
      home_featured: Number(item.home_featured ?? 0) || 0,
      home_featured_order: Number(item.home_featured_order ?? 0) || 0
    });
    await afterChanged("도시가 수정되었습니다.");
  } catch (error) {
    setStatus(error.message || "도시 수정에 실패했습니다.", true);
  }
}

async function deactivateTravelDestination(slug) {
  const item = destinationItems.find((entry) => String(entry.slug || "") === String(slug || ""));
  const ok = window.confirm(`'${item?.name || slug}' 도시를 비활성화할까요?\n이 도시와 연결된 글의 도시 연결값은 유지되지만 선택 목록에서는 제외됩니다.`);
  if (!ok) return;
  try {
    await requestTravelSettingsApi("DELETE", { entity: "destination", slug });
    await afterChanged("도시가 비활성화되었습니다.");
  } catch (error) {
    setStatus(error.message || "도시 비활성화에 실패했습니다.", true);
  }
}

async function removeTravelDestination(slug) {
  const item = destinationItems.find((entry) => String(entry.slug || "") === String(slug || ""));
  const ok = window.confirm(`'${item?.name || slug}' 도시를 완전히 삭제할까요?\n이 도시와 연결된 글/호텔의 도시 연결값은 비워집니다.`);
  if (!ok) return;
  try {
    await requestTravelSettingsApi("DELETE", { entity: "destination", slug, hard_delete: 1 });
    await afterChanged("도시가 삭제되었습니다.");
  } catch (error) {
    setStatus(error.message || "도시 삭제에 실패했습니다.", true);
  }
}

async function addTravelRegion() {
  const countrySlug = $("newRegionCountry")?.value || "";
  const destinationSlug = $("newRegionDestination")?.value || "";
  const name = normalizeText($("newRegionName")?.value || "");
  const slug = slugify($("newRegionSlug")?.value || name);
  if (!countrySlug) return showRequiredMessage("나라를 선택해 주세요.", "newRegionCountry");
  if (!destinationSlug) return showRequiredMessage("도시를 선택해 주세요.", "newRegionDestination");
  if (!name) return showRequiredMessage("지역 이름을 입력해 주세요.", "newRegionName");
  if (!slug) return showRequiredMessage("사용 가능한 지역 slug를 입력해 주세요.", "newRegionSlug");
  try {
    await requestTravelSettingsApi("POST", { entity: "region", slug, name, country_slug: countrySlug, destination_slug: destinationSlug });
    ["newRegionName", "newRegionSlug"].forEach((id) => { if ($(id)) $(id).value = ""; });
    await afterChanged("지역이 추가되었습니다.");
  } catch (error) {
    setStatus(error.message || "지역 추가에 실패했습니다.", true);
  }
}

async function editTravelRegion(slug, destinationSlug) {
  const item = regionItems.find((entry) => String(entry.slug || "") === String(slug || "") && getRegionDestinationSlug(entry) === String(destinationSlug || ""));
  if (!item) return;
  const nextName = window.prompt("지역 이름", item.name || "");
  if (nextName === null) return;
  const nextSlug = window.prompt("지역 slug", item.slug || "");
  if (nextSlug === null) return;
  const nextDestinationSlug = window.prompt("도시 slug", getRegionDestinationSlug(item));
  if (nextDestinationSlug === null) return;
  const destination = getDestinationBySlug(nextDestinationSlug);
  const countrySlug = getCountrySlugFromDestination(destination) || getRegionCountrySlug(item);
  try {
    await requestTravelSettingsApi("PUT", {
      entity: "region",
      current_slug: item.slug,
      current_destination_slug: getRegionDestinationSlug(item),
      slug: slugify(nextSlug),
      name: normalizeText(nextName),
      country_slug: countrySlug,
      destination_slug: nextDestinationSlug,
      is_active: Number(item.is_active ?? 1),
      sort_order: Number(item.sort_order ?? 0) || 0
    });
    await afterChanged("지역이 수정되었습니다.");
  } catch (error) {
    setStatus(error.message || "지역 수정에 실패했습니다.", true);
  }
}

async function deactivateTravelRegion(slug, destinationSlug) {
  const item = regionItems.find((entry) => String(entry.slug || "") === String(slug || "") && getRegionDestinationSlug(entry) === String(destinationSlug || ""));
  const ok = window.confirm(`'${item?.name || slug}' 지역을 비활성화할까요?\n기존 글의 지역 연결값은 유지되지만 선택 목록과 호텔 필터에서는 제외됩니다.`);
  if (!ok) return;
  try {
    await requestTravelSettingsApi("DELETE", { entity: "region", slug, destination_slug: destinationSlug });
    await afterChanged("지역이 비활성화되었습니다.");
  } catch (error) {
    setStatus(error.message || "지역 비활성화에 실패했습니다.", true);
  }
}

async function removeTravelRegion(slug, destinationSlug) {
  const item = regionItems.find((entry) => String(entry.slug || "") === String(slug || "") && getRegionDestinationSlug(entry) === String(destinationSlug || ""));
  const ok = window.confirm(`'${item?.name || slug}' 지역을 완전히 삭제할까요?\n이 지역과 연결된 글/호텔의 지역 연결값은 비워집니다.`);
  if (!ok) return;
  try {
    await requestTravelSettingsApi("DELETE", { entity: "region", slug, destination_slug: destinationSlug, hard_delete: 1 });
    await afterChanged("지역이 삭제되었습니다.");
  } catch (error) {
    setStatus(error.message || "지역 삭제에 실패했습니다.", true);
  }
}

async function addTravelRecommendationCategory() {
  const name = normalizeText($("newRecommendationCategoryName")?.value || "");
  const slug = slugify($("newRecommendationCategorySlug")?.value || name);
  const description = normalizeText($("newRecommendationCategoryDescription")?.value || "");
  if (!name) return showRequiredMessage("추천 카테고리 이름을 입력해 주세요.", "newRecommendationCategoryName");
  if (!slug) return showRequiredMessage("사용 가능한 추천 카테고리 slug를 입력해 주세요.", "newRecommendationCategorySlug");
  try {
    await requestTravelSettingsApi("POST", { entity: "recommendation_category", slug, name, description });
    ["newRecommendationCategoryName", "newRecommendationCategorySlug", "newRecommendationCategoryDescription"].forEach((id) => { if ($(id)) $(id).value = ""; });
    await afterChanged("추천 카테고리가 추가되었습니다.");
  } catch (error) {
    setStatus(error.message || "추천 카테고리 추가에 실패했습니다.", true);
  }
}

async function editTravelRecommendationCategory(slug) {
  const item = recommendationCategoryItems.find((entry) => String(entry.slug || "") === String(slug || ""));
  if (!item) return;
  const nextName = window.prompt("추천 카테고리 이름", item.name || "");
  if (nextName === null) return;
  const nextSlug = window.prompt("추천 카테고리 slug", item.slug || "");
  if (nextSlug === null) return;
  const nextDescription = window.prompt("설명", item.description || "");
  if (nextDescription === null) return;
  try {
    await requestTravelSettingsApi("PUT", {
      entity: "recommendation_category",
      current_slug: item.slug,
      slug: slugify(nextSlug),
      name: normalizeText(nextName),
      description: normalizeText(nextDescription),
      is_active: Number(item.is_active ?? 1),
      sort_order: Number(item.sort_order ?? 0) || 0
    });
    await afterChanged("추천 카테고리가 수정되었습니다.");
  } catch (error) {
    setStatus(error.message || "추천 카테고리 수정에 실패했습니다.", true);
  }
}

async function deactivateTravelRecommendationCategory(slug) {
  const item = recommendationCategoryItems.find((entry) => String(entry.slug || "") === String(slug || ""));
  const ok = window.confirm(`'${item?.name || slug}' 추천 카테고리를 비활성화할까요?
기존 글의 카테고리 연결값은 유지되지만 선택 목록과 추천글 필터에서는 제외됩니다.`);
  if (!ok) return;
  try {
    await requestTravelSettingsApi("DELETE", { entity: "recommendation_category", slug });
    await afterChanged("추천 카테고리가 비활성화되었습니다.");
  } catch (error) {
    setStatus(error.message || "추천 카테고리 비활성화에 실패했습니다.", true);
  }
}

async function removeTravelRecommendationCategory(slug) {
  const item = recommendationCategoryItems.find((entry) => String(entry.slug || "") === String(slug || ""));
  const ok = window.confirm(`'${item?.name || slug}' 추천 카테고리를 완전히 삭제할까요?
이 카테고리와 연결된 글의 추천 카테고리 값은 비워집니다.`);
  if (!ok) return;
  try {
    await requestTravelSettingsApi("DELETE", { entity: "recommendation_category", slug, hard_delete: 1 });
    await afterChanged("추천 카테고리가 삭제되었습니다.");
  } catch (error) {
    setStatus(error.message || "추천 카테고리 삭제에 실패했습니다.", true);
  }
}

function bindEvents() {
  $("addContentTypeBtn")?.addEventListener("click", addTravelContentType);
  $("addCountryBtn")?.addEventListener("click", addTravelCountry);
  $("addDestinationBtn")?.addEventListener("click", addTravelDestination);
  $("addRegionBtn")?.addEventListener("click", addTravelRegion);
  $("addRecommendationCategoryBtn")?.addEventListener("click", addTravelRecommendationCategory);
  $("newRegionCountry")?.addEventListener("change", () => { renderRegionDestinationSelect(); });

  ["newContentTypeLabel", "newContentTypeSlug", "newContentTypeDescription", "newCountryName", "newCountrySlug", "newDestinationName", "newDestinationCity", "newDestinationSlug", "newRegionName", "newRegionSlug", "newRecommendationCategoryName", "newRecommendationCategorySlug", "newRecommendationCategoryDescription"].forEach((id) => {
    $(id)?.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      if (id.startsWith("newContentType")) addTravelContentType();
      else if (id.startsWith("newCountry")) addTravelCountry();
      else if (id.startsWith("newRegion")) addTravelRegion();
      else if (id.startsWith("newRecommendationCategory")) addTravelRecommendationCategory();
      else addTravelDestination();
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (!target) return;
    if (target.dataset.adminDestinationCountryTab) {
      destinationCountryFilter = target.dataset.adminDestinationCountryTab || "all";
      if (destinationCountryFilter !== "all" && $("newDestinationCountry")) $("newDestinationCountry").value = destinationCountryFilter;
      renderDestinationManager();
      return;
    }
    if (target.dataset.adminRegionCountryTab) {
      regionCountryFilter = target.dataset.adminRegionCountryTab || "all";
      if (regionCountryFilter !== "all" && $("newRegionCountry")) {
        $("newRegionCountry").value = regionCountryFilter;
        renderRegionDestinationSelect();
      }
      renderRegionManager();
      return;
    }
    if (target.dataset.travelEditContentType) return editTravelContentType(target.dataset.travelEditContentType);
    if (target.dataset.travelDeleteContentType) return deleteTravelContentType(target.dataset.travelDeleteContentType);
    if (target.dataset.travelEditCountry) return editTravelCountry(target.dataset.travelEditCountry);
    if (target.dataset.travelDeactivateCountry) return deactivateTravelCountry(target.dataset.travelDeactivateCountry);
    if (target.dataset.travelRemoveCountry) return removeTravelCountry(target.dataset.travelRemoveCountry);
    if (target.dataset.travelEditRegion) return editTravelRegion(target.dataset.travelEditRegion, target.dataset.travelRegionDestination);
    if (target.dataset.travelDeactivateRegion) return deactivateTravelRegion(target.dataset.travelDeactivateRegion, target.dataset.travelRegionDestination);
    if (target.dataset.travelRemoveRegion) return removeTravelRegion(target.dataset.travelRemoveRegion, target.dataset.travelRegionDestination);
    if (target.dataset.travelEditRecommendationCategory) return editTravelRecommendationCategory(target.dataset.travelEditRecommendationCategory);
    if (target.dataset.travelDeactivateRecommendationCategory) return deactivateTravelRecommendationCategory(target.dataset.travelDeactivateRecommendationCategory);
    if (target.dataset.travelRemoveRecommendationCategory) return removeTravelRecommendationCategory(target.dataset.travelRemoveRecommendationCategory);
    if (target.dataset.travelEditDestination) return editTravelDestination(target.dataset.travelEditDestination);
    if (target.dataset.travelDeactivateDestination) return deactivateTravelDestination(target.dataset.travelDeactivateDestination);
    if (target.dataset.travelRemoveDestination) return removeTravelDestination(target.dataset.travelRemoveDestination);
  });
}

bindEvents();
loadTravelSettings();
