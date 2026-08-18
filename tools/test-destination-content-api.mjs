import { onRequestGet } from '../functions/api/destination-posts.js';

function createDb() {
  const calls = [];
  const rows = [
    {
      slug: 'fukuoka-value-hotels', title: '후쿠오카 가성비 호텔', category: '', summary: '추천 글',
      cover_image: '', cover_image_alt: '', cover_image_source: 'r2', cover_image_link_url: '', cover_image_srcset: '',
      tags_json: '[]', content_type: 'top5_series', destination_slug: 'fukuoka', region_slug: '', region_name: '',
      recommendation_category_slug: 'value-hotel', recommendation_category_name: '가성비 호텔',
      recommendation_category_description: '', hotel_pick_label: '', hotel_slug: '', hotel_name: '',
      hotel_location_type: '', hotel_star_rating: '', status: 'draft', updated_at: '2026-08-02T00:00:00Z', published_at: '2026-08-02T00:00:00Z'
    },
    {
      slug: 'sample-hotel', title: '샘플 호텔 리뷰', category: '', summary: '호텔 리뷰',
      cover_image: 'https://pix8.agoda.net/sample.jpg', cover_image_alt: '', cover_image_source: 'agoda', cover_image_link_url: '', cover_image_srcset: '',
      tags_json: '[]', content_type: 'hotel_intro', destination_slug: 'fukuoka', region_slug: '', region_name: '',
      recommendation_category_slug: '', recommendation_category_name: '', recommendation_category_description: '',
      hotel_pick_label: '에디터픽', hotel_slug: 'sample-hotel', hotel_name: '샘플 호텔',
      hotel_location_type: '도심형', hotel_star_rating: '4', status: 'published', updated_at: '2026-08-01T00:00:00Z', published_at: '2026-08-01T00:00:00Z'
    },
    {
      slug: 'fukuoka-food-guide', title: '후쿠오카 식도락 가이드', category: '', summary: '여행 콘텐츠',
      cover_image: '', cover_image_alt: '', cover_image_source: 'r2', cover_image_link_url: '', cover_image_srcset: '',
      tags_json: '[]', content_type: 'travel_tip', destination_slug: 'fukuoka', region_slug: '', region_name: '',
      recommendation_category_slug: '', recommendation_category_name: '', recommendation_category_description: '',
      hotel_pick_label: '', hotel_slug: '', hotel_name: '', hotel_location_type: '', hotel_star_rating: '',
      status: 'draft', updated_at: '2026-07-31T00:00:00Z', published_at: '2026-07-31T00:00:00Z'
    },
    {
      slug: 'fukuoka-published-guide', title: '후쿠오카 공개 여행 가이드', category: '', summary: '공개 여행 콘텐츠',
      cover_image: '', cover_image_alt: '', cover_image_source: 'r2', cover_image_link_url: '', cover_image_srcset: '',
      tags_json: '[]', content_type: 'travel_tip', destination_slug: 'fukuoka', region_slug: '', region_name: '',
      recommendation_category_slug: '', recommendation_category_name: '', recommendation_category_description: '',
      hotel_pick_label: '', hotel_slug: '', hotel_name: '', hotel_location_type: '', hotel_star_rating: '',
      status: 'published', updated_at: '2026-07-30T00:00:00Z', published_at: '2026-07-30T00:00:00Z'
    }
  ];

  const db = {
    calls,
    prepare(sql) {
      const call = { sql, binds: [] };
      calls.push(call);
      return {
        bind(...binds) {
          call.binds = binds;
          return this;
        },
        async first() {
          if (sql.includes('FROM admin_sessions')) {
            return { token_hash: 'hash', expires_at: '2099-01-01T00:00:00Z', id: 1, email: 'admin@example.com' };
          }
          return null;
        },
        async all() {
          if (sql.includes('FROM posts p')) return { results: sql.includes("p.status = 'published'") ? rows.filter((row) => row.status === 'published') : rows };
          return { results: [] };
        },
        async run() {
          throw new Error(`읽기 API에서 run()이 호출됐습니다: ${sql}`);
        }
      };
    }
  };
  return db;
}

{
  const db = createDb();
  const request = new Request('https://bestayable.com/api/destination-posts?destination=fukuoka&type=all&include_drafts=1&hotel_limit=6&travel_limit=5', {
    headers: { cookie: 'admin_session=test-token' }
  });
  const response = await onRequestGet({ env: { TRAVEL_DB: db }, request });
  const data = await response.json();

  if (response.status !== 200 || !data.ok || !data.authenticated) throw new Error('관리자 통합 응답이 실패했습니다.');
  if (db.calls.length !== 2) throw new Error(`통합 초기 요청의 DB 조회가 2회를 초과했습니다: ${db.calls.length}`);
  if (db.calls.some((call) => /CREATE TABLE|CREATE INDEX|ALTER TABLE|INSERT OR IGNORE|UPDATE\s|DELETE\s/i.test(call.sql))) {
    throw new Error('도시 읽기 API에서 스키마/시드 쓰기 SQL이 실행됐습니다.');
  }
  if (!data.groups.top5_series.html.includes('?preview=1')) throw new Error('Hotel Picks 초안 미리보기 링크가 없습니다.');
  if (!data.groups.travel_content.html.includes('?preview=1')) throw new Error('Travel Contents 초안 미리보기 링크가 없습니다.');
  if (!data.uses_agoda_images) throw new Error('아고다 이미지 사용 여부가 누락됐습니다.');
  if (!String(response.headers.get('cache-control')).includes('private, no-store')) throw new Error('초안 응답 캐시 차단이 누락됐습니다.');
}

{
  const db = createDb();
  const request = new Request('https://bestayable.com/api/destination-posts?destination=fukuoka&type=travel_content&limit=5');
  const response = await onRequestGet({ env: { TRAVEL_DB: db }, request });
  const data = await response.json();

  if (response.status !== 200 || !data.ok || data.authenticated) throw new Error('일반 사용자 Travel Contents 공개 응답이 실패했습니다.');
  if (!data.html.includes('후쿠오카 공개 여행 가이드')) throw new Error('발행된 Travel Contents가 일반 사용자 응답에 없습니다.');
  if (data.html.includes('후쿠오카 식도락 가이드') || data.html.includes('?preview=1')) throw new Error('초안 Travel Contents가 일반 사용자에게 노출됐습니다.');
  if (!data.html.includes('class="travel-list__arrow"') || data.html.includes('travel-list__arrow" style=')) throw new Error('Travel Contents 화살표가 CSS 클래스 기반으로 출력되지 않습니다.');
  if (data.html.includes('2026-07-30') || /travel-card__meta[^>]*>\s*<span>/.test(data.html)) throw new Error('발행 Travel Contents에 날짜가 출력되고 있습니다.');
  if (db.calls.length !== 1) throw new Error(`공개 Travel Contents 요청의 DB 조회가 1회가 아닙니다: ${db.calls.length}`);
  if (!String(response.headers.get('cache-control')).includes('public, max-age=60')) throw new Error('공개 Travel Contents 캐시 헤더가 누락됐습니다.');
}

{
  const db = createDb();
  const request = new Request('https://bestayable.com/api/destination-posts?destination=fukuoka&type=all&include_drafts=1');
  const response = await onRequestGet({ env: { TRAVEL_DB: db }, request });
  if (response.status !== 401) throw new Error('비로그인 통합 요청이 차단되지 않았습니다.');
  if (db.calls.length !== 0) throw new Error('비로그인 요청에서 불필요한 D1 조회가 발생했습니다.');
}

console.log('도시 콘텐츠 API 공개 Travel Contents/관리자 초안 기능 검사 통과');
