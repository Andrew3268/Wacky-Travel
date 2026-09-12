import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {renderMarkdown,renderMarkdownBlocks,buildTocItemsFromBlocks} from '../lib/posts/renderer.js';
const tip=':::editor-tip\n예약 **시간**을 확인하세요.\n\n[예약 확인](https://example.com/ticket?a=1&b=2)\n:::';
const md='## 본문\n앞 문단\n'+tip+'\n뒤 문단\n\n'+tip;
const html=renderMarkdown(md);
assert.equal((html.match(/<aside /g)||[]).length,2);
assert.ok(!html.includes(':::'));
assert.match(html,/<strong>시간<\/strong>/);
assert.match(html,/rel="nofollow sponsored noopener noreferrer"/);
assert.match(html,/a=1&amp;b=2/);
assert.match(html,/<\/aside>\n<p>뒤 문단<\/p>/);
assert.equal(buildTocItemsFromBlocks(renderMarkdownBlocks(md)).length,1);
assert.ok(!renderMarkdown('```\n'+tip+'\n```').includes('<aside'));
assert.ok(!renderMarkdown(':::editor-tip\n미완성').includes('<aside'));
assert.ok(!renderMarkdown(':::editor-tip\n\n:::').includes('<aside'));
const unsafe=renderMarkdown(':::editor-tip\n<script>alert(1)</script>\n[위험](javascript:alert(1))\n:::');
assert.ok(!unsafe.includes('<script>'));assert.ok(!unsafe.includes('href='));
const marker='// Editor Tip: shared implementation;';
const server=fs.readFileSync('lib/posts/renderer.js','utf8').split(marker)[1];
for(const file of ['add','edit']){
 const source=fs.readFileSync('public/assets/js/'+file+'.js','utf8');
 assert.equal(source.split(marker)[1],server,'preview and server helpers must match');
 const context={URL};vm.createContext(context);vm.runInContext(marker+server,context);
 const lines=tip.split('\n');assert.equal(context.renderEditorTip(context.readEditorTip(lines,0).lines),renderMarkdown(tip));
 assert.match(source,/const editorTip = readEditorTip\(lines, lineIndex\)/);
}
console.log('Editor Tip: cards, boundaries, multiple cards, TOC, code fences, malformed input, URL safety and preview parity passed.');
