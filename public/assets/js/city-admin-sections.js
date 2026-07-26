/* CITY_ADMIN_ONLY_SECTIONS_V2
 * Hotel Picks / Travel Contents are hidden by default on static city hubs.
 * They are revealed and hydrated only after a valid admin session is confirmed.
 */
(() => {
  const SECTION_SELECTOR = '[data-admin-preview-section]';
  const HOTEL_ANCHOR_SELECTOR = '[data-admin-hotel-anchor]';
  const POSTS_SCRIPT_SRC = '/assets/js/posts.js?v=20260725SurveySkeletonV1';

  const getSections = () => Array.from(document.querySelectorAll(SECTION_SELECTOR));
  const getHotelAnchors = () => Array.from(document.querySelectorAll(HOTEL_ANCHOR_SELECTOR));

  const revealElement = (element) => {
    if (!element) return;
    element.hidden = false;
    element.removeAttribute('hidden');
    element.setAttribute('aria-hidden', 'false');
    element.removeAttribute('tabindex');
    element.removeAttribute('aria-disabled');
  };

  const removeAdminPreview = () => {
    getSections().forEach((section) => section.remove());
    getHotelAnchors().forEach((anchor) => anchor.remove());
    document.documentElement.classList.add('wt-city-admin-preview-denied');
  };

  const revealAdminPreview = () => {
    getSections().forEach(revealElement);
    getHotelAnchors().forEach(revealElement);
    document.documentElement.classList.add('wt-city-admin-preview-enabled');
  };

  const loadPostsRuntime = () => new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-city-posts-runtime]')
      || Array.from(document.scripts).find((script) => String(script.src || '').includes('/assets/js/posts.js'));
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = POSTS_SCRIPT_SRC;
    script.dataset.cityPostsRuntime = 'true';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('city_posts_runtime_failed'));
    document.body.appendChild(script);
  });

  const sessionPromise = fetch('/api/admin/session', {
    credentials: 'same-origin',
    cache: 'no-store',
    headers: { accept: 'application/json' }
  })
    .then((response) => response.ok ? response.json() : { authenticated: false })
    .catch(() => ({ authenticated: false }));

  window.__cityAdminSectionsPromise = sessionPromise;
  window.__adminSessionPromise = window.__adminSessionPromise || sessionPromise;

  sessionPromise.then(async (state) => {
    if (!state?.authenticated) {
      removeAdminPreview();
      return;
    }

    revealAdminPreview();
    try {
      await loadPostsRuntime();
    } catch (_) {
      // Keep the admin-only sections visible so the loading state clearly shows
      // that content hydration failed instead of exposing them to public users.
    }
  });
})();
