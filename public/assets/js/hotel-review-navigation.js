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

    const closePanel = () => {
      if (!panelOpen) return;
      panelOpen = false;
      mobilePanel.classList.remove("is-open");
      mobileBackdrop.classList.remove("is-open");
      mobilePanel.setAttribute("aria-hidden", "true");
      mobileBackdrop.setAttribute("aria-hidden", "true");
      mobileTrigger.setAttribute("aria-expanded", "false");
    };

    const openPanel = () => {
      panelOpen = true;
      mobilePanel.classList.add("is-open");
      mobileBackdrop.classList.add("is-open");
      mobilePanel.setAttribute("aria-hidden", "false");
      mobileBackdrop.setAttribute("aria-hidden", "false");
      mobileTrigger.setAttribute("aria-expanded", "true");
      const activeLink = mobilePanel.querySelector(".hrj-toc__link.is-active") || mobilePanel.querySelector(".hrj-toc__link");
      activeLink?.focus({ preventScroll: true });
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
      closePanel();
      mobileTrigger.focus({ preventScroll: true });
    });
    mobileBackdrop.addEventListener("click", closePanel);

    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.dataset.hrjTocTarget || "";
        const target = sections.find((section) => section.id === targetId);
        if (!target) return;
        event.preventDefault();
        closePanel();
        target.scrollIntoView({
          behavior: window.matchMedia(REDUCED_MOTION).matches ? "auto" : "smooth",
          block: "start"
        });
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !panelOpen) return;
      closePanel();
      mobileTrigger.focus({ preventScroll: true });
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
