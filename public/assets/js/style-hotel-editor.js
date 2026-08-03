(() => {
  const MAX_SETS = 7;
  const IMAGE_TOKEN_RE = /^\[\[STYLE_HOTEL_IMAGE\s+(.+?)\]\]$/i;
  const BUTTON_TOKEN_RE = /^\[\[STYLE_HOTEL_BUTTON\s+(.+?)\]\]$/i;
  const ENDING_TOKEN_RE = /^\[\[STYLE_HOTEL_ENDING\]\]$/i;

  const $ = (id) => document.getElementById(id);

  function parseAttrs(raw = "") {
    const attrs = {};
    const re = /(\w+)="([^"]*)"/g;
    let match;
    while ((match = re.exec(String(raw || ""))) !== null) attrs[match[1]] = match[2];
    return attrs;
  }

  function encode(value = "") {
    return encodeURIComponent(String(value || ""));
  }

  function decode(value = "") {
    try { return decodeURIComponent(String(value || "")); } catch (_) { return String(value || ""); }
  }

  function escapeHtml(value = "") {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function isTop5Type(value = "") {
    const normalized = String(value || "").replace(/[\s_-]+/g, "").toLowerCase();
    return normalized === "top5series" || normalized === "여행스타일별호텔추천";
  }

  function emptySet(index = 1) {
    return {
      index,
      source: "r2",
      image: "",
      srcset: "",
      imageLink: "",
      agodaHtml: "",
      alt: "",
      starRating: "",
      guestRating: "",
      badge: "",
      markdown: "",
      buttonText: "잔여 객실 확인",
      buttonLink: ""
    };
  }

  function parseImageToken(line = "") {
    const match = String(line || "").trim().match(IMAGE_TOKEN_RE);
    if (!match) return null;
    const attrs = parseAttrs(match[1]);
    return {
      index: Math.max(1, Math.min(MAX_SETS, parseInt(attrs.index || "1", 10) || 1)),
      source: String(attrs.source || "r2").toLowerCase() === "agoda" ? "agoda" : "r2",
      image: decode(attrs.image || attrs.url || ""),
      srcset: decode(attrs.srcset || ""),
      imageLink: decode(attrs.link || ""),
      alt: decode(attrs.alt || ""),
      starRating: decode(attrs.star || ""),
      guestRating: decode(attrs.rating || ""),
      badge: decode(attrs.badge || "")
    };
  }

  function parseButtonToken(line = "") {
    const match = String(line || "").trim().match(BUTTON_TOKEN_RE);
    if (!match) return null;
    const attrs = parseAttrs(match[1]);
    return {
      index: Math.max(1, Math.min(MAX_SETS, parseInt(attrs.index || "1", 10) || 1)),
      buttonText: decode(attrs.text || attrs.button || "") || "잔여 객실 확인",
      buttonLink: decode(attrs.link || attrs.url || "")
    };
  }

  function isStructuredContent(md = "") {
    return String(md || "").split(/\r?\n/).some((line) => IMAGE_TOKEN_RE.test(line.trim()));
  }

  function parseContent(md = "") {
    const lines = String(md || "").replace(/\r/g, "").split("\n");
    const sets = [];
    let current = null;
    let inEnding = false;
    const endingLines = [];

    const pushCurrent = () => {
      if (!current) return;
      current.markdown = current.bodyLines.join("\n").replace(/^\n+|\n+$/g, "");
      delete current.bodyLines;
      current.index = sets.length + 1;
      sets.push(current);
      current = null;
    };

    lines.forEach((line) => {
      const image = parseImageToken(line);
      if (image) {
        pushCurrent();
        inEnding = false;
        current = { ...emptySet(sets.length + 1), ...image, bodyLines: [] };
        return;
      }

      const button = parseButtonToken(line);
      if (button && current) {
        Object.assign(current, button);
        pushCurrent();
        return;
      }

      if (ENDING_TOKEN_RE.test(String(line || "").trim())) {
        pushCurrent();
        inEnding = true;
        return;
      }

      if (inEnding) endingLines.push(line);
      else if (current) current.bodyLines.push(line);
    });

    pushCurrent();
    return {
      structured: sets.length > 0,
      sets: sets.slice(0, MAX_SETS),
      ending: endingLines.join("\n").replace(/^\n+|\n+$/g, "")
    };
  }

  function buildImageToken(item, index) {
    return `[[STYLE_HOTEL_IMAGE index="${index}" source="${item.source === "agoda" ? "agoda" : "r2"}" image="${encode(item.image)}" srcset="${encode(item.srcset)}" link="${encode(item.imageLink)}" alt="${encode(item.alt)}" star="${encode(item.starRating)}" rating="${encode(item.guestRating)}" badge="${encode(item.badge)}"]]`;
  }

  function buildButtonToken(item, index) {
    return `[[STYLE_HOTEL_BUTTON index="${index}" text="${encode(item.buttonText)}" link="${encode(item.buttonLink)}"]]`;
  }

  function buildContent(sets = [], ending = "") {
    const blocks = sets.slice(0, MAX_SETS).map((item, offset) => [
      buildImageToken(item, offset + 1),
      String(item.markdown || "").trim(),
      buildButtonToken(item, offset + 1)
    ].filter(Boolean).join("\n\n"));
    blocks.push("[[STYLE_HOTEL_ENDING]]");
    if (String(ending || "").trim()) blocks.push(String(ending || "").trim());
    return blocks.filter(Boolean).join("\n\n").trim();
  }

  function plainMarkdown(sets = [], ending = "") {
    return [...sets.map((item) => String(item.markdown || "").trim()), String(ending || "").trim()]
      .filter(Boolean)
      .join("\n\n")
      .trim();
  }

  const state = {
    active: false,
    initialized: false,
    sets: [emptySet(1)],
    ending: "",
    standardDraft: ""
  };

  function collectFromDom() {
    const container = $("styleHotelSetList");
    if (!container) return;
    const cards = [...container.querySelectorAll("[data-style-hotel-set]")];
    state.sets = cards.slice(0, MAX_SETS).map((card, offset) => {
      const source = String(card.querySelector('[data-field="source"]:checked')?.value || "r2") === "agoda" ? "agoda" : "r2";
      return {
        index: offset + 1,
        source,
        image: String(card.querySelector('[data-field="r2Image"]')?.value || "").trim(),
        srcset: String(card.dataset.srcset || ""),
        imageLink: String(card.dataset.imageLink || ""),
        agodaHtml: String(card.querySelector('[data-field="agodaHtml"]')?.value || ""),
        alt: String(card.querySelector('[data-field="alt"]')?.value || "").trim(),
        starRating: String(card.querySelector('[data-field="starRating"]')?.value || "").trim(),
        guestRating: String(card.querySelector('[data-field="guestRating"]')?.value || "").trim(),
        badge: String(card.querySelector('[data-field="badge"]')?.value || "").trim(),
        markdown: String(card.querySelector('[data-field="markdown"]')?.value || ""),
        buttonText: String(card.querySelector('[data-field="buttonText"]')?.value || "").trim(),
        buttonLink: String(card.querySelector('[data-field="buttonLink"]')?.value || "").trim()
      };
    });
    state.ending = String($("styleHotelEndingMarkdown")?.value || "");
  }

  function hydrateAgodaData(item, card, { validate = false } = {}) {
    if (item.source !== "agoda") return { ok: true };
    const utils = window.CoverImageSourceUtils;
    const parsed = utils?.parseAgodaHtml
      ? utils.parseAgodaHtml(item.agodaHtml || "")
      : { ok: false, error: "아고다 이미지 파서를 불러오지 못했습니다." };
    const status = card?.querySelector('[data-field="agodaStatus"]');
    if (!parsed.ok) {
      item.image = "";
      item.srcset = "";
      item.imageLink = "";
      if (status) {
        status.textContent = validate || item.agodaHtml.trim() ? (parsed.error || "아고다 이미지 정보를 확인해 주세요.") : "";
        status.dataset.state = validate || item.agodaHtml.trim() ? "error" : "";
      }
      return parsed;
    }
    item.image = parsed.image || "";
    item.srcset = parsed.srcset || "";
    item.imageLink = parsed.link || "";
    if (card) {
      card.dataset.srcset = item.srcset;
      card.dataset.imageLink = item.imageLink;
    }
    if (status) {
      status.textContent = "아고다 링크와 이미지 주소를 확인했습니다.";
      status.dataset.state = "success";
    }
    return { ok: true };
  }

  function syncBacking({ dispatch = true } = {}) {
    if (!state.active) return;
    collectFromDom();
    const cards = [...($("styleHotelSetList")?.querySelectorAll("[data-style-hotel-set]") || [])];
    state.sets.forEach((item, index) => hydrateAgodaData(item, cards[index]));
    const content = buildContent(state.sets, state.ending);
    const backing = $("content_md");
    if (backing) {
      backing.value = content;
      if (dispatch) backing.dispatchEvent(new Event("input", { bubbles: true }));
    }
    updateCounter();
  }

  function updateCounter() {
    const output = $("contentCount");
    if (!output) return;
    const source = state.active ? plainMarkdown(state.sets, state.ending) : String($("content_md")?.value || "");
    output.textContent = `공백 포함 ${source.length}자 / 제외 ${source.replace(/\s/g, "").length}자`;
  }

  function renderStarOptions(selected = "") {
    const value = String(selected || "");
    return ["", "3", "4", "5"].map((option) => {
      const label = option ? `${option}성급` : "성급 선택";
      return `<option value="${option}" ${value === option ? "selected" : ""}>${label}</option>`;
    }).join("");
  }

  function renderGuestRatingOptions(selected = "") {
    const value = String(selected || "");
    return ["", "6.5+", "7.0+", "7.5+", "8.0+", "8.5+", "9.0+", "9.5+"].map((option) => {
      const label = option || "평점 선택";
      return `<option value="${option}" ${value === option ? "selected" : ""}>${label}</option>`;
    }).join("");
  }

  function renderSetCard(item, index) {
    const source = item.source === "agoda" ? "agoda" : "r2";
    const canMoveUp = index > 0;
    const canMoveDown = index < state.sets.length - 1;
    return `
      <section class="style-hotel-set-card" data-style-hotel-set data-index="${index}">
        <div class="style-hotel-set-card__head">
          <div>
            <strong>호텔 ${index + 1}</strong>
            <span class="small">이미지 → 마크다운 본문 → 본문 버튼</span>
          </div>
          <div class="style-hotel-set-card__actions">
            <button class="btn btn--small" type="button" data-action="move-up" ${canMoveUp ? "" : "disabled"}>위로</button>
            <button class="btn btn--small" type="button" data-action="move-down" ${canMoveDown ? "" : "disabled"}>아래로</button>
            <button class="btn btn--small btn--danger" type="button" data-action="remove" ${state.sets.length <= 1 ? "disabled" : ""}>삭제</button>
          </div>
        </div>

        <fieldset class="style-hotel-image-source">
          <legend class="small">호텔 이미지</legend>
          <div class="style-hotel-image-source__options">
            <label><input type="radio" name="styleHotelImageSource${index}" data-field="source" value="r2" ${source === "r2" ? "checked" : ""}> R2 이미지</label>
            <label><input type="radio" name="styleHotelImageSource${index}" data-field="source" value="agoda" ${source === "agoda" ? "checked" : ""}> 아고다 이미지</label>
          </div>
        </fieldset>

        <div class="style-hotel-source-panel" data-source-panel="r2" ${source === "r2" ? "" : "hidden"}>
          <label>
            <span class="small">R2 이미지 URL</span>
            <input class="input" data-field="r2Image" value="${escapeHtml(source === "r2" ? item.image : "")}" placeholder="https://...r2.dev/hotel.webp">
          </label>
        </div>

        <div class="style-hotel-source-panel" data-source-panel="agoda" ${source === "agoda" ? "" : "hidden"}>
          <label>
            <span class="small">아고다 이미지 링크 HTML</span>
            <textarea class="input editor-agoda-image-html" data-field="agodaHtml" rows="4" placeholder='&lt;a href="https://www.agoda.com/partners/partnersearch.aspx?..."&gt;&lt;img src="//pix8.agoda.net/..." /&gt;&lt;/a&gt;'>${escapeHtml(item.agodaHtml || "")}</textarea>
          </label>
          <div class="small editor-agoda-image-status" data-field="agodaStatus" aria-live="polite"></div>
        </div>

        <label data-alt-field ${source === "agoda" ? 'hidden aria-hidden="true"' : 'aria-hidden="false"'}>
          <span class="small">이미지 ALT</span>
          <input class="input" data-field="alt" value="${escapeHtml(item.alt)}" placeholder="호텔명과 특징이 드러나는 이미지 설명">
        </label>

        <div class="style-hotel-meta-fields">
          <label>
            <span class="small">성급</span>
            <select class="input" data-field="starRating">
              ${renderStarOptions(item.starRating)}
            </select>
          </label>
          <label>
            <span class="small">평점</span>
            <select class="input" data-field="guestRating">
              ${renderGuestRatingOptions(item.guestRating)}
            </select>
          </label>
          <label>
            <span class="small">뱃지</span>
            <input class="input" data-field="badge" value="${escapeHtml(item.badge)}" placeholder="예: 위치 최고" maxlength="40">
          </label>
        </div>

        <label>
          <span class="small">호텔 본문 Markdown</span>
          <textarea class="input editor-textarea style-hotel-markdown" data-field="markdown" rows="12" placeholder="해당 호텔 소개 내용을 마크다운으로 입력하세요">${escapeHtml(item.markdown)}</textarea>
        </label>

        <div class="grid grid--2 style-hotel-button-fields">
          <label>
            <span class="small">본문 버튼명</span>
            <input class="input" data-field="buttonText" value="${escapeHtml(item.buttonText || "잔여 객실 확인")}" placeholder="잔여 객실 확인">
          </label>
          <label>
            <span class="small">본문 버튼 링크</span>
            <input class="input" data-field="buttonLink" value="${escapeHtml(item.buttonLink)}" placeholder="https://www.agoda.com/...">
          </label>
        </div>
      </section>
    `;
  }

  function render() {
    const list = $("styleHotelSetList");
    if (!list) return;
    list.innerHTML = state.sets.map(renderSetCard).join("");
    if ($("styleHotelEndingMarkdown")) $("styleHotelEndingMarkdown").value = state.ending || "";
    const addButton = $("addStyleHotelSetButton");
    if (addButton) {
      addButton.disabled = state.sets.length >= MAX_SETS;
      addButton.textContent = state.sets.length >= MAX_SETS ? "호텔 최대 7개" : `호텔 추가 (${state.sets.length}/7)`;
    }
    state.sets.forEach((item, index) => {
      const card = list.querySelector(`[data-style-hotel-set][data-index="${index}"]`);
      if (item.source === "agoda" && item.agodaHtml) hydrateAgodaData(item, card);
    });
    updateCounter();
  }

  function toggleSourcePanel(card) {
    if (!card) return;
    const source = String(card.querySelector('[data-field="source"]:checked')?.value || "r2") === "agoda" ? "agoda" : "r2";
    card.querySelectorAll("[data-source-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.sourcePanel !== source;
    });
    const altField = card.querySelector("[data-alt-field]");
    if (altField) {
      const hideAlt = source === "agoda";
      altField.hidden = hideAlt;
      altField.setAttribute("aria-hidden", hideAlt ? "true" : "false");
    }
  }

  function getCountSource() {
    if (!state.active) return String($("content_md")?.value || "");
    collectFromDom();
    return plainMarkdown(state.sets, state.ending);
  }

  function getImages() {
    if (!state.active) return [];
    collectFromDom();
    const cards = [...($("styleHotelSetList")?.querySelectorAll("[data-style-hotel-set]") || [])];
    state.sets.forEach((item, index) => hydrateAgodaData(item, cards[index]));
    return state.sets
      .filter((item) => item.image)
      .map((item) => ({ src: item.image, url: item.image, alt: item.alt || "" }));
  }

  function validateAndSync() {
    if (!state.active) return { ok: true };
    collectFromDom();
    const cards = [...($("styleHotelSetList")?.querySelectorAll("[data-style-hotel-set]") || [])];
    for (let index = 0; index < state.sets.length; index += 1) {
      const item = state.sets[index];
      const card = cards[index];
      if (item.source === "agoda") {
        const parsed = hydrateAgodaData(item, card, { validate: true });
        if (!parsed.ok) return { ok: false, error: `호텔 ${index + 1}: ${parsed.error || "아고다 이미지 정보를 확인해 주세요."}`, focus: card?.querySelector('[data-field="agodaHtml"]') };
      } else {
        const utils = window.CoverImageSourceUtils;
        item.image = utils?.normalizeR2ImageUrl ? utils.normalizeR2ImageUrl(item.image) : item.image;
        if (!item.image) return { ok: false, error: `호텔 ${index + 1}: R2 이미지 URL을 입력해 주세요.`, focus: card?.querySelector('[data-field="r2Image"]') };
      }
      if (item.source !== "agoda" && !item.alt) return { ok: false, error: `호텔 ${index + 1}: 이미지 ALT를 입력해 주세요.`, focus: card?.querySelector('[data-field="alt"]') };
      if (!item.markdown.trim()) return { ok: false, error: `호텔 ${index + 1}: 마크다운 본문을 입력해 주세요.`, focus: card?.querySelector('[data-field="markdown"]') };
      if (!item.buttonText) return { ok: false, error: `호텔 ${index + 1}: 본문 버튼명을 입력해 주세요.`, focus: card?.querySelector('[data-field="buttonText"]') };
      const normalizedButtonLink = window.CoverImageSourceUtils?.normalizeHttpsUrl
        ? window.CoverImageSourceUtils.normalizeHttpsUrl(item.buttonLink)
        : item.buttonLink;
      if (!normalizedButtonLink) return { ok: false, error: `호텔 ${index + 1}: 올바른 본문 버튼 링크를 입력해 주세요.`, focus: card?.querySelector('[data-field="buttonLink"]') };
      item.buttonLink = normalizedButtonLink;
    }
    syncBacking({ dispatch: false });
    return { ok: true };
  }

  function setTocMode(mode = null) {
    if (!state.active) return { ok: false, headingCount: 0 };
    collectFromDom();
    const cleanToken = (text = "") => String(text || "")
      .replace(/^\s*\[\[TOC(?::(?:h2|h2,h3))?\]\]\s*\n?/gim, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
    state.sets = state.sets.map((item) => ({ ...item, markdown: cleanToken(item.markdown) }));
    state.ending = cleanToken(state.ending);
    if (mode) {
      const targetIndex = state.sets.findIndex((item) => item.markdown.trim());
      if (targetIndex < 0) return { ok: false, headingCount: 0 };
      const target = state.sets[targetIndex];
      const headingCount = (plainMarkdown(state.sets, state.ending).match(mode === "h2,h3" ? /^#{2,3}\s+/gm : /^##\s+/gm) || []).length;
      if (!headingCount) return { ok: false, headingCount: 0 };
      target.markdown = `[[TOC:${mode}]]\n\n${target.markdown}`.trim();
    }
    render();
    syncBacking();
    return { ok: true, headingCount: (plainMarkdown(state.sets, state.ending).match(/^#{2,3}\s+/gm) || []).length };
  }

  function loadFromContent(md = "", contentType = "") {
    const parsed = parseContent(md);
    if (parsed.structured) {
      state.sets = parsed.sets.map((item, index) => {
        const next = { ...emptySet(index + 1), ...item, index: index + 1 };
        if (next.source === "agoda" && window.CoverImageSourceUtils?.buildAgodaHtml) {
          next.agodaHtml = window.CoverImageSourceUtils.buildAgodaHtml({ link: next.imageLink, image: next.image, srcset: next.srcset });
        }
        return next;
      });
      state.ending = parsed.ending || "";
    } else if (isTop5Type(contentType)) {
      state.sets = [{ ...emptySet(1), markdown: String(md || "").trim() }];
      state.ending = "";
    } else {
      state.standardDraft = String(md || "");
    }
    state.initialized = true;
    render();
    syncVisibility(contentType);
  }

  function syncInlineImageBoxVisibility(hidden) {
    const box = $("inlineImageEditorCard") || document.querySelector?.(".card.editor-option-card.inline-image-box");
    if (!box) return;
    box.hidden = Boolean(hidden);
    box.setAttribute("aria-hidden", hidden ? "true" : "false");
  }

  function syncVisibility(explicitType) {
    const contentType = explicitType !== undefined ? explicitType : $("content_type")?.value;
    const nextActive = isTop5Type(contentType);
    const standard = $("standardContentMarkdownEditor");
    const structured = $("styleHotelMarkdownEditor");
    const backing = $("content_md");

    if (nextActive && !state.active) {
      const current = String(backing?.value || "");
      const parsed = parseContent(current);
      if (parsed.structured) {
        state.sets = parsed.sets.map((item, index) => ({ ...emptySet(index + 1), ...item, index: index + 1 }));
        state.ending = parsed.ending || "";
      } else {
        state.standardDraft = current;
        if (!state.initialized || (state.sets.length === 1 && !state.sets[0].markdown && !state.sets[0].image)) {
          state.sets = [{ ...emptySet(1), markdown: current.trim() }];
          state.ending = "";
        }
      }
      state.active = true;
      state.initialized = true;
      render();
      syncBacking();
    } else if (!nextActive && state.active) {
      collectFromDom();
      state.active = false;
      if (backing) {
        backing.value = state.standardDraft || plainMarkdown(state.sets, state.ending);
        backing.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }

    if (standard) {
      standard.hidden = nextActive;
      standard.setAttribute("aria-hidden", nextActive ? "true" : "false");
    }
    if (structured) {
      structured.hidden = !nextActive;
      structured.setAttribute("aria-hidden", nextActive ? "false" : "true");
    }
    syncInlineImageBoxVisibility(nextActive);
    updateCounter();
  }

  function bindEvents() {
    $("content_type")?.addEventListener("change", () => syncVisibility());
    $("addStyleHotelSetButton")?.addEventListener("click", () => {
      collectFromDom();
      if (state.sets.length >= MAX_SETS) return;
      state.sets.push(emptySet(state.sets.length + 1));
      render();
      syncBacking();
    });
    $("styleHotelSetList")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");
      const card = event.target.closest("[data-style-hotel-set]");
      if (!button || !card) return;
      collectFromDom();
      const index = parseInt(card.dataset.index || "0", 10) || 0;
      if (button.dataset.action === "remove" && state.sets.length > 1) state.sets.splice(index, 1);
      if (button.dataset.action === "move-up" && index > 0) [state.sets[index - 1], state.sets[index]] = [state.sets[index], state.sets[index - 1]];
      if (button.dataset.action === "move-down" && index < state.sets.length - 1) [state.sets[index + 1], state.sets[index]] = [state.sets[index], state.sets[index + 1]];
      state.sets.forEach((item, offset) => { item.index = offset + 1; });
      render();
      syncBacking();
    });
    $("styleHotelSetList")?.addEventListener("change", (event) => {
      const card = event.target.closest("[data-style-hotel-set]");
      if (event.target.matches('[data-field="source"]')) toggleSourcePanel(card);
      syncBacking();
    });
    $("styleHotelSetList")?.addEventListener("input", () => syncBacking());
    $("styleHotelEndingMarkdown")?.addEventListener("input", () => syncBacking());
  }

  function init() {
    if (!$("styleHotelMarkdownEditor") || !$("content_md")) return;
    bindEvents();
    state.standardDraft = String($("content_md").value || "");
    render();
    syncVisibility();
  }

  window.StyleHotelEditor = Object.freeze({
    MAX_SETS,
    init,
    isActive: () => state.active,
    isStructuredContent,
    parseContent,
    buildContent,
    loadFromContent,
    syncVisibility,
    syncBacking,
    validateAndSync,
    getCountSource,
    getPlainMarkdown: () => {
      if (state.active) collectFromDom();
      return state.active ? plainMarkdown(state.sets, state.ending) : String($("content_md")?.value || "");
    },
    getImages,
    setTocMode
  });

  document.addEventListener("DOMContentLoaded", init);
})();
