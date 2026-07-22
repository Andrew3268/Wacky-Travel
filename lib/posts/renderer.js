import { escapeHtml } from "../../functions/_utils.js";
import { buildImageAttrs } from "../image-utils.js";

const TOC_TOKEN_RE = /^\[\[TOC(?::(h2|h2,h3))?\]\]$/i;
const POST_SEO_TOKEN_RE = /^\[\[POST_SEO\s+.+\]\]$/i;

const INLINE_IMAGE_LIMIT = 7;
const INLINE_IMAGE_TOKEN_RE = /^\[\[(POST_IMAGE_([1-7]))\s+(.+?)\]\]$/i;
const AFFILIATE_TOKEN_RE = /^\[\[(POST_AFFILIATE_(?:[1-5]))\s+(.+?)\]\]$/i;
const AFFILIATE_CTA_TOKEN_RE = /^\[\[POST_AFFILIATE_CTA\s+(.+?)\]\]$/i;

function parseTokenAttributes(raw = "") {
  const attrs = {};
  const re = /(\w+)="([^"]*)"/g;
  let match;
  while ((match = re.exec(String(raw || ""))) !== null) {
    attrs[match[1]] = match[2];
  }
  return attrs;
}

function defaultInlineImagePosition(index = 1) {
  if (index === 1) return 3;
  if (index === 2) return 5;
  return Math.max(1, Math.min(INLINE_IMAGE_LIMIT, parseInt(index || "1", 10) || 1));
}

function clampInlineImagePosition(value, index = 1) {
  const fallback = defaultInlineImagePosition(index);
  return Math.max(1, Math.min(INLINE_IMAGE_LIMIT, parseInt(value || String(fallback), 10) || fallback));
}

function normalizeInlineImagePlacement(value = "after") {
  return String(value || "").trim().toLowerCase() === "before" ? "before" : "after";
}

function createInlineImageMeta(index = 1) {
  return {
    enabled: false,
    key: `POST_IMAGE_${index}`,
    index,
    url: "",
    alt: "",
    caption: "",
    position: defaultInlineImagePosition(index),
    placement: "after"
  };
}

function getInlineImageItems(meta = {}) {
  const sourceItems = Array.isArray(meta.items)
    ? meta.items
    : Array.from({ length: INLINE_IMAGE_LIMIT }, (_, offset) => meta[`image${offset + 1}`]);
  return sourceItems
    .map((item, offset) => ({
      ...createInlineImageMeta(offset + 1),
      ...(item || {}),
      index: item?.index || offset + 1,
      key: item?.key || `POST_IMAGE_${item?.index || offset + 1}`,
      position: clampInlineImagePosition(item?.position, item?.index || offset + 1),
      placement: normalizeInlineImagePlacement(item?.placement)
    }))
    .filter((item) => item.enabled && (item.url || item.id));
}

function parseInlineImageToken(line = "") {
  const match = String(line || "").trim().match(INLINE_IMAGE_TOKEN_RE);
  if (!match) return null;
  const index = Math.max(1, Math.min(INLINE_IMAGE_LIMIT, parseInt(match[2] || "1", 10) || 1));
  const attrs = parseTokenAttributes(match[3]);
  return {
    key: match[1].toUpperCase(),
    index,
    url: String(attrs.url || attrs.id || "").trim(),
    alt: String(attrs.alt || "").trim(),
    caption: String(attrs.caption || "").trim(),
    position: clampInlineImagePosition(attrs.position, index),
    placement: normalizeInlineImagePlacement(attrs.placement || attrs.place)
  };
}

export function stripInlineImageTokens(md = "") {
  return String(md || "")
    .split("\n")
    .filter((line) => !parseInlineImageToken(line))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function parseInlineImages(md = "") {
  const result = { items: [] };
  for (let index = 1; index <= INLINE_IMAGE_LIMIT; index += 1) {
    const item = createInlineImageMeta(index);
    result[`image${index}`] = item;
    result.items.push(item);
  }
  String(md || "").split("\n").forEach((line) => {
    const token = parseInlineImageToken(line);
    if (!token) return;
    const target = result[`image${token.index}`];
    if (!target) return;
    target.enabled = !!token.url;
    target.url = token.url;
    target.alt = token.alt;
    target.caption = token.caption;
    target.position = token.position;
    target.placement = token.placement;
  });
  return result;
}

export function renderInlineImageHtml(data = {}, options = {}) {
  const src = String((data.url || data.id || "")).trim();
  if (!src) return "";
  const alt = String(data.alt || "본문 이미지").trim();
  const caption = String(data.caption || "").trim();
  const extraClass = String(data.extraClass || "").trim();
  const figureClass = ["post-inline-image", extraClass].filter(Boolean).join(" ");
  const image = buildImageAttrs(src, {
    widths: [480, 768, 960, 1200],
    sizes: "(max-width: 760px) 100vw, 760px",
    fallbackWidth: 960,
    fit: "scale-down",
    quality: 85
  }, options.origin || "");
  return `
    <figure class="${figureClass}">
      <img class="post-inline-image__img" ${image.attrs} alt="${escapeHtml(alt)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" />
      ${caption ? `<figcaption class="post-inline-image__caption">${escapeHtml(caption)}</figcaption>` : ""}
    </figure>
  `;
}

function renderInlineImageHtmlWithClass(data = {}, options = {}, extraClass = "") {
  return renderInlineImageHtml({ ...(data || {}), extraClass }, options);
}

function markHotelReviewSectionLabelAfterImageBlock(block = {}) {
  const html = String(block.html || "");
  if (/^<p\s+class=/i.test(html.trim())) {
    return {
      ...block,
      html: html.replace(/^<p\s+class="([^"]*)"/i, (_, classNames = "") => {
        const mergedClasses = Array.from(new Set([
          ...String(classNames || "").split(/\s+/).filter(Boolean),
          "post-section-label",
          "post-section-label--after-image"
        ])).join(" ");
        return `<p class="${mergedClasses}"`;
      })
    };
  }
  return {
    ...block,
    html: html.replace(/^<p>/i, '<p class="post-section-label post-section-label--after-image">')
  };
}

function parseAffiliateToken(line = "") {
  const match = String(line || "").trim().match(AFFILIATE_TOKEN_RE);
  if (!match) return null;
  const attrs = parseTokenAttributes(match[2]);
  return {
    key: match[1].toUpperCase(),
    imageUrl: String(attrs.image || attrs.imageUrl || "").trim(),
    linkUrl: String(attrs.link || attrs.linkUrl || "").trim(),
    productName: String(attrs.name || attrs.productName || "").trim(),
    currentPrice: String(attrs.current || attrs.currentPrice || "").trim(),
    salePrice: String(attrs.sale || attrs.salePrice || "").trim(),
    discountRate: String(attrs.discount || attrs.discountRate || "").trim(),
    buttonText: String(attrs.button || attrs.buttonText || "상품 보기").trim() || "상품 보기",
    position: Math.max(1, parseInt(attrs.position || attrs.h2 || "1", 10) || 1)
  };
}

function clampAffiliateCtaPosition(value = 1) {
  return Math.max(1, Math.min(10, parseInt(value || "1", 10) || 1));
}

function normalizeAffiliateCtaItem(data = {}) {
  const buttonText = String(data.buttonText || data.button || data.text || "예약 가능 날짜 확인하기").trim() || "예약 가능 날짜 확인하기";
  const linkUrl = String(data.linkUrl || data.link || data.url || "").trim();
  const position = clampAffiliateCtaPosition(data.position || data.h2 || 1);
  return {
    enabled: data.enabled !== false && !!(buttonText || linkUrl),
    buttonText,
    linkUrl,
    position
  };
}

function normalizeAffiliateCtaMeta(meta = {}) {
  const rawItems = Array.isArray(meta?.items)
    ? meta.items
    : (meta && (meta.enabled || meta.buttonText || meta.linkUrl) ? [meta] : []);
  const items = rawItems
    .map((item) => normalizeAffiliateCtaItem(item))
    .filter((item) => item.enabled && (item.buttonText || item.linkUrl));
  return {
    enabled: meta?.enabled !== false && items.length > 0,
    items
  };
}

function parseAffiliateCtaToken(line = "") {
  const match = String(line || "").trim().match(AFFILIATE_CTA_TOKEN_RE);
  if (!match) return null;
  const attrs = parseTokenAttributes(match[1]);
  return normalizeAffiliateCtaItem(attrs);
}

export function stripAffiliateCtaTokens(md = "") {
  return String(md || "")
    .split("\n")
    .filter((line) => !parseAffiliateCtaToken(line))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function parseAffiliateCtas(md = "") {
  const items = [];
  String(md || "").split("\n").forEach((line) => {
    const token = parseAffiliateCtaToken(line);
    if (!token) return;
    items.push(token);
  });
  return {
    enabled: items.length > 0,
    items
  };
}

export function parseAffiliateCta(md = "") {
  const meta = parseAffiliateCtas(md);
  return meta.items[0] || {
    enabled: false,
    buttonText: "예약 가능 날짜 확인하기",
    linkUrl: "",
    position: 1
  };
}

export function renderAffiliateCtaHtml(data = {}) {
  const cta = normalizeAffiliateCtaItem(data);
  if (!cta.enabled || !(cta.buttonText || cta.linkUrl)) return "";
  const buttonText = String(cta.buttonText || "예약 가능 날짜 확인하기").trim() || "예약 가능 날짜 확인하기";
  return `
    <div class="post-affiliate-cta" aria-label="제휴 마케팅 CTA">
      ${cta.linkUrl ? `<a class="post-affiliate-cta__button" href="${escapeHtml(cta.linkUrl)}" target="_blank" rel="nofollow sponsored noopener noreferrer">${escapeHtml(buttonText)}</a>` : `<span class="post-affiliate-cta__button is-disabled">${escapeHtml(buttonText)}</span>`}
    </div>
  `;
}

function insertAffiliateCtasAtTargetH2SectionEnd(blocks = [], affiliateCtaMeta = {}) {
  const meta = normalizeAffiliateCtaMeta(affiliateCtaMeta);
  if (!meta.enabled || !meta.items.length) return blocks;

  let h2Count = 0;
  let activeItems = [];
  const result = [];
  const pushActiveCtas = () => {
    if (!activeItems.length) return;
    activeItems.forEach((item) => {
      const ctaHtml = renderAffiliateCtaHtml(item);
      if (ctaHtml) result.push({ type: "affiliate-cta", html: ctaHtml });
    });
    activeItems = [];
  };

  blocks.forEach((block) => {
    if (block?.type === "heading" && block.level === 2) {
      pushActiveCtas();
      h2Count += 1;
      result.push(block);
      activeItems = meta.items.filter((item) => item.position === h2Count);
      return;
    }
    result.push(block);
  });

  pushActiveCtas();
  return result;
}

function isHotelReviewSectionLabelBlock(block = {}) {
  if (!block || block.type !== "paragraph") return false;
  const match = String(block.html || "").trim().match(
    /^<p(?:\s+class="[^"]*")?>\s*<strong(?:\s+class="[^"]*")?>([\s\S]+?)<\/strong>\s*<\/p>$/i
  );
  if (!match) return false;
  const labelText = match[1]
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .trim();
  return /^\d{1,2}[.)]\s+.{1,80}$/.test(labelText);
}


function decorateHotelSectionHeadingBlocks(blocks = [], options = {}) {
  if (options.hotelSectionHeadingClasses !== true) return blocks;

  return blocks.map((block, index) => {
    if (!isHotelReviewSectionLabelBlock(block)) return block;
    const nextBlock = blocks[index + 1];
    if (!nextBlock || nextBlock.type !== "heading" || nextBlock.level !== 2) return block;

    const labelHtml = String(block.html || "")
      .replace(/^<p>/i, '<p class="post-section-label post-hotel-section-label">')
      .replace(/<strong>/i, '<strong class="post-hotel-section-label__text">');

    nextBlock.html = String(nextBlock.html || "").replace(
      /^<h2(\s+)/i,
      '<h2 class="post-hotel-section-title"$1'
    );

    return { ...block, html: labelHtml };
  });
}

function insertInlineImagesAtH2Anchors(blocks = [], inlineImages = {}, options = {}) {
  const items = getInlineImageItems(inlineImages);
  if (!items.length) return blocks;

  const useHotelSectionLabelAnchor = options.hotelReviewSectionImageAnchor === true;
  let h2Count = 0;
  const result = [];

  blocks.forEach((block) => {
    if (block?.type !== "heading" || block.level !== 2) {
      result.push(block);
      return;
    }

    h2Count += 1;
    const beforeItems = items.filter((item) => item.placement === "before" && item.position === h2Count);
    const afterItems = items.filter((item) => item.placement === "after" && item.position === h2Count);

    if (beforeItems.length && useHotelSectionLabelAnchor) {
      const previousBlock = result[result.length - 1];
      if (isHotelReviewSectionLabelBlock(previousBlock)) {
        result.pop();
        beforeItems.forEach((item) => {
          result.push({ type: "inline-image", html: renderInlineImageHtmlWithClass(item, options, "post-inline-image--before-section-label") });
        });
        result.push(markHotelReviewSectionLabelAfterImageBlock(previousBlock));
        result.push(block);
      } else {
        beforeItems.forEach((item) => {
          result.push({ type: "inline-image", html: renderInlineImageHtml(item, options) });
        });
        result.push(block);
      }
    } else {
      result.push(beforeItems.length ? renderHeadingBlockWithBeforeImages(block, beforeItems, options) : block);
    }

    afterItems.forEach((item) => {
      result.push({ type: "inline-image", html: renderInlineImageHtml(item, options) });
    });
  });

  return result;
}

function renderHeadingBlockWithBeforeImages(block = {}, items = [], options = {}) {
  const imagesHtml = items
    .map((item) => renderInlineImageHtml(item, options))
    .filter(Boolean)
    .join("\n");
  if (!imagesHtml) return block;

  const headingHtml = String(block.html || "").replace(/^<h2(\s+)/, '<h2 class="post-h2--with-before-image"$1');
  return {
    ...block,
    html: `
      <div class="post-h2-anchor post-h2-anchor--with-before-image">
        ${imagesHtml}
        ${headingHtml}
      </div>
    `
  };
}

export function stripAffiliateTokens(md = "") {
  return String(md || "")
    .split("\n")
    .filter((line) => !parseAffiliateToken(line))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function parseAffiliates(md = "") {
  const items = [];
  String(md || "").split("\n").forEach((line) => {
    const token = parseAffiliateToken(line);
    if (!token) return;
    items.push({
      enabled: !!(token.imageUrl || token.linkUrl || token.productName),
      imageUrl: token.imageUrl,
      linkUrl: token.linkUrl,
      productName: token.productName,
      currentPrice: token.currentPrice,
      salePrice: token.salePrice,
      discountRate: token.discountRate,
      buttonText: token.buttonText || "상품 보기",
      position: token.position
    });
  });
  return { enabled: items.some((item) => item.enabled), items };
}

export function renderAffiliateHtml(data = {}, options = {}) {
  if (!data || !(data.imageUrl || data.linkUrl || data.productName)) return "";
  const buttonText = String(data.buttonText || "상품 보기").trim() || "상품 보기";
  const affiliateImage = data.imageUrl
    ? buildImageAttrs(data.imageUrl, {
        widths: [180, 240, 320, 480],
        sizes: "(max-width: 720px) 110px, 180px",
        fallbackWidth: 320,
        fit: "cover",
        quality: 85
      }, options.origin || "")
    : null;
  return `
    <article class="post-affiliate-card">
      <div class="post-affiliate-card__media">
        ${affiliateImage ? `<img class="post-affiliate-card__img" ${affiliateImage.attrs} alt="${escapeHtml(data.productName || "제휴 상품")}" loading="lazy" decoding="async" referrerpolicy="no-referrer" />` : `<div class="post-affiliate-card__placeholder">상품 이미지</div>`}
      </div>
      <div class="post-affiliate-card__content">
        ${data.productName ? `<h3 class="post-affiliate-card__title">${escapeHtml(data.productName)}</h3>` : ""}
        <div class="post-affiliate-card__prices">
          ${data.currentPrice ? `<span class="post-affiliate-card__current">현재가 ${escapeHtml(data.currentPrice)}</span>` : ""}
          ${data.salePrice ? `<span class="post-affiliate-card__sale">할인가 ${escapeHtml(data.salePrice)}</span>` : ""}
          ${data.discountRate ? `<span class="post-affiliate-card__discount">${escapeHtml(data.discountRate)}</span>` : ""}
        </div>
        ${data.linkUrl ? `<a class="post-affiliate-card__button" href="${escapeHtml(data.linkUrl)}" target="_blank" rel="noopener noreferrer nofollow sponsored">${escapeHtml(buttonText)}</a>` : `<span class="post-affiliate-card__button is-disabled">${escapeHtml(buttonText)}</span>`}
      </div>
    </article>
  `;
}

function inlineFormat(text = "") {
  return escapeHtml(text)
    .replace(/\n/g, "<br />")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/__(.+?)__/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\((https?:[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\[([^\]]+)\]\((\/[^\s)]+)\)/g, '<a href="$2">$1</a>');
}

function normalizeArticleHeadingText(level, text = "") {
  const raw = String(text || "").trim();
  if (level === 2 || level === 3) {
    return raw.replace(/^\d{1,2}[.)]\s+/, "");
  }
  return raw;
}

function renderHeadingText(level, text = "") {
  const normalized = normalizeArticleHeadingText(level, text);
  if (level !== 2) return inlineFormat(normalized);

  const raw = normalized;
  const boldPrefixMatch = raw.match(/^\*\*\s*([^*：:]{1,30}?)\s*[:：]\s*\*\*\s*(.+)$/);
  if (boldPrefixMatch) {
    const prefix = `${boldPrefixMatch[1].trim()}:`;
    return `<span class="post-h2-prefix"><strong>${inlineFormat(prefix)}</strong></span><span class="post-h2-text">${inlineFormat(boldPrefixMatch[2])}</span>`;
  }

  const match = raw.match(/^([^:：]{1,30}?)\s*[:：]\s*(.+)$/);
  if (!match) {
    return `<span class="post-h2-text">${inlineFormat(raw)}</span>`;
  }

  const prefix = `${match[1].trim()}:`;
  return `<span class="post-h2-prefix">${inlineFormat(prefix)}</span><span class="post-h2-text">${inlineFormat(match[2])}</span>`;
}

function slugifyHeading(text = "") {
  const base = String(text || "")
    .trim()
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9\-가-힣\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return base || "section";
}

export function parseTocMode(raw = "") {
  const match = String(raw || "").trim().match(TOC_TOKEN_RE);
  if (!match) return null;
  return (match[1] || "h2").toLowerCase();
}

export function isTocToken(raw = "") {
  return !!parseTocMode(raw);
}

export function stripTocTokens(md = "") {
  return String(md || "")
    .replace(/^\s*\[\[TOC(?::(?:h2|h2,h3))?\]\]\s*\n?/gim, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}


function parseLsiKeywordsToken(line = "") {
  const match = String(line || "").trim().match(/^\[\[POST_LSI\s+keywords="([^"]*)"\]\]$/);
  if (!match) return null;
  const raw = String(match[1] || "").replace(/&quot;/g, '"').trim();
  const keywords = raw ? raw.split("||").map((item) => item.trim()).filter(Boolean) : [];
  return { keywords };
}

export function isHiddenSeoMetaToken(line = "") {
  const trimmed = String(line || "").trim();
  return POST_SEO_TOKEN_RE.test(trimmed) || Boolean(parseLsiKeywordsToken(trimmed));
}

export function stripSeoMetaTokenLines(md = "") {
  return String(md || "")
    .split("\n")
    .filter((line) => !isHiddenSeoMetaToken(line))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function stripLsiKeywordsTokenLines(md = "") {
  return stripSeoMetaTokenLines(md);
}


function splitMarkdownTableRow(row = "") {
  let value = String(row || "").trim();
  if (value.startsWith("|")) value = value.slice(1);
  if (value.endsWith("|")) value = value.slice(0, -1);
  return value.split("|").map((cell) => cell.trim());
}

function isMarkdownTableSeparatorRow(row = "") {
  const cells = splitMarkdownTableRow(row);
  if (!cells.length) return false;
  return cells.every((cell) => /^:?-+:?$/.test(cell));
}

function getMarkdownTableAlignments(row = "") {
  return splitMarkdownTableRow(row).map((cell) => {
    const left = cell.startsWith(":");
    const right = cell.endsWith(":");
    if (left && right) return "center";
    if (right) return "right";
    if (left) return "left";
    return "";
  });
}

function renderMarkdownTableFromLines(lines = []) {
  if (lines.length < 2) return "";
  const headerCells = splitMarkdownTableRow(lines[0]);
  const alignments = getMarkdownTableAlignments(lines[1]);
  const bodyRows = lines.slice(2).map((line) => splitMarkdownTableRow(line));

  const thead = `<thead><tr>${headerCells.map((cell, idx) => {
    const align = alignments[idx] || "";
    const alignClass = align ? ` table-cell--${align}` : "";
    return `<th class="table-cell${alignClass}">${inlineFormat(cell)}</th>`;
  }).join("")}</tr></thead>`;

  const tbody = bodyRows.length
    ? `<tbody>${bodyRows.map((row) => `<tr>${headerCells.map((_, idx) => {
        const align = alignments[idx] || "";
        const alignClass = align ? ` table-cell--${align}` : "";
        const cell = row[idx] ?? "";
        return `<td class="table-cell${alignClass}">${inlineFormat(cell)}</td>`;
      }).join("")}</tr>`).join("")}</tbody>`
    : "";

  return `<div class="table-wrap"><table>${thead}${tbody}</table></div>`;
}

export function buildTocItemsFromBlocks(blocks = [], mode = "h2") {
  const includeH3 = mode === "h2,h3";
  return blocks
    .filter((block) => block.type === "heading" && (block.level === 2 || (includeH3 && block.level === 3)))
    .map((block) => ({ id: block.id, text: block.text, level: block.level }));
}

export function renderTocHtml(items = [], mode = "h2") {
  if (!Array.isArray(items) || !items.length) return "";
  const includeH3 = mode === "h2,h3";
  let h2Count = 0;
  let h3Count = 0;
  const numberedItems = items.map((item) => {
    if (item.level === 2) {
      h2Count += 1;
      h3Count = 0;
      return { ...item, indexLabel: `${h2Count}.` };
    }
    h3Count += 1;
    return { ...item, indexLabel: `${Math.max(h2Count, 1)}.${h3Count}` };
  });

  return `
    <details class="post-toc">
      <summary class="post-toc__summary">
        <span class="post-toc__summary-main">
          <span class="post-toc__title">목차</span>
        </span>
        <span class="post-toc__summary-meta" aria-hidden="true"></span>
      </summary>
      <div class="post-toc__body">
        <ol class="post-toc__list${includeH3 ? " post-toc__list--with-h3" : ""}">
          ${numberedItems.map((item) => `
            <li class="post-toc__item post-toc__item--h${item.level}">
              <a href="#${escapeHtml(item.id)}">
                <span class="post-toc__index">${escapeHtml(item.indexLabel)}</span>
                <span class="post-toc__text">${escapeHtml(item.text)}</span>
              </a>
            </li>
          `).join("")}
        </ol>
      </div>
    </details>
  `;
}

export function renderMarkdownBlocks(md = "", options = {}) {
  const normalizedMd = stripLsiKeywordsTokenLines(String(md || ""));
  const inlineImages = options.inlineImages || parseInlineImages(normalizedMd);
  const affiliates = options.affiliates || parseAffiliates(normalizedMd);
  const affiliateCta = options.affiliateCta || parseAffiliateCtas(normalizedMd);
  let h2Count = 0;

  const lines = normalizedMd.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let paragraph = [];
  let listItems = [];
  let orderedItems = [];
  let inBlockquote = false;
  let blockquoteLines = [];
  const headingIdCounts = new Map();

  function pushBlock(type, html, meta = {}) {
    blocks.push({ type, html, ...meta });
  }

  function flushParagraph() {
    if (!paragraph.length) return;
    pushBlock("paragraph", `<p>${inlineFormat(paragraph.join(" "))}</p>`);
    paragraph = [];
  }

  function flushList() {
    if (!listItems.length) return;
    pushBlock("list", `<ul>${listItems.map((item) => `<li>${inlineFormat(item)}</li>`).join("")}</ul>`);
    listItems = [];
  }

  function flushOrdered() {
    if (!orderedItems.length) return;
    pushBlock("ordered", `<ol>${orderedItems.map((item) => `<li>${inlineFormat(item)}</li>`).join("")}</ol>`);
    orderedItems = [];
  }

  function flushBlockquote() {
    if (!inBlockquote) return;
    pushBlock("blockquote", `<blockquote><p>${inlineFormat(blockquoteLines.join(" "))}</p></blockquote>`);
    inBlockquote = false;
    blockquoteLines = [];
  }

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index];
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      flushOrdered();
      flushBlockquote();
      continue;
    }

    if (parseInlineImageToken(trimmed) || parseAffiliateToken(trimmed) || parseAffiliateCtaToken(trimmed)) {
      flushParagraph();
      flushList();
      flushOrdered();
      flushBlockquote();
      continue;
    }

    const tocMode = parseTocMode(trimmed);
    if (tocMode) {
      flushParagraph();
      flushList();
      flushOrdered();
      flushBlockquote();
      pushBlock("toc", "", { mode: tocMode });
      continue;
    }

    if (
      trimmed.includes("|") &&
      index + 1 < lines.length &&
      isMarkdownTableSeparatorRow(String(lines[index + 1] || "").trim())
    ) {
      flushParagraph();
      flushList();
      flushOrdered();
      flushBlockquote();

      const tableLines = [trimmed, String(lines[index + 1] || "").trim()];
      let rowIndex = index + 2;
      while (rowIndex < lines.length) {
        const rowTrimmed = String(lines[rowIndex] || "").trim();
        if (!rowTrimmed || !rowTrimmed.includes("|")) break;
        if (/^(#{1,4})\s+/.test(rowTrimmed)) break;
        if (/^>\s?/.test(rowTrimmed)) break;
        if (/^[-*]\s+/.test(rowTrimmed)) break;
        if (/^\d+\.\s+/.test(rowTrimmed)) break;
        if (parseInlineImageToken(rowTrimmed) || parseAffiliateToken(rowTrimmed) || parseAffiliateCtaToken(rowTrimmed)) break;
        if (parseTocMode(rowTrimmed)) break;
        tableLines.push(rowTrimmed);
        rowIndex += 1;
      }

      pushBlock("table", renderMarkdownTableFromLines(tableLines));
      index = rowIndex - 1;
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      flushList();
      flushOrdered();
      flushBlockquote();
      const rawLevel = heading[1].length;
      const level = rawLevel === 1 ? 2 : rawLevel;
      const text = normalizeArticleHeadingText(level, heading[2].trim());
      const baseId = slugifyHeading(text);
      const currentCount = headingIdCounts.get(baseId) || 0;
      headingIdCounts.set(baseId, currentCount + 1);
      const id = currentCount ? `${baseId}-${currentCount + 1}` : baseId;
      if (level === 2) {
        h2Count += 1;
        (affiliates.items || []).forEach((item, itemIndex) => {
          const target = Math.max(1, parseInt(item?.position || itemIndex + 1, 10) || itemIndex + 1);
          if (item?.enabled && h2Count === target) {
            pushBlock("affiliate", renderAffiliateHtml(item, options));
          }
        });
      }
      pushBlock("heading", `<h${level} id="${escapeHtml(id)}">${renderHeadingText(level, text)}</h${level}>`, { level, text, id });
      continue;
    }

    if (/^>\s?/.test(trimmed)) {
      flushParagraph();
      flushList();
      flushOrdered();
      inBlockquote = true;
      blockquoteLines.push(trimmed.replace(/^>\s?/, ""));
      continue;
    }

    const ul = trimmed.match(/^[-*]\s+(.*)$/);
    if (ul) {
      flushParagraph();
      flushOrdered();
      flushBlockquote();
      listItems.push(ul[1]);
      continue;
    }

    const ol = trimmed.match(/^\d+\.\s+(.*)$/);
    if (ol) {
      flushParagraph();
      flushList();
      flushBlockquote();
      orderedItems.push(ol[1]);
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  flushOrdered();
  flushBlockquote();

  const blocksWithAffiliateCtas = insertAffiliateCtasAtTargetH2SectionEnd(blocks, affiliateCta);
  const blocksWithHotelSectionClasses = decorateHotelSectionHeadingBlocks(blocksWithAffiliateCtas, options);
  return insertInlineImagesAtH2Anchors(blocksWithHotelSectionClasses, inlineImages, options);
}

export function renderMarkdown(md = "", options = {}) {
  return renderMarkdownBlocks(md, options)
    .filter((block) => block.type !== "toc")
    .map((block) => block.html)
    .join("\n");
}
