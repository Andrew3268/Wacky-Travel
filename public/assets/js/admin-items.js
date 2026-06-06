const $ = (id) => document.getElementById(id);

const DEFAULT_TRAVEL_CONTENT_TYPES = [
  { slug: "top5_series", label: "여행 스타일별 호텔 추천", description: "여행 스타일에 맞춰 호텔을 비교해볼 수 있는 추천 콘텐츠" },
  { slug: "hotel_intro", label: "호텔 하나씩 살펴보기", description: "호텔 하나를 차분히 살펴보는 소개 콘텐츠" },
  { slug: "travel_tip", label: "여행이 쉬워지는 작은 팁", description: "여행 준비와 이동에 도움이 되는 작은 팁" }
];

let travelContentTypeItems = [...DEFAULT_TRAVEL_CONTENT_TYPES];
let countryItems = [];
let destinationItems = [];

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
  const alias = { 베트남: "vietnam", 일본: "japan", 태국: "thailand", 한국: "korea", 대한민국: "korea" }[raw];
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

function sortByOrderThenName(a, b, labelGetter) {
  const orderA = Number(a.sort_order ?? 0) || 0;
  const orderB = Number(b.sort_order ?? 0) || 0;
  if (orderA !== orderB) return orderA - orderB;
  return labelGetter(a).localeCompare(labelGetter(b), "ko");
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
  if (contentTypeCount) contentTypeCount.textContent = String(activeCount(travelContentTypeItems));
  if (countryCount) countryCount.textContent = String(activeCount(countryItems));
  if (destinationCount) destinationCount.textContent = String(activeCount(destinationItems));
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

  const selectEl = $("newDestinationCountry");
  if (selectEl) {
    const activeCountries = countryItems.filter((item) => Number(item.is_active ?? 1) !== 0);
    selectEl.innerHTML = [
      '<option value="">나라 선택</option>',
      ...activeCountries.map((country) => `<option value="${escapeHtml(country.slug || "")}">${escapeHtml(country.name || country.slug || "")}</option>`)
    ].join("");
  }
}

function renderDestinationManager() {
  const listEl = $("travelDestinationList");
  if (!listEl) return;
  const items = [...destinationItems].sort((a, b) => sortByOrderThenName(a, b, getDestinationLabel));
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
    : '<div class="category-manager__empty small">등록된 도시가 없습니다.</div>';
}

function renderAll() {
  renderOverview();
  renderContentTypeManager();
  renderCountryManager();
  renderDestinationManager();
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
    ["newDestinationName", "newDestinationCity", "newDestinationSlug"].forEach((id) => { if ($(id)) $(id).value = ""; });
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

function bindEvents() {
  $("addContentTypeBtn")?.addEventListener("click", addTravelContentType);
  $("addCountryBtn")?.addEventListener("click", addTravelCountry);
  $("addDestinationBtn")?.addEventListener("click", addTravelDestination);

  ["newContentTypeLabel", "newContentTypeSlug", "newContentTypeDescription", "newCountryName", "newCountrySlug", "newDestinationName", "newDestinationCity", "newDestinationSlug"].forEach((id) => {
    $(id)?.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      if (id.startsWith("newContentType")) addTravelContentType();
      else if (id.startsWith("newCountry")) addTravelCountry();
      else addTravelDestination();
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (!target) return;
    if (target.dataset.travelEditContentType) return editTravelContentType(target.dataset.travelEditContentType);
    if (target.dataset.travelDeleteContentType) return deleteTravelContentType(target.dataset.travelDeleteContentType);
    if (target.dataset.travelEditCountry) return editTravelCountry(target.dataset.travelEditCountry);
    if (target.dataset.travelDeactivateCountry) return deactivateTravelCountry(target.dataset.travelDeactivateCountry);
    if (target.dataset.travelRemoveCountry) return removeTravelCountry(target.dataset.travelRemoveCountry);
    if (target.dataset.travelEditDestination) return editTravelDestination(target.dataset.travelEditDestination);
    if (target.dataset.travelDeactivateDestination) return deactivateTravelDestination(target.dataset.travelDeactivateDestination);
    if (target.dataset.travelRemoveDestination) return removeTravelDestination(target.dataset.travelRemoveDestination);
  });
}

bindEvents();
loadTravelSettings();
