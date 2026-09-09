export const GOOGLE_TAG_ID = "G-JJGZWKW70H";
export const GOOGLE_TAG_DELAY_MIN_MS = 1000;
export const GOOGLE_TAG_DELAY_MAX_MS = 1500;

const GOOGLE_TAG_LEGACY_HTML = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${GOOGLE_TAG_ID}');
</script>`;

export const GOOGLE_TAG_HTML = `<!-- Google tag (gtag.js) - delayed for page performance -->
<script data-google-analytics-loader="delayed">
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
  window.gtag('js', new Date());
  window.gtag('config', '${GOOGLE_TAG_ID}');

  (function(){
    var src = 'https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}';
    var started = false;
    var idleId = null;
    var minTimer = null;
    var maxTimer = null;
    var interactionEvents = ['pointerdown', 'touchstart', 'keydown'];

    function cleanup(){
      if (minTimer !== null) window.clearTimeout(minTimer);
      if (maxTimer !== null) window.clearTimeout(maxTimer);
      if (idleId !== null && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      window.removeEventListener('load', queueIdleLoad);
      window.removeEventListener('pagehide', loadGoogleAnalytics);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      interactionEvents.forEach(function(eventName){
        window.removeEventListener(eventName, loadGoogleAnalytics);
      });
    }

    function loadGoogleAnalytics(){
      if (started) return;
      started = true;
      cleanup();

      if (document.querySelector('script[data-google-analytics-gtag="true"]') || document.querySelector('script[src="' + src + '"]')) return;

      var script = document.createElement('script');
      script.async = true;
      script.src = src;
      script.setAttribute('data-google-analytics-gtag', 'true');
      document.head.appendChild(script);
    }

    function queueIdleLoad(){
      if (started) return;
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(loadGoogleAnalytics, { timeout: ${GOOGLE_TAG_DELAY_MAX_MS - GOOGLE_TAG_DELAY_MIN_MS} });
      } else {
        loadGoogleAnalytics();
      }
    }

    function afterMinimumDelay(){
      if (started) return;
      if (document.readyState === 'complete') {
        queueIdleLoad();
      } else {
        window.addEventListener('load', queueIdleLoad, { once: true });
      }
    }

    function onVisibilityChange(){
      if (document.visibilityState === 'hidden') loadGoogleAnalytics();
    }

    minTimer = window.setTimeout(afterMinimumDelay, ${GOOGLE_TAG_DELAY_MIN_MS});
    maxTimer = window.setTimeout(loadGoogleAnalytics, ${GOOGLE_TAG_DELAY_MAX_MS});

    interactionEvents.forEach(function(eventName){
      window.addEventListener(eventName, loadGoogleAnalytics, { once: true, passive: true });
    });
    document.addEventListener('visibilitychange', onVisibilityChange, { passive: true });
    window.addEventListener('pagehide', loadGoogleAnalytics, { once: true, passive: true });
  })();
</script>`;

function hasDelayedGoogleTag(html = "") {
  return String(html || "").includes('data-google-analytics-loader="delayed"');
}

function removeLegacyGoogleTag(html = "") {
  let value = String(html || "");
  value = value.split(GOOGLE_TAG_LEGACY_HTML).join("");

  // Fallback for the same historical snippet after harmless whitespace/attribute formatting changes.
  value = value.replace(
    new RegExp(`<script\\b[^>]*\\bsrc=["']https:\\/\\/www\\.googletagmanager\\.com\\/gtag\\/js\\?id=${GOOGLE_TAG_ID}["'][^>]*>\\s*<\\/script>\\s*`, "gi"),
    ""
  );
  value = value.replace(
    new RegExp(`<script\\b(?![^>]*\\bsrc=)[^>]*>[\\s\\S]*?gtag\\(\\s*["']config["']\\s*,\\s*["']${GOOGLE_TAG_ID}["']\\s*\\);?[\\s\\S]*?<\\/script>\\s*`, "gi"),
    (block) => /dataLayer|function\s+gtag|window\.gtag/.test(block) ? "" : block
  );
  return value;
}

export function hasGoogleTag(html = "") {
  const value = String(html || "");
  return hasDelayedGoogleTag(value)
    || value.includes(`googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`)
    || value.includes(`gtag('config', '${GOOGLE_TAG_ID}')`)
    || value.includes(`gtag("config", "${GOOGLE_TAG_ID}")`)
    || value.includes(`window.gtag('config', '${GOOGLE_TAG_ID}')`);
}

export function injectGoogleTagIntoHead(html = "") {
  let value = String(html || "");
  if (!value || !/<\/head>/i.test(value)) return value;
  if (hasDelayedGoogleTag(value)) return value;

  // Existing static files may still contain the previous eager loader. Normalize them in place.
  value = removeLegacyGoogleTag(value);
  return value.replace(/<\/head>/i, `${GOOGLE_TAG_HTML}\n</head>`);
}

export function isGoogleAnalyticsEligiblePath(pathname = "") {
  const path = String(pathname || "").trim() || "/";
  if (path === "/add.html" || path === "/edit.html") return false;
  if (path === "/admin" || path.startsWith("/admin/")) return false;
  if (/^\/naver[a-z0-9]+\.html$/i.test(path)) return false;
  return true;
}
