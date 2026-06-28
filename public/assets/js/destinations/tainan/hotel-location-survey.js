/* 타이난 hotel location survey logic. Modernized with the Fukuoka V23 survey UI flow. */
const cityConfig = {
  "cityName": "타이난",
  "destinationSlug": "tainan",
  "postContentType": "top5_series",
  "areas": {
    "station": {
      "name": "타이난역·중서구",
      "regionSlug": "tainan-station-west-central",
      "regionSlugAliases": [
        "타이난역·중서구",
        "타이난역"
      ],
      "label": "처음 가는 타이난에서 이동 실수를 줄이고 구도심을 가볍게 보고 싶다면 가장 안전한 기준점입니다.",
      "summary": "타이난역·중서구는 기차 이동, 적감루, 하야시백화점, 국화거리 먹거리를 함께 묶기 좋은 숙박지입니다.",
      "leadTitle": "도착 첫날과 구도심 산책을 가장 단순하게 시작하기 좋은 기준점",
      "leadText": "대만철도 타이난역을 기준으로 구도심 접근과 타 도시 이동이 단순합니다. 처음 타이난을 방문하거나 가오슝·타이베이와 함께 보는 일정이라면 가장 무난한 출발점입니다.",
      "stayRange": [
        "타이난역·중서구는 기차 이동, 적감루, 하야시백화점, 국화거리 먹거리를 함께 묶기 좋은 숙박지입니다.",
        "역 바로 앞만 보지 말고 중서구 주요 명소까지의 버스·택시 이동과 밤 귀가 분위기를 함께 확인하세요.",
        "주요 일정과 밤 동선을 함께 계산하세요."
      ],
      "avoidRange": [
        "안핑을 매일 오가거나 야시장만 집중한다면 이동 시간이 쌓일 수 있습니다.",
        "가격만 보고 골목 깊은 숙소를 고르는 선택",
        "야시장 날짜와 이동 시간을 확인하지 않은 예약"
      ],
      "bestFor": [
        "첫 타이난 여행",
        "2박 3일 짧은 일정",
        "기차 이동",
        "적감루·하야시백화점·국화거리 중심 일정에 잘 맞습니다."
      ],
      "notFor": [
        "동선이 맞지 않는 짧은 일정",
        "소음 후기를 확인하지 않은 예약",
        "이동 방식이 정해지지 않은 여행"
      ],
      "bookingTips": [
        "역 바로 앞만 보지 말고 중서구 주요 명소까지의 버스·택시 이동과 밤 귀가 분위기를 함께 확인하세요.",
        "택시 승하차와 짐 보관 가능 여부를 확인하세요.",
        "주변 식당 영업시간과 밤 분위기를 함께 보세요."
      ],
      "chips": [
        "첫 여행",
        "기차 이동",
        "구도심",
        "적감루",
        "가성비"
      ],
      "compareGood": "처음 가는 타이난에서 이동 실수를 줄이고 구도심을 가볍게 보고 싶다면 가장 안전한 기준점입니다.",
      "compareCaution": "안핑을 매일 오가거나 야시장만 집중한다면 이동 시간이 쌓일 수 있습니다.",
      "mismatchNote": "일정 성격이 다르다면 다른 타이난 권역도 함께 비교하세요.",
      "links": [
        {
          "title": "타이난역·중서구 호텔 추천 TOP5",
          "url": "/post/tainan-station-west-central-hotels"
        },
        {
          "title": "타이난 숙소 위치 가이드",
          "url": "/destinations/tainan/hotel-guide/"
        }
      ],
      "hotels": [
        {
          "name": "저스트 슬립 타이난 후산",
          "tag": "역·구도심 실용형",
          "location": "타이난역·중서구 생활권",
          "reason": "도착 첫날과 출발일 이동을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "타이난역·중서구",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "호텔 타이난",
          "tag": "전통 역세권형",
          "location": "타이난역·중서구 역 앞",
          "reason": "대만철도 타이난역 접근을 우선하는 짧은 일정에 잘 맞습니다.",
          "meta": [
            "타이난역·중서구",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "카인드니스 호텔 타이난 치칸 타워",
          "tag": "구도심 친절형",
          "location": "타이난역·중서구",
          "reason": "구도심 관광과 실속 있는 서비스를 함께 보고 싶은 여행자에게 좋습니다.",
          "meta": [
            "타이난역·중서구",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "다이너스티 호텔 타이난",
          "tag": "가성비 역세권",
          "location": "타이난역·중서구",
          "reason": "가격과 위치 균형을 함께 보는 첫 여행 후보로 넣기 좋습니다.",
          "meta": [
            "타이난역·중서구",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "푸워드 호텔 타이난",
          "tag": "구도심 산책형",
          "location": "공자묘·하야시백화점 주변",
          "reason": "공자묘와 하야시백화점 산책까지 묶기 쉬운 실용형 숙소입니다.",
          "meta": [
            "타이난역·중서구",
            "타이난",
            "숙소"
          ],
          "url": "#"
        }
      ]
    },
    "shennong": {
      "name": "하이안로·신농제",
      "regionSlug": "haian-shennong",
      "regionSlugAliases": [
        "하이안로·신농제",
        "신농제"
      ],
      "label": "타이난의 분위기를 숙소 주변에서 가장 쉽게 느끼고 싶다면 먼저 비교할 만한 지역입니다.",
      "summary": "하이안로·신농제는 오래된 골목, 카페, 바, 작은 가게를 천천히 즐기기 좋은 도심 숙박지입니다.",
      "leadTitle": "타이난다운 골목 분위기와 저녁 산책을 가까이 두기 좋은 감성권",
      "leadText": "신농제와 하이안로 주변은 타이난 특유의 오래된 골목과 감성적인 밤 분위기를 느끼기 좋습니다. 숙소 주변에서 카페와 가벼운 술집, 산책을 즐기고 싶은 커플·재방문 여행에 잘 맞습니다.",
      "stayRange": [
        "하이안로·신농제는 오래된 골목, 카페, 바, 작은 가게를 천천히 즐기기 좋은 도심 숙박지입니다.",
        "골목 안쪽 숙소는 분위기는 좋지만 택시 승하차와 캐리어 이동이 불편할 수 있으니 큰길 접근을 함께 보세요.",
        "주요 일정과 밤 동선을 함께 계산하세요."
      ],
      "avoidRange": [
        "조용한 숙면이 중요하면 주말 밤 소음 후기를 꼭 확인해야 합니다.",
        "가격만 보고 골목 깊은 숙소를 고르는 선택",
        "야시장 날짜와 이동 시간을 확인하지 않은 예약"
      ],
      "bestFor": [
        "커플 여행",
        "카페 산책",
        "밤 골목 산책",
        "재방문"
      ],
      "notFor": [
        "동선이 맞지 않는 짧은 일정",
        "소음 후기를 확인하지 않은 예약",
        "이동 방식이 정해지지 않은 여행"
      ],
      "bookingTips": [
        "골목 안쪽 숙소는 분위기는 좋지만 택시 승하차와 캐리어 이동이 불편할 수 있으니 큰길 접근을 함께 보세요.",
        "택시 승하차와 짐 보관 가능 여부를 확인하세요.",
        "주변 식당 영업시간과 밤 분위기를 함께 보세요."
      ],
      "chips": [
        "감성 골목",
        "카페",
        "커플",
        "밤 산책",
        "재방문"
      ],
      "compareGood": "타이난의 분위기를 숙소 주변에서 가장 쉽게 느끼고 싶다면 먼저 비교할 만한 지역입니다.",
      "compareCaution": "조용한 숙면이 중요하면 주말 밤 소음 후기를 꼭 확인해야 합니다.",
      "mismatchNote": "일정 성격이 다르다면 다른 타이난 권역도 함께 비교하세요.",
      "links": [
        {
          "title": "하이안로·신농제 호텔 추천 TOP5",
          "url": "/post/haian-shennong-hotels"
        },
        {
          "title": "타이난 숙소 위치 가이드",
          "url": "/destinations/tainan/hotel-guide/"
        }
      ],
      "hotels": [
        {
          "name": "유아이제이 호텔 앤 호스텔",
          "tag": "감성 스테이형",
          "location": "하이안로·신농제",
          "reason": "타이난다운 분위기와 디자인 감도를 함께 원하는 여행에 잘 맞습니다.",
          "meta": [
            "하이안로·신농제",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "FX 호텔 타이난 민셩 로드",
          "tag": "하이안로 실속형",
          "location": "하이안로·신농제 주변",
          "reason": "먹거리와 밤 산책 동선을 가까이 두고 싶은 실속 여행자에게 좋습니다.",
          "meta": [
            "하이안로·신농제",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "골든 튤립 글로리 파인 호텔",
          "tag": "구도심 안정형",
          "location": "하이안로·신농제 생활권",
          "reason": "골목 분위기와 비교적 안정적인 호텔 컨디션을 함께 볼 수 있습니다.",
          "meta": [
            "하이안로·신농제",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "더 플레이스 타이난",
          "tag": "디자인 도심형",
          "location": "하이안로·신농제 생활권",
          "reason": "감성적인 객실 분위기와 도심 접근성을 함께 보고 싶을 때 좋습니다.",
          "meta": [
            "하이안로·신농제",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "잉글우드 호텔 타이난",
          "tag": "초실속 구도심형",
          "location": "하이안로·신농제 주변",
          "reason": "숙박비를 줄이면서 구도심 산책을 남기고 싶은 일정에 비교할 만합니다.",
          "meta": [
            "하이안로·신농제",
            "타이난",
            "숙소"
          ],
          "url": "#"
        }
      ]
    },
    "confucius": {
      "name": "공자묘·하야시백화점",
      "regionSlug": "confucius-hayashi",
      "regionSlugAliases": [
        "공자묘·하야시백화점",
        "공자묘"
      ],
      "label": "타이난의 대표 명소를 차분하게 보고 싶은 첫 여행자에게 균형 좋은 선택입니다.",
      "summary": "공자묘·하야시백화점 주변은 타이난의 역사 명소와 쇼핑, 식사 이동을 균형 있게 묶기 좋은 지역입니다.",
      "leadTitle": "역사 산책과 쇼핑, 안정적인 도심 숙박을 함께 보기 좋은 구도심 중심부",
      "leadText": "공자묘, 하야시백화점, 국립타이완문학관, 작은 골목 식당이 가까워 낮 일정의 만족도가 높습니다. 부모님이나 아이와 함께해도 이동 설명이 쉽고, 비 오는 날에도 일정을 조정하기 좋습니다.",
      "stayRange": [
        "공자묘·하야시백화점 주변은 타이난의 역사 명소와 쇼핑, 식사 이동을 균형 있게 묶기 좋은 지역입니다.",
        "명소가 가까워도 길이 좁은 구간이 있으니 택시 승하차 위치와 엘리베이터, 조식 후기를 함께 보세요.",
        "주요 일정과 밤 동선을 함께 계산하세요."
      ],
      "avoidRange": [
        "야시장과 늦은 밤 분위기를 우선하면 하이안로·신농제나 화원야시장(북구) 쪽이 더 재미있을 수 있습니다.",
        "가격만 보고 골목 깊은 숙소를 고르는 선택",
        "야시장 날짜와 이동 시간을 확인하지 않은 예약"
      ],
      "bestFor": [
        "가족 여행",
        "부모님 동반",
        "역사 산책",
        "하야시백화점 쇼핑"
      ],
      "notFor": [
        "동선이 맞지 않는 짧은 일정",
        "소음 후기를 확인하지 않은 예약",
        "이동 방식이 정해지지 않은 여행"
      ],
      "bookingTips": [
        "명소가 가까워도 길이 좁은 구간이 있으니 택시 승하차 위치와 엘리베이터, 조식 후기를 함께 보세요.",
        "택시 승하차와 짐 보관 가능 여부를 확인하세요.",
        "주변 식당 영업시간과 밤 분위기를 함께 보세요."
      ],
      "chips": [
        "문화 산책",
        "하야시",
        "가족",
        "부모님",
        "구도심"
      ],
      "compareGood": "타이난의 대표 명소를 차분하게 보고 싶은 첫 여행자에게 균형 좋은 선택입니다.",
      "compareCaution": "야시장과 늦은 밤 분위기를 우선하면 하이안로·신농제나 화원야시장(북구) 쪽이 더 재미있을 수 있습니다.",
      "mismatchNote": "일정 성격이 다르다면 다른 타이난 권역도 함께 비교하세요.",
      "links": [
        {
          "title": "공자묘·하야시백화점 호텔 추천 TOP5",
          "url": "/post/confucius-hayashi-hotels"
        },
        {
          "title": "타이난 숙소 위치 가이드",
          "url": "/destinations/tainan/hotel-guide/"
        }
      ],
      "hotels": [
        {
          "name": "실크스 플레이스 타이난",
          "tag": "가족 고급형",
          "location": "공자묘·하야시백화점 주변",
          "reason": "가족 여행에서 객실 컨디션과 구도심 접근성을 함께 잡기 좋습니다.",
          "meta": [
            "공자묘·하야시백화점",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "레이크쇼어 호텔 타이난",
          "tag": "도심 고급형",
          "location": "공자묘·하야시백화점 주변",
          "reason": "깔끔한 객실과 도심 산책, 식사 접근을 함께 보고 싶은 여행에 맞습니다.",
          "meta": [
            "공자묘·하야시백화점",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "호텔 코지 시먼 타이난",
          "tag": "아이 동반형",
          "location": "공자묘·하야시백화점 생활권",
          "reason": "아이와 함께하는 여행에서 객실과 부대시설을 함께 보기 좋습니다.",
          "meta": [
            "공자묘·하야시백화점",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "푸워드 호텔 타이난",
          "tag": "명소 도보형",
          "location": "공자묘·하야시백화점 주변",
          "reason": "공자묘와 하야시백화점 중심 산책에 편한 위치입니다.",
          "meta": [
            "공자묘·하야시백화점",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "아델라 호텔 타이난",
          "tag": "차분한 도심형",
          "location": "공자묘·하야시백화점 생활권",
          "reason": "번화가와 적당히 떨어진 도심 숙박을 원하는 분께 맞습니다.",
          "meta": [
            "공자묘·하야시백화점",
            "타이난",
            "숙소"
          ],
          "url": "#"
        }
      ]
    },
    "anping": {
      "name": "안핑·운하",
      "regionSlug": "anping-canal",
      "regionSlugAliases": [
        "안핑·운하",
        "안핑"
      ],
      "label": "역사 명소와 물가 산책을 천천히 즐기고 싶다면 도심과 다르게 만족도가 높은 지역입니다.",
      "summary": "안핑·운하는 안핑고성, 안핑수옥, 운하 산책, 가족형 호텔을 중심으로 하루를 여유롭게 쓰기 좋은 지역입니다.",
      "leadTitle": "안핑고성과 운하 산책, 가족형 여유를 함께 보기 좋은 서쪽 권역",
      "leadText": "안핑은 타이난 구도심과 다른 분위기의 물가 산책과 역사 명소가 있습니다. 아이나 부모님과 함께라면 택시 이동을 전제로 안핑에 하루를 길게 배정하기 좋습니다.",
      "stayRange": [
        "안핑·운하는 안핑고성, 안핑수옥, 운하 산책, 가족형 호텔을 중심으로 하루를 여유롭게 쓰기 좋은 지역입니다.",
        "구도심과 매일 왕복할 경우 택시 시간이 쌓이므로 안핑 중심 일정이 있는 날과 숙박을 맞추는 편이 좋습니다.",
        "주요 일정과 밤 동선을 함께 계산하세요."
      ],
      "avoidRange": [
        "타이난역·중서구와 국화거리·보안로 중심 먹거리 여행에는 거리가 있어 짧은 1박 일정에는 비효율적일 수 있습니다.",
        "가격만 보고 골목 깊은 숙소를 고르는 선택",
        "야시장 날짜와 이동 시간을 확인하지 않은 예약"
      ],
      "bestFor": [
        "가족 여행",
        "아이 동반",
        "안핑고성·안핑수옥",
        "운하 산책"
      ],
      "notFor": [
        "동선이 맞지 않는 짧은 일정",
        "소음 후기를 확인하지 않은 예약",
        "이동 방식이 정해지지 않은 여행"
      ],
      "bookingTips": [
        "구도심과 매일 왕복할 경우 택시 시간이 쌓이므로 안핑 중심 일정이 있는 날과 숙박을 맞추는 편이 좋습니다.",
        "택시 승하차와 짐 보관 가능 여부를 확인하세요.",
        "주변 식당 영업시간과 밤 분위기를 함께 보세요."
      ],
      "chips": [
        "안핑고성",
        "운하",
        "가족",
        "여유",
        "역사"
      ],
      "compareGood": "역사 명소와 물가 산책을 천천히 즐기고 싶다면 도심과 다르게 만족도가 높은 지역입니다.",
      "compareCaution": "타이난역·중서구와 국화거리·보안로 중심 먹거리 여행에는 거리가 있어 짧은 1박 일정에는 비효율적일 수 있습니다.",
      "mismatchNote": "일정 성격이 다르다면 다른 타이난 권역도 함께 비교하세요.",
      "links": [
        {
          "title": "안핑·운하 호텔 추천 TOP5",
          "url": "/post/anping-canal-hotels"
        },
        {
          "title": "타이난 숙소 위치 가이드",
          "url": "/destinations/tainan/hotel-guide/"
        }
      ],
      "hotels": [
        {
          "name": "크라운 플라자 타이난",
          "tag": "운하 리조트형",
          "location": "안핑·운하",
          "reason": "안핑 일정과 호텔 체류를 함께 즐기고 싶은 가족 여행에 좋습니다.",
          "meta": [
            "안핑·운하",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "타이난 웨이얏 그랜드 호텔",
          "tag": "안핑 실용형",
          "location": "안핑·운하 생활권",
          "reason": "안핑고성과 운하 주변을 여유롭게 보는 일정에 비교하기 좋습니다.",
          "meta": [
            "안핑·운하",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "무브 리조트 앤 스파",
          "tag": "휴식형 후보",
          "location": "안핑·운하 주변",
          "reason": "도심보다 조용한 숙박과 휴식 시간을 우선할 때 볼 만합니다.",
          "meta": [
            "안핑·운하",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "프린세스 앤 엘리펀트 호텔",
          "tag": "아담한 가족형",
          "location": "안핑·운하와 중서구 사이",
          "reason": "안핑과 구도심을 함께 보려는 일정에서 위치 균형을 확인하기 좋습니다.",
          "meta": [
            "안핑·운하",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "호텔 드 레우 타이난",
          "tag": "운하 감성형",
          "location": "안핑·운하 주변",
          "reason": "운하 산책과 차분한 숙박을 함께 원하는 커플 여행에 맞습니다.",
          "meta": [
            "안핑·운하",
            "타이난",
            "숙소"
          ],
          "url": "#"
        }
      ]
    },
    "guohua": {
      "name": "국화거리·보안로",
      "regionSlug": "guohua-baoan",
      "regionSlugAliases": [
        "국화거리·보안로",
        "국화거리"
      ],
      "label": "숙박비보다 먹거리 만족도가 중요한 여행이라면 가장 먼저 확인할 만한 지역입니다.",
      "summary": "국화거리·보안로는 타이난의 대표 먹거리 골목과 구도심 산책을 함께 즐기기 좋은 지역입니다.",
      "leadTitle": "타이난 먹거리와 가성비 숙소를 가장 직관적으로 묶기 좋은 실속권",
      "leadText": "타이난 여행의 핵심이 음식이라면 국화거리와 보안로 주변을 기준으로 보는 것이 쉽습니다. 도보 맛집, 간식, 현지식 아침 식사, 늦은 저녁 동선까지 짧게 묶을 수 있습니다.",
      "stayRange": [
        "국화거리·보안로는 타이난의 대표 먹거리 골목과 구도심 산책을 함께 즐기기 좋은 지역입니다.",
        "인기 식당은 줄이 길 수 있고 골목은 붐빌 수 있으니 숙소는 너무 안쪽보다 큰길 접근이 좋은 곳이 편합니다.",
        "주요 일정과 밤 동선을 함께 계산하세요."
      ],
      "avoidRange": [
        "호텔 시설과 넓은 객실을 우선하면 공자묘·하야시백화점 또는 안핑·운하 호텔이 더 맞을 수 있습니다.",
        "가격만 보고 골목 깊은 숙소를 고르는 선택",
        "야시장 날짜와 이동 시간을 확인하지 않은 예약"
      ],
      "bestFor": [
        "가성비 여행",
        "혼자 여행",
        "친구 여행",
        "먹거리 투어"
      ],
      "notFor": [
        "동선이 맞지 않는 짧은 일정",
        "소음 후기를 확인하지 않은 예약",
        "이동 방식이 정해지지 않은 여행"
      ],
      "bookingTips": [
        "인기 식당은 줄이 길 수 있고 골목은 붐빌 수 있으니 숙소는 너무 안쪽보다 큰길 접근이 좋은 곳이 편합니다.",
        "택시 승하차와 짐 보관 가능 여부를 확인하세요.",
        "주변 식당 영업시간과 밤 분위기를 함께 보세요."
      ],
      "chips": [
        "먹거리",
        "가성비",
        "혼자 여행",
        "국화거리·보안로"
      ],
      "compareGood": "숙박비보다 먹거리 만족도가 중요한 여행이라면 가장 먼저 확인할 만한 지역입니다.",
      "compareCaution": "호텔 시설과 넓은 객실을 우선하면 공자묘·하야시백화점 또는 안핑·운하 호텔이 더 맞을 수 있습니다.",
      "mismatchNote": "일정 성격이 다르다면 다른 타이난 권역도 함께 비교하세요.",
      "links": [
        {
          "title": "국화거리·보안로 호텔 추천 TOP5",
          "url": "/post/guohua-baoan-hotels"
        },
        {
          "title": "타이난 숙소 위치 가이드",
          "url": "/destinations/tainan/hotel-guide/"
        }
      ],
      "hotels": [
        {
          "name": "카인드니스 호텔 타이난 치칸 타워",
          "tag": "먹거리 접근형",
          "location": "국화거리·보안로 주변",
          "reason": "구도심 먹거리와 실속 서비스를 함께 보는 여행에 좋습니다.",
          "meta": [
            "국화거리·보안로",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "FX 호텔 타이난 민셩 로드",
          "tag": "가성비 도심형",
          "location": "국화거리·보안로 생활권",
          "reason": "숙박비를 줄이면서 먹거리 동선을 남기고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "국화거리·보안로",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "유아이제이 호텔 앤 호스텔",
          "tag": "감성 실속형",
          "location": "하이안로·신농제와 국화거리·보안로 사이",
          "reason": "감성 숙소와 구도심 먹거리를 함께 원하는 여행에 맞습니다.",
          "meta": [
            "국화거리·보안로",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "잉글우드 호텔 타이난",
          "tag": "초실속 후보",
          "location": "국화거리·보안로 생활권",
          "reason": "혼자 여행이나 짧은 일정에서 비용을 낮추고 싶을 때 볼 만합니다.",
          "meta": [
            "국화거리·보안로",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "다이너스티 호텔 타이난",
          "tag": "역·먹거리 균형형",
          "location": "타이난역·중서구",
          "reason": "기차 이동과 구도심 먹거리 접근을 함께 비교하기 좋습니다.",
          "meta": [
            "국화거리·보안로",
            "타이난",
            "숙소"
          ],
          "url": "#"
        }
      ]
    },
    "flower": {
      "name": "화원야시장(북구)",
      "regionSlug": "flower-night-market-north",
      "regionSlugAliases": [
        "화원야시장(북구)",
        "화원야시장·북구",
        "화원야시장"
      ],
      "label": "야시장 날짜가 맞고 밤 동선을 크게 줄이고 싶다면 비교 가치가 있는 지역입니다.",
      "summary": "화원야시장(북구)은 야시장 일정과 비교적 여유 있는 호텔, 차량 이동을 함께 고려할 때 볼 만한 지역입니다.",
      "leadTitle": "화원야시장과 북구 숙소를 함께 볼 때 좋은 야시장 중심 선택지",
      "leadText": "화원야시장은 타이난의 대표 야시장 중 하나지만 매일 열리는 형태가 아닙니다. 야시장 운영일과 숙소 위치, 택시 복귀를 함께 계산하면 만족도가 높습니다.",
      "stayRange": [
        "화원야시장(북구)은 야시장 일정과 비교적 여유 있는 호텔, 차량 이동을 함께 고려할 때 볼 만한 지역입니다.",
        "화원야시장은 운영 요일이 중요하므로 여행 날짜와 맞는지 먼저 확인하고 숙소를 잡으세요.",
        "주요 일정과 밤 동선을 함께 계산하세요."
      ],
      "avoidRange": [
        "구도심 명소를 도보로 매일 보려는 일정에는 타이난역·중서구 숙소가 더 편할 수 있습니다.",
        "가격만 보고 골목 깊은 숙소를 고르는 선택",
        "야시장 날짜와 이동 시간을 확인하지 않은 예약"
      ],
      "bestFor": [
        "야시장 중심 여행",
        "친구 여행",
        "차량 이동",
        "북구 숙박비 비교"
      ],
      "notFor": [
        "동선이 맞지 않는 짧은 일정",
        "소음 후기를 확인하지 않은 예약",
        "이동 방식이 정해지지 않은 여행"
      ],
      "bookingTips": [
        "화원야시장은 운영 요일이 중요하므로 여행 날짜와 맞는지 먼저 확인하고 숙소를 잡으세요.",
        "택시 승하차와 짐 보관 가능 여부를 확인하세요.",
        "주변 식당 영업시간과 밤 분위기를 함께 보세요."
      ],
      "chips": [
        "야시장",
        "화원야시장(북구)",
        "친구 여행",
        "차량 이동",
        "재방문"
      ],
      "compareGood": "야시장 날짜가 맞고 밤 동선을 크게 줄이고 싶다면 비교 가치가 있는 지역입니다.",
      "compareCaution": "구도심 명소를 도보로 매일 보려는 일정에는 타이난역·중서구 숙소가 더 편할 수 있습니다.",
      "mismatchNote": "일정 성격이 다르다면 다른 타이난 권역도 함께 비교하세요.",
      "links": [
        {
          "title": "화원야시장(북구) 호텔 추천 TOP5",
          "url": "/post/flower-night-market-north-hotels"
        },
        {
          "title": "타이난 숙소 위치 가이드",
          "url": "/destinations/tainan/hotel-guide/"
        }
      ],
      "hotels": [
        {
          "name": "저스트윈 그랜드 호텔",
          "tag": "북구 실용형",
          "location": "화원야시장(북구) 생활권",
          "reason": "북구와 야시장 접근을 함께 보는 차량 이동 여행에 좋습니다.",
          "meta": [
            "화원야시장(북구)",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "자먼 호텔 타이난",
          "tag": "가족 실속형",
          "location": "화원야시장(북구) 주변",
          "reason": "화원야시장과 넓은 객실 후보를 함께 보고 싶을 때 비교할 만합니다.",
          "meta": [
            "화원야시장(북구)",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "타이난 F 호텔",
          "tag": "야시장 실속형",
          "location": "화원야시장(북구) 생활권",
          "reason": "화원야시장 일정과 숙박비 균형을 함께 고려할 수 있습니다.",
          "meta": [
            "화원야시장(북구)",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "호텔 리치 타이난",
          "tag": "도심 연결형",
          "location": "화원야시장(북구)와 중서구 사이",
          "reason": "북구와 구도심을 함께 움직이는 일정에서 위치를 비교하기 좋습니다.",
          "meta": [
            "화원야시장(북구)",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "프리미어 호텔 타이난",
          "tag": "기본 도심형",
          "location": "화원야시장(북구) 생활권",
          "reason": "기차역 북쪽에서 실용적인 숙소를 찾을 때 볼 만합니다.",
          "meta": [
            "화원야시장(북구)",
            "타이난",
            "숙소"
          ],
          "url": "#"
        }
      ]
    }
  },
  "questions": [
    {
      "title": "이번 타이난 여행은 어떤 성격인가요?",
      "help": "여행 성격에 따라 숙소 기준점이 달라집니다.",
      "options": [
        {
          "title": "처음이에요",
          "desc": "대표 명소와 구도심을 편하게 보고 싶어요.",
          "scores": {
            "station": 8,
            "confucius": 5,
            "guohua": 2
          }
        },
        {
          "title": "먹거리 여행이에요",
          "desc": "타이난 음식과 골목 식당이 중요해요.",
          "scores": {
            "guohua": 8,
            "shennong": 5,
            "station": 2
          }
        },
        {
          "title": "가족과 함께 가요",
          "desc": "식사와 이동, 객실 컨디션이 중요해요.",
          "scores": {
            "confucius": 7,
            "anping": 6,
            "station": 2
          }
        },
        {
          "title": "조용히 쉬고 싶어요",
          "desc": "번화가보다 차분한 숙소가 좋아요.",
          "scores": {
            "confucius": 6,
            "anping": 6,
            "shennong": 3
          }
        }
      ]
    },
    {
      "title": "가장 중요하게 보는 이동은 무엇인가요?",
      "help": "도착과 출발, 밤 복귀, 안핑 이동을 기준으로 골라보세요.",
      "options": [
        {
          "title": "기차역 접근",
          "desc": "도착과 출발을 단순하게 만들고 싶어요.",
          "scores": {
            "station": 9,
            "confucius": 3
          }
        },
        {
          "title": "구도심 도보 산책",
          "desc": "적감루와 공자묘, 하야시를 걷고 싶어요.",
          "scores": {
            "confucius": 7,
            "station": 5,
            "guohua": 3
          }
        },
        {
          "title": "안핑 이동",
          "desc": "안핑고성과 운하를 길게 보고 싶어요.",
          "scores": {
            "anping": 8,
            "confucius": 2
          }
        },
        {
          "title": "밤 먹거리 복귀",
          "desc": "저녁 식사와 야시장 후 돌아오기 쉬웠으면 해요.",
          "scores": {
            "guohua": 6,
            "shennong": 5,
            "flower": 5
          }
        }
      ]
    },
    {
      "title": "저녁 시간은 어떻게 보내고 싶나요?",
      "help": "타이난은 밤 분위기에 따라 숙소 만족도가 달라집니다.",
      "options": [
        {
          "title": "국화거리·보안로 먹거리",
          "desc": "도보 맛집과 간식이 중요해요.",
          "scores": {
            "guohua": 8,
            "station": 3,
            "shennong": 2
          }
        },
        {
          "title": "신농제 밤 산책",
          "desc": "감성 골목과 카페, 작은 바가 좋아요.",
          "scores": {
            "shennong": 8,
            "guohua": 3
          }
        },
        {
          "title": "화원야시장",
          "desc": "야시장 날짜가 맞으면 밤을 길게 쓰고 싶어요.",
          "scores": {
            "flower": 8,
            "guohua": 2
          }
        },
        {
          "title": "숙소에서 쉬기",
          "desc": "소음은 줄이고 편하게 쉬고 싶어요.",
          "scores": {
            "confucius": 6,
            "anping": 5,
            "station": 2
          }
        }
      ]
    },
    {
      "title": "꼭 넣고 싶은 일정은 무엇인가요?",
      "help": "대표 일정에 따라 숙소 위치가 달라집니다.",
      "options": [
        {
          "title": "적감루·공자묘·하야시백화점",
          "desc": "역사 산책과 구도심을 보고 싶어요.",
          "scores": {
            "confucius": 8,
            "station": 4,
            "guohua": 2
          }
        },
        {
          "title": "안핑고성·안핑수옥",
          "desc": "안핑을 반나절 이상 보고 싶어요.",
          "scores": {
            "anping": 8,
            "confucius": 2
          }
        },
        {
          "title": "국화거리 먹거리 투어",
          "desc": "타이난 음식을 많이 먹고 싶어요.",
          "scores": {
            "guohua": 9,
            "shennong": 3
          }
        },
        {
          "title": "화원야시장",
          "desc": "운영일에 맞춰 야시장을 넣고 싶어요.",
          "scores": {
            "flower": 8,
            "guohua": 2
          }
        }
      ]
    },
    {
      "title": "숙소 주변 분위기는 어떤 쪽이 좋나요?",
      "help": "구도심, 골목, 물가, 야시장 분위기가 다릅니다.",
      "options": [
        {
          "title": "편한 구도심",
          "desc": "명소와 식당이 가까웠으면 해요.",
          "scores": {
            "station": 6,
            "confucius": 6,
            "guohua": 3
          }
        },
        {
          "title": "감성 골목",
          "desc": "오래된 거리와 카페 분위기가 좋아요.",
          "scores": {
            "shennong": 8,
            "confucius": 2
          }
        },
        {
          "title": "물가와 여유",
          "desc": "안핑과 운하 산책이 좋아요.",
          "scores": {
            "anping": 8,
            "confucius": 2
          }
        },
        {
          "title": "활기 있는 밤",
          "desc": "야시장과 먹거리가 가까웠으면 해요.",
          "scores": {
            "flower": 7,
            "guohua": 6,
            "shennong": 3
          }
        }
      ]
    },
    {
      "title": "숙소 예산은 어떤 편인가요?",
      "help": "타이난은 위치와 객실 컨디션을 함께 봐야 합니다.",
      "options": [
        {
          "title": "예산 절약",
          "desc": "숙박비를 낮추고 싶어요.",
          "scores": {
            "guohua": 7,
            "station": 5,
            "flower": 3
          }
        },
        {
          "title": "가격·위치 균형",
          "desc": "이동과 숙박비를 모두 보고 싶어요.",
          "scores": {
            "station": 5,
            "confucius": 5,
            "guohua": 4
          }
        },
        {
          "title": "위치 우선",
          "desc": "짧은 일정이라 이동 시간을 줄이고 싶어요.",
          "scores": {
            "station": 6,
            "confucius": 5,
            "shennong": 3
          }
        },
        {
          "title": "호텔 컨디션 우선",
          "desc": "객실과 휴식을 중요하게 봐요.",
          "scores": {
            "confucius": 7,
            "anping": 6
          }
        }
      ]
    },
    {
      "title": "가장 피하고 싶은 불편은 무엇인가요?",
      "help": "피하고 싶은 요소를 기준으로 고르면 실패 확률이 줄어듭니다.",
      "options": [
        {
          "title": "도착·출발 이동 스트레스",
          "desc": "짐 들고 이동이 복잡한 건 싫어요.",
          "scores": {
            "station": 8,
            "confucius": 2
          }
        },
        {
          "title": "밤 소음과 혼잡",
          "desc": "숙소에서는 조용히 쉬고 싶어요.",
          "scores": {
            "confucius": 6,
            "anping": 6,
            "station": 2
          }
        },
        {
          "title": "주변에 먹을 곳 없음",
          "desc": "호텔 근처 식당이 중요해요.",
          "scores": {
            "guohua": 8,
            "shennong": 5,
            "station": 3
          }
        },
        {
          "title": "매일 긴 이동",
          "desc": "일정이 바뀌어도 움직이기 쉬웠으면 해요.",
          "scores": {
            "station": 5,
            "confucius": 5,
            "guohua": 4
          }
        }
      ]
    }
  ]
};

const areaResultBadges = {
  "station": "타이난역과 중서구를 잇는 첫 시작",
  "shennong": "골목 산책과 저녁 미식이 가까운",
  "confucius": "역사 거리와 카페 산책이 편한",
  "anping": "운하와 노을 산책이 이어지는 여유",
  "guohua": "로컬 미식 골목이 가까운 중심",
  "flower": "야시장과 북구 동선이 편한 저녁"
};

const hotelAccessPresets = {
  "station": {
    "station": "타이난역·중서구 접근",
    "airport": "가오슝공항/타이난공항 이동 확인"
  },
  "shennong": {
    "station": "하이안로·신농제 도보권",
    "airport": "공항·기차역 차량 이동 확인"
  },
  "confucius": {
    "station": "공자묘·하야시백화점 도보권",
    "airport": "공항·기차역 차량 이동 확인"
  },
  "anping": {
    "station": "안핑고성·운하 산책권",
    "airport": "기차역 차량 약 20~30분"
  },
  "guohua": {
    "station": "국화거리·보안로 미식권",
    "airport": "기차역 차량 약 10~20분"
  },
  "flower": {
    "station": "화원야시장·북구 접근",
    "airport": "기차역 차량 약 10~20분"
  }
};

function normalizeAreaToken(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\s·ㆍ・&-]+/g, "");
}

function getAreaKey(area) {
  if (!area) return "";
  if (area.key && Object.prototype.hasOwnProperty.call(cityConfig.areas, area.key)) return area.key;

  return Object.keys(cityConfig.areas).find((key) => {
    const candidate = cityConfig.areas[key];
    return candidate === area || candidate.name === area.name || candidate.regionSlug === area.regionSlug;
  }) || "";
}

function getAreaDisplayName(area) {
  const displayName = String(area?.displayName || area?.name || "")
    .replace(/\s*&\s*/g, "·")
    .replace(/\s*-\s*/g, "·")
    .trim();
  return displayName || "추천 지역";
}

function uniqueItems(items) {
  return [...new Set((items || []).map((item) => String(item || "").trim()).filter(Boolean))];
}

Object.entries(cityConfig.areas || {}).forEach(([key, area]) => {
  area.key = area.key || key;
  area.displayName = getAreaDisplayName(area);
  area.resultBadge = area.resultBadge || areaResultBadges[key] || "이번 여행에 어울리는 숙소 위치";
  area.destinationLabel = area.destinationLabel || `${area.resultBadge}, ${area.displayName}`;
  area.bestFor = uniqueItems(area.bestFor || area.chips || ["일정이 짧은 여행", "위치 중심 숙소"]);
  area.notFor = uniqueItems(area.notFor || ["숙소에서만 오래 쉬는 일정", "이동보다 리조트 시설이 더 중요한 여행"]);
  area.bookingTips = uniqueItems(area.bookingTips || [
    "예약 전 최근 후기에서 소음, 청결, 주변 공사 언급을 확인하세요.",
    "공항·투어 픽업이 중요하면 호텔명보다 실제 픽업 가능 지역을 확인하세요.",
    "택시나 그랩 이동이 많은 도시라면 예상 이동비도 함께 계산하세요."
  ]);
  area.stayRange = uniqueItems(area.stayRange || [
    `${area.displayName} 안에서도 매일 갈 장소와 가장 가까운 위치`,
    "식사·편의점·마사지 등 저녁 이후 편의시설이 가까운 큰길 주변",
    "공항 이동이나 투어 픽업이 필요한 날의 동선이 단순한 숙소"
  ]);
  area.avoidRange = uniqueItems(area.avoidRange || [
    "지도상 가까워 보여도 실제 도보 길이 불편한 안쪽 골목",
    "저녁 이후 소음 후기가 반복되는 저층 객실",
    "매일 이동할 목적지와 반대 방향으로 떨어진 숙소"
  ]);
});

let currentQuestionIndex = 0;
let answers = new Array(cityConfig.questions.length).fill(null);
let lastRankedAreas = [];
let lastTopArea = null;

const pageIds = ["introPage", "questionPage", "completionPage", "loadingPage", "resultPage"];
const locationPage = document.getElementById("locationPage");
const questionCount = document.getElementById("questionCount");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const progressFill = document.getElementById("progressFill");
const questionTitle = document.getElementById("questionTitle");
const questionHelp = document.getElementById("questionHelp");
const optionsArea = document.getElementById("optionsArea");
const startSurveyBtn = document.getElementById("startSurveyBtn");
const backBtn = document.getElementById("backBtn");
const resultCloseBtn = document.getElementById("resultCloseBtn");
const resultReadyBtn = document.getElementById("resultReadyBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const detailBtn = document.getElementById("detailBtn");
const hotelTabBtn = document.getElementById("hotelTabBtn");

const escapeHtml = (value) => String(value || "").replace(/[&<>'"]/g, (ch) => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[ch]));

function setText(id, text) {
  const element = document.getElementById(id);
  if (element) element.textContent = text || "";
}

function navigateTo(pageId) {
  pageIds.forEach((id) => {
    const page = document.getElementById(id);
    if (!page) return;
    page.classList.toggle("active", id === pageId);
  });
  locationPage?.classList.toggle("is-survey-started", pageId !== "introPage");
  locationPage?.classList.toggle("is-result-mode", pageId === "resultPage");
}

function getAnsweredPercent() {
  const answeredCount = answers.filter((answer) => answer !== null).length;
  return Math.round((answeredCount / cityConfig.questions.length) * 100);
}

function getProgressMessage() {
  const total = cityConfig.questions.length;
  const step = currentQuestionIndex + 1;
  if (step === 1) return "가볍게 시작해볼까요?";
  if (step === total) return "마지막 질문이에요";
  if (step >= total - 1) return "거의 다 왔어요";
  if (step >= Math.ceil(total * 0.65)) return "조금만 더 가면 추천 완료";
  if (step >= Math.ceil(total * 0.4)) return "좋아요, 취향이 보이기 시작해요";
  return "동선을 하나씩 맞춰보는 중이에요";
}

function startSurvey() {
  navigateTo("questionPage");
  renderQuestion();
}

function goBack() {
  window.history.back();
}

function renderQuestion() {
  const question = cityConfig.questions[currentQuestionIndex];
  const selectedIndex = answers[currentQuestionIndex];
  const percent = getAnsweredPercent();

  questionCount.textContent = `${currentQuestionIndex + 1} / ${cityConfig.questions.length}`;
  progressText.textContent = getProgressMessage();
  progressFill.style.width = `${percent}%`;
  progressBar.setAttribute("aria-valuenow", String(percent));

  questionTitle.textContent = question.title;
  questionHelp.textContent = question.help;
  optionsArea.innerHTML = "";

  question.options.forEach((option, optionIndex) => {
    const button = document.createElement("button");
    const title = document.createElement("span");
    const desc = document.createElement("span");

    button.type = "button";
    button.className = "wt-option";
    button.setAttribute("aria-pressed", selectedIndex === optionIndex ? "true" : "false");
    if (selectedIndex === optionIndex) button.classList.add("is-selected");

    title.className = "wt-option-title";
    title.textContent = option.title;
    desc.className = "wt-option-desc";
    desc.textContent = option.desc || "";

    button.appendChild(title);
    if (option.desc) button.appendChild(desc);
    button.addEventListener("click", () => {
      answers[currentQuestionIndex] = optionIndex;
      renderQuestion();
    });
    optionsArea.appendChild(button);
  });

  prevBtn.textContent = currentQuestionIndex === 0 ? "처음" : "이전";
  nextBtn.disabled = selectedIndex === null;
  nextBtn.textContent = "다음";
}

function goNext() {
  if (answers[currentQuestionIndex] === null) return;
  if (currentQuestionIndex < cityConfig.questions.length - 1) {
    currentQuestionIndex += 1;
    renderQuestion();
    questionTitle.focus?.();
    return;
  }
  navigateTo("completionPage");
}

function goPrev() {
  if (currentQuestionIndex === 0) {
    resetSurvey(false);
    return;
  }
  currentQuestionIndex -= 1;
  renderQuestion();
  questionTitle.focus?.();
}

function getSelectedOption(questionIndex) {
  const answerIndex = answers[questionIndex];
  if (answerIndex === null || answerIndex === undefined) return null;
  return cityConfig.questions[questionIndex]?.options?.[answerIndex] || null;
}

function calculateScores() {
  const scores = {};
  Object.keys(cityConfig.areas).forEach((areaKey) => { scores[areaKey] = 0; });

  answers.forEach((answerIndex, questionIndex) => {
    if (answerIndex === null) return;
    const selectedOption = cityConfig.questions[questionIndex].options[answerIndex];
    Object.entries(selectedOption.scores || {}).forEach(([areaKey, score]) => {
      if (Object.prototype.hasOwnProperty.call(scores, areaKey)) scores[areaKey] += score;
    });
  });

  return Object.entries(scores)
    .map(([key, score]) => ({ key, score, ...cityConfig.areas[key] }))
    .sort((a, b) => b.score - a.score);
}

function getJosa(word, pair) {
  const [has, none] = pair.split("/");
  const last = String(word || "").trim().charCodeAt(String(word || "").trim().length - 1);
  if (!last || last < 0xac00 || last > 0xd7a3) return none || has;
  return ((last - 0xac00) % 28) ? has : none;
}

function withJosa(word, pair) {
  return `${word}${getJosa(word, pair)}`;
}

function getScoreFitSentence(rankedAreas) {
  if (!rankedAreas || rankedAreas.length < 2) return "";
  const top = rankedAreas[0];
  const second = rankedAreas[1];
  const gap = top.score - second.score;
  if (gap <= 1) return `${withJosa(second.name, "도/도")} 함께 볼 만하지만, 선택한 조건을 종합하면 ${withJosa(top.name, "이/가")} 조금 더 자연스럽습니다.`;
  if (gap <= 4) return `${second.name}도 가까운 선택지지만, 이번 답변에서는 ${withJosa(top.name, "이/가")} 더 안정적으로 맞습니다.`;
  return `이번 답변에서는 ${withJosa(top.name, "이/가")} 가장 또렷하게 맞는 흐름으로 정리됐습니다.`;
}

function getAlternativeSentence(area, rankedAreas) {
  const second = rankedAreas?.[1];
  if (!area || !second) return "";
  return `${withJosa(area.name, "이/가")} 마음에 든다면, ${second.compareGood || second.summary || `${second.name}만의 다른 분위기`} ${second.name}도 함께 비교해볼 만합니다.`;
}

function getPersuasiveContent(area, rankedAreas) {
  const reasons = [
    { title: "여행 목적과 맞는 위치입니다", text: area.compareGood || area.summary || "이번 여행 조건과 잘 맞는 위치입니다." },
    { title: "이동 기준이 단순해집니다", text: area.leadText || "매일 움직일 동선을 기준으로 숙소를 비교하기 쉽습니다." },
    { title: "호텔 비교 기준이 명확해집니다", text: "지역을 먼저 정하면 가격, 객실, 주변 분위기, 최근 후기를 훨씬 빠르게 비교할 수 있습니다." }
  ];
  if (area.compareCaution || area.mismatchNote) {
    reasons.push({ title: "예약 전 확인할 점도 있습니다", text: area.compareCaution || area.mismatchNote });
  }

  return {
    intro: [area.summary, getScoreFitSentence(rankedAreas)].filter(Boolean).join(" "),
    reasons,
    conclusionTitle: `${area.name}부터 호텔을 비교해보세요`,
    conclusionText: [
      area.leadTitle || "이번 일정에서 먼저 볼 만한 숙소 위치입니다.",
      getAlternativeSentence(area, rankedAreas)
    ].filter(Boolean).join(" ")
  };
}

function renderPersuasiveResult(topArea, rankedAreas) {
  const content = getPersuasiveContent(topArea, rankedAreas);
  const reasonCardList = document.getElementById("reasonCardList");

  setText("resultWhyText", content.intro);
  setText("decisionConclusionTitle", content.conclusionTitle);
  setText("decisionConclusionText", content.conclusionText);

  if (!reasonCardList) return;
  reasonCardList.innerHTML = "";
  content.reasons.forEach((reason, index) => {
    const article = document.createElement("article");
    const number = document.createElement("span");
    const title = document.createElement("h4");
    const text = document.createElement("p");
    article.className = "wt-reason-card";
    number.className = "wt-reason-number";
    number.textContent = `${index + 1}`;
    title.textContent = reason.title;
    text.textContent = reason.text;
    article.appendChild(number);
    article.appendChild(title);
    article.appendChild(text);
    reasonCardList.appendChild(article);
  });
}

function renderSimpleList(listId, items) {
  const list = document.getElementById(listId);
  if (!list) return;
  list.innerHTML = "";
  (Array.isArray(items) ? items : []).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

function renderChipList(listId, items) {
  const list = document.getElementById(listId);
  if (!list) return;
  list.innerHTML = "";
  (Array.isArray(items) ? items : []).forEach((item) => {
    const chip = document.createElement("span");
    chip.textContent = item;
    list.appendChild(chip);
  });
}

function getPracticalGuideDesc(area) {
  if (!area) return "";
  return `${withJosa(area.name, "을/를")} 고를 때는 지역명보다 실제 도보 시간, 저녁 이후 이동, 공항·투어 동선, 객실 크기를 함께 확인하는 것이 좋습니다.`;
}

function renderPracticalGuide(area) {
  setText("practicalGuideDesc", getPracticalGuideDesc(area));
  renderSimpleList("stayRangeList", area.stayRange);
  renderSimpleList("avoidRangeList", area.avoidRange);
  renderSimpleList("bookingTipList", area.bookingTips);
  renderChipList("bestForList", area.bestFor);
  renderChipList("notForList", area.notFor);
}

function getAreaShortAppeal(area) {
  if (!area) return "다른 분위기를 느낄 수 있는";
  if (area.compareGood) return area.compareGood.replace(/[.。]\s*$/, "");
  if (area.summary) return area.summary.replace(/[.。]\s*$/, "");
  return `${getAreaDisplayName(area)}만의 다른 매력이 있는`;
}

function getAlternativeDetail(topArea, rankedAreas) {
  const second = rankedAreas?.[1];
  if (!topArea || !second) return null;
  const title = "이런 지역도 함께 볼 만해요";
  const text = `${withJosa(getAreaDisplayName(topArea), "이/가")} 마음에 든다면, ${getAreaShortAppeal(second)} ${getAreaDisplayName(second)}도 함께 비교해볼 만합니다. 호텔 가격과 실제 이동 시간이 잘 맞으면 충분히 좋은 선택이 될 수 있습니다.`;
  return { title, text };
}

function renderAlternativeArea(topArea, rankedAreas) {
  const box = document.getElementById("reasonAlternativeBox");
  const detail = getAlternativeDetail(topArea, rankedAreas);
  if (!box) return;
  if (!detail) {
    box.style.display = "none";
    setText("reasonAlternativeTitle", "");
    setText("reasonAlternativeText", "");
    return;
  }
  box.style.display = "";
  setText("reasonAlternativeTitle", detail.title);
  setText("reasonAlternativeText", detail.text);
}

function getHotelAccessInfo(hotel, area) {
  const key = getAreaKey(area);
  const fallback = hotelAccessPresets[key] || {
    station: `${getAreaDisplayName(area)} 주요 동선 확인`,
    airport: "공항 접근성 확인"
  };
  return {
    station: hotel.stationAccess || fallback.station,
    airport: hotel.airportAccess || fallback.airport
  };
}

function getHotelDisplayTags(hotel) {
  const directTags = [hotel.starRating, hotel.guestRating, hotel.freeCancel].filter(Boolean);
  if (directTags.length) return directTags.slice(0, 3);
  const metaTags = Array.isArray(hotel.meta) ? hotel.meta : [];
  return uniqueItems([hotel.tag, hotel.location, ...metaTags]).slice(0, 3);
}

function renderHotelCards(area) {
  const hotelCardList = document.getElementById("hotelCardList");
  const hotels = Array.isArray(area.hotels) ? area.hotels.slice(0, 5) : [];
  if (!hotelCardList) return;

  setText("hotelSectionTitle", `${area.name}에서 먼저 비교해볼 호텔 5곳`);
  setText("hotelSectionDesc", "접근성과 실제 이동 시간을 기준으로 빠르게 비교해보세요.");
  hotelCardList.innerHTML = "";

  if (!hotels.length) {
    const empty = document.createElement("p");
    empty.className = "wt-post-empty";
    empty.style.display = "block";
    empty.textContent = "아직 연결된 호텔 후보가 없습니다.";
    hotelCardList.appendChild(empty);
    return;
  }

  hotels.forEach((hotel) => {
    const article = document.createElement("article");
    const header = document.createElement("div");
    const headerLeft = document.createElement("div");
    const name = document.createElement("h4");
    const link = document.createElement("a");
    const locationMain = document.createElement("div");
    const station = document.createElement("span");
    const separator = document.createElement("span");
    const airport = document.createElement("span");
    const tagList = document.createElement("div");
    const access = getHotelAccessInfo(hotel, area);
    const tags = getHotelDisplayTags(hotel);
    const hotelName = hotel.kr || hotel.name || "호텔 후보";

    article.className = "wt-hotel-card wt-hotel-card--compact";
    header.className = "wt-hotel-card-header";
    headerLeft.className = "wt-hotel-header-left";
    name.className = "wt-hotel-name";
    link.className = "wt-hotel-link";
    locationMain.className = "wt-hotel-location-main";
    station.className = "wt-hotel-station";
    separator.className = "wt-hotel-separator";
    airport.className = "wt-hotel-airport";
    tagList.className = "wt-hotel-tag-list";

    name.textContent = hotelName;
    link.href = hotel.url || `/destinations/${cityConfig.destinationSlug}/hotel-recommendations/`;
    link.textContent = "잔여 객실 확인";
    link.setAttribute("aria-label", `${hotelName} 잔여 객실 확인`);
    station.textContent = access.station;
    separator.textContent = "|";
    airport.textContent = access.airport;

    headerLeft.appendChild(name);
    header.appendChild(headerLeft);
    header.appendChild(link);
    locationMain.appendChild(station);
    locationMain.appendChild(separator);
    locationMain.appendChild(airport);

    tags.forEach((item) => {
      const tag = document.createElement("span");
      tag.className = "wt-hotel-tag wt-hotel-tag--base";
      tag.textContent = item;
      tagList.appendChild(tag);
    });

    article.appendChild(header);
    article.appendChild(locationMain);
    article.appendChild(tagList);
    hotelCardList.appendChild(article);
  });
}

function getRelatedPostRegionSlugs(area) {
  return uniqueItems([
    area?.regionSlug,
    ...(Array.isArray(area?.regionSlugAliases) ? area.regionSlugAliases : []),
    area?.name,
    area?.displayName,
    area?.key
  ]);
}

async function fetchRelatedPostsByRegion(area) {
  const regionSlugs = getRelatedPostRegionSlugs(area);
  for (const regionSlug of regionSlugs) {
    const params = new URLSearchParams({
      destination: cityConfig.destinationSlug,
      type: cityConfig.postContentType || "top5_series",
      region: regionSlug,
      limit: "5"
    });
    try {
      const response = await fetch(`/api/destination-posts?${params.toString()}`, {
        headers: { accept: "application/json" },
        cache: "no-store"
      });
      if (!response.ok) continue;
      const data = await response.json();
      const items = Array.isArray(data.items) ? data.items : [];
      if (items.length) return items.slice(0, 5);
    } catch (_) {
      return [];
    }
  }
  return [];
}

async function renderRelatedPosts(area) {
  const list = document.getElementById("relatedPostList");
  const empty = document.getElementById("relatedPostEmpty");
  if (!list) return;
  list.innerHTML = "";
  if (empty) empty.style.display = "none";
  setText("relatedPostTitle", `${area.name} 여행 스타일별 호텔 추천 글`);

  const posts = await fetchRelatedPostsByRegion(area);
  if (!posts.length) {
    if (empty) empty.style.display = "block";
    return;
  }

  posts.forEach((post) => {
    const title = String(post.title || "여행 스타일별 호텔 추천 글").trim();
    const slug = String(post.slug || "").trim();
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = slug ? `/post/${encodeURIComponent(slug)}` : "#";
    link.textContent = title;
    link.setAttribute("aria-label", `${title} 보기`);
    item.appendChild(link);
    list.appendChild(item);
  });
}

function getEmotionalSummary(area) {
  if (!area) return "이번 여행 스타일에 맞는 숙소 위치를 찾았습니다.";
  return area.emotionalSummary || area.summary || area.leadText || "이번 여행 스타일에 맞는 숙소 위치를 찾았습니다.";
}

function getResultBadgeText(area) {
  const areaKey = getAreaKey(area);
  if (areaKey && areaResultBadges[areaKey]) return areaResultBadges[areaKey];
  const label = area?.destinationLabel || "";
  if (label.includes(",")) return label.split(",")[0].trim();
  return "이번 여행에 어울리는 숙소 위치";
}

function prepareResultContent() {
  const rankedAreas = calculateScores();
  const topArea = rankedAreas[0];
  lastRankedAreas = rankedAreas;
  lastTopArea = topArea;

  const displayName = getAreaDisplayName(topArea);
  const resultBadgeText = getResultBadgeText(topArea);
  setText("resultBadge", resultBadgeText);
  setText("resultTitle", displayName);
  setText("detailResultBadge", resultBadgeText);
  setText("detailResultTitle", displayName);
  setText("resultSummary", getEmotionalSummary(topArea));
  setText("resultLeadTitle", topArea.leadTitle || `${displayName}이 이번 일정에 잘 맞습니다.`);
  setText("resultLeadText", topArea.leadText || topArea.summary || "선택한 답변을 기준으로 이동과 숙소 분위기를 함께 비교했습니다.");

  renderPersuasiveResult(topArea, rankedAreas);
  renderPracticalGuide(topArea);
  renderHotelCards(topArea);
  renderAlternativeArea(topArea, rankedAreas);
  renderRelatedPosts(topArea);

  return { rankedAreas, topArea };
}

const loadingIcons = {
  step1: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64" fill="none"><rect x="14" y="10" width="36" height="44" rx="6" fill="#F5F5F7" stroke="#1D1D1F" stroke-width="2.5"/><line x1="22" y1="22" x2="42" y2="22" stroke="#1D1D1F" stroke-width="3" stroke-linecap="round"/><line x1="22" y1="32" x2="36" y2="32" stroke="#1D1D1F" stroke-width="3" stroke-linecap="round"/><circle cx="40" cy="38" r="7" fill="#2563EB" opacity="0.2"/><circle cx="40" cy="38" r="5" stroke="#2563EB" stroke-width="2.5"/><line x1="44" y1="42" x2="49" y2="47" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  step2: `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 64 64" fill="none"><path d="M14 18 L26 12 L38 18 L50 12 L50 46 L38 52 L26 46 L14 52 Z" fill="#EFF6FF" stroke="#1D1D1F" stroke-width="2" stroke-linejoin="round"/><path d="M26 12 L26 46" stroke="#BDC3C7" stroke-width="1.5" stroke-dasharray="2 2"/><path d="M38 18 L38 52" stroke="#BDC3C7" stroke-width="1.5" stroke-dasharray="2 2"/><g transform="translate(26, 18)"><path d="M6 0 C2.6 0 0 2.6 0 6 C0 10.5 6 16 6 16 C6 16 12 10.5 12 6 C12 2.6 9.4 0 6 0 Z" fill="#2563EB"/><circle cx="6" cy="6" r="2" fill="#FFFFFF"/></g></svg>`,
  step3: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="24" fill="#EFF6FF"/><circle cx="32" cy="32" r="20" fill="#2563EB" opacity="0.2"/><path d="M20 32 L28 40 L44 22" stroke="#2563EB" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};

function getLoadingTips(area) {
  const name = area?.name || "추천 지역";
  return {
    step1: { main: "당신의 여행 성향 분석 중...", sub: "선택한 답변에서 이동 기준과 숙소 분위기를 정리하고 있어요." },
    step2: { main: `${name} 적합도 확인 중...`, sub: "공항 이동, 주요 동선, 주변 분위기, 예산 균형을 함께 비교합니다." },
    step3: { main: "맞춤 숙소 위치를 찾았어요! ✨", sub: "결과 화면으로 이동합니다." }
  };
}

function processAnalysis() {
  const { topArea } = prepareResultContent();
  const circle = document.getElementById("loaderCircle");
  const barWrap = document.getElementById("loadingProgressWrap");
  const txtMain = document.getElementById("loadingText");
  const txtSub = document.getElementById("loadingSubText");
  const iconContainer = document.getElementById("loaderIcon");
  const progress = document.getElementById("loadingProgressBar");
  const tips = getLoadingTips(topArea);

  circle.classList.remove("complete");
  barWrap.classList.remove("hide");
  progress.style.transition = "none";
  progress.style.width = "0%";
  document.getElementById("simpleSummaryCard").style.display = "flex";
  document.getElementById("detailedInfoSection").style.display = "none";
  resetTabs(0);
  navigateTo("loadingPage");

  requestAnimationFrame(() => {
    progress.style.transition = "width 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
    progress.style.width = "35%";
    txtMain.innerText = tips.step1.main;
    txtSub.innerText = tips.step1.sub;
    iconContainer.innerHTML = loadingIcons.step1;
  });

  setTimeout(() => {
    txtMain.style.opacity = 0;
    txtSub.style.opacity = 0;
    setTimeout(() => {
      progress.style.transition = "width 1.1s cubic-bezier(0.16, 1, 0.3, 1)";
      progress.style.width = "85%";
      txtMain.innerText = tips.step2.main;
      txtSub.innerText = tips.step2.sub;
      iconContainer.innerHTML = loadingIcons.step2;
      txtMain.style.opacity = 1;
      txtSub.style.opacity = 1;
    }, 150);
  }, 800);

  setTimeout(() => {
    txtMain.style.opacity = 0;
    txtSub.style.opacity = 0;
    setTimeout(() => {
      progress.style.transition = "width 0.3s ease-in";
      progress.style.width = "100%";
      txtMain.innerText = tips.step3.main;
      txtSub.innerText = tips.step3.sub;
      iconContainer.innerHTML = loadingIcons.step3;
      circle.classList.add("complete");
      barWrap.classList.add("hide");
      txtMain.style.opacity = 1;
      txtSub.style.opacity = 1;
    }, 150);
  }, 1950);

  setTimeout(() => {
    navigateTo("resultPage");
    document.getElementById("mainScrollBody").scrollTop = 0;
  }, 2550);
}

function showDetailedView(tabIndex = 0) {
  document.getElementById("simpleSummaryCard").style.display = "none";
  document.getElementById("detailedInfoSection").style.display = "block";
  resetTabs(tabIndex);
  document.getElementById("mainScrollBody").scrollTo({ top: 0, behavior: "smooth" });
}

function resetTabs(index = 0) {
  const buttons = Array.from(document.querySelectorAll(".tab-btn"));
  const panels = Array.from(document.querySelectorAll(".tab-panel"));
  buttons.forEach((btn, btnIndex) => btn.classList.toggle("active", btnIndex === index));
  panels.forEach((panel, panelIndex) => panel.classList.toggle("active", panelIndex === index));
}

function switchTab(index, clickedBtn) {
  resetTabs(index);
  const container = document.getElementById("tabContainer");
  if (!container || !clickedBtn) return;
  const btnLeft = clickedBtn.offsetLeft;
  const btnWidth = clickedBtn.offsetWidth;
  const containerWidth = container.offsetWidth;
  const targetScrollLeft = btnLeft - (containerWidth / 2) + (btnWidth / 2);
  container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
}

function goToHotelTab() {
  showDetailedView(2);
}

function resetSurvey() {
  currentQuestionIndex = 0;
  answers = new Array(cityConfig.questions.length).fill(null);
  lastRankedAreas = [];
  lastTopArea = null;
  renderQuestion();
  document.getElementById("simpleSummaryCard").style.display = "flex";
  document.getElementById("detailedInfoSection").style.display = "none";
  resetTabs(0);
  navigateTo("introPage");
}

startSurveyBtn?.addEventListener("click", startSurvey);
backBtn?.addEventListener("click", goBack);
resultCloseBtn?.addEventListener("click", resetSurvey);
resultReadyBtn?.addEventListener("click", processAnalysis);
nextBtn?.addEventListener("click", goNext);
prevBtn?.addEventListener("click", goPrev);
resetBtn?.addEventListener("click", resetSurvey);
detailBtn?.addEventListener("click", () => showDetailedView(0));
hotelTabBtn?.addEventListener("click", goToHotelTab);

document.querySelectorAll(".tab-btn").forEach((button, index) => {
  button.addEventListener("click", () => switchTab(index, button));
});

renderQuestion();
