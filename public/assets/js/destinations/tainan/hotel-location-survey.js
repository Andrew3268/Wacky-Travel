/* Tainan hotel location survey logic. */
const cityConfig = {
  "cityName": "타이난",
  "destinationSlug": "tainan",
  "postContentType": "top5_series",
  "areas": {
    "station": {
      "name": "타이난역·중서구",
      "regionSlug": "tainan-station-west-central",
      "regionSlugAliases": [
        "타이난역",
        "타이난역·중서구"
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
          "title": "타이난역 호텔 추천 TOP5",
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
          "location": "타이난역 생활권",
          "reason": "도착 첫날과 출발일 이동을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "타이난역",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "호텔 타이난",
          "tag": "전통 역세권형",
          "location": "타이난역 앞",
          "reason": "대만철도 타이난역 접근을 우선하는 짧은 일정에 잘 맞습니다.",
          "meta": [
            "타이난역",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "카인드니스 호텔 타이난 치칸 타워",
          "tag": "구도심 친절형",
          "location": "적감루·중서구",
          "reason": "구도심 관광과 실속 있는 서비스를 함께 보고 싶은 여행자에게 좋습니다.",
          "meta": [
            "타이난역",
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
            "타이난역",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "푸워드 호텔 타이난",
          "tag": "구도심 산책형",
          "location": "공자묘·하야시 주변",
          "reason": "공자묘와 하야시백화점 산책까지 묶기 쉬운 실용형 숙소입니다.",
          "meta": [
            "타이난역",
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
        "신농제",
        "하이안로·신농제"
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
          "title": "신농제 호텔 추천 TOP5",
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
          "location": "신농제·중서구",
          "reason": "타이난다운 분위기와 디자인 감도를 함께 원하는 여행에 잘 맞습니다.",
          "meta": [
            "신농제",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "FX 호텔 타이난 민셩 로드",
          "tag": "하이안로 실속형",
          "location": "하이안로 주변",
          "reason": "먹거리와 밤 산책 동선을 가까이 두고 싶은 실속 여행자에게 좋습니다.",
          "meta": [
            "신농제",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "골든 튤립 글로리 파인 호텔",
          "tag": "구도심 안정형",
          "location": "신농제 생활권",
          "reason": "골목 분위기와 비교적 안정적인 호텔 컨디션을 함께 볼 수 있습니다.",
          "meta": [
            "신농제",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "더 플레이스 타이난",
          "tag": "디자인 도심형",
          "location": "중서구 생활권",
          "reason": "감성적인 객실 분위기와 도심 접근성을 함께 보고 싶을 때 좋습니다.",
          "meta": [
            "신농제",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "잉글우드 호텔 타이난",
          "tag": "초실속 구도심형",
          "location": "신농제·하이안로 주변",
          "reason": "숙박비를 줄이면서 구도심 산책을 남기고 싶은 일정에 비교할 만합니다.",
          "meta": [
            "신농제",
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
        "공자묘",
        "공자묘·하야시백화점"
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
        "야시장과 늦은 밤 분위기를 우선하면 하이안로·화원야시장 쪽이 더 재미있을 수 있습니다.",
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
      "compareCaution": "야시장과 늦은 밤 분위기를 우선하면 하이안로·화원야시장 쪽이 더 재미있을 수 있습니다.",
      "mismatchNote": "일정 성격이 다르다면 다른 타이난 권역도 함께 비교하세요.",
      "links": [
        {
          "title": "공자묘 호텔 추천 TOP5",
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
          "location": "공자묘·하야시 주변",
          "reason": "가족 여행에서 객실 컨디션과 구도심 접근성을 함께 잡기 좋습니다.",
          "meta": [
            "공자묘",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "레이크쇼어 호텔 타이난",
          "tag": "도심 고급형",
          "location": "중서구·공자묘 주변",
          "reason": "깔끔한 객실과 도심 산책, 식사 접근을 함께 보고 싶은 여행에 맞습니다.",
          "meta": [
            "공자묘",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "호텔 코지 시먼 타이난",
          "tag": "아이 동반형",
          "location": "시먼·하야시 생활권",
          "reason": "아이와 함께하는 여행에서 객실과 부대시설을 함께 보기 좋습니다.",
          "meta": [
            "공자묘",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "푸워드 호텔 타이난",
          "tag": "명소 도보형",
          "location": "공자묘 주변",
          "reason": "공자묘와 하야시백화점 중심 산책에 편한 위치입니다.",
          "meta": [
            "공자묘",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "아델라 호텔 타이난",
          "tag": "차분한 도심형",
          "location": "중서구 생활권",
          "reason": "번화가와 적당히 떨어진 도심 숙박을 원하는 분께 맞습니다.",
          "meta": [
            "공자묘",
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
        "안핑",
        "안핑·운하"
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
        "타이난역·국화거리 중심 먹거리 여행에는 거리가 있어 짧은 1박 일정에는 비효율적일 수 있습니다.",
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
      "compareCaution": "타이난역·국화거리 중심 먹거리 여행에는 거리가 있어 짧은 1박 일정에는 비효율적일 수 있습니다.",
      "mismatchNote": "일정 성격이 다르다면 다른 타이난 권역도 함께 비교하세요.",
      "links": [
        {
          "title": "안핑 호텔 추천 TOP5",
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
            "안핑",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "타이난 웨이얏 그랜드 호텔",
          "tag": "안핑 실용형",
          "location": "안핑 생활권",
          "reason": "안핑고성과 운하 주변을 여유롭게 보는 일정에 비교하기 좋습니다.",
          "meta": [
            "안핑",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "무브 리조트 앤 스파",
          "tag": "휴식형 후보",
          "location": "안핑 주변",
          "reason": "도심보다 조용한 숙박과 휴식 시간을 우선할 때 볼 만합니다.",
          "meta": [
            "안핑",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "프린세스 앤 엘리펀트 호텔",
          "tag": "아담한 가족형",
          "location": "안핑·중서구 사이",
          "reason": "안핑과 구도심을 함께 보려는 일정에서 위치 균형을 확인하기 좋습니다.",
          "meta": [
            "안핑",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "호텔 드 레우 타이난",
          "tag": "운하 감성형",
          "location": "안핑 운하 주변",
          "reason": "운하 산책과 차분한 숙박을 함께 원하는 커플 여행에 맞습니다.",
          "meta": [
            "안핑",
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
        "국화거리",
        "국화거리·보안로"
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
        "호텔 시설과 넓은 객실을 우선하면 공자묘·하야시 또는 안핑권 호텔이 더 맞을 수 있습니다.",
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
        "국화거리",
        "보안로"
      ],
      "compareGood": "숙박비보다 먹거리 만족도가 중요한 여행이라면 가장 먼저 확인할 만한 지역입니다.",
      "compareCaution": "호텔 시설과 넓은 객실을 우선하면 공자묘·하야시 또는 안핑권 호텔이 더 맞을 수 있습니다.",
      "mismatchNote": "일정 성격이 다르다면 다른 타이난 권역도 함께 비교하세요.",
      "links": [
        {
          "title": "국화거리 호텔 추천 TOP5",
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
          "location": "국화거리·적감루 주변",
          "reason": "구도심 먹거리와 실속 서비스를 함께 보는 여행에 좋습니다.",
          "meta": [
            "국화거리",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "FX 호텔 타이난 민셩 로드",
          "tag": "가성비 도심형",
          "location": "국화거리 생활권",
          "reason": "숙박비를 줄이면서 먹거리 동선을 남기고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "국화거리",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "유아이제이 호텔 앤 호스텔",
          "tag": "감성 실속형",
          "location": "신농제·국화거리 주변",
          "reason": "감성 숙소와 구도심 먹거리를 함께 원하는 여행에 맞습니다.",
          "meta": [
            "국화거리",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "잉글우드 호텔 타이난",
          "tag": "초실속 후보",
          "location": "구도심 생활권",
          "reason": "혼자 여행이나 짧은 일정에서 비용을 낮추고 싶을 때 볼 만합니다.",
          "meta": [
            "국화거리",
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
            "국화거리",
            "타이난",
            "숙소"
          ],
          "url": "#"
        }
      ]
    },
    "flower": {
      "name": "화원야시장·북구",
      "regionSlug": "flower-night-market-north",
      "regionSlugAliases": [
        "화원야시장",
        "화원야시장·북구"
      ],
      "label": "야시장 날짜가 맞고 밤 동선을 크게 줄이고 싶다면 비교 가치가 있는 지역입니다.",
      "summary": "화원야시장·북구는 야시장 일정과 비교적 여유 있는 호텔, 차량 이동을 함께 고려할 때 볼 만한 지역입니다.",
      "leadTitle": "화원야시장과 북구 숙소를 함께 볼 때 좋은 야시장 중심 선택지",
      "leadText": "화원야시장은 타이난의 대표 야시장 중 하나지만 매일 열리는 형태가 아닙니다. 야시장 운영일과 숙소 위치, 택시 복귀를 함께 계산하면 만족도가 높습니다.",
      "stayRange": [
        "화원야시장·북구는 야시장 일정과 비교적 여유 있는 호텔, 차량 이동을 함께 고려할 때 볼 만한 지역입니다.",
        "화원야시장은 운영 요일이 중요하므로 여행 날짜와 맞는지 먼저 확인하고 숙소를 잡으세요.",
        "주요 일정과 밤 동선을 함께 계산하세요."
      ],
      "avoidRange": [
        "구도심 명소를 도보로 매일 보려는 일정에는 중서구 숙소가 더 편할 수 있습니다.",
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
        "북구",
        "친구 여행",
        "차량 이동",
        "재방문"
      ],
      "compareGood": "야시장 날짜가 맞고 밤 동선을 크게 줄이고 싶다면 비교 가치가 있는 지역입니다.",
      "compareCaution": "구도심 명소를 도보로 매일 보려는 일정에는 중서구 숙소가 더 편할 수 있습니다.",
      "mismatchNote": "일정 성격이 다르다면 다른 타이난 권역도 함께 비교하세요.",
      "links": [
        {
          "title": "화원야시장 호텔 추천 TOP5",
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
          "location": "북구 생활권",
          "reason": "북구와 야시장 접근을 함께 보는 차량 이동 여행에 좋습니다.",
          "meta": [
            "화원야시장",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "자먼 호텔 타이난",
          "tag": "가족 실속형",
          "location": "북구·화원야시장 주변",
          "reason": "화원야시장과 넓은 객실 후보를 함께 보고 싶을 때 비교할 만합니다.",
          "meta": [
            "화원야시장",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "타이난 F 호텔",
          "tag": "야시장 실속형",
          "location": "북구 생활권",
          "reason": "화원야시장 일정과 숙박비 균형을 함께 고려할 수 있습니다.",
          "meta": [
            "화원야시장",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "호텔 리치 타이난",
          "tag": "도심 연결형",
          "location": "북구·중서구 사이",
          "reason": "북구와 구도심을 함께 움직이는 일정에서 위치를 비교하기 좋습니다.",
          "meta": [
            "화원야시장",
            "타이난",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "프리미어 호텔 타이난",
          "tag": "기본 도심형",
          "location": "타이난역 북쪽 생활권",
          "reason": "기차역 북쪽에서 실용적인 숙소를 찾을 때 볼 만합니다.",
          "meta": [
            "화원야시장",
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



    let currentQuestionIndex = 0;
    let answers = new Array(cityConfig.questions.length).fill(null);

    const locationPage = document.getElementById("locationPage");
    const surveyWrap = document.querySelector(".wt-survey-wrap");
    const surveyView = document.getElementById("surveyView");
    const resultView = document.getElementById("resultView");
    const startSurveyBtn = document.getElementById("startSurveyBtn");
    const backBtn = document.getElementById("backBtn");
    const questionCount = document.getElementById("questionCount");
    const progressText = document.getElementById("progressText");
    const progressBar = document.getElementById("progressBar");
    const progressFill = document.getElementById("progressFill");
    const questionTitle = document.getElementById("questionTitle");
    const questionHelp = document.getElementById("questionHelp");
    const optionsArea = document.getElementById("optionsArea");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const resetBtn = document.getElementById("resetBtn");

    function setText(id, text) {
      const element = document.getElementById(id);
      if (element) element.textContent = text;
    }

    function fillList(id, items) {
      const target = document.getElementById(id);
      target.innerHTML = "";
      items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        target.appendChild(li);
      });
    }

    function getAnsweredPercent() {
      const answeredCount = answers.filter((answer) => answer !== null).length;
      return Math.round((answeredCount / cityConfig.questions.length) * 100);
    }

    function getProgressMessage() {
      const total = cityConfig.questions.length;
      const step = currentQuestionIndex + 1;

      if (step === 1) return "가볍게 시작해볼까요?";
      if (step === total) return "마지막 질문이에요!";
      if (step >= total - 1) return "거의 다 왔어요";
      if (step >= Math.ceil(total * 0.65)) return "조금만 더 가면 추천 완료!";
      if (step >= Math.ceil(total * 0.4)) return "좋아요, 취향이 보이기 시작해요";
      return "일정을 하나씩 맞춰보는 중이에요";
    }

    function startSurvey() {
      locationPage?.classList.add("is-survey-started");
      locationPage?.classList.remove("is-result-mode");
      surveyWrap?.classList.add("is-survey-started");
      surveyWrap?.classList.remove("is-result-mode");
      resultView?.classList.remove("is-active");
      surveyView.style.display = "block";
      renderQuestion();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function goBack() {
      window.history.back();
    }

    function closeSurveyToStart() {
      currentQuestionIndex = 0;
      answers = new Array(cityConfig.questions.length).fill(null);
      resultView?.classList.remove("is-active");
      surveyWrap?.classList.remove("is-result-mode");
      surveyWrap?.classList.remove("is-survey-started");
      locationPage?.classList.remove("is-result-mode");
      locationPage?.classList.remove("is-survey-started");
      surveyView.style.display = "block";
      renderQuestion();
      window.scrollTo({ top: 0, behavior: "smooth" });
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

        button.type = "button";
        button.className = "wt-option";
        button.setAttribute("aria-pressed", selectedIndex === optionIndex ? "true" : "false");

        if (selectedIndex === optionIndex) {
          button.classList.add("is-selected");
        }

        title.className = "wt-option-title";
        title.textContent = option.title;

        button.appendChild(title);
        button.addEventListener("click", () => {
          answers[currentQuestionIndex] = optionIndex;
          renderQuestion();
        });

        optionsArea.appendChild(button);
      });

      prevBtn.disabled = false;
      prevBtn.textContent = currentQuestionIndex === 0 ? "닫기" : "이전";
      nextBtn.disabled = selectedIndex === null;
      nextBtn.textContent = currentQuestionIndex === cityConfig.questions.length - 1 ? "결과 보기" : "다음";
    }

    function goNext() {
      if (answers[currentQuestionIndex] === null) return;

      if (currentQuestionIndex < cityConfig.questions.length - 1) {
        currentQuestionIndex += 1;
        renderQuestion();
        questionTitle.focus?.();
      } else {
        showResult();
      }
    }

    function goPrev() {
      if (currentQuestionIndex === 0) {
        closeSurveyToStart();
        return;
      }
      currentQuestionIndex -= 1;
      renderQuestion();
    }


function getSelectedOption(questionIndex) {
  const answerIndex = answers[questionIndex];
  if (answerIndex === null || answerIndex === undefined) return null;
  return cityConfig.questions[questionIndex]?.options?.[answerIndex] || null;
}

function getSelectedOptionTitle(questionIndex) {
  return getSelectedOption(questionIndex)?.title || "";
}

function answerIs(questionIndex, title) {
  return getSelectedOptionTitle(questionIndex) === title;
}

function answerIn(questionIndex, titles) {
  return titles.includes(getSelectedOptionTitle(questionIndex));
}

function addAreaScore(scores, areaKey, amount) {
  if (Object.prototype.hasOwnProperty.call(scores, areaKey)) {
    scores[areaKey] += amount;
  }
}

function applyAccuracyAdjustments(scores) {
  const firstTrip = answerIs(0, "처음이에요");
  const foodTrip = answerIs(0, "먹거리 여행이에요");
  const familyTrip = answerIs(0, "가족과 함께 가요");
  const quietRestTrip = answerIs(0, "조용히 쉬고 싶어요");

  const trainAccess = answerIs(1, "기차역 접근");
  const downtownWalk = answerIs(1, "구도심 도보 산책");
  const anpingMove = answerIs(1, "안핑 이동");
  const nightFoodReturn = answerIs(1, "밤 먹거리 복귀");

  const guohuaFood = answerIs(2, "국화거리·보안로 먹거리");
  const shennongNight = answerIs(2, "신농제 밤 산책");
  const flowerMarket = answerIs(2, "화원야시장");
  const stayRest = answerIs(2, "숙소에서 쉬기");

  const downtownLandmarks = answerIs(3, "적감루·공자묘·하야시백화점");
  const anpingItinerary = answerIs(3, "안핑고성·안핑수옥");
  const guohuaTour = answerIs(3, "국화거리 먹거리 투어");
  const flowerMarketPlan = answerIs(3, "화원야시장");

  const easyOldTown = answerIs(4, "편한 구도심");
  const emotionalAlley = answerIs(4, "감성 골목");
  const waterfrontLeisure = answerIs(4, "물가와 여유");
  const livelyNight = answerIs(4, "활기 있는 밤");

  const budgetSave = answerIs(5, "예산 절약");
  const balanceBudget = answerIs(5, "가격·위치 균형");
  const locationFirst = answerIs(5, "위치 우선");
  const hotelConditionFirst = answerIs(5, "호텔 컨디션 우선");

  const avoidArrivalStress = answerIs(6, "도착·출발 이동 스트레스");
  const avoidNoiseCrowd = answerIs(6, "밤 소음과 혼잡");
  const avoidNoFoodNearby = answerIs(6, "주변에 먹을 곳 없음");
  const avoidLongMove = answerIs(6, "매일 긴 이동");

  // 타이난역·중서구: 첫 방문, 기차역 접근, 도착·출발 스트레스 회피가 겹치면 우선순위로 올립니다.
  if (firstTrip && (trainAccess || downtownWalk || easyOldTown || locationFirst || avoidArrivalStress)) {
    addAreaScore(scores, "station", 5);
  }
  if (trainAccess && (avoidArrivalStress || avoidLongMove || locationFirst)) {
    addAreaScore(scores, "station", 4);
  }

  // 공자묘·하야시백화점: 대표 명소, 가족 여행, 조용한 도심 숙박 조건이 모일 때 안정적으로 보정합니다.
  if ((downtownWalk || downtownLandmarks || easyOldTown) && (firstTrip || familyTrip || quietRestTrip || hotelConditionFirst)) {
    addAreaScore(scores, "confucius", 5);
  }
  if ((familyTrip || quietRestTrip) && (avoidNoiseCrowd || hotelConditionFirst || stayRest)) {
    addAreaScore(scores, "confucius", 4);
  }

  // 하이안로·신농제: 감성 골목, 밤 산책, 카페·바 분위기를 명확히 고르면 결과로 잘 올라오도록 보정합니다.
  if (shennongNight || emotionalAlley) {
    addAreaScore(scores, "shennong", 7);
  }
  if ((foodTrip || nightFoodReturn || livelyNight) && (shennongNight || emotionalAlley)) {
    addAreaScore(scores, "shennong", 4);
  }
  if ((balanceBudget || locationFirst) && (shennongNight || emotionalAlley)) {
    addAreaScore(scores, "shennong", 2);
  }

  // 안핑·운하: 안핑고성, 안핑수옥, 운하 산책, 가족·휴식 조건이 모이면 강하게 보정합니다.
  if (anpingMove || anpingItinerary || waterfrontLeisure) {
    addAreaScore(scores, "anping", 6);
  }
  if ((familyTrip || quietRestTrip || hotelConditionFirst || stayRest) && (anpingMove || anpingItinerary || waterfrontLeisure || avoidNoiseCrowd)) {
    addAreaScore(scores, "anping", 4);
  }

  // 국화거리·보안로: 먹거리 여행, 도보 맛집, 예산 절약, 주변 식당 조건이 겹치면 우선순위로 올립니다.
  if (foodTrip || guohuaFood || guohuaTour || avoidNoFoodNearby) {
    addAreaScore(scores, "guohua", 5);
  }
  if (budgetSave && (foodTrip || guohuaFood || guohuaTour || nightFoodReturn || avoidNoFoodNearby)) {
    addAreaScore(scores, "guohua", 3);
  }
  if ((nightFoodReturn || livelyNight) && !avoidNoiseCrowd) {
    addAreaScore(scores, "guohua", 2);
  }

  // 화원야시장·북구: 화원야시장을 직접 선택했거나 활기 있는 밤 동선이 뚜렷할 때만 결과로 올라오도록 보정합니다.
  if (flowerMarket || flowerMarketPlan || (livelyNight && nightFoodReturn)) {
    addAreaScore(scores, "flower", 8);
  }
  if (flowerMarket && flowerMarketPlan) {
    addAreaScore(scores, "flower", 5);
  }
  if ((foodTrip || budgetSave || avoidNoFoodNearby) && (flowerMarket || flowerMarketPlan || livelyNight)) {
    addAreaScore(scores, "flower", 4);
  }

  // 상충 조건 보정: 명확히 다른 동선을 고른 경우 과도한 추천을 줄입니다.
  if ((anpingMove || anpingItinerary) && !(trainAccess || avoidArrivalStress)) {
    addAreaScore(scores, "station", -2);
  }
  if ((trainAccess || downtownWalk || downtownLandmarks || locationFirst) && !(anpingMove || anpingItinerary || waterfrontLeisure)) {
    addAreaScore(scores, "anping", -2);
  }
  if ((quietRestTrip || hotelConditionFirst || avoidNoiseCrowd) && !(guohuaFood || guohuaTour || avoidNoFoodNearby)) {
    addAreaScore(scores, "guohua", -2);
  }
  if ((quietRestTrip || avoidNoiseCrowd) && !(shennongNight || emotionalAlley)) {
    addAreaScore(scores, "shennong", -2);
  }
  if ((avoidNoiseCrowd || quietRestTrip || stayRest || hotelConditionFirst) && !(flowerMarket || flowerMarketPlan)) {
    addAreaScore(scores, "flower", -3);
  }
  if ((trainAccess || downtownWalk || downtownLandmarks || locationFirst || avoidLongMove) && !(flowerMarket || flowerMarketPlan || livelyNight)) {
    addAreaScore(scores, "flower", -2);
  }
}
    

function getTieBreakPriority(areaKey) {
  const order = Object.keys(cityConfig.areas);
  const reverseIndex = order.length - order.indexOf(areaKey);
  return reverseIndex;
}

    function calculateScores() {
      const scores = {};
      Object.keys(cityConfig.areas).forEach((areaKey) => {
        scores[areaKey] = 0;
      });

      answers.forEach((answerIndex, questionIndex) => {
        if (answerIndex === null) return;
        const selectedOption = cityConfig.questions[questionIndex].options[answerIndex];
        Object.entries(selectedOption.scores).forEach(([areaKey, score]) => {
          scores[areaKey] += score;
        });
      });

      applyAccuracyAdjustments(scores);

      return Object.entries(scores)
        .map(([key, score]) => ({ key, score, ...cityConfig.areas[key] }))
        .sort((a, b) => (b.score - a.score) || (getTieBreakPriority(b.key) - getTieBreakPriority(a.key)));
    }



    function renderHotelCards(area) {
      const section = document.getElementById("hotelRecommendSection");
      const hotelCardList = document.getElementById("hotelCardList");
      const hotels = Array.isArray(area.hotels) ? area.hotels.slice(0, 5) : [];

      if (!section || !hotelCardList) return;

      if (hotels.length === 0) {
        section.style.display = "none";
        hotelCardList.innerHTML = "";
        return;
      }

      section.style.display = "block";
      setText("hotelSectionTitle", `${area.name}에서 먼저 비교해볼 호텔 5곳`);
      setText("hotelSectionDesc", "추천된 위치를 기준으로 먼저 비교해볼 만한 호텔입니다. 실제 예약 전에는 가격, 객실 타입, 취소 조건, 최근 후기를 같이 살펴보세요.");
      hotelCardList.innerHTML = "";

      hotels.forEach((hotel, index) => {
        const article = document.createElement("article");
        const top = document.createElement("div");
        const rank = document.createElement("span");
        const tag = document.createElement("span");
        const name = document.createElement("h4");
        const location = document.createElement("p");
        const reason = document.createElement("p");
        const meta = document.createElement("div");
        const footer = document.createElement("div");
        const linkWrap = document.createElement("div");
        const link = document.createElement("a");

        article.className = "wt-hotel-card";
        top.className = "wt-hotel-card-top";
        rank.className = "wt-hotel-rank";
        tag.className = "wt-hotel-tag";
        name.className = "wt-hotel-name";
        location.className = "wt-hotel-location";
        reason.className = "wt-hotel-reason";
        meta.className = "wt-hotel-meta";
        footer.className = "wt-hotel-card-footer";
        linkWrap.className = "wt-hotel-link-wrap";
        link.className = "wt-hotel-link";

        rank.textContent = `${index + 1}`;
        tag.textContent = hotel.tag || "추천 호텔";
        name.textContent = hotel.name;
        location.textContent = hotel.location;
        reason.textContent = hotel.reason;
        link.href = hotel.url || "#";
        link.textContent = "잔여 객실 확인";
        link.setAttribute("aria-label", `${hotel.name} 잔여 객실 확인`);

        (hotel.meta || []).forEach((item) => {
          const chip = document.createElement("span");
          chip.textContent = item;
          meta.appendChild(chip);
        });

        top.appendChild(rank);
        top.appendChild(tag);
        linkWrap.appendChild(link);
        footer.appendChild(meta);
        footer.appendChild(linkWrap);
        article.appendChild(top);
        article.appendChild(name);
        article.appendChild(location);
        article.appendChild(reason);
        article.appendChild(footer);
        hotelCardList.appendChild(article);
      });
    }

    function getRelatedPostRegionSlugs(area) {
      return [...new Set([
        area.regionSlug,
        ...(Array.isArray(area.regionSlugAliases) ? area.regionSlugAliases : [])
      ].map((item) => String(item || "").trim()).filter(Boolean))];
    }

    async function fetchRelatedPostsByRegion(area) {
      const regionSlugs = getRelatedPostRegionSlugs(area);

      for (const regionSlug of regionSlugs) {
        const params = new URLSearchParams({
          destination: cityConfig.destinationSlug,
          type: cityConfig.postContentType,
          region: regionSlug,
          limit: "5"
        });

        try {
          const response = await fetch(`/api/destination-posts?${params.toString()}`, {
            headers: { accept: "application/json" }
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
      const section = document.getElementById("relatedPostSection");
      const list = document.getElementById("relatedPostList");

      if (!section || !list) return;

      section.style.display = "none";
      list.innerHTML = "";
      setText("relatedPostTitle", `${area.name} 여행 스타일별 호텔 추천 글`);
      setText("relatedPostDesc", "현재 추천된 지역에 연결된 여행 스타일별 호텔 추천 글만 보여줍니다.");

      const posts = await fetchRelatedPostsByRegion(area);

      if (!posts.length) {
        section.style.display = "none";
        list.innerHTML = "";
        return;
      }

      section.style.display = "block";
      list.innerHTML = "";

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

    
function getLastHangulChar(text) {
  const chars = Array.from(String(text || "")).reverse();
  return chars.find((char) => /[가-힣]/.test(char)) || "";
}

function hasKoreanBatchim(text) {
  const char = getLastHangulChar(text);
  if (!char) return false;
  const code = char.charCodeAt(0) - 0xac00;
  return code >= 0 && code <= 11171 && code % 28 !== 0;
}

function withJosa(text, pair) {
  const [withBatchim, withoutBatchim] = String(pair).split("/");
  return `${text}${hasKoreanBatchim(text) ? withBatchim : withoutBatchim}`;
}

function getResultFocusSentence(area) {
  if (!area) return "";
  const chips = Array.isArray(area.chips) ? area.chips.slice(0, 3) : [];
  if (!chips.length) return "";
  return `${withJosa(area.name, "은/는")} ${chips.join(" · ")} 흐름을 우선하는 여행자에게 잘 맞습니다.`;
}

function getSelectedAnswerSignals() {
      return answers
        .map((_, questionIndex) => getSelectedOptionTitle(questionIndex))
        .filter(Boolean)
        .filter((item, index, arr) => arr.indexOf(item) === index)
        .slice(0, 5);
    }

        function getSignalSentence() {
      return "";
    }

        function getScoreFitSentence(rankedAreas) {
      const top = rankedAreas?.[0];
      const second = rankedAreas?.[1];
      if (!top || !second) return "";

      const gap = top.score - second.score;
      if (gap <= 2) {
        return `${withJosa(top.name, "은/는")} 가장 잘 맞는 선택이지만 ${second.name}도 거의 비슷합니다. 두 지역의 호텔 가격, 객실 크기, 실제 이동 시간을 같이 비교하면 선택이 더 쉬워집니다.`;
      }
      if (gap <= 5) {
        return `${withJosa(top.name, "이/가")} 조금 더 유리합니다. 다만 일정의 중심이 ${second.name} 쪽에 더 가깝다면 ${second.name}도 충분히 좋은 대안입니다.`;
      }
      return `${withJosa(top.name, "은/는")} 이번 일정에서 우선순위가 분명한 지역입니다. 먼저 이 지역 안에서 호텔을 추린 뒤 가격, 객실 크기, 최근 후기를 비교해보세요.`;
    }

        function getAlternativeSentence(area, rankedAreas) {
      const second = rankedAreas?.[1];
      if (!second) return "";

      const gap = rankedAreas[0].score - second.score;
      if (gap <= 2) {
        return `${second.name}도 거의 비슷한 선택입니다. ${second.compareGood || second.summary}`;
      }
      return `대안으로는 ${withJosa(second.name, "이/가")} 있습니다. ${second.compareGood || second.summary}`;
    }

    function normalizeResultReasons(area, reasons) {
      const next = Array.isArray(reasons) ? [...reasons] : [];
      if (next.length < 4) {
        const cautionText = [area.compareCaution, area.mismatchNote]
          .filter(Boolean)
          .join(" ") || "추천 지역도 일정 성격에 따라 장단점이 달라집니다. 호텔 예약 전 이동 시간, 주변 분위기, 최근 후기를 함께 확인해두면 좋습니다.";
        next.push({ title: "주의할 점도 함께 보세요", text: cautionText });
      }
      return next.slice(0, 4);
    }

    function getPersuasiveContent(area, rankedAreas) {
      const contents = {};

      const content = contents[area.key] || {
        intro: area.summary,
        reasons: [
          { title: "여행 목적과 맞는 위치입니다", text: area.compareGood || area.summary },
          { title: "이동 기준을 단순하게 만들 수 있습니다", text: area.leadText || "숙소 위치를 먼저 정하면 하루 일정이 훨씬 단순해집니다." },
          { title: "호텔 비교 기준이 명확해집니다", text: "지역을 먼저 정하면 가격, 객실, 후기 비교가 훨씬 쉬워집니다." }
        ],
        conclusionTitle: `${area.name}을 중심으로 호텔을 비교해보세요.`,
        conclusionText: "추천 지역 안에서 역 접근성, 주변 분위기, 최근 후기를 같이 확인하면 실패 확률을 줄일 수 있습니다."
      };

          const fitText = getScoreFitSentence(rankedAreas);
      const alternativeText = getAlternativeSentence(area, rankedAreas);

      return {
        ...content,
        reasons: normalizeResultReasons(area, content.reasons),
        intro: [content.intro, fitText].filter(Boolean).join(" "),
        conclusionText: [content.conclusionText, alternativeText].filter(Boolean).join(" ")
      };
    }

    function getMatchedAnswers(areaKey) {
      return answers
        .map((answerIndex, questionIndex) => {
          if (answerIndex === null) return null;
          const question = cityConfig.questions[questionIndex];
          const option = question.options[answerIndex];
          const score = option.scores?.[areaKey] || 0;
          if (score <= 0) return null;
          return { title: option.title, score };
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
    }

    function renderPersuasiveResult(topArea, rankedAreas) {
      const content = getPersuasiveContent(topArea, rankedAreas);
      const reasonCardList = document.getElementById("reasonCardList");

      setText("resultWhyText", content.intro);
      setText("decisionConclusionTitle", content.conclusionTitle);
      setText("decisionConclusionText", content.conclusionText);


      if (reasonCardList) {
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
    }

    function showResult() {
      const rankedAreas = calculateScores();
      const topArea = rankedAreas[0];

      locationPage?.classList.add("is-survey-started");
      locationPage?.classList.add("is-result-mode");
      surveyView.style.display = "none";
      resultView.classList.add("is-active");
      surveyWrap.classList.add("is-survey-started");
      surveyWrap.classList.add("is-result-mode");

      setText("resultTitle", topArea.name);
      setText("resultSummary", topArea.summary);
      setText("resultLeadTitle", topArea.leadTitle);
      setText("resultLeadText", topArea.leadText);

      renderPersuasiveResult(topArea, rankedAreas);
      renderHotelCards(topArea);
      renderRelatedPosts(topArea);


      progressText.textContent = "추천 결과가 나왔어요!";
      progressFill.style.width = "100%";
      progressBar.setAttribute("aria-valuenow", "100");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function resetSurvey() {
      currentQuestionIndex = 0;
      answers = new Array(cityConfig.questions.length).fill(null);
      resultView.classList.remove("is-active");
      surveyWrap.classList.remove("is-result-mode");
      surveyWrap.classList.remove("is-survey-started");
      locationPage?.classList.remove("is-result-mode");
      locationPage?.classList.remove("is-survey-started");
      surveyView.style.display = "block";
      renderQuestion();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    startSurveyBtn?.addEventListener("click", startSurvey);
    backBtn?.addEventListener("click", goBack);
    nextBtn.addEventListener("click", goNext);
    prevBtn.addEventListener("click", goPrev);
    resetBtn.addEventListener("click", resetSurvey);

    renderQuestion();
