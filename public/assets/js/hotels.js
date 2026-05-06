(function () {
  const grid = document.getElementById("hotelsGrid");
  if (!grid) return;
  const escapeHtml = (value) => String(value || "").replace(/[&<>'"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[ch]));
  const safeArray = (value) => { try { const parsed = JSON.parse(value || "[]"); return Array.isArray(parsed) ? parsed : []; } catch { return []; } };

  async function init() {
    grid.innerHTML = `<div class="empty-card">호텔을 불러오는 중입니다.</div>`;
    try {
      const res = await fetch("/api/hotels?limit=100");
      const data = await res.json();
      const items = data.items || [];
      if (!items.length) {
        grid.innerHTML = `<div class="empty-card">등록된 호텔이 없습니다.</div>`;
        return;
      }
      grid.innerHTML = items.map((item) => {
        const tags = safeArray(item.suitable_for_json).slice(0, 3);
        return `
          <article class="travel-card hotel-card">
            ${item.cover_image ? `<a class="travel-card__media" href="/hotels/${encodeURIComponent(item.destination_slug)}/${encodeURIComponent(item.slug)}"><img src="${escapeHtml(item.cover_image)}" alt="${escapeHtml(item.cover_image_alt || item.name)}" loading="lazy" decoding="async" /></a>` : ""}
            <div class="travel-card__body">
              <div class="travel-card__meta">${escapeHtml([item.destination_name, item.area, item.price_level].filter(Boolean).join(" · "))}</div>
              <h2><a href="/hotels/${encodeURIComponent(item.destination_slug)}/${encodeURIComponent(item.slug)}">${escapeHtml(item.name)}</a></h2>
              <p>${escapeHtml(item.summary || "호텔 위치와 예약 전 체크포인트를 확인하세요.")}</p>
              ${tags.length ? `<div class="tag-row">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
              <a class="btn btn--brand" href="/hotels/${encodeURIComponent(item.destination_slug)}/${encodeURIComponent(item.slug)}">상세 보기</a>
            </div>
          </article>
        `;
      }).join("");
    } catch (error) {
      grid.innerHTML = `<div class="empty-card">호텔 목록을 불러오지 못했습니다.</div>`;
    }
  }
  init();
})();
