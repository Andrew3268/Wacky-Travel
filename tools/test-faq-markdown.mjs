import assert from "node:assert/strict";
import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");

function loadParser(file, nextMarker) {
  const source = read(file);
  const start = source.indexOf("function parseFaqMarkdown(raw) {");
  assert.ok(start >= 0, `${file}: parseFaqMarkdown not found`);
  const end = source.indexOf(nextMarker, start);
  assert.ok(end > start, `${file}: parser end marker not found`);
  const parserSource = source.slice(start, end);
  return new Function(`${parserSource}\nreturn parseFaqMarkdown;`)();
}

const targets = [
  ["functions/post/[slug].js", "function renderFaqSection"],
  ["public/assets/js/add.js", "function countText"],
  ["public/assets/js/edit.js", "function countText"]
];

const headingInput = `### 오사카 여행에 주유패스는 꼭 필요한가요?\n\n꼭 필요한 것은 아닙니다. 오사카 시내 유료 관광지를 여러 곳 방문하고 지하철 이동도 많은 날에는 활용하기 좋지만, USJ·쇼핑·맛집 중심 여행이라면 필요성이 낮아집니다.`;

const legacyInput = `Q: 오사카 여행에 주유패스는 꼭 필요한가요?\nA: 꼭 필요한 것은 아닙니다.`;

const multipleInput = `### 첫 번째 질문인가요?\n\n첫 번째 답변입니다.\n\n### 두 번째 질문인가요?\n\n두 번째 답변입니다.`;

for (const [file, nextMarker] of targets) {
  const parseFaqMarkdown = loadParser(file, nextMarker);

  const headingItems = parseFaqMarkdown(headingInput);
  assert.equal(headingItems.length, 1, `${file}: markdown heading FAQ should parse`);
  assert.equal(headingItems[0].question, "오사카 여행에 주유패스는 꼭 필요한가요?");
  assert.match(headingItems[0].answerMd, /^꼭 필요한 것은 아닙니다\./);

  const legacyItems = parseFaqMarkdown(legacyInput);
  assert.equal(legacyItems.length, 1, `${file}: Q/A FAQ should remain compatible`);
  assert.equal(legacyItems[0].question, "오사카 여행에 주유패스는 꼭 필요한가요?");
  assert.equal(legacyItems[0].answerMd, "꼭 필요한 것은 아닙니다.");
  assert.doesNotMatch(legacyItems[0].answerMd, /^A\s*:/i);

  const multipleItems = parseFaqMarkdown(multipleInput);
  assert.equal(multipleItems.length, 2, `${file}: multiple markdown heading FAQs should parse`);
}

for (const html of ["public/add.html", "public/edit.html"]) {
  const source = read(html);
  assert.match(source, /placeholder="### 질문을 입력하세요/);
  assert.match(source, /권장 형식:[\s\S]*?### 질문[\s\S]*?Q:[\s\S]*?A:/);
}

assert.match(read("functions/post/[slug].js"), /class="card post-faq__item"/);

console.log("FAQ markdown check passed: H3-style questions and legacy Q/A input both parse consistently in public render and editor previews.");
