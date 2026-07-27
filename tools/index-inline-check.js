import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const htmlFiles = [];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.name.endsWith(".html")) htmlFiles.push(full);
  }
}

await walk(publicDir);
let checked = 0;
for (const htmlFile of htmlFiles) {
  const html = await fs.readFile(htmlFile, "utf8");
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter((match) => !/\bsrc\s*=/i.test(match[1]) && !/application\/ld\+json/i.test(match[1]))
    .map((match) => match[2].trim())
    .filter(Boolean);

  for (let index = 0; index < scripts.length; index += 1) {
    const tempFile = path.join(os.tmpdir(), `bestayable-inline-${process.pid}-${checked}.js`);
    await fs.writeFile(tempFile, scripts[index], "utf8");
    const result = spawnSync(process.execPath, ["--check", tempFile], { encoding: "utf8" });
    await fs.rm(tempFile, { force: true });
    if (result.status !== 0) {
      const rel = path.relative(root, htmlFile).split(path.sep).join("/");
      process.stderr.write(`Inline script syntax error: ${rel} (script ${index + 1})\n`);
      process.stderr.write(result.stderr || result.stdout || "");
      process.exit(result.status || 1);
    }
    checked += 1;
  }
}

console.log(`HTML inline script syntax check passed: ${checked} scripts in ${htmlFiles.length} files`);
