(function () {
  const grid = document.getElementById("destinationsGrid");
  const tabs = document.getElementById("destinationTabs");
  if (!grid || !tabs) return;

  const countrySlugAliases = {
    "베트남": "vietnam",
    "일본": "japan",
    "태국": "thailand",
    "대한민국": "korea",
    "한국": "korea",
    "대만": "taiwan",
    "싱가포르": "singapore",
    "말레이시아": "malaysia",
    "인도네시아": "indonesia",
    "필리핀": "philippines"
  };

  const countryTabOrder = [
    { key: "popular", label: "인기 도시", type: "popular" },
    { key: "japan", label: "일본", type: "country" },
    { key: "vietnam", label: "베트남", type: "country" },
    { key: "taiwan", label: "대만", type: "country" },
    { key: "thailand", label: "태국", type: "country" },
    { key: "philippines", label: "필리핀", type: "country" }
  ];

  const popularDestinationSlugs = [
    "fukuoka",
    "tokyo",
    "osaka",
    "nha-trang",
    "da-nang",
    "taipei",
    "sapporo",
    "phu-quoc",
    "ho-chi-minh-city",
    "kaohsiung"
  ];

  const slugAliases = {
    danang: "da-nang",
    hochiminh: "ho-chi-minh-city",
    "ho-chi-minh": "ho-chi-minh-city",
    phuquoc: "phu-quoc",
    nhatrang: "nha-trang",
    taichong: "taichung"
  };

  const destinationSummaries = {
    osaka: "먹거리·쇼핑·근교 이동을 한 번에 잡기 좋은 도시",
    tokyo: "동네마다 분위기가 달라 일정 성격에 맞춰 고르기 좋은 도시",
    fukuoka: "공항 접근성과 맛집 동선이 좋아 첫 일본 여행에 부담이 적은 도시",
    sapporo: "눈 여행·맥주·온천 동선을 함께 묶기 좋은 북해도 중심 도시",
    okinawa: "렌터카 해변 여행과 리조트 휴양을 여유롭게 즐기기 좋은 섬",
    "da-nang": "해변 휴양과 호이안·바나힐 근교 일정을 함께 잡기 좋은 도시",
    "nha-trang": "바다 전망 숙소와 리조트 휴양을 중심으로 보기 좋은 해변 도시",
    "ho-chi-minh-city": "도시 관광, 카페, 맛집, 쇼핑을 짧은 일정에 담기 좋은 도시",
    hanoi: "올드쿼터 감성과 하롱베이 근교 여행을 함께 보기 좋은 도시",
    "phu-quoc": "리조트 휴양과 테마파크 일정을 나눠 계획하기 좋은 섬",
    taipei: "야시장, 교통, 근교 여행까지 초행자가 움직이기 편한 도시",
    taichung: "감성 카페와 근교 자연 코스를 함께 묶기 좋은 대만 중부 도시",
    tainan: "오래된 골목, 로컬 맛집, 느린 여행을 즐기기 좋은 도시",
    kaohsiung: "항구 분위기와 야시장, 남부 근교 동선을 잡기 좋은 도시",
    hualien: "타이루거 협곡과 자연 풍경 여행을 중심으로 보기 좋은 도시",
    bangkok: "루프톱, 쇼핑몰, 사원, 맛집 일정이 풍부한 태국 대표 도시",
    pattaya: "방콕 근교에서 바다와 액티비티를 가볍게 즐기기 좋은 도시",
    phuket: "풀빌라, 해변, 섬 투어를 중심으로 휴양하기 좋은 태국 남부 여행지",
    "chiang-mai": "카페, 올드타운, 한달살기 감성을 느끼기 좋은 북부 도시",
    "koh-samui": "고급 리조트와 조용한 해변 휴양을 즐기기 좋은 섬",
    cebu: "호핑투어와 리조트 휴양을 함께 계획하기 좋은 필리핀 대표 여행지",
    boracay: "화이트비치 중심으로 쉬운 휴양 일정을 짜기 좋은 섬",
    bohol: "초콜릿힐, 바다 투어, 조용한 리조트 휴양을 함께 보기 좋은 섬",
    manila: "도심 쇼핑과 경유·비즈니스 일정을 함께 잡기 좋은 수도권 도시",
    clark: "골프, 가족 여행, 짧은 휴양 동선에 맞추기 좋은 도시"
  };

  const STATIC_DESTINATIONS = [
    { slug: "osaka", name: "오사카", city: "오사카", country: "일본", sort_order: 1, status: "published", is_active: 1 },
    { slug: "tokyo", name: "도쿄", city: "도쿄", country: "일본", sort_order: 2, status: "published", is_active: 1 },
    { slug: "fukuoka", name: "후쿠오카", city: "후쿠오카", country: "일본", sort_order: 3, status: "published", is_active: 1 },
    { slug: "sapporo", name: "삿포로", city: "삿포로", country: "일본", sort_order: 4, status: "published", is_active: 1 },
    { slug: "okinawa", name: "오키나와", city: "오키나와", country: "일본", sort_order: 5, status: "published", is_active: 1 },

    { slug: "da-nang", name: "다낭", city: "다낭", country: "베트남", sort_order: 1, status: "published", is_active: 1 },
    { slug: "nha-trang", name: "나트랑", city: "나트랑", country: "베트남", sort_order: 2, status: "published", is_active: 1 },
    { slug: "ho-chi-minh-city", name: "호치민", city: "호치민", country: "베트남", sort_order: 3, status: "published", is_active: 1 },
    { slug: "hanoi", name: "하노이", city: "하노이", country: "베트남", sort_order: 4, status: "published", is_active: 1 },
    { slug: "phu-quoc", name: "푸꾸옥", city: "푸꾸옥", country: "베트남", sort_order: 5, status: "published", is_active: 1 },

    { slug: "taipei", name: "타이베이", city: "타이베이", country: "대만", sort_order: 1, status: "published", is_active: 1 },
    { slug: "taichung", name: "타이중", city: "타이중", country: "대만", sort_order: 2, status: "published", is_active: 1 },
    { slug: "tainan", name: "타이난", city: "타이난", country: "대만", sort_order: 3, status: "published", is_active: 1 },
    { slug: "kaohsiung", name: "가오슝", city: "가오슝", country: "대만", sort_order: 4, status: "published", is_active: 1 },
    { slug: "hualien", name: "화렌", city: "화렌", country: "대만", sort_order: 5, status: "published", is_active: 1 },

    { slug: "bangkok", name: "방콕", city: "방콕", country: "태국", sort_order: 1, status: "published", is_active: 1 },
    { slug: "pattaya", name: "파타야", city: "파타야", country: "태국", sort_order: 2, status: "published", is_active: 1 },
    { slug: "phuket", name: "푸켓", city: "푸켓", country: "태국", sort_order: 3, status: "published", is_active: 1 },
    { slug: "chiang-mai", name: "치앙마이", city: "치앙마이", country: "태국", sort_order: 4, status: "published", is_active: 1 },
    { slug: "koh-samui", name: "코사무이", city: "코사무이", country: "태국", sort_order: 5, status: "published", is_active: 1 },

    { slug: "cebu", name: "세부", city: "세부", country: "필리핀", sort_order: 1, status: "published", is_active: 1 },
    { slug: "boracay", name: "보라카이", city: "보라카이", country: "필리핀", sort_order: 2, status: "published", is_active: 1 },
    { slug: "bohol", name: "보홀", city: "보홀", country: "필리핀", sort_order: 3, status: "published", is_active: 1 },
    { slug: "manila", name: "마닐라", city: "마닐라", country: "필리핀", sort_order: 4, status: "published", is_active: 1 },
    { slug: "clark", name: "클락", city: "클락", country: "필리핀", sort_order: 5, status: "published", is_active: 1 }
  ];

  const normalizeText = (value) => String(value || "").replace(/\s+/g, " ").trim();
  const escapeHtml = (value) => String(value || "").replace(/[&<>'"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[ch]));

  const canonicalSlug = (value) => {
    const raw = normalizeText(value).toLowerCase();
    return slugAliases[raw] || raw;
  };

  const countryToSlug = (value) => {
    const raw = normalizeText(value);
    if (!raw) return "";
    if (countrySlugAliases[raw]) return countrySlugAliases[raw];
    return raw.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9가-힣]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  };

  const getDestinationSlug = (item) => canonicalSlug(item.slug);
  const getDestinationName = (item) => normalizeText(item.city) || normalizeText(item.name) || normalizeText(item.card_title) || normalizeText(item.title) || "여행지";
  const getCountryName = (item) => normalizeText(item.country) || "기타 여행지";
  const getDestinationSummary = (item) => {
    const slug = getDestinationSlug(item);
    return destinationSummaries[slug]
      || normalizeText(item.short_description)
      || normalizeText(item.summary)
      || `${getCountryName(item)}에서 호텔과 여행 동선을 함께 보기 좋은 여행지`;
  };
  const isPublishedDestination = (item) => String(item.status || "published") === "published" && Number(item.is_active ?? 1) === 1;

  function compareDestinations(a, b) {
    const ao = Number(a.sort_order || 0) || 999;
    const bo = Number(b.sort_order || 0) || 999;
    if (ao !== bo) return ao - bo;
    return getDestinationName(a).localeCompare(getDestinationName(b), "ko");
  }

  function mergeDestinationSources(primaryItems = [], settingItems = []) {
    const bySlug = new Map();
    const mergeItem = (item = {}) => {
      const slug = getDestinationSlug(item);
      if (!slug) return;
      const previous = bySlug.get(slug) || {};
      bySlug.set(slug, { ...previous, ...item, slug });
    };
    primaryItems.forEach(mergeItem);
    settingItems.forEach(mergeItem);
    return Array.from(bySlug.values()).filter(isPublishedDestination);
  }

  function buildCountryGroups(destinations = []) {
    const groupedItems = new Map();
    destinations.forEach((item) => {
      const countryName = getCountryName(item);
      const countrySlug = countryToSlug(countryName) || countryName;
      if (!groupedItems.has(countrySlug)) groupedItems.set(countrySlug, { countryName, countrySlug, items: [] });
      groupedItems.get(countrySlug).items.push(item);
    });

    groupedItems.forEach((group) => {
      group.items = group.items.slice().sort(compareDestinations);
    });

    return groupedItems;
  }

  function getHref(item) {
    return `/destinations/${encodeURIComponent(getDestinationSlug(item))}/`;
  }

  function renderDestinationCard(item) {
    const label = getDestinationName(item);
    const summary = getDestinationSummary(item);
    const href = getHref(item);

    return `<a class="destination-city-card" href="${href}" aria-label="${escapeHtml(label)} 여행지 보기">
      <span class="destination-city-card__main">
        <strong>${escapeHtml(label)}</strong>
        <span>${escapeHtml(summary)}</span>
      </span>
      <span class="destination-city-card__cta" aria-hidden="true">→</span>
    </a>`;
  }

  function renderPanel(activeTab, groups, allItems) {
    const isPopular = activeTab.type === "popular";
    const items = isPopular
      ? popularDestinationSlugs.map((slug) => allItems.find((item) => getDestinationSlug(item) === slug)).filter(Boolean)
      : groups.get(activeTab.key)?.items || [];
    const fallbackItems = isPopular && !items.length ? allItems.slice().sort(compareDestinations).slice(0, 10) : items;
    const count = fallbackItems.length;
    const title = isPopular ? "인기 도시" : `${activeTab.label} 도시`;

    if (!count) {
      return `<section class="destination-tab-panel" role="tabpanel" aria-labelledby="destination-tab-${escapeHtml(activeTab.key)}">
        <div class="empty-card empty-card--compact">등록된 도시가 없습니다.</div>
      </section>`;
    }

    return `<section class="destination-tab-panel" role="tabpanel" aria-labelledby="destination-tab-${escapeHtml(activeTab.key)}">
      <div class="destination-city-grid" aria-label="${escapeHtml(title)} 목록">
        ${fallbackItems.map(renderDestinationCard).join("")}
      </div>
    </section>`;
  }

  function getAvailableTabs(groups, allItems) {
    return countryTabOrder.filter((tab) => {
      if (tab.type === "popular") return allItems.length > 0;
      return (groups.get(tab.key)?.items || []).length > 0;
    });
  }

  function renderTabs(availableTabs, activeKey) {
    tabs.innerHTML = availableTabs.map((tab) => {
      const isActive = tab.key === activeKey;
      return `<button class="destination-tab-button${isActive ? " is-active" : ""}" id="destination-tab-${escapeHtml(tab.key)}" type="button" role="tab" aria-selected="${isActive ? "true" : "false"}" aria-controls="destinationsGrid" data-destination-tab="${escapeHtml(tab.key)}">
        ${escapeHtml(tab.label)}
      </button>`;
    }).join("");
  }

  function centerActiveTab(activeKey) {
    const activeButton = Array.from(tabs.querySelectorAll("[data-destination-tab]")).find((button) => button.getAttribute("data-destination-tab") === activeKey);
    if (!activeButton || typeof tabs.scrollTo !== "function") return;
    const targetLeft = activeButton.offsetLeft - (tabs.clientWidth - activeButton.offsetWidth) / 2;
    tabs.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
  }

  function renderLoadedContent(html) {
    grid.classList.remove("is-loading");
    grid.setAttribute("aria-busy", "false");
    grid.innerHTML = html;
  }

  function renderLoadingSkeleton(count = 6) {
    tabs.innerHTML = countryTabOrder.map((tab, index) => `<button class="destination-tab-button destination-tab-button--skeleton${index === 0 ? " is-active" : ""}" type="button" disabled>${escapeHtml(tab.label)}</button>`).join("");
    grid.classList.add("is-loading");
    grid.setAttribute("aria-busy", "true");
    grid.innerHTML = `<section class="destination-tab-panel destination-tab-panel--skeleton" aria-hidden="true">
      <div class="destination-city-grid">
        ${Array.from({ length: count }, () => `<span class="destination-city-card destination-city-card--skeleton"><span class="destination-skeleton destination-skeleton--chip"></span><span class="destination-city-card__cta">→</span></span>`).join("")}
      </div>
    </section>`;
  }

  function syncDestinationStickyOffset() {
    const topbarInner = document.querySelector(".topbar--travel .topbar__inner.container") || document.querySelector(".topbar--travel");
    const topbarHeight = topbarInner ? Math.ceil(topbarInner.getBoundingClientRect().height) : 64;
    document.documentElement.style.setProperty("--destination-tabs-sticky-top", `${topbarHeight + 10}px`);
  }

  syncDestinationStickyOffset();
  window.addEventListener("resize", syncDestinationStickyOffset, { passive: true });
  window.addEventListener("orientationchange", syncDestinationStickyOffset, { passive: true });

  function getInitialTab(availableTabs) {
    const hash = normalizeText(window.location.hash).replace(/^#/, "");
    if (hash && availableTabs.some((tab) => tab.key === hash)) return hash;
    return availableTabs[0]?.key || "popular";
  }

  async function fetchJson(url, fallback) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return fallback;
      return await res.json();
    } catch (error) {
      return fallback;
    }
  }

  async function init() {
    renderLoadingSkeleton();
    const [destData, settingsData] = await Promise.all([
      fetchJson("/api/destinations?limit=500", { items: [] }),
      fetchJson(`/api/travel-settings?ts=${Date.now()}`, { countries: [], destinations: [] })
    ]);

    const items = mergeDestinationSources(
      Array.isArray(destData.items) ? destData.items : [],
      [
        ...(Array.isArray(settingsData.destinations) ? settingsData.destinations : []),
        ...STATIC_DESTINATIONS
      ]
    ).sort(compareDestinations);
    const groups = buildCountryGroups(items);
    const availableTabs = getAvailableTabs(groups, items);

    if (!availableTabs.length) {
      tabs.innerHTML = "";
      renderLoadedContent(`<div class="empty-card">등록된 여행지가 없습니다.</div>`);
      return;
    }

    let activeKey = getInitialTab(availableTabs);
    const findActiveTab = () => availableTabs.find((tab) => tab.key === activeKey) || availableTabs[0];

    const render = () => {
      const activeTab = findActiveTab();
      activeKey = activeTab.key;
      renderTabs(availableTabs, activeKey);
      renderLoadedContent(renderPanel(activeTab, groups, items));
      window.requestAnimationFrame(() => centerActiveTab(activeKey));
    };

    tabs.addEventListener("click", (event) => {
      const button = event.target.closest("[data-destination-tab]");
      if (!button) return;
      activeKey = button.getAttribute("data-destination-tab") || "popular";
      render();
    });

    render();
  }

  init();
})();
