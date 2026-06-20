(function () {
  const grid = document.getElementById("destinationsGrid");
  if (!grid) return;

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

  const STATIC_DESTINATIONS = [
    { slug: "da-nang", name: "다낭", city: "다낭", country: "베트남", sort_order: 1, status: "published", is_active: 1 },
    { slug: "nha-trang", name: "나트랑", city: "나트랑", country: "베트남", sort_order: 2, status: "published", is_active: 1 },
    { slug: "ho-chi-minh-city", name: "호치민", city: "호치민", country: "베트남", sort_order: 3, status: "published", is_active: 1 },
    { slug: "hanoi", name: "하노이", city: "하노이", country: "베트남", sort_order: 4, status: "published", is_active: 1 },
    { slug: "phu-quoc", name: "푸꾸옥", city: "푸꾸옥", country: "베트남", sort_order: 5, status: "published", is_active: 1 }
  ];

  const normalizeText = (value) => String(value || "").trim();
  const escapeHtml = (value) => String(value || "").replace(/[&<>'"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[ch]));
  const countryToSlug = (value) => {
    const raw = normalizeText(value);
    if (!raw) return "";
    if (countrySlugAliases[raw]) return countrySlugAliases[raw];
    return raw.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9가-힣]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  };
  const getDestinationSlug = (item) => normalizeText(item.slug);
  const getDestinationName = (item) => normalizeText(item.city) || normalizeText(item.name) || normalizeText(item.card_title) || normalizeText(item.title) || "여행지";
  const getCountryName = (item) => normalizeText(item.country) || "기타 여행지";
  const getCountrySlug = (country) => normalizeText(country?.slug) || countryToSlug(country?.name || "");
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
      bySlug.set(slug, { ...previous, ...item });
    };
    primaryItems.forEach(mergeItem);
    settingItems.forEach(mergeItem);
    return Array.from(bySlug.values()).filter(isPublishedDestination);
  }

  function buildCountryGroups(destinations = [], countries = []) {
    const groupedItems = new Map();
    destinations.forEach((item) => {
      const countryName = getCountryName(item);
      const key = countryToSlug(countryName) || countryName;
      if (!groupedItems.has(key)) groupedItems.set(key, { countryName, countrySlug: key, items: [] });
      groupedItems.get(key).items.push(item);
    });

    const activeCountries = (countries || [])
      .filter((country) => Number(country.is_active ?? 1) === 1)
      .map((country) => ({
        countryName: normalizeText(country.name) || "기타 여행지",
        countrySlug: getCountrySlug(country),
        sortOrder: Number(country.sort_order || 0) || 999
      }));

    const ordered = [];
    const used = new Set();
    activeCountries
      .sort((a, b) => a.sortOrder - b.sortOrder || a.countryName.localeCompare(b.countryName, "ko"))
      .forEach((country) => {
        const key = country.countrySlug || countryToSlug(country.countryName) || country.countryName;
        const group = groupedItems.get(key);
        if (!group || !group.items.length) return;
        ordered.push({ ...group, countryName: country.countryName, countrySlug: key });
        used.add(key);
      });

    Array.from(groupedItems.values())
      .filter((group) => !used.has(group.countrySlug) && group.items.length)
      .sort((a, b) => a.countryName.localeCompare(b.countryName, "ko"))
      .forEach((group) => ordered.push(group));

    return ordered.map((group) => ({
      ...group,
      items: group.items.slice().sort(compareDestinations)
    }));
  }

  function renderDestinationChip(item) {
    const label = getDestinationName(item);
    const slug = getDestinationSlug(item);
    const href = `/destinations/${encodeURIComponent(slug)}`;
    return `<div class="destination-chip destination-chip--public">
      <span class="destination-chip__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false" role="img" aria-hidden="true">
          <path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z"></path>
          <circle cx="12" cy="10" r="2.2"></circle>
        </svg>
      </span>
      <a class="destination-chip__link" href="${href}" aria-label="${escapeHtml(label)} 여행지 보기">
        <span class="destination-chip__name">${escapeHtml(label)}</span>
      </a>
      <a class="destination-chip__arrow" href="${href}" aria-label="${escapeHtml(label)} 여행지 보기">
        <svg viewBox="0 0 24 24" focusable="false" role="img" aria-hidden="true">
          <path d="M5 12h12"></path>
          <path d="m13 6 6 6-6 6"></path>
        </svg>
      </a>
    </div>`;
  }

  function renderCountryGroup(group) {
    const countryName = group.countryName || "기타 여행지";
    const countrySlug = group.countrySlug || countryToSlug(countryName);
    return `<section class="country-destination-group country-destination-group--compact" aria-labelledby="country-${escapeHtml(countrySlug)}">
      <div class="country-destination-group__head">
        <div class="country-destination-group__title">
          <h3 id="country-${escapeHtml(countrySlug)}">${escapeHtml(countryName)}</h3>
        </div>
        <div class="country-destination-group__actions">
          <a class="country-destination-group__link" href="/countries/${encodeURIComponent(countrySlug)}" aria-label="${escapeHtml(countryName)} 전체 보기"><span aria-hidden="true">→</span></a>
        </div>
      </div>
      <div class="destination-chip-list" aria-label="${escapeHtml(countryName)} 도시 목록">
        ${group.items.map(renderDestinationChip).join("")}
      </div>
    </section>`;
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
    grid.innerHTML = `<div class="empty-card">여행지를 불러오는 중입니다.</div>`;
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
    );
    const groups = buildCountryGroups(items, Array.isArray(settingsData.countries) ? settingsData.countries : []);

    if (!groups.length) {
      grid.innerHTML = `<div class="empty-card">등록된 여행지가 없습니다.</div>`;
      return;
    }

    grid.innerHTML = groups.map(renderCountryGroup).join("");
  }

  init();
})();
