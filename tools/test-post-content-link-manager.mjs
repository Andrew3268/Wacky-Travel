import fs from "node:fs/promises";
import { renderMarkdown } from "../lib/posts/renderer.js";
import { normalizeContentLinkSettings, getContentLinkType } from "../lib/posts/content-link-settings.js";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const [addHtml, editHtml, addJs, editJs, linkManagerJs, schema, createApi, editApi, publicPost] = await Promise.all([
  fs.readFile(new URL("../public/add.html", import.meta.url), "utf8"),
  fs.readFile(new URL("../public/edit.html", import.meta.url), "utf8"),
  fs.readFile(new URL("../public/assets/js/add.js", import.meta.url), "utf8"),
  fs.readFile(new URL("../public/assets/js/edit.js", import.meta.url), "utf8"),
  fs.readFile(new URL("../public/assets/js/post-link-manager.js", import.meta.url), "utf8"),
  fs.readFile(new URL("../db/schema.sql", import.meta.url), "utf8"),
  fs.readFile(new URL("../functions/api/posts.js", import.meta.url), "utf8"),
  fs.readFile(new URL("../functions/api/posts/[slug].js", import.meta.url), "utf8"),
  fs.readFile(new URL("../functions/post/[slug].js", import.meta.url), "utf8")
]);

for (const [name, html] of [["add", addHtml], ["edit", editHtml]]) {
  assert(html.includes('id="contentLinkManager"'), `${name}: 본문 링크 관리 UI가 없습니다.`);
  assert(html.includes('/assets/js/post-link-manager.js'), `${name}: 링크 관리자 스크립트가 없습니다.`);
}

assert(addJs.includes("content_link_settings: window.PostLinkManager?.getSettings?.() || []"), "add: 링크 설정 저장 payload가 없습니다.");
assert(editJs.includes("content_link_settings: window.PostLinkManager?.getSettings?.() || []"), "edit: 링크 설정 저장 payload가 없습니다.");
assert(editJs.includes("PostLinkManager?.setSettings"), "edit: 기존 링크 설정 복원 로직이 없습니다.");
assert(linkManagerJs.includes("일반 링크") && linkManagerJs.includes("제휴 링크"), "링크 유형 선택 UI가 없습니다.");
assert(linkManagerJs.includes('return "affiliate";\n  }\n\n  function render()'), "새 외부 링크의 기본값이 제휴 링크가 아닙니다.");
assert(linkManagerJs.includes('post-content-link--normal') && linkManagerJs.includes('post-content-link--affiliate'), "미리보기 링크 유형 클래스가 없습니다.");
assert(schema.includes("content_link_settings_json TEXT DEFAULT '[]'"), "DB 스키마에 링크 설정 컬럼이 없습니다.");
assert(createApi.includes("content_link_settings_json"), "신규 글 API가 링크 설정을 저장하지 않습니다.");
assert(editApi.includes("content_link_settings_json"), "글 수정 API가 링크 설정을 저장/조회하지 않습니다.");
assert(publicPost.includes("contentLinkSettings: row.content_link_settings_json"), "공개 글 렌더링에 링크 설정이 전달되지 않습니다.");

const settings = normalizeContentLinkSettings([
  { text: "일본정부관광국", url: "https://example.com/guide", type: "normal" },
  { text: "클룩에서 티켓 확인", url: "https://example.com/deal?a=1&b=2", type: "affiliate" }
]);
assert(getContentLinkType(settings, "클룩에서 티켓 확인", "https://example.com/deal?a=1&b=2") === "affiliate", "제휴 링크 유형 조회가 실패했습니다.");

const html = renderMarkdown(
  "[일본정부관광국](https://example.com/guide) [클룩에서 티켓 확인](https://example.com/deal?a=1&b=2) [내부 글](/post/sample/)",
  { contentLinkSettings: settings }
);
assert(html.includes('class="post-content-link post-content-link--normal" href="https://example.com/guide" target="_blank" rel="noopener"'), "일반 외부 링크의 스타일 클래스/rel이 올바르지 않습니다.");
assert(html.includes('class="post-content-link post-content-link--affiliate"'), "제휴 링크 스타일 클래스가 없습니다.");
assert(html.includes('rel="sponsored nofollow noopener"'), "제휴 링크 rel이 올바르지 않습니다.");
assert(html.includes('href="/post/sample/"'), "내부 링크가 렌더링되지 않았습니다.");
assert(!html.includes("noreferrer"), "관리 대상 본문 링크에 noreferrer가 남아 있습니다.");

console.log("Post content link manager tests passed.");
