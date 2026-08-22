import fs from 'node:fs';

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

function channel(value) {
  const normalized = value / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const value = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((offset) => channel(Number.parseInt(value.slice(offset, offset + 2), 16)));
  return (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
}

function contrastRatio(foreground, background) {
  const a = luminance(foreground);
  const b = luminance(background);
  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);
  return (lighter + 0.05) / (darker + 0.05);
}

function extractColor(css, selectorPattern, label) {
  const match = css.match(new RegExp(`${selectorPattern}\\s*\\{[\\s\\S]*?color\\s*:\\s*(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3})`, 'm'));
  assert(match, `${label} 색상 규칙을 찾지 못했습니다.`);
  const raw = match[1].toLowerCase();
  if (raw.length === 4) return `#${raw[1]}${raw[1]}${raw[2]}${raw[2]}${raw[3]}${raw[3]}`;
  return raw;
}

const componentsCss = fs.readFileSync('public/assets/css/components.css', 'utf8');
const promotionsCss = fs.readFileSync('public/assets/css/hotel-promotions.css', 'utf8');

const componentColor = extractColor(componentsCss, '\\.wtpromo-footer \\.wtpromo-footer-copy', '공통 푸터 저작권');
const promotionsColor = extractColor(promotionsCss, '\\.wtpromo-footer-copy', '프로모션 푸터 저작권');

for (const [label, color] of [
  ['공통 푸터 저작권', componentColor],
  ['프로모션 푸터 저작권', promotionsColor],
]) {
  const ratio = contrastRatio(color, '#ffffff');
  assert(ratio >= 4.5, `${label} 대비율이 WCAG AA 4.5:1 미만입니다: ${color} = ${ratio.toFixed(2)}:1`);
  console.log(`${label}: ${color} on #ffffff = ${ratio.toFixed(2)}:1`);
}

const generatedHtml = fs.readFileSync('public/destinations/osaka/first-trip/index.html', 'utf8');
assert(
  generatedHtml.includes('/assets/css/components.css?v=20260822-a11y-v1'),
  '생성 페이지가 새 components.css 캐시 버전을 사용하지 않습니다.'
);

console.log('Footer contrast accessibility check passed.');
