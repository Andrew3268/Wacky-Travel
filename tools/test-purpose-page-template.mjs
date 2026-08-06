import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pageTypes = ['first-trip', 'value-hotel', 'near-trip', 'family-trip', 'quiet-stay'];
const errors = [];

for (const pageType of pageTypes) {
  const file = path.join(root, 'public', 'destinations', 'fukuoka', pageType, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  const relative = path.relative(root, file);

  const required = [
    'data-purpose-template="fukuoka-v1"',
    'class="wt-choice-main wt-choice-main--unified"',
    'class="wt-check-grid wt-check-grid--rich wt-check-grid--readable"',
    'class="wt-hotel-grid wt-purpose-hotel-card-grid"',
    'class="wt-firsttrip-choice-list"',
    'class="wt-city-faq__accordion"',
  ];

  for (const marker of required) {
    if (!html.includes(marker)) errors.push(`${relative}: missing ${marker}`);
  }

  const positions = [
    '<section class="wt-page-hero">',
    'id="area-compare"',
    'wt-section--survey-cta',
    'wt-firsttrip-before-booking',
    'id="hotels"',
    'wt-firsttrip-other-choices',
    'wt-purpose-faq',
  ].map((marker) => html.indexOf(marker));

  if (positions.some((position) => position < 0) || positions.some((position, index) => index > 0 && position <= positions[index - 1])) {
    errors.push(`${relative}: common section order mismatch`);
  }

  if (/<style\b[^>]*>/i.test(html)) errors.push(`${relative}: inline style tag remains`);
  if ((html.match(/<main\b/gi) || []).length !== 1) errors.push(`${relative}: main count must be 1`);
  if ((html.match(/<section\b[^>]*id="area-compare"/gi) || []).length !== 1) errors.push(`${relative}: area-compare count must be 1`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Fukuoka purpose page template check passed (5 pages).');
