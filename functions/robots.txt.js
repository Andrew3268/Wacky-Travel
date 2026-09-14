import { getSiteOrigin } from "../lib/seo/site-url.js";

export async function onRequestGet({ env, request }) {
  const origin = getSiteOrigin(env, request);
  const body = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${origin}/sitemap.xml

#DaumWebMasterTool:6886e2d0875cfb383dee7223024f130e4f47a83bb9ff86e649f7502064e23bf5:pa0rUlP4x9Rpwmt9hkdpVA==
`;
  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
      "x-content-type-options": "nosniff"
    }
  });
}
