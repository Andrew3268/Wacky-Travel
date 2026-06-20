const adminPosts$ = (id) => document.getElementById(id);

const adminPostsState = {
  posts: [],
  countries: [],
  destinations: [],
  regions: [],
  contentTypes: [],
  activeTab: "country",
  query: "",
  status: "all",
  loading: false
};

function adminPostsEscapeHtml(value = "") {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function adminPostsNormalizeText(value = "") {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function adminPostsNormalizeStatus(value = "") {
  const raw = String(value || "published").trim().toLowerCase();
  if (["draft", "초안", "임시저장", "임시 저장"].includes(raw)) return "draft";
  return "published";
}

function adminPostsFormatDate(value = "") {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 10) || "-";
  return new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

function adminPostsCountryToSlug(value) {
  const raw = adminPostsNormalizeText(value);
  if (!raw) return "";
  const alias = { 베트남: "vietnam", 일본: "japan", 태국: "thailand", 필리핀: "philippines", 대만: "taiwan", 한국: "korea", 대한민국: "korea" }[raw];
  if (alias) return alias;
  return raw.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-가-힣]/g, "").replace(/\-+/g, "-").replace(/^\-+|\-+$/g, "");
}

function adminPostsGetDestination(post = {}) {
  const slug = String(post.destination_slug || "").trim();
  return adminPostsState.destinations.find((item) => String(item.slug || "") === slug) || null;
}

function adminPostsGetCountrySlugFromDestination(destination = {}) {
  return String(destination?.country_slug || destination?.countrySlug || "").trim() || adminPostsCountryToSlug(destination?.country || "");
}

function adminPostsGetCountryBySlug(slug = "") {
  return adminPostsState.countries.find((item) => String(item.slug || "") === String(slug || "")) || null;
}

function adminPostsGetDestinationLabel(destination = null) {
  if (!destination) return "";
  const city = String(destination.city || destination.name || "").trim();
  const name = String(destination.name || "").trim();
  return city && name && city !== name ? `${name} (${city})` : (name || city || destination.slug || "");
}

function adminPostsGetDestinationLabelFromPost(post = {}) {
  const destination = adminPostsGetDestination(post);
  return adminPostsGetDestinationLabel(destination) || String(post.destination_slug || "").trim() || "도시 미지정";
}

function adminPostsGetCountryMetaFromPost(post = {}) {
  const destination = adminPostsGetDestination(post);
  const countrySlug = adminPostsGetCountrySlugFromDestination(destination);
  const country = adminPostsGetCountryBySlug(countrySlug);
  const label = country?.name || destination?.country || countrySlug || "나라 미지정";
  return { slug: countrySlug || "__unknown_country", label };
}

function adminPostsGetRegionMetaFromPost(post = {}) {
  const regionSlug = String(post.region_slug || "").trim();
  const destinationSlug = String(post.destination_slug || "").trim();
  const destinationLabel = adminPostsGetDestinationLabelFromPost(post);
  if (!regionSlug) return { slug: "__unknown_region", label: "지역 미지정", subLabel: destinationLabel };

  const region = adminPostsState.regions.find((item) => {
    const itemDestination = String(item.destination_slug || item.destinationSlug || "").trim();
    return String(item.slug || "") === regionSlug && (!destinationSlug || itemDestination === destinationSlug);
  });
  const regionLabel = String(region?.name || post.region_name || regionSlug).trim();
  return {
    slug: `${destinationSlug || "unknown"}__${regionSlug}`,
    label: regionLabel,
    subLabel: destinationLabel
  };
}

function adminPostsGetContentTypeLabel(slug = "") {
  const raw = String(slug || "").trim();
  const found = adminPostsState.contentTypes.find((item) => String(item.slug || "") === raw);
  return found?.label || raw || "글 종류 미지정";
}

function adminPostsSetStatus(message = "", isError = false) {
  const el = adminPosts$("adminPostsStatus");
  if (!el) return;
  el.textContent = message;
  el.classList.toggle("is-error", Boolean(isError));
}

async function adminPostsRequestJson(url) {
  const response = await fetch(url, {
    credentials: "same-origin",
    cache: "no-store",
    headers: { Accept: "application/json" }
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(json?.message || "데이터를 불러오지 못했습니다.");
  return json;
}

async function adminPostsLoadSettings() {
  const json = await adminPostsRequestJson(`/api/travel-settings?ts=${Date.now()}`);
  adminPostsState.countries = Array.isArray(json.countries) ? json.countries : [];
  adminPostsState.destinations = Array.isArray(json.destinations) ? json.destinations : [];
  adminPostsState.regions = Array.isArray(json.regions) ? json.regions : [];
  adminPostsState.contentTypes = Array.isArray(json.content_types) ? json.content_types : [];
}

async function adminPostsLoadAllPosts() {
  const allPosts = [];
  let page = 1;
  let hasMore = true;
  const perPage = 24;
  const maxPages = 500;

  while (hasMore && page <= maxPages) {
    const params = new URLSearchParams({
      status: "all",
      per_page: String(perPage),
      page: String(page),
      sort: "updated",
      search_content: "0",
      ts: String(Date.now())
    });
    const json = await adminPostsRequestJson(`/api/posts?${params.toString()}`);
    const items = Array.isArray(json.items) ? json.items : [];
    allPosts.push(...items);
    hasMore = Boolean(json.pagination?.has_more);
    page += 1;
  }

  adminPostsState.posts = allPosts;
}

function adminPostsGetFilteredPosts() {
  const query = adminPostsState.query.toLowerCase();
  return adminPostsState.posts.filter((post) => {
    const status = adminPostsNormalizeStatus(post.status);
    if (adminPostsState.status !== "all" && status !== adminPostsState.status) return false;
    if (!query) return true;

    const haystack = [
      post.title,
      post.slug,
      post.summary,
      post.meta_description,
      post.category,
      post.content_type,
      adminPostsGetContentTypeLabel(post.content_type),
      post.destination_slug,
      adminPostsGetDestinationLabelFromPost(post),
      post.region_slug,
      post.region_name,
      post.recommendation_category_name,
      post.recommendation_category_slug,
      adminPostsGetCountryMetaFromPost(post).label
    ].map((item) => String(item || "").toLowerCase()).join(" ");

    return haystack.includes(query);
  });
}

function adminPostsGroupBy(posts, type) {
  const map = new Map();

  posts.forEach((post) => {
    let meta;
    if (type === "destination") {
      const destinationSlug = String(post.destination_slug || "").trim();
      meta = {
        slug: destinationSlug || "__unknown_destination",
        label: adminPostsGetDestinationLabelFromPost(post),
        subLabel: adminPostsGetCountryMetaFromPost(post).label
      };
    } else if (type === "region") {
      meta = adminPostsGetRegionMetaFromPost(post);
    } else {
      meta = adminPostsGetCountryMetaFromPost(post);
      meta.subLabel = "나라 기준으로 묶은 글";
    }

    const key = meta.slug || meta.label || "__unknown";
    if (!map.has(key)) {
      map.set(key, { key, label: meta.label || "미지정", subLabel: meta.subLabel || "", items: [] });
    }
    map.get(key).items.push(post);
  });

  return [...map.values()].sort((a, b) => {
    const aUnknown = a.key.includes("__unknown") ? 1 : 0;
    const bUnknown = b.key.includes("__unknown") ? 1 : 0;
    if (aUnknown !== bUnknown) return aUnknown - bUnknown;
    return a.label.localeCompare(b.label, "ko");
  });
}

function adminPostsRenderSummary() {
  const all = adminPostsState.posts;
  const filtered = adminPostsGetFilteredPosts();
  const published = all.filter((post) => adminPostsNormalizeStatus(post.status) === "published").length;
  const draft = all.filter((post) => adminPostsNormalizeStatus(post.status) === "draft").length;
  const unmapped = all.filter((post) => !String(post.destination_slug || "").trim() || !adminPostsGetDestination(post)).length;

  if (adminPosts$("adminPostsTotalCount")) adminPosts$("adminPostsTotalCount").textContent = String(all.length);
  if (adminPosts$("adminPostsPublishedCount")) adminPosts$("adminPostsPublishedCount").textContent = String(published);
  if (adminPosts$("adminPostsDraftCount")) adminPosts$("adminPostsDraftCount").textContent = String(draft);
  if (adminPosts$("adminPostsUnmappedCount")) adminPosts$("adminPostsUnmappedCount").textContent = String(unmapped);

  const countryGroups = adminPostsGroupBy(filtered, "country").length;
  const destinationGroups = adminPostsGroupBy(filtered, "destination").length;
  const regionGroups = adminPostsGroupBy(filtered, "region").length;
  if (adminPosts$("adminPostsCountryTabCount")) adminPosts$("adminPostsCountryTabCount").textContent = String(countryGroups);
  if (adminPosts$("adminPostsDestinationTabCount")) adminPosts$("adminPostsDestinationTabCount").textContent = String(destinationGroups);
  if (adminPosts$("adminPostsRegionTabCount")) adminPosts$("adminPostsRegionTabCount").textContent = String(regionGroups);
}

function adminPostsRenderTabs() {
  document.querySelectorAll("[data-admin-posts-tab]").forEach((button) => {
    const isActive = button.dataset.adminPostsTab === adminPostsState.activeTab;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
  });
}

function adminPostsRenderPostItem(post) {
  const status = adminPostsNormalizeStatus(post.status);
  const isPublished = status === "published";
  const postSlug = String(post.slug || "").trim();
  const title = String(post.title || postSlug || "제목 없음").trim();
  const destinationLabel = adminPostsGetDestinationLabelFromPost(post);
  const regionLabel = String(post.region_name || post.region_slug || "지역 미지정").trim();
  const countryLabel = adminPostsGetCountryMetaFromPost(post).label;
  const contentTypeLabel = adminPostsGetContentTypeLabel(post.content_type);
  const updatedAt = adminPostsFormatDate(post.updated_at || post.published_at);
  const publishedAt = adminPostsFormatDate(post.published_at);
  const viewHref = isPublished ? `/post/${encodeURIComponent(postSlug)}` : `/edit.html?slug=${encodeURIComponent(postSlug)}`;

  return `
    <article class="admin-items-posts-item">
      <div class="admin-items-posts-item__main">
        <div class="admin-items-posts-item__title-row">
          <span class="admin-items-posts-status admin-items-posts-status--${isPublished ? "published" : "draft"}">${isPublished ? "발행" : "초안"}</span>
          <h3><a href="${viewHref}">${adminPostsEscapeHtml(title)}</a></h3>
        </div>
        <p class="small admin-items-posts-item__meta">
          ${adminPostsEscapeHtml(countryLabel)} · ${adminPostsEscapeHtml(destinationLabel)} · ${adminPostsEscapeHtml(regionLabel)} · ${adminPostsEscapeHtml(contentTypeLabel)}
        </p>
        <p class="small admin-items-posts-item__dates">발행 ${adminPostsEscapeHtml(publishedAt)} · 수정 ${adminPostsEscapeHtml(updatedAt)} · slug: ${adminPostsEscapeHtml(postSlug || "-")}</p>
      </div>
      <div class="admin-items-posts-item__actions">
        <a class="btn" href="/edit.html?slug=${encodeURIComponent(postSlug)}">수정</a>
        <a class="btn" href="${viewHref}">${isPublished ? "글 보기" : "초안 열기"}</a>
      </div>
    </article>`;
}

function adminPostsRenderGroups() {
  const listEl = adminPosts$("adminPostsGroupedList");
  if (!listEl) return;

  const filtered = adminPostsGetFilteredPosts();
  const tabLabel = adminPostsState.activeTab === "destination" ? "도시" : adminPostsState.activeTab === "region" ? "지역" : "나라";
  const groups = adminPostsGroupBy(filtered, adminPostsState.activeTab);

  const summaryEl = adminPosts$("adminPostsActiveSummary");
  if (summaryEl) {
    summaryEl.textContent = `${tabLabel} 기준 ${groups.length}개 그룹 · 글 ${filtered.length}개 표시`;
  }

  if (!groups.length) {
    listEl.innerHTML = `<div class="admin-items-posts-empty small">조건에 맞는 글이 없습니다.</div>`;
    return;
  }

  listEl.innerHTML = groups.map((group) => `
    <section class="admin-items-posts-group">
      <div class="admin-items-posts-group__head">
        <div>
          <h3>${adminPostsEscapeHtml(group.label)}</h3>
          ${group.subLabel ? `<p class="small">${adminPostsEscapeHtml(group.subLabel)}</p>` : ""}
        </div>
        <strong>${group.items.length}개</strong>
      </div>
      <div class="admin-items-posts-group__items">
        ${group.items.map(adminPostsRenderPostItem).join("")}
      </div>
    </section>
  `).join("");
}

function adminPostsRender() {
  adminPostsRenderSummary();
  adminPostsRenderTabs();
  adminPostsRenderGroups();
}

async function adminPostsLoad() {
  if (adminPostsState.loading) return;
  adminPostsState.loading = true;
  adminPostsSetStatus("전체 글을 불러오는 중…");
  const reloadBtn = adminPosts$("adminPostsReloadBtn");
  if (reloadBtn) reloadBtn.disabled = true;

  try {
    await adminPostsLoadSettings();
    await adminPostsLoadAllPosts();
    adminPostsRender();
    adminPostsSetStatus(`전체 글 ${adminPostsState.posts.length}개를 불러왔습니다.`);
  } catch (error) {
    adminPostsSetStatus(error.message || "전체 글을 불러오지 못했습니다.", true);
    const listEl = adminPosts$("adminPostsGroupedList");
    if (listEl) listEl.innerHTML = `<div class="admin-items-posts-empty small">전체 글을 불러오지 못했습니다.</div>`;
  } finally {
    adminPostsState.loading = false;
    if (reloadBtn) reloadBtn.disabled = false;
  }
}

function adminPostsBindEvents() {
  document.querySelectorAll("[data-admin-posts-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      adminPostsState.activeTab = button.dataset.adminPostsTab || "country";
      adminPostsRender();
    });
  });

  adminPosts$("adminPostsSearchInput")?.addEventListener("input", (event) => {
    adminPostsState.query = adminPostsNormalizeText(event.target.value || "");
    adminPostsRender();
  });

  adminPosts$("adminPostsStatusFilter")?.addEventListener("change", (event) => {
    adminPostsState.status = event.target.value || "all";
    adminPostsRender();
  });

  adminPosts$("adminPostsReloadBtn")?.addEventListener("click", adminPostsLoad);
}

adminPostsBindEvents();
adminPostsLoad();
