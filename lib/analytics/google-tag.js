export const GOOGLE_TAG_ID = "G-JJGZWKW70H";

export const GOOGLE_TAG_HTML = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${GOOGLE_TAG_ID}');
</script>`;

export function hasGoogleTag(html = "") {
  const value = String(html || "");
  return value.includes(`googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`)
    || value.includes(`gtag('config', '${GOOGLE_TAG_ID}')`)
    || value.includes(`gtag("config", "${GOOGLE_TAG_ID}")`);
}

export function injectGoogleTagIntoHead(html = "") {
  const value = String(html || "");
  if (!value || hasGoogleTag(value) || !/<\/head>/i.test(value)) return value;
  return value.replace(/<\/head>/i, `${GOOGLE_TAG_HTML}\n</head>`);
}

export function isGoogleAnalyticsEligiblePath(pathname = "") {
  const path = String(pathname || "").trim() || "/";
  if (path === "/add.html" || path === "/edit.html") return false;
  if (path === "/admin" || path.startsWith("/admin/")) return false;
  if (/^\/naver[a-z0-9]+\.html$/i.test(path)) return false;
  return true;
}
