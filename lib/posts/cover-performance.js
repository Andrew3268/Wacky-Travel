import { isR2DevUrl } from "../image-utils.js";

export const TRAVEL_TIP_COVER_IMAGE_CONFIG = Object.freeze({
  widths: Object.freeze([480, 640, 720, 800, 1200]),
  sizes: "(max-width: 839px) 100vw, 800px",
  fallbackWidth: 800,
  fit: "scale-down",
  quality: 80,
  format: "auto"
});

export function shouldKeepStableCoverUrl(src = "") {
  return isR2DevUrl(src);
}

export function getTravelTipCoverImageConfig() {
  return {
    widths: [...TRAVEL_TIP_COVER_IMAGE_CONFIG.widths],
    sizes: TRAVEL_TIP_COVER_IMAGE_CONFIG.sizes,
    fallbackWidth: TRAVEL_TIP_COVER_IMAGE_CONFIG.fallbackWidth,
    fit: TRAVEL_TIP_COVER_IMAGE_CONFIG.fit,
    quality: TRAVEL_TIP_COVER_IMAGE_CONFIG.quality,
    format: TRAVEL_TIP_COVER_IMAGE_CONFIG.format
  };
}

export function warmTravelTipCoverTransforms(src = "") {
  const sourceUrl = String(src || "").trim();
  if (!isR2DevUrl(sourceUrl) || typeof fetch !== "function") return Promise.resolve([]);

  // 대표 이미지는 실제 공개 글에서 가장 자주 선택되는 720/800px AVIF 변형을
  // 발행/수정 직후 백그라운드에서 준비합니다. /img 경로를 self-fetch하지 않아
  // Pages Functions 재귀 호출 위험 없이 Image Resizing의 상위 캐시만 예열합니다.
  const widths = [720, 800];
  return Promise.allSettled(widths.map((width) => fetch(sourceUrl, {
    headers: {
      accept: "image/avif,image/webp,image/*,*/*;q=0.8",
      "user-agent": "Mozilla/5.0 (compatible; BeStayableCoverWarmup/1.0)"
    },
    cf: {
      image: {
        width,
        quality: TRAVEL_TIP_COVER_IMAGE_CONFIG.quality,
        fit: TRAVEL_TIP_COVER_IMAGE_CONFIG.fit,
        format: "avif"
      },
      cacheEverything: true,
      cacheTtl: 60 * 60 * 24 * 365
    }
  })));
}
