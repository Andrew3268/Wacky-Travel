import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const api = fs.readFileSync(path.join(root, 'functions', 'api', 'destination-posts.js'), 'utf8');
const runtime = fs.readFileSync(path.join(root, 'public', 'assets', 'js', 'posts.js'), 'utf8');
const utils = fs.readFileSync(path.join(root, 'functions', '_utils.js'), 'utf8');
const schema = fs.readFileSync(path.join(root, 'db', 'schema.sql'), 'utf8');

for (const forbidden of [
  'ensureTravelSettingsTables(env.TRAVEL_DB)',
  'getActiveContentTypes(env.TRAVEL_DB)',
  'ALTER TABLE posts ADD COLUMN hotel_pick_label'
]) {
  if (api.includes(forbidden)) {
    throw new Error(`도시 읽기 API에 DB 초기화/마이그레이션 코드가 남아 있습니다: ${forbidden}`);
  }
}

for (const required of [
  'const ALL_CONTENT_TYPE = "all";',
  'LEFT JOIN hotels h ON h.slug = p.hotel_slug',
  'p.destination_slug IN (',
  'const canonicalRows = await runDestinationPostQuery',
  'p.status IN (\'published\', \'draft\')',
  'groups = {',
  'travel_content: buildGroupPayload',
  'public, max-age=60, s-maxage=300, stale-while-revalidate=600'
]) {
  if (!api.includes(required)) {
    throw new Error(`도시 통합/최적화 API 코드가 누락되었습니다: ${required}`);
  }
}

if (runtime.includes("loadHotelGroup(root, 'top5_series')") || runtime.includes("loadHotelGroup(root, 'hotel_intro')")) {
  throw new Error('도시 초기 화면이 콘텐츠 유형별 API를 중복 호출하고 있습니다.');
}
if (!runtime.includes("type: 'all'")) {
  throw new Error('도시 초기 화면 통합 API 요청이 없습니다.');
}
if (!utils.includes('읽기 요청에서는 관리자 테이블 생성 여부를 매번 검사하지 않습니다.')) {
  throw new Error('관리자 세션 읽기 경로 최적화가 적용되지 않았습니다.');
}
if (!schema.includes('idx_posts_destination_status_updated')) {
  throw new Error('도시 콘텐츠 복합 인덱스가 schema.sql에 없습니다.');
}
if (!fs.existsSync(path.join(root, 'db', 'migrations', '015_destination_content_performance.sql'))) {
  throw new Error('도시 콘텐츠 성능 마이그레이션 파일이 없습니다.');
}

console.log('도시 Hotel Picks / Travel Contents 통합 조회 성능 검사 통과');
