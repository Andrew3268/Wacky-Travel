(function () {
  const grid = document.getElementById("destinationsGrid");
  if (!grid) return;
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
            <div class="travel-card__meta">${escapeHtml([item.country, item.city].filter(Boolean).join(" · "))}</div>
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
