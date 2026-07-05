(function () {
  const grid = document.getElementById("destinationsGrid");
  const tabs = document.getElementById("destinationTabs");
  if (!grid || !tabs) return;

  const tabButtons = Array.from(tabs.querySelectorAll("[data-destination-tab]"));
  const tabPanels = Array.from(grid.querySelectorAll("[data-destination-panel]"));
  if (!tabButtons.length || !tabPanels.length) return;

  function normalizeText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function syncDestinationStickyOffset() {
    const topbar = document.querySelector(".topbar--travel");
    const topbarInner = document.querySelector(".topbar--travel .topbar__inner.container");
    const target = topbar || topbarInner;
    const topbarHeight = target ? Math.ceil(target.getBoundingClientRect().height) : 70;
    document.documentElement.style.setProperty("--destination-tabs-sticky-top", `${topbarHeight}px`);
  }

  function centerActiveTab(activeKey) {
    const activeButton = tabButtons.find((button) => button.getAttribute("data-destination-tab") === activeKey);
    if (!activeButton || typeof tabs.scrollTo !== "function") return;
    const targetLeft = activeButton.offsetLeft - (tabs.clientWidth - activeButton.offsetWidth) / 2;
    tabs.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
  }

  function getAvailableTabKeys() {
    return tabButtons.map((button) => button.getAttribute("data-destination-tab")).filter(Boolean);
  }

  function getInitialTab() {
    const availableKeys = getAvailableTabKeys();
    const hash = normalizeText(window.location.hash).replace(/^#/, "");
    if (hash && availableKeys.includes(hash)) return hash;
    return availableKeys[0] || "popular";
  }

  function activateTab(activeKey, options = {}) {
    const availableKeys = getAvailableTabKeys();
    const safeActiveKey = availableKeys.includes(activeKey) ? activeKey : availableKeys[0];
    if (!safeActiveKey) return;

    tabButtons.forEach((button) => {
      const isActive = button.getAttribute("data-destination-tab") === safeActiveKey;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", isActive ? "true" : "false");
      button.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    tabPanels.forEach((panel) => {
      const isActive = panel.getAttribute("data-destination-panel") === safeActiveKey;
      panel.hidden = !isActive;
    });

    grid.classList.remove("is-loading");
    grid.setAttribute("aria-busy", "false");

    if (options.updateHash) {
      const nextUrl = safeActiveKey === "popular"
        ? `${window.location.pathname}${window.location.search}`
        : `${window.location.pathname}${window.location.search}#${safeActiveKey}`;
      window.history.replaceState(null, "", nextUrl);
    }

    window.requestAnimationFrame(() => centerActiveTab(safeActiveKey));
  }

  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-destination-tab]");
    if (!button) return;
    activateTab(button.getAttribute("data-destination-tab") || "popular", { updateHash: true });
  });

  tabs.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    const availableKeys = getAvailableTabKeys();
    const currentIndex = Math.max(0, tabButtons.findIndex((button) => button.classList.contains("is-active")));
    let nextIndex = currentIndex;

    if (event.key === "ArrowLeft") nextIndex = Math.max(0, currentIndex - 1);
    if (event.key === "ArrowRight") nextIndex = Math.min(availableKeys.length - 1, currentIndex + 1);
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = availableKeys.length - 1;

    const nextKey = availableKeys[nextIndex];
    if (!nextKey) return;
    event.preventDefault();
    activateTab(nextKey, { updateHash: true });
    tabButtons[nextIndex]?.focus();
  });

  window.addEventListener("hashchange", () => activateTab(getInitialTab()), { passive: true });
  window.addEventListener("resize", syncDestinationStickyOffset, { passive: true });
  window.addEventListener("orientationchange", syncDestinationStickyOffset, { passive: true });

  syncDestinationStickyOffset();
  activateTab(getInitialTab());
})();
