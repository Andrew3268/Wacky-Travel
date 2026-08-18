(() => {
  "use strict";

  const state = {
    settings: new Map(),
    links: [],
    textarea: null,
    root: null,
    list: null,
    count: null,
    empty: null,
    initialized: false,
    inputTimer: null
  };

  const escapeHtml = (value = "") => String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

  const normalizeText = (value = "") => String(value || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const normalizeUrl = (value = "") => String(value || "").trim();
  const makeKey = (text = "", url = "") => `${normalizeUrl(url)}\n${normalizeText(text)}`;

  function isInternalUrl(url = "") {
    const value = normalizeUrl(url);
    if (!value) return false;
    if (value.startsWith("/") && !value.startsWith("//")) return true;
    try {
      const parsed = new URL(value, window.location.origin);
      if (parsed.origin === window.location.origin) return true;
      return /(^|\.)bestayable\.com$/i.test(parsed.hostname);
    } catch (_) {
      return false;
    }
  }

  function extractMarkdownLinks(markdown = "") {
    const source = String(markdown || "");
    const links = [];
    const markdownLinkRe = /(^|[^!])\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)(?:\s+["'][^"']*["'])?\)/g;
    let match;
    while ((match = markdownLinkRe.exec(source))) {
      links.push({ text: normalizeText(match[2]), url: normalizeUrl(match[3]), source: "markdown" });
    }


    const grouped = new Map();
    links.forEach((link) => {
      if (!link.url) return;
      const key = makeKey(link.text, link.url);
      const existing = grouped.get(key);
      if (existing) {
        existing.count += 1;
        return;
      }
      grouped.set(key, { ...link, key, count: 1, internal: isInternalUrl(link.url) });
    });
    return Array.from(grouped.values());
  }

  function normalizeSettings(value) {
    let source = value;
    if (typeof source === "string") {
      try { source = JSON.parse(source || "[]"); } catch (_) { source = []; }
    }
    if (!Array.isArray(source)) return [];
    return source.map((item) => ({
      text: normalizeText(item?.text || item?.label || ""),
      url: normalizeUrl(item?.url || item?.href || ""),
      type: String(item?.type || "normal").toLowerCase() === "affiliate" ? "affiliate" : "normal"
    })).filter((item) => item.url);
  }

  function getStoredType(text = "", url = "") {
    const exact = state.settings.get(makeKey(text, url));
    if (exact) return exact;
    // 링크 텍스트가 바뀐 경우에는 URL 기준으로 기존 선택을 이어받는다.
    for (const [key, type] of state.settings.entries()) {
      if (key.split("\n")[0] === normalizeUrl(url)) return type;
    }
    return "normal";
  }

  function render() {
    if (!state.list || !state.empty) return;
    state.links = extractMarkdownLinks(state.textarea?.value || "");
    if (state.count) state.count.textContent = `${state.links.length}개`;

    if (!state.links.length) {
      state.list.innerHTML = "";
      state.empty.hidden = false;
      return;
    }

    state.empty.hidden = true;
    state.list.innerHTML = state.links.map((link, index) => {
      const label = link.text || link.url;
      const repeat = link.count > 1 ? `<span class="content-link-manager__repeat">본문 ${link.count}회</span>` : "";
      if (link.internal) {
        return `
          <div class="content-link-manager__item" data-link-key="${escapeHtml(link.key)}">
            <div class="content-link-manager__info">
              <div class="content-link-manager__title">${escapeHtml(label)} ${repeat}</div>
              <div class="content-link-manager__url">${escapeHtml(link.url)}</div>
            </div>
            <span class="content-link-manager__internal">내부 링크</span>
          </div>`;
      }

      const type = getStoredType(link.text, link.url);
      const radioName = `contentLinkType_${index}`;
      return `
        <div class="content-link-manager__item" data-link-key="${escapeHtml(link.key)}">
          <div class="content-link-manager__info">
            <div class="content-link-manager__title">${escapeHtml(label)} ${repeat}</div>
            <div class="content-link-manager__url">${escapeHtml(link.url)}</div>
          </div>
          <div class="content-link-manager__choices" role="radiogroup" aria-label="${escapeHtml(label)} 링크 유형">
            <label><input type="radio" name="${radioName}" value="normal" ${type !== "affiliate" ? "checked" : ""}> 일반 링크</label>
            <label><input type="radio" name="${radioName}" value="affiliate" ${type === "affiliate" ? "checked" : ""}> 제휴 링크</label>
          </div>
        </div>`;
    }).join("");

    state.list.querySelectorAll('input[type="radio"]').forEach((input) => {
      input.addEventListener("change", () => {
        const item = input.closest(".content-link-manager__item");
        const key = item?.dataset?.linkKey || "";
        if (!key || !input.checked) return;
        state.settings.set(key, input.value === "affiliate" ? "affiliate" : "normal");
        document.dispatchEvent(new CustomEvent("content-link-settings-change"));
      });
    });
  }

  function scheduleRender() {
    clearTimeout(state.inputTimer);
    state.inputTimer = setTimeout(render, 80);
  }

  function init() {
    if (state.initialized) return;
    state.textarea = document.getElementById("content_md");
    state.root = document.getElementById("contentLinkManager");
    state.list = document.getElementById("contentLinkManagerList");
    state.count = document.getElementById("contentLinkManagerCount");
    state.empty = document.getElementById("contentLinkManagerEmpty");
    if (!state.textarea || !state.root || !state.list || !state.empty) return;
    state.initialized = true;
    state.textarea.addEventListener("input", scheduleRender);
    render();
  }

  function setSettings(value) {
    state.settings.clear();
    normalizeSettings(value).forEach((item) => state.settings.set(makeKey(item.text, item.url), item.type));
    render();
  }

  function getSettings() {
    const current = extractMarkdownLinks(state.textarea?.value || "");
    return current
      .filter((link) => !link.internal)
      .map((link) => ({
        text: link.text,
        url: link.url,
        type: getStoredType(link.text, link.url)
      }));
  }

  function getType(text = "", url = "") {
    if (isInternalUrl(url)) return "internal";
    return getStoredType(text, url);
  }

  function buildAnchorAttributes(text = "", url = "") {
    const type = getType(text, url);
    if (type === "internal") return "";
    if (type === "affiliate") return ' target="_blank" rel="sponsored nofollow noopener"';
    return ' target="_blank" rel="noopener"';
  }

  window.PostLinkManager = {
    init,
    refresh: render,
    setSettings,
    getSettings,
    getType,
    buildAnchorAttributes,
    extractLinks: extractMarkdownLinks
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
