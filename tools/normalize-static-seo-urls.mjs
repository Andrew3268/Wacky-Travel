import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const SITE_ORIGIN = "https://bestayable.com";

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

function routeFor(file) {
  const rel = path.relative(publicDir, file).split(path.sep).join("/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  return `/${rel}`;
}

function absoluteUrl(value, fallbackPath = "/") {
  const raw = String(value || "").trim();
  if (!raw) return `${SITE_ORIGIN}${fallbackPath}`;
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith("//")) return `https:${raw}`;
  if (raw.startsWith("/")) return `${SITE_ORIGIN}${raw}`;
  return raw;
}

function getAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, "i"));
  return match ? match[2] : "";
}

function setAttribute(tag, name, value) {
  const pattern = new RegExp(`(\\b${name}\\s*=\\s*)(["'])(.*?)\\2`, "i");
  if (pattern.test(tag)) return tag.replace(pattern, `$1"${value}"`);
  return tag.replace(/\s*\/>$|>$/, (ending) => ` ${name}="${value}"${ending}`);
}

function normalizeJsonLd(value) {
  if (Array.isArray(value)) return value.map(normalizeJsonLd);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalizeJsonLd(item)]));
  }
  if (typeof value === "string" && value.startsWith("/")) return `${SITE_ORIGIN}${value}`;
  return value;
}

function normalizeHtml(html, route) {
  const canonical = `${SITE_ORIGIN}${route}`;

  let output = html.replace(/<link\b[^>]*>/gi, (tag) => {
    const rel = getAttribute(tag, "rel").toLowerCase().split(/\s+/);
    if (!rel.includes("canonical")) return tag;
    return setAttribute(tag, "href", canonical);
  });

  output = output.replace(/<meta\b[^>]*>/gi, (tag) => {
    const property = getAttribute(tag, "property").toLowerCase();
    const name = getAttribute(tag, "name").toLowerCase();
    const content = getAttribute(tag, "content");

    if (property === "og:url") return setAttribute(tag, "content", canonical);
    if (property === "og:image" || name === "twitter:image") {
      return setAttribute(tag, "content", absoluteUrl(content));
    }
    return tag;
  });

  output = output.replace(
    /(<script\b[^>]*type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/gi,
    (full, open, body, close) => {
      try {
        const parsed = JSON.parse(body.trim());
        return `${open}${JSON.stringify(normalizeJsonLd(parsed))}${close}`;
      } catch {
        return full;
      }
    }
  );

  return output;
}

const htmlFiles = (await walk(publicDir)).filter((file) => file.endsWith(".html"));
let changed = 0;
for (const file of htmlFiles) {
  const before = await fs.readFile(file, "utf8");
  const after = normalizeHtml(before, routeFor(file));
  if (after === before) continue;
  await fs.writeFile(file, after, "utf8");
  changed += 1;
}

console.log(`Normalized static SEO URLs: ${changed}/${htmlFiles.length} HTML files changed.`);
