(function () {
  'use strict';

  const button = document.querySelector('[data-toc-floating]');
  if (!button) return;

  const toc = document.querySelector('[data-guide-toc]')
    || document.querySelector('body.post-page-body--recommended-hotel-review .post-toc');
  const sourceNav = toc ? toc.querySelector('.wt-seo-toc, .post-toc__body, .post-toc__list') : null;
  const postContent = document.querySelector('body.post-page-body--recommended-hotel-review .post-body .post-content');

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
  let sourceLinks = sourceNav ? Array.from(sourceNav.querySelectorAll('a[href^="#"]')) : [];

  if (!sourceLinks.length && postContent) {
    sourceLinks = Array.from(postContent.querySelectorAll('h2[id], h3[id]')).map(function (heading) {
      const link = document.createElement('a');
      link.setAttribute('href', '#' + heading.id);
      link.textContent = String(heading.textContent || '').replace(/\s+/g, ' ').trim();
      return link;
    }).filter(function (link) {
      return link.textContent;
    });
  }

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
