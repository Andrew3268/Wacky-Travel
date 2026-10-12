import { cp, mkdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const src = join(root, "node_modules", "leaflet", "dist");
const dest = join(root, "public", "assets", "vendor", "leaflet");
try { await stat(src); } catch { throw new Error("Leaflet vendor source가 없습니다. 먼저 npm ci를 실행하세요."); }
await mkdir(dest, { recursive: true });
await cp(join(src, "leaflet.js"), join(dest, "leaflet.js"));
await cp(join(src, "leaflet.css"), join(dest, "leaflet.css"));
await cp(join(src, "images"), join(dest, "images"), { recursive: true });
console.log("[vendor] Leaflet 1.9.4 self-host assets prepared");
