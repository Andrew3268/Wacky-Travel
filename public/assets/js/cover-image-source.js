(() => {
  const $ = (id) => document.getElementById(id);

  function normalizeHttpsUrl(value = "") {
    const raw = String(value || "").trim();
    if (!raw) return "";
    const normalized = raw.startsWith("//") ? `https:${raw}` : raw;
    try {
      const url = new URL(normalized, window.location.origin);
      if (!/^https?:$/.test(url.protocol)) return "";
      url.protocol = "https:";
      return url.toString();
    } catch (_) {
      return "";
    }
  }

  function normalizeR2ImageUrl(value = "") {
    const raw = String(value || "").trim();
    if (!raw) return "";
    if (raw.startsWith("/") && !raw.startsWith("//")) return raw;
    return normalizeHttpsUrl(raw);
  }

  function isAgodaLink(value = "") {
    const normalized = normalizeHttpsUrl(value);
    if (!normalized) return false;
    try {
      const url = new URL(normalized);
      const host = url.hostname.toLowerCase();
      return ["agoda.com", "www.agoda.com"].includes(host)
        && url.pathname.toLowerCase().includes("/partners/partnersearch.aspx");
    } catch (_) {
      return false;
    }
  }

  function isAgodaImage(value = "") {
    const normalized = normalizeHttpsUrl(value);
    if (!normalized) return false;
    try {
      const host = new URL(normalized).hostname.toLowerCase();
      return host === "agoda.net" || host.endsWith(".agoda.net");
    } catch (_) {
      return false;
    }
  }

  function normalizeSrcset(value = "") {
    const entries = String(value || "")
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => {
        const parts = entry.split(/\s+/).filter(Boolean);
        const url = normalizeHttpsUrl(parts.shift() || "");
        const descriptor = String(parts.shift() || "").trim();
        if (!isAgodaImage(url)) return "";
        if (descriptor && !/^(?:\d+(?:\.\d+)?x|\d+w)$/i.test(descriptor)) return "";
        return descriptor ? `${url} ${descriptor}` : url;
      })
      .filter(Boolean);
    return [...new Set(entries)].join(", ");
  }

  function parseAgodaHtml(html = "") {
    const raw = String(html || "").trim();
    if (!raw) return { ok: false, error: "아고다 이미지 링크 HTML을 입력해 주세요." };

    const doc = new DOMParser().parseFromString(raw, "text/html");
    const anchor = doc.querySelector("a[href]");
    const image = doc.querySelector("img[src]");
    const link = normalizeHttpsUrl(anchor?.getAttribute("href") || "");
    const src = normalizeHttpsUrl(image?.getAttribute("src") || "");
    const srcset = normalizeSrcset(image?.getAttribute("srcset") || "");

    if (!isAgodaLink(link)) return { ok: false, error: "아고다 파트너스 이동 링크를 확인해 주세요." };
    if (!isAgodaImage(src)) return { ok: false, error: "아고다 이미지 주소를 확인해 주세요." };

    return { ok: true, source: "agoda", image: src, link, srcset };
  }

  function getSelectedSource() {
    return String(document.querySelector('input[name="coverImageSource"]:checked')?.value || "r2").trim() === "agoda"
      ? "agoda"
      : "r2";
  }

  function setStatus(message = "", type = "") {
    const status = $("agodaImageParseStatus");
    if (!status) return;
    status.textContent = message;
    status.dataset.state = type;
  }

  function sync() {
    const source = getSelectedSource();
    const r2Panel = $("coverImageR2Panel");
    const agodaPanel = $("coverImageAgodaPanel");
    if (r2Panel) {
      r2Panel.hidden = source !== "r2";
      r2Panel.setAttribute("aria-hidden", source === "r2" ? "false" : "true");
    }
    if (agodaPanel) {
      agodaPanel.hidden = source !== "agoda";
      agodaPanel.setAttribute("aria-hidden", source === "agoda" ? "false" : "true");
    }
    if (source === "r2") setStatus("");
    return source;
  }

  function collect({ validate = false } = {}) {
    const source = getSelectedSource();
    const alt = String($("cover_image_alt")?.value || "").replace(/\s+/g, " ").trim();

    if (source === "r2") {
      const image = normalizeR2ImageUrl($("cover_image")?.value || "");
      return { ok: true, source: "r2", image, link: "", srcset: "", alt };
    }

    const parsed = parseAgodaHtml($("agoda_image_html")?.value || "");
    if (!parsed.ok) {
      if (validate) setStatus(parsed.error, "error");
      return { ...parsed, alt };
    }
    setStatus("아고다 링크와 이미지 주소를 확인했습니다.", "success");
    return { ...parsed, alt };
  }

  function buildAgodaHtml({ link = "", image = "", srcset = "" } = {}) {
    const normalizedLink = normalizeHttpsUrl(link);
    const normalizedImage = normalizeHttpsUrl(image);
    const normalizedSrcset = normalizeSrcset(srcset);
    if (!normalizedLink || !normalizedImage) return "";
    return `<a href="${normalizedLink}" target="_blank"><img src="${normalizedImage}"${normalizedSrcset ? ` srcset="${normalizedSrcset}"` : ""} /></a>`;
  }

  function apply(item = {}) {
    const source = String(item.cover_image_source || "").trim().toLowerCase() === "agoda" ? "agoda" : "r2";
    document.querySelectorAll('input[name="coverImageSource"]').forEach((input) => {
      input.checked = String(input.value || "") === source;
    });
    if ($("cover_image")) $("cover_image").value = source === "r2" ? normalizeR2ImageUrl(item.cover_image || "") : "";
    if ($("agoda_image_html")) {
      $("agoda_image_html").value = source === "agoda"
        ? buildAgodaHtml({
            link: item.cover_image_link_url,
            image: item.cover_image,
            srcset: item.cover_image_srcset
          })
        : "";
    }
    if ($("cover_image_alt")) $("cover_image_alt").value = item.cover_image_alt || "";
    sync();
  }

  function bind(onChange) {
    document.querySelectorAll('input[name="coverImageSource"]').forEach((input) => {
      input.addEventListener("change", () => {
        sync();
        if (typeof onChange === "function") onChange();
      });
    });
    $("agoda_image_html")?.addEventListener("input", () => {
      const parsed = parseAgodaHtml($("agoda_image_html")?.value || "");
      setStatus(parsed.ok ? "아고다 링크와 이미지 주소를 확인했습니다." : parsed.error, parsed.ok ? "success" : "error");
      if (typeof onChange === "function") onChange();
    });
    sync();
  }

  window.CoverImageSourceUtils = Object.freeze({
    normalizeHttpsUrl,
    normalizeR2ImageUrl,
    normalizeSrcset,
    parseAgodaHtml,
    getSelectedSource,
    sync,
    collect,
    apply,
    bind,
    buildAgodaHtml
  });
})();
