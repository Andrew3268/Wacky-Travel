import assert from "node:assert/strict";
import fs from "node:fs";
import { renderMarkdown, renderMarkdownBlocks } from "../lib/posts/renderer.js";

const sample = [
  "```text",
  "📌 핵심 선택 기준",
  "",
  "후쿠오카 시내 이동 → 시티 패스",
  "<article data-test=\"x\">& 안전하게 표시</article>",
  "# 코드 안에서는 제목이 아님",
  "- 코드 안에서는 목록이 아님",
  "`inline`도 그대로",
  "```"
].join("\n");

const html = renderMarkdown(sample);
assert.match(html, /<pre class="post-code-block"><code class="language-text">/);
assert.match(html, /📌 핵심 선택 기준\n\n후쿠오카 시내 이동 → 시티 패스/);
assert.match(html, /&lt;article data-test=&quot;x&quot;&gt;&amp; 안전하게 표시&lt;\/article&gt;/);
assert.match(html, /# 코드 안에서는 제목이 아님/);
assert.match(html, /- 코드 안에서는 목록이 아님/);
assert.match(html, /`inline`도 그대로/);
assert.doesNotMatch(html, /<h[1-6][^>]*>.*코드 안에서는 제목이 아님/s);
assert.doesNotMatch(html, /<li>코드 안에서는 목록이 아님<\/li>/);
assert.doesNotMatch(html, /<code>inline<\/code>/);

const noLanguage = renderMarkdown("```\nconst a = 1;\n```");
assert.match(noLanguage, /<pre class="post-code-block"><code>const a = 1;<\/code><\/pre>/);

const unclosed = renderMarkdown("```js\nconst answer = 42;");
assert.match(unclosed, /<pre class="post-code-block"><code class="language-js">const answer = 42;<\/code><\/pre>/);

const blocks = renderMarkdownBlocks("앞 문단\n\n```bash\necho hello\n```\n\n뒤 문단");
assert.deepEqual(blocks.map((block) => block.type), ["paragraph", "code", "paragraph"]);

for (const file of ["public/assets/js/add.js", "public/assets/js/edit.js"]) {
  const source = fs.readFileSync(file, "utf8");
  assert.match(source, /function parseFencedCodeOpen\(/, `${file}: fenced code opener parser missing`);
  assert.match(source, /function isFencedCodeClose\(/, `${file}: fenced code closer parser missing`);
  assert.match(source, /function renderFencedCodeHtml\(/, `${file}: fenced code renderer missing`);
  assert.match(source, /parseFencedCodeOpen\(value\)/, `${file}: paragraph aggregation must stop before fenced code`);
  assert.match(source, /flushFencedCode\(\)/, `${file}: fenced code must flush to preview output`);
}

const css = fs.readFileSync("public/assets/css/app.css", "utf8");
assert.match(css, /\.post-code-block/);
assert.match(css, /overflow-x:\s*auto/);
assert.match(css, /white-space:\s*pre/);
assert.match(css, /background:\s*#f7f7f4/);
assert.match(css, /border:\s*1px solid #e2e0da/);
assert.match(css, /box-shadow:\s*0 8px 24px rgba\(17, 24, 39, 0\.035\)/);
assert.match(css, /scrollbar-color:\s*#c9c7c0 transparent/);

console.log("Markdown fenced code block check passed: public post and Add/Edit preview preserve code, escape HTML, and support optional language classes.");
