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
  const countryToSlug = (value) => {
    const raw = String(value || "").trim();
    if (!raw) return "";
    if (countrySlugAliases[raw]) return countrySlugAliases[raw];
    return raw.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9가-힣]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  };

  const escapeHtml = (value) => String(value || "").replace(/[&<>'"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[ch]));

  async function init() {
    grid.innerHTML = `<div class="empty-card">여행지를 불러오는 중입니다.</div>`;
    try {
      const res = await fetch("/api/destinations?limit=100");
      const data = await res.json();
      const items = data.items || [];
      if (!items.length) {
        grid.innerHTML = `<div class="empty-card">등록된 여행지가 없습니다.</div>`;
        return;
      }
      grid.innerHTML = items.map((item) => `
        <article class="travel-card">
          ${item.cover_image ? `<a class="travel-card__media" href="/destinations/${encodeURIComponent(item.slug)}"><img src="${escapeHtml(item.cover_image)}" alt="${escapeHtml(item.cover_image_alt || item.name)}" loading="lazy" decoding="async" /></a>` : ""}
          <div class="travel-card__body">
            <div class="travel-card__meta">
              ${item.country ? `<a href="/countries/${encodeURIComponent(countryToSlug(item.country))}">${escapeHtml(item.country)}</a>` : ""}${item.country && item.city ? " · " : ""}${escapeHtml(item.city || "")}
            </div>
            <h2><a href="/destinations/${encodeURIComponent(item.slug)}">${escapeHtml(item.title || item.name)}</a></h2>
            <p>${escapeHtml(item.summary || "여행 정보와 호텔 추천을 확인하세요.")}</p>
            <a class="btn btn--brand" href="/destinations/${encodeURIComponent(item.slug)}">여행지 보기</a>
          </div>
        </article>
      `).join("");
    } catch (error) {
      grid.innerHTML = `<div class="empty-card">여행지를 불러오지 못했습니다.</div>`;
    }
  }
  init();
})();
