-- 여행 제휴/애드센스 블로그 샘플 데이터

INSERT OR IGNORE INTO categories (name, sort_order, created_at, updated_at) VALUES
  ('다낭', 1, '2026-05-06T09:00:00.000Z', '2026-05-06T09:00:00.000Z'),
  ('오사카', 2, '2026-05-06T09:00:00.000Z', '2026-05-06T09:00:00.000Z'),
  ('도쿄', 3, '2026-05-06T09:00:00.000Z', '2026-05-06T09:00:00.000Z'),
  ('방콕', 4, '2026-05-06T09:00:00.000Z', '2026-05-06T09:00:00.000Z'),
  ('호텔 추천', 5, '2026-05-06T09:00:00.000Z', '2026-05-06T09:00:00.000Z'),
  ('가족여행', 6, '2026-05-06T09:00:00.000Z', '2026-05-06T09:00:00.000Z'),
  ('커플여행', 7, '2026-05-06T09:00:00.000Z', '2026-05-06T09:00:00.000Z'),
  ('여행 준비', 8, '2026-05-06T09:00:00.000Z', '2026-05-06T09:00:00.000Z'),
  ('공항·교통', 9, '2026-05-06T09:00:00.000Z', '2026-05-06T09:00:00.000Z'),
  ('가성비 숙소', 10, '2026-05-06T09:00:00.000Z', '2026-05-06T09:00:00.000Z');

INSERT OR REPLACE INTO destinations (
  slug, name, country, city, title, meta_description, summary, cover_image, cover_image_alt,
  best_season, airport_info, transport_summary, status, published_at, updated_at
) VALUES
  (
    'danang', '다낭', '베트남', '다낭', '다낭 여행 가이드',
    '다낭 여행 전 숙소 위치, 호텔 추천, 공항 이동, 미케비치와 시내 동선을 한눈에 정리합니다.',
    '미케비치, 한시장, 바나힐, 호이안 이동까지 함께 고려해야 하는 베트남 대표 휴양 여행지입니다.',
    'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1400&q=82',
    '다낭 해변과 시내 여행 분위기',
    '2월~5월은 비교적 맑은 날이 많아 초행 여행자가 일정을 짜기 좋습니다.',
    '다낭국제공항에서 시내와 미케비치까지 차량 이동이 비교적 짧은 편입니다.',
    '시내, 미케비치, 호이안 이동 목적에 따라 숙소 위치를 먼저 정하는 것이 좋습니다.',
    'published', '2026-05-06T09:00:00.000Z', '2026-05-06T09:00:00.000Z'
  ),
  (
    'osaka', '오사카', '일본', '오사카', '오사카 여행 가이드',
    '오사카 여행 전 난바, 우메다, 신사이바시 숙소 위치와 교통 동선을 정리합니다.',
    '먹거리, 쇼핑, 교토·나라 근교 이동까지 함께 계획하기 좋은 일본 인기 여행지입니다.',
    'https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=1400&q=82',
    '오사카 도심과 여행 거리 풍경',
    '봄과 가을은 야외 이동이 편하고, 여름·겨울은 실내 동선을 함께 고려하는 것이 좋습니다.',
    '간사이공항에서 난바·우메다까지 철도와 리무진버스 선택지가 다양합니다.',
    '첫 여행은 난바, 쇼핑 중심은 신사이바시, 교토 이동은 우메다 접근성을 함께 봅니다.',
    'published', '2026-05-06T09:00:00.000Z', '2026-05-06T09:00:00.000Z'
  );

INSERT OR REPLACE INTO hotels (
  slug, destination_slug, name, name_en, area, address, star_rating, price_level, summary, meta_description,
  cover_image, cover_image_alt, gallery_json, pros_json, cons_json, suitable_for_json,
  checkin_time, checkout_time, distance_summary, nearby_spots_json, review_summary,
  status, published_at, updated_at
) VALUES
  (
    'wink-hotel-danang-centre', 'danang', '윙크 호텔 다낭 센터', 'Wink Hotel Danang Centre', '다낭 시내',
    '75 Nguyen Van Linh, Hai Chau, Da Nang', '4성급', '가성비',
    '다낭 시내 이동과 짧은 일정에 강점이 있는 실속형 호텔입니다.',
    '윙크 호텔 다낭 센터 위치, 장점, 아쉬운 점, 주변 이동 동선과 예약 전 체크포인트를 정리합니다.',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=82',
    '윙크 호텔 다낭 센터를 연상시키는 도심형 호텔 객실',
    '[]',
    '["시내 주요 지점 접근이 편한 편", "짧은 일정과 1~2인 여행에 적합", "비교적 깔끔한 도심형 분위기"]',
    '["리조트형 휴양 분위기를 기대하면 아쉬울 수 있음", "해변 중심 여행이라면 미케비치 숙소와 비교 필요"]',
    '["혼자 여행", "커플 여행", "짧은 일정", "시내 중심 이동"]',
    '14:00', '12:00',
    '다낭 시내 중심 이동에 유리하며, 미케비치·공항·한시장 이동 시간을 함께 확인하는 것이 좋습니다.',
    '[{"name":"한시장","distance":"차량 약 5~10분"},{"name":"미케비치","distance":"차량 약 10~15분"},{"name":"다낭국제공항","distance":"차량 약 10분 내외"}]',
    '실제 이용자들은 위치와 깔끔함을 장점으로 보는 경우가 많고, 휴양형 부대시설은 기대치를 조정하는 편이 좋습니다.',
    'published', '2026-05-06T09:00:00.000Z', '2026-05-06T09:00:00.000Z'
  ),
  (
    'cross-hotel-osaka', 'osaka', '크로스 호텔 오사카', 'Cross Hotel Osaka', '난바·도톤보리',
    '2 Chome-5-15 Shinsaibashisuji, Chuo Ward, Osaka', '4성급', '중상급',
    '난바와 도톤보리 중심 동선을 선호하는 여행자에게 잘 맞는 도심형 호텔입니다.',
    '크로스 호텔 오사카 위치, 장점, 아쉬운 점, 난바 여행 동선과 예약 전 체크포인트를 정리합니다.',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1400&q=82',
    '오사카 도심 여행에 어울리는 호텔 객실',
    '[]',
    '["도톤보리·난바 이동이 편리", "쇼핑과 식사 동선이 단순함", "첫 오사카 여행에 위치 장점이 큼"]',
    '["성수기 가격 부담이 커질 수 있음", "조용한 숙소를 원하면 주변 분위기 확인 필요"]',
    '["첫 오사카 여행", "커플 여행", "쇼핑 여행", "도보 이동 중심"]',
    '15:00', '11:00',
    '난바·도톤보리 중심 일정에 유리하며, 교토·나라 근교 이동은 역 접근성을 함께 확인하는 것이 좋습니다.',
    '[{"name":"도톤보리","distance":"도보권"},{"name":"난바역","distance":"도보 약 5~10분"},{"name":"신사이바시","distance":"도보권"}]',
    '위치 만족도가 높은 편이며, 번화가 중심 숙소 특성상 가격과 주변 소음 기대치를 함께 조정하는 것이 좋습니다.',
    'published', '2026-05-06T09:00:00.000Z', '2026-05-06T09:00:00.000Z'
  );

INSERT OR REPLACE INTO hotel_affiliate_links (
  id, hotel_slug, provider, label, affiliate_url, button_text, sort_order, is_active, created_at, updated_at
) VALUES
  (1, 'wink-hotel-danang-centre', 'agoda', '아고다', 'https://www.agoda.com/?cid=YOUR_CID', '객실 가격 확인하기', 1, 1, '2026-05-06T09:00:00.000Z', '2026-05-06T09:00:00.000Z'),
  (2, 'wink-hotel-danang-centre', 'trip', '트립닷컴', 'https://www.trip.com/?allianceid=YOUR_ID', '예약 가능 여부 보기', 2, 1, '2026-05-06T09:00:00.000Z', '2026-05-06T09:00:00.000Z'),
  (3, 'cross-hotel-osaka', 'agoda', '아고다', 'https://www.agoda.com/?cid=YOUR_CID', '객실 가격 확인하기', 1, 1, '2026-05-06T09:00:00.000Z', '2026-05-06T09:00:00.000Z');

INSERT OR REPLACE INTO posts (
  slug, title, category, meta_description, summary, cover_image, cover_image_alt, focus_keyword,
  longtail_keywords_json, template_name, tags_json, content_md, faq_md, view_count,
  enable_sidebar_ad, enable_inarticle_ads, status, content_type, destination_slug, hotel_slug,
  affiliate_enabled, search_intent, published_at, updated_at
) VALUES (
  'danang-hotel-location-guide',
  '다낭 호텔 위치 어디가 좋을까? 시내와 미케비치 선택 기준',
  '다낭',
  '다낭 호텔 위치를 시내, 미케비치, 호이안 이동 기준으로 비교하고 여행 유형별 선택 포인트를 정리합니다.',
  '다낭 숙소는 시내 이동, 해변 휴식, 호이안 일정 중 무엇을 우선하느냐에 따라 달라집니다.',
  'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1400&q=82',
  '다낭 호텔 위치 선택을 위한 해변과 도심 풍경',
  '다낭 호텔 위치',
  '["다낭 시내 호텔", "다낭 미케비치 호텔", "다낭 숙소 위치 추천"]',
  'travel_guide',
  '["다낭","호텔 위치","숙소 추천"]',
  '# 다낭 호텔 위치 어디가 좋을까? 시내와 미케비치 선택 기준\n\n다낭 호텔 위치는 단순히 가격만 보고 정하면 아쉬움이 생기기 쉽습니다. 여행 일정이 시내 관광 중심인지, 해변 휴식 중심인지, 호이안 이동까지 포함하는지에 따라 숙소 만족도가 크게 달라집니다.\n\n> 한 줄 요약: 첫 다낭 여행은 시내와 미케비치 동선을 먼저 나눈 뒤, 하루 이동 횟수를 줄이는 위치를 고르는 것이 좋습니다.\n\n## 다낭 시내 호텔이 잘 맞는 경우\n\n시내 호텔은 한시장, 콩카페, 맛집, 마사지샵 이동이 편한 편입니다. 짧은 일정으로 여러 곳을 빠르게 둘러볼 계획이라면 시내 중심 숙소가 효율적입니다.\n\n## 미케비치 호텔이 잘 맞는 경우\n\n해변 산책, 리조트 분위기, 휴식 비중이 크다면 미케비치 쪽이 편합니다. 다만 시내 맛집이나 쇼핑을 자주 갈 계획이라면 차량 이동 시간을 함께 고려해야 합니다.\n\n## 호이안 일정이 있다면\n\n호이안까지 당일 이동을 계획한다면 숙소 위치보다 차량 이동 동선과 복귀 시간을 먼저 확인하는 것이 좋습니다. 특히 아이와 함께라면 밤 늦은 복귀 일정을 줄이는 편이 편합니다.\n\n## 예약 전 체크리스트\n\n- 공항 도착 시간이 늦은지 확인\n- 하루에 시내를 몇 번 오갈지 계산\n- 해변 휴식과 관광 비중 비교\n- 조식, 수영장, 객실 크기 우선순위 정리\n- 제휴 링크 클릭 전 취소 가능 조건 확인\n\n## 함께 보면 좋은 호텔\n\n다낭 시내 중심 이동을 우선한다면 [윙크 호텔 다낭 센터](/hotels/danang/wink-hotel-danang-centre) 같은 도심형 호텔도 비교 대상이 될 수 있습니다.',
  '### 다낭 처음 가면 시내와 미케비치 중 어디가 좋나요?\n일정이 짧고 맛집·쇼핑 이동이 많다면 시내, 휴식과 해변 산책이 중요하다면 미케비치가 더 편할 수 있습니다.\n\n### 다낭 호텔은 공항 근처가 좋은가요?\n새벽 도착이나 이른 출국이라면 공항 접근성이 장점이지만, 일반 일정에서는 시내 또는 해변 동선을 함께 보는 것이 좋습니다.',
  0, 1, 1, 'published', 'guide', 'danang', '', 1, '예약 전 위치 비교',
  '2026-05-06T09:00:00.000Z', '2026-05-06T09:00:00.000Z'
);

INSERT OR IGNORE INTO post_hotel_relations (post_slug, hotel_slug, relation_type, sort_order) VALUES
  ('danang-hotel-location-guide', 'wink-hotel-danang-centre', 'mentioned', 1);
