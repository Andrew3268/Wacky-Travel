(() => {
  const PAGE_SELECTOR = ".hotel-review-json-page";
  const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

  function initPage(page) {
    const sections = Array.from(page.querySelectorAll("[data-hrj-toc-section]"));
    const desktopToc = page.querySelector("[data-hrj-floating-toc]");
    const mobileTrigger = page.querySelector("[data-hrj-mobile-toc-trigger]");
    const mobilePanel = page.querySelector("[data-hrj-mobile-toc-panel]");
    const mobileBackdrop = page.querySelector("[data-hrj-mobile-toc-backdrop]");
    const mobileClose = page.querySelector("[data-hrj-mobile-toc-close]");
    const startTarget = page.querySelector("[data-hrj-toc-start]") || sections[0];
    const topbar = document.querySelector(".topbar");

    if (!sections.length || !desktopToc || !mobileTrigger || !mobilePanel || !mobileBackdrop || !startTarget) return;

    const links = Array.from(page.querySelectorAll("[data-hrj-toc-link]"));
    let activeId = "";
    let ticking = false;
    let panelOpen = false;
    let previousOverflow = "";
    let previousTriggerFocus = null;

    const topBoundary = () => {
      if (!topbar) return 0;
      return Math.max(0, Math.round(topbar.getBoundingClientRect().bottom));
    };

    const setActive = (id = "") => {
      if (activeId === id) return;
      activeId = id;
      links.forEach((link) => {
        const active = link.dataset.hrjTocTarget === id;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
      const current = links.find((link) => link.dataset.hrjTocTarget === id);
      const currentLabel = current?.textContent?.trim();
      mobileTrigger.setAttribute("aria-label", currentLabel ? `목차 열기, 현재 ${currentLabel}` : "목차 열기");
    };

    const closePanel = ({ restoreFocus = false } = {}) => {
      if (!panelOpen) return;
      panelOpen = false;
      mobilePanel.classList.remove("is-open");
      mobileBackdrop.classList.remove("is-open");
      mobilePanel.setAttribute("aria-hidden", "true");
      mobileBackdrop.setAttribute("aria-hidden", "true");
      mobileTrigger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = previousOverflow;
      page.removeAttribute("inert");
      if (restoreFocus && previousTriggerFocus) previousTriggerFocus.focus({ preventScroll: true });
      previousTriggerFocus = null;
    };

    const openPanel = () => {
      panelOpen = true;
      previousTriggerFocus = document.activeElement === mobileTrigger ? mobileTrigger : document.activeElement;
      previousOverflow = document.body.style.overflow;
      mobilePanel.classList.add("is-open");
      mobileBackdrop.classList.add("is-open");
      mobilePanel.setAttribute("aria-hidden", "false");
      mobileBackdrop.setAttribute("aria-hidden", "false");
      mobileTrigger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      const activeLink = mobilePanel.querySelector(".hrj-toc__link.is-active") || mobilePanel.querySelector(".hrj-toc__link");
      (activeLink || mobilePanel).focus({ preventScroll: true });
    };

    const sync = () => {
      ticking = false;
      const boundary = topBoundary();
      const revealLine = boundary + Math.min(120, Math.max(80, window.innerHeight * 0.16));
      const shouldShow = startTarget.getBoundingClientRect().top <= revealLine;

      desktopToc.classList.toggle("is-visible", shouldShow);
      desktopToc.setAttribute("aria-hidden", shouldShow ? "false" : "true");
      mobileTrigger.classList.toggle("is-visible", shouldShow);
      mobileTrigger.setAttribute("aria-hidden", shouldShow ? "false" : "true");
      mobileTrigger.tabIndex = shouldShow ? 0 : -1;
      if (!shouldShow) closePanel();

      const spyLine = boundary + Math.min(220, Math.max(140, window.innerHeight * 0.28));
      let currentId = "";
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= spyLine) currentId = section.id;
      });
      setActive(currentId);
    };

    const requestSync = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(sync);
    };

    mobileTrigger.addEventListener("click", () => {
      if (panelOpen) closePanel();
      else openPanel();
    });
    mobileClose?.addEventListener("click", () => {
      closePanel({ restoreFocus: true });
    });
    mobileBackdrop.addEventListener("click", () => closePanel({ restoreFocus: true }));

    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.dataset.hrjTocTarget || "";
        const target = sections.find((section) => section.id === targetId);
        if (!target) return;
        event.preventDefault();
        closePanel();
        target.setAttribute("tabindex", "-1");
        target.scrollIntoView({
          behavior: window.matchMedia(REDUCED_MOTION).matches ? "auto" : "smooth",
          block: "start"
        });
        window.setTimeout(() => target.focus({ preventScroll: true }), window.matchMedia(REDUCED_MOTION).matches ? 0 : 300);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (!panelOpen) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel({ restoreFocus: true });
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(mobilePanel.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')).filter((el) => !el.hidden);
      if (!focusable.length) { event.preventDefault(); mobilePanel.focus(); return; }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });

    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);
    sync();
  }

  function init() {
    document.querySelectorAll(PAGE_SELECTOR).forEach(initPage);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
