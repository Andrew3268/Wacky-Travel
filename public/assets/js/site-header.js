(() => {
  const bind = () => {
    const openBtn = document.getElementById('homeSearchOpenBtn');
    if (!openBtn || openBtn.dataset.siteHeaderBound === 'true') return;
    openBtn.dataset.siteHeaderBound = 'true';
    openBtn.setAttribute('aria-controls', '');
    openBtn.setAttribute('aria-expanded', 'false');
    openBtn.setAttribute('aria-label', '검색 페이지로 이동');
    openBtn.addEventListener('click', () => {
      window.location.href = '/search/';
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind, { once: true });
  else bind();
})();
