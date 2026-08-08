import { getSiteOrigin } from "../lib/seo/site-url.js";

export async function onRequestGet({ env, request }) {
  const origin = getSiteOrigin(env, request);
  const body = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /hotel-promotions/
Disallow: /travel-by-mood/ocean-rest/

Sitemap: ${origin}/sitemap.xml
`;
  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
      "x-content-type-options": "nosniff"
    }
  });
}
