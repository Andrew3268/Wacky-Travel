(function () {
  'use strict';

  const button = document.querySelector('[data-toc-floating]');
  if (!button) return;

  const isTop5SeriesPost = document.body.classList.contains('post-page-body--top5-series');
  const toc = isTop5SeriesPost
    ? null
    : document.querySelector('[data-guide-toc]') || document.querySelector('.post-toc');
  const sourceNav = toc ? toc.querySelector('.wt-seo-toc, .post-toc__body, .post-toc__list') : null;
  const postContent = isTop5SeriesPost
    ? document.querySelector('.post-body .post-content')
    : null;

  const panelId = 'wtFloatingTocPanel';
  const titleId = 'wtFloatingTocTitle';
  let lastFocusedElement = null;

  const backdrop = document.createElement('div');
  backdrop.className = 'wt-toc-floating-backdrop';
  backdrop.hidden = true;
  backdrop.setAttribute('data-toc-floating-backdrop', '');

  const panel = document.createElement('section');
  panel.className = 'wt-toc-floating-panel';
  panel.id = panelId;
  panel.hidden = true;
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-labelledby', titleId);
  panel.innerHTML = `
    <div class="wt-toc-floating-panel__head">
      <div>
        <span class="wt-toc-floating-panel__eyebrow">TABLE OF CONTENTS</span>
        <h2 class="wt-toc-floating-panel__title" id="${titleId}">목차</h2>
      </div>
      <button class="wt-toc-floating-panel__close" type="button" aria-label="목차 닫기" data-toc-floating-close>
        <span aria-hidden="true"></span>
      </button>
    </div>
    <nav class="wt-toc-floating-panel__nav" aria-label="현재 글 목차"></nav>
  `;

  const panelNav = panel.querySelector('.wt-toc-floating-panel__nav');
  const closeButton = panel.querySelector('[data-toc-floating-close]');

  function findHotelSectionImage(heading) {
    let node = heading.previousElementSibling;
    while (node) {
      if (node.matches('h2')) return null;
      if (node.matches('figure.post-style-hotel-image')) return node;
      node = node.previousElementSibling;
    }
    return null;
  }

  function buildTop5HotelLinks() {
    if (!postContent) return [];
    return Array.from(postContent.querySelectorAll('h2[id]')).map(function (heading, index) {
      const sectionImage = findHotelSectionImage(heading);
      if (!sectionImage) return null;

      const sectionId = heading.id + '-hotel-section';
      sectionImage.id = sectionId;
      sectionImage.setAttribute('data-floating-toc-section', '');

      const link = document.createElement('a');
      link.setAttribute('href', '#' + sectionId);
      const hotelName = heading.querySelector('.post-h2-text') || heading;
      link.textContent = String(hotelName.textContent || '').replace(/\s+/g, ' ').trim();
      link.dataset.tocHotelIndex = String(index + 1);
      return link.textContent ? link : null;
    }).filter(Boolean);
  }

  let sourceLinks = isTop5SeriesPost
    ? buildTop5HotelLinks()
    : (sourceNav ? Array.from(sourceNav.querySelectorAll('a[href^="#"]')) : []);

  sourceLinks.forEach(function (sourceLink) {
    const link = sourceLink.cloneNode(true);
    link.removeAttribute('class');
    panelNav.appendChild(link);
  });

  if (!panelNav.children.length) {
    button.hidden = true;
    return;
  }

  document.body.append(backdrop, panel);

  button.setAttribute('aria-label', '목차 메뉴 열기');
  button.setAttribute('aria-controls', panelId);
  button.setAttribute('aria-expanded', 'false');

  function isMobileViewport() {
    return window.matchMedia('(max-width: 760px)').matches;
  }

  function getThreshold() {
    const extraOffset = Math.min(280, Math.max(160, window.innerHeight * 0.22));
    if (toc) {
      const tocRect = toc.getBoundingClientRect();
      return window.scrollY + tocRect.bottom + extraOffset;
    }

    const anchor = document.querySelector('.post-magazine-hero') || postContent;
    if (anchor) {
      const anchorRect = anchor.getBoundingClientRect();
      return window.scrollY + anchorRect.bottom + extraOffset;
    }

    return Math.max(320, window.innerHeight * 0.75);
  }

  function updateButton() {
    button.classList.toggle('is-visible', window.scrollY > getThreshold());
  }

  function getFocusableElements() {
    return Array.from(panel.querySelectorAll('a[href], button:not([disabled])'));
  }

  function openPanel() {
    lastFocusedElement = document.activeElement;
    panel.hidden = false;
    backdrop.hidden = false;
    requestAnimationFrame(function () {
      panel.classList.add('is-open');
      backdrop.classList.add('is-open');
    });
    button.classList.add('is-open');
    button.setAttribute('aria-expanded', 'true');
    if (!isMobileViewport()) {
      closeButton.focus({ preventScroll: true });
    }
  }

  function closePanel(options) {
    const settings = options || {};
    panel.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    button.classList.remove('is-open');
    button.setAttribute('aria-expanded', 'false');
    window.setTimeout(function () {
      panel.hidden = true;
      backdrop.hidden = true;
    }, 180);

    if (settings.restoreFocus !== false && lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus({ preventScroll: true });
    }
  }

  function togglePanel() {
    if (button.getAttribute('aria-expanded') === 'true') {
      closePanel();
    } else {
      openPanel();
    }
  }

  button.addEventListener('click', function (event) {
    event.preventDefault();
    togglePanel();
  });
  closeButton.addEventListener('click', function () { closePanel(); });
  backdrop.addEventListener('click', function () { closePanel(); });

  panelNav.addEventListener('click', function (event) {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    if (isTop5SeriesPost) {
      const targetId = decodeURIComponent(link.getAttribute('href').slice(1));
      const target = document.getElementById(targetId);
      if (target) {
        event.preventDefault();
        closePanel({ restoreFocus: false });
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', '#' + encodeURIComponent(targetId));
        return;
      }
    }

    closePanel({ restoreFocus: false });
  });

  document.addEventListener('keydown', function (event) {
    if (panel.hidden) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closePanel();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = getFocusableElements();
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.addEventListener('scroll', updateButton, { passive: true });
  window.addEventListener('resize', updateButton);
  updateButton();
})();
