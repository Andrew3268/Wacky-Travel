import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const destinationDir = path.join(root, "public", "destinations");
const outputFile = path.join(root, "public", "_routes.json");

const include = [
  "/",
  "/destinations/",
  "/api/*",
  "/post/*",
  "/img/*",
  "/robots.txt",
  "/sitemap.xml"
];

const entries = await fs.readdir(destinationDir, { withFileTypes: true });
for (const entry of entries.filter((item) => item.isDirectory()).sort((a, b) => a.name.localeCompare(b.name, "en"))) {
  const slug = entry.name;
  for (const archive of ["hotels", "hotel-recommendations"]) {
    const indexFile = path.join(destinationDir, slug, archive, "index.html");
    try {
      await fs.access(indexFile);
      include.push(`/destinations/${slug}/${archive}/*`);
    } catch {}
  }
}


if (include.length > 100) {
  throw new Error(`_routes.json rule limit exceeded: ${include.length}`);
}

const output = `${JSON.stringify({ version: 1, include, exclude: [] }, null, 2)}\n`;
await fs.writeFile(outputFile, output, "utf8");
console.log(`Generated ${include.length} Pages Functions invocation routes -> public/_routes.json`);
