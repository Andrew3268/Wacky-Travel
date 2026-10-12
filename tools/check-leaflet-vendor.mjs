import { stat } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const required = [
  "public/assets/vendor/leaflet/leaflet.js",
  "public/assets/vendor/leaflet/leaflet.css",
  "public/assets/vendor/leaflet/images/layers.png",
  "public/assets/vendor/leaflet/images/layers-2x.png",
  "public/assets/vendor/leaflet/images/marker-icon.png",
  "public/assets/vendor/leaflet/images/marker-icon-2x.png",
  "public/assets/vendor/leaflet/images/marker-shadow.png"
];

let failed = false;
for (const rel of required) {
  try {
    const s = await stat(join(root, rel));
    if (!s.isFile() || s.size === 0) throw new Error("empty");
    console.log(`[leaflet-vendor] OK ${rel} (${s.size} bytes)`);
  } catch {
    console.error(`[leaflet-vendor] MISSING ${rel}`);
    failed = true;
  }
}
if (failed) process.exit(1);
