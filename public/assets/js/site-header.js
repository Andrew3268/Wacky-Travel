(() => {
  const bind = () => {
    const openBtn = document.getElementById('homeSearchOpenBtn');
    const overlay = document.getElementById('homeSearchOverlay');
    const form = document.getElementById('homeFullscreenSearchForm');
    const input = document.getElementById('homeFullscreenSearchInput');
    if (!openBtn || !overlay || !form || !input || openBtn.dataset.siteHeaderBound === 'true') return;

    openBtn.dataset.siteHeaderBound = 'true';
    let closeTimer = 0;
    const blockedSingleKeywords = new Set(['호텔', '숙소', '여행', '추천']);
    const normalizeQuery = (value) => String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');

    const submitSearch = (value) => {
      const query = String(value || '').trim();
      if (!query) {
        input.focus();
        return;
      }
      if (blockedSingleKeywords.has(normalizeQuery(query))) {
        input.setCustomValidity('검색어가 너무 넓습니다. 도시, 지역 또는 여행 조건을 함께 입력해 주세요. 예: 다낭 호텔');
        input.reportValidity();
        input.focus();
        return;
      }
      input.setCustomValidity('');
      window.location.href = `/search/?q=${encodeURIComponent(query)}`;
    };

    const openSearch = () => {
      window.clearTimeout(closeTimer);
      overlay.hidden = false;
      overlay.setAttribute('aria-hidden', 'false');
      openBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('home-search-is-open');
      window.requestAnimationFrame(() => {
        overlay.classList.add('is-open');
        window.setTimeout(() => {
          input.focus();
          input.select();
        }, 80);
      });
    };

    const closeSearch = ({ restoreFocus = true } = {}) => {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      openBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('home-search-is-open');
      closeTimer = window.setTimeout(() => {
        if (!overlay.classList.contains('is-open')) overlay.hidden = true;
        if (restoreFocus) openBtn.focus({ preventScroll: true });
      }, 260);
    };

    openBtn.addEventListener('click', openSearch);
    overlay.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest('[data-home-search-close]')) {
        closeSearch();
        return;
      }
      const queryButton = target.closest('[data-home-search-query]');
      if (queryButton) submitSearch(queryButton.dataset.homeSearchQuery || '');
    });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submitSearch(input.value);
    });
    input.addEventListener('input', () => input.setCustomValidity(''));
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && overlay.classList.contains('is-open')) closeSearch();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind, { once: true });
  } else {
    bind();
  }
})();
