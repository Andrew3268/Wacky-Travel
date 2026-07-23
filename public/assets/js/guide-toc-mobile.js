(function () {
  'use strict';

  const MOBILE_QUERY = window.matchMedia('(max-width: 767px)');
  const INITIAL_VISIBLE_ITEMS = 5;

  document.querySelectorAll('.wt-seo-toc-section[data-guide-toc]').forEach(function (section, sectionIndex) {
    const nav = section.querySelector('.wt-seo-toc');
    if (!nav) return;

    const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
    if (links.length <= INITIAL_VISIBLE_ITEMS) return;

    const toggle = document.createElement('button');
    const navId = nav.id || 'wtSeoTocNav' + (sectionIndex + 1);
    nav.id = navId;
    toggle.type = 'button';
    toggle.className = 'wt-seo-toc-toggle';
    toggle.setAttribute('aria-controls', navId);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '목차 더보기';
    nav.insertAdjacentElement('afterend', toggle);

    let expanded = false;

    function updateGroups() {
      nav.querySelectorAll('.wt-seo-toc__group').forEach(function (group) {
        const groupLinks = Array.from(group.querySelectorAll('a[href^="#"]'));
        const hasVisibleLink = groupLinks.some(function (link) {
          return !link.classList.contains('wt-seo-toc__item--mobile-hidden');
        });
        group.classList.toggle('wt-seo-toc__group--mobile-empty', MOBILE_QUERY.matches && !expanded && !hasVisibleLink);
      });
    }

    function render() {
      const collapsedOnMobile = MOBILE_QUERY.matches && !expanded;
      links.forEach(function (link, index) {
        link.classList.toggle('wt-seo-toc__item--mobile-hidden', collapsedOnMobile && index >= INITIAL_VISIBLE_ITEMS);
      });
      updateGroups();
      toggle.hidden = !MOBILE_QUERY.matches;
      toggle.setAttribute('aria-expanded', String(expanded));
      toggle.textContent = expanded ? '목차 접기' : '목차 더보기';
    }

    toggle.addEventListener('click', function () {
      expanded = !expanded;
      render();
    });

    function handleViewportChange() {
      if (!MOBILE_QUERY.matches) expanded = false;
      render();
    }

    if (typeof MOBILE_QUERY.addEventListener === 'function') {
      MOBILE_QUERY.addEventListener('change', handleViewportChange);
    } else {
      MOBILE_QUERY.addListener(handleViewportChange);
    }

    render();
  });
})();
