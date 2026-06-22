/*
 * Tainan hotel location survey logic.
 * This file is intentionally city-specific.
 */
const cityConfig = {
  "cityName": "타이난",
  "destinationSlug": "tainan",
  "postContentType": "top5_series",
  "areas": {
    "station": {
      "name": "타이난역·중서구",
      "regionSlug": "tainan-station-west-central",
      "regionSlugAliases": [
        "tainan-station",
        "west-central",
        "chihkan",
        "hayashi",
        "타이난역",
        "중서구",
        "츠칸러우",
        "하야시백화점"
      ],
      "label": "타이난역과 중서구 구시가지를 이어 첫 여행 동선을 가장 단순하게 잡는 기본 권역",
      "summary": "타이난역·중서구는 타이난역, 츠칸러우, 하야시백화점, 제2미술관, 국화가 먹거리 동선을 함께 보기 좋은 기본 숙소 권역입니다. 타이난이 처음이거나 2박 3일처럼 일정이 짧다면 이동 실수를 줄이기 좋습니다.",
      "leadTitle": "처음 가는 타이난에서 맛집과 고적, 이동 편의를 모두 무난하게 잡고 싶다면 가장 안전한 출발점입니다.",
      "leadText": "타이난역과 고속철도 타이난역은 다른 위치입니다. 시내 관광 중심이라면 타이난역·중서구, HSR 이동 중심이라면 런더·치메이·구이런 방향을 따로 보세요.",
      "stayRange": [
        "첫 방문, 짧은 일정, 기차 이동, 구시가지 산책, 로컬 맛집 탐방에 어울립니다.",
        "타이난역과 고속철도 타이난역은 다른 위치입니다. 시내 관광 중심이라면 타이난역·중서구, HSR 이동 중심이라면 런더·치메이·구이런 방향을 따로 보세요.",
        "숙소 주변 식사와 택시 승하차 동선을 함께 확인하세요."
      ],
      "avoidRange": [
        "역 주변은 실용적이지만 오래된 상권과 신축 숙소가 섞여 있습니다. 객실 사진, 엘리베이터, 방음, 밤 분위기 후기를 함께 확인하세요.",
        "타이난역과 HSR 타이난역을 혼동하는 선택",
        "밤 일정과 아침 출발지를 따로 계산하지 않는 선택"
      ],
      "bestFor": [
        "첫 방문",
        "짧은 일정",
        "기차 이동",
        "구시가지 산책"
      ],
      "notFor": [
        "매일 반대편 권역 이동",
        "소음에 매우 민감한 여행",
        "이른 HSR 이동만 중요한 일정"
      ],
      "bookingTips": [
        "타이난역과 고속철도 타이난역은 다른 위치입니다. 시내 관광 중심이라면 타이난역·중서구, HSR 이동 중심이라면 런더·치메이·구이런 방향을 따로 보세요.",
        "역 주변은 실용적이지만 오래된 상권과 신축 숙소가 섞여 있습니다. 객실 사진, 엘리베이터, 방음, 밤 분위기 후기를 함께 확인하세요.",
        "최근 객실 사진과 방음·청결 후기를 함께 확인하세요."
      ],
      "chips": [
        "타이난역",
        "타이난역",
        "숙소 위치",
        "타이난 여행"
      ],
      "compareGood": "처음 가는 타이난에서 맛집과 고적, 이동 편의를 모두 무난하게 잡고 싶다면 가장 안전한 출발점입니다.",
      "compareCaution": "역 주변은 실용적이지만 오래된 상권과 신축 숙소가 섞여 있습니다. 객실 사진, 엘리베이터, 방음, 밤 분위기 후기를 함께 확인하세요.",
      "mismatchNote": "이번 답변에서 다른 일정 요소를 더 강하게 골랐다면 다른 지역도 함께 비교해보세요.",
      "links": [
        {
          "title": "타이난 타이난역 호텔 추천 TOP5",
          "url": "/post/tainan-station-hotels"
        },
        {
          "title": "타이난 첫 여행 호텔 추천 TOP5",
          "url": "/post/tainan-first-trip-hotels"
        },
        {
          "title": "타이난 가족 여행 호텔 추천 TOP5",
          "url": "/post/tainan-family-hotels"
        },
        {
          "title": "타이난 가성비 호텔 추천 TOP5",
          "url": "/post/tainan-value-hotels"
        }
      ],
      "hotels": [
        {
          "name": "실크스 플레이스 타이난",
          "tag": "중서구 상급형",
          "location": "중서구·하야시백화점 생활권",
          "reason": "구시가지 산책과 호텔 컨디션을 함께 보고 싶은 첫 여행에 잘 맞습니다.",
          "meta": [
            "타이난역",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "레이크쇼어 호텔 타이난",
          "tag": "도심 균형형",
          "location": "중서구·미술관 생활권",
          "reason": "객실 컨디션과 구시가지 접근을 함께 비교하기 좋은 도심형 후보입니다.",
          "meta": [
            "타이난역",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "유아이제이 호텔 앤 호스텔",
          "tag": "감성 실속형",
          "location": "중서구 골목권",
          "reason": "젊은 감성, 카페, 골목 산책을 함께 즐기고 싶은 여행자에게 어울립니다.",
          "meta": [
            "타이난역",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "FX 호텔 타이난 민셩 로드",
          "tag": "실속 중심형",
          "location": "하이안로·중서구",
          "reason": "가격과 위치 균형을 먼저 보는 여행에서 비교하기 좋은 후보입니다.",
          "meta": [
            "타이난역",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "푸신 호텔 타이난",
          "tag": "역 접근 실속형",
          "location": "타이난역·북구 경계",
          "reason": "타이난역과 구시가지 접근을 함께 보려는 짧은 일정에 맞습니다.",
          "meta": [
            "타이난역",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        }
      ]
    },
    "haian": {
      "name": "하이안로·선농지에",
      "regionSlug": "haian-shennong",
      "regionSlugAliases": [
        "haian-road",
        "shennong-street",
        "guohua-street",
        "하이안로",
        "선농지에",
        "국화가"
      ],
      "label": "선농지에와 하이안로 골목, 늦은 저녁 먹거리 동선을 숙소 주변에서 즐기는 감성 권역",
      "summary": "하이안로·선농지에는 타이난의 밤 산책, 카페, 골목 음식, 술집 동선을 숙소 주변에 두기 좋은 권역입니다. 낮에는 중서구 고적을 보고 저녁에는 걸어서 분위기를 즐기고 싶은 여행자에게 잘 맞습니다.",
      "leadTitle": "타이난다운 골목 분위기와 저녁 시간을 숙소 주변에서 즐기고 싶다면 만족도가 높은 선택입니다.",
      "leadText": "선농지에 바로 안쪽은 골목 폭이 좁고 주말에는 사람이 많습니다. 택시 승하차가 쉬운 큰길 접근성을 같이 보세요.",
      "stayRange": [
        "커플 여행, 친구 여행, 밤 산책, 카페·바, 국화가·선농지에 먹거리 중심 일정에 어울립니다.",
        "선농지에 바로 안쪽은 골목 폭이 좁고 주말에는 사람이 많습니다. 택시 승하차가 쉬운 큰길 접근성을 같이 보세요.",
        "숙소 주변 식사와 택시 승하차 동선을 함께 확인하세요."
      ],
      "avoidRange": [
        "조용한 숙면을 최우선으로 보거나 부모님 동반이라면 너무 중심 골목보다는 한 블록 떨어진 숙소가 낫습니다.",
        "타이난역과 HSR 타이난역을 혼동하는 선택",
        "밤 일정과 아침 출발지를 따로 계산하지 않는 선택"
      ],
      "bestFor": [
        "커플 여행",
        "친구 여행",
        "밤 산책",
        "카페·바"
      ],
      "notFor": [
        "매일 반대편 권역 이동",
        "소음에 매우 민감한 여행",
        "이른 HSR 이동만 중요한 일정"
      ],
      "bookingTips": [
        "선농지에 바로 안쪽은 골목 폭이 좁고 주말에는 사람이 많습니다. 택시 승하차가 쉬운 큰길 접근성을 같이 보세요.",
        "조용한 숙면을 최우선으로 보거나 부모님 동반이라면 너무 중심 골목보다는 한 블록 떨어진 숙소가 낫습니다.",
        "최근 객실 사진과 방음·청결 후기를 함께 확인하세요."
      ],
      "chips": [
        "하이안로",
        "하이안로",
        "숙소 위치",
        "타이난 여행"
      ],
      "compareGood": "타이난다운 골목 분위기와 저녁 시간을 숙소 주변에서 즐기고 싶다면 만족도가 높은 선택입니다.",
      "compareCaution": "조용한 숙면을 최우선으로 보거나 부모님 동반이라면 너무 중심 골목보다는 한 블록 떨어진 숙소가 낫습니다.",
      "mismatchNote": "이번 답변에서 다른 일정 요소를 더 강하게 골랐다면 다른 지역도 함께 비교해보세요.",
      "links": [
        {
          "title": "타이난 하이안로 호텔 추천 TOP5",
          "url": "/post/tainan-haian-hotels"
        },
        {
          "title": "타이난 첫 여행 호텔 추천 TOP5",
          "url": "/post/tainan-first-trip-hotels"
        },
        {
          "title": "타이난 가족 여행 호텔 추천 TOP5",
          "url": "/post/tainan-family-hotels"
        },
        {
          "title": "타이난 가성비 호텔 추천 TOP5",
          "url": "/post/tainan-value-hotels"
        }
      ],
      "hotels": [
        {
          "name": "더 레트로 타이판",
          "tag": "감성 골목형",
          "location": "하이안로·중서구",
          "reason": "골목 산책과 감성 숙박을 함께 보고 싶은 여행자에게 맞습니다.",
          "meta": [
            "하이안로",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "유아이제이 호텔 앤 호스텔",
          "tag": "카페 감성형",
          "location": "중서구 골목권",
          "reason": "선농지에와 하이안로 밤 산책을 즐기기 좋은 감성형 후보입니다.",
          "meta": [
            "하이안로",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "FX 호텔 타이난 민셩 로드",
          "tag": "가성비 위치형",
          "location": "민셩로·하이안로 접근권",
          "reason": "가격과 하이안로 접근을 함께 비교하기 좋습니다.",
          "meta": [
            "하이안로",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "루츠 츄 호텔",
          "tag": "골목 실속형",
          "location": "중서구 생활권",
          "reason": "타이난 골목 분위기와 실용적인 숙박을 함께 보려는 일정에 어울립니다.",
          "meta": [
            "하이안로",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "카인드니스 데이 호텔",
          "tag": "저녁 동선형",
          "location": "하이안로 접근권",
          "reason": "저녁 식사와 숙소 복귀 동선을 단순하게 만들기 좋은 후보입니다.",
          "meta": [
            "하이안로",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        }
      ]
    },
    "anping": {
      "name": "안핑",
      "regionSlug": "anping",
      "regionSlugAliases": [
        "anping",
        "anping-old-fort",
        "anping-tree-house",
        "안핑",
        "안핑고보",
        "안핑수옥"
      ],
      "label": "안핑고보와 안핑수옥, 안핑라오제를 여유 있게 즐기는 역사·해안형 권역",
      "summary": "안핑은 안핑고보, 안핑수옥, 안핑라오제, 항구·운하 산책을 중심으로 타이난의 역사와 해안 분위기를 느끼기 좋은 지역입니다. 구시가지보다 조금 더 여유로운 숙박을 원하는 여행자에게 어울립니다.",
      "leadTitle": "타이난의 역사와 해안 분위기를 천천히 즐기고 싶다면 안핑은 별도 숙박 후보로 볼 만합니다.",
      "leadText": "중서구 주요 맛집과 매일 오가야 한다면 택시 이동 시간이 생깁니다. 안핑을 하루 이상 충분히 볼 계획인지 먼저 확인하세요.",
      "stayRange": [
        "재방문, 가족 여행, 역사 산책, 안핑라오제, 해안 일몰, 여유 일정에 어울립니다.",
        "중서구 주요 맛집과 매일 오가야 한다면 택시 이동 시간이 생깁니다. 안핑을 하루 이상 충분히 볼 계획인지 먼저 확인하세요.",
        "숙소 주변 식사와 택시 승하차 동선을 함께 확인하세요."
      ],
      "avoidRange": [
        "첫 타이난 1박 2일에서 주요 고적과 맛집을 빠르게 보려면 중서구가 더 단순할 수 있습니다.",
        "타이난역과 HSR 타이난역을 혼동하는 선택",
        "밤 일정과 아침 출발지를 따로 계산하지 않는 선택"
      ],
      "bestFor": [
        "재방문",
        "가족 여행",
        "역사 산책",
        "안핑라오제"
      ],
      "notFor": [
        "매일 반대편 권역 이동",
        "소음에 매우 민감한 여행",
        "이른 HSR 이동만 중요한 일정"
      ],
      "bookingTips": [
        "중서구 주요 맛집과 매일 오가야 한다면 택시 이동 시간이 생깁니다. 안핑을 하루 이상 충분히 볼 계획인지 먼저 확인하세요.",
        "첫 타이난 1박 2일에서 주요 고적과 맛집을 빠르게 보려면 중서구가 더 단순할 수 있습니다.",
        "최근 객실 사진과 방음·청결 후기를 함께 확인하세요."
      ],
      "chips": [
        "안핑",
        "안핑",
        "숙소 위치",
        "타이난 여행"
      ],
      "compareGood": "타이난의 역사와 해안 분위기를 천천히 즐기고 싶다면 안핑은 별도 숙박 후보로 볼 만합니다.",
      "compareCaution": "첫 타이난 1박 2일에서 주요 고적과 맛집을 빠르게 보려면 중서구가 더 단순할 수 있습니다.",
      "mismatchNote": "이번 답변에서 다른 일정 요소를 더 강하게 골랐다면 다른 지역도 함께 비교해보세요.",
      "links": [
        {
          "title": "타이난 안핑 호텔 추천 TOP5",
          "url": "/post/tainan-anping-hotels"
        },
        {
          "title": "타이난 첫 여행 호텔 추천 TOP5",
          "url": "/post/tainan-first-trip-hotels"
        },
        {
          "title": "타이난 가족 여행 호텔 추천 TOP5",
          "url": "/post/tainan-family-hotels"
        },
        {
          "title": "타이난 가성비 호텔 추천 TOP5",
          "url": "/post/tainan-value-hotels"
        }
      ],
      "hotels": [
        {
          "name": "크라운 플라자 타이난",
          "tag": "안핑 상급형",
          "location": "안핑·운하권",
          "reason": "안핑 해안 분위기와 호텔 컨디션을 함께 중시하는 여행에 맞습니다.",
          "meta": [
            "안핑",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "포모사 요트 리조트",
          "tag": "리조트형 후보",
          "location": "안핑 운하 주변",
          "reason": "도심 관광보다 휴식감과 안핑 분위기를 우선할 때 비교하기 좋습니다.",
          "meta": [
            "안핑",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "무브 리조트 앤 스파",
          "tag": "휴식형 후보",
          "location": "안핑 생활권",
          "reason": "조용한 휴식과 안핑 산책을 함께 보고 싶은 일정에 어울립니다.",
          "meta": [
            "안핑",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "타이펑 스위트",
          "tag": "가족 균형형",
          "location": "안핑·시정부 접근권",
          "reason": "가족 여행에서 객실 공간과 차량 이동을 함께 고려하기 좋습니다.",
          "meta": [
            "안핑",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "호텔 드 로",
          "tag": "감성 부티크형",
          "location": "안핑·중서구 사이",
          "reason": "안핑과 중서구를 모두 조금씩 보고 싶은 커플 여행에 어울립니다.",
          "meta": [
            "안핑",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        }
      ]
    },
    "confucius": {
      "name": "공자묘·미술관",
      "regionSlug": "confucius-temple-art-museum",
      "regionSlugAliases": [
        "confucius-temple",
        "art-museum",
        "hayashi",
        "공자묘",
        "미술관",
        "하야시백화점"
      ],
      "label": "공자묘와 미술관, 하야시백화점, 조용한 카페 동선을 함께 잡는 문화 산책 권역",
      "summary": "공자묘·미술관 권역은 타이난 제2미술관, 하야시백화점, 공자묘, 골목 카페를 차분하게 묶기 좋은 지역입니다. 번화가 바로 안쪽보다 조금 더 정돈된 분위기를 원할 때 잘 맞습니다.",
      "leadTitle": "타이난의 고적과 감성 카페를 차분하게 즐기고 싶다면 중서구 안에서도 가장 균형 잡힌 후보입니다.",
      "leadText": "같은 중서구라도 하이안로 중심과 공자묘 주변은 밤 분위기가 다릅니다. 밤 산책을 길게 할지, 조용한 숙박을 우선할지 정하세요.",
      "stayRange": [
        "커플 여행, 부모님 동반, 미술관, 카페, 조용한 도심 산책, 감성 숙박에 어울립니다.",
        "같은 중서구라도 하이안로 중심과 공자묘 주변은 밤 분위기가 다릅니다. 밤 산책을 길게 할지, 조용한 숙박을 우선할지 정하세요.",
        "숙소 주변 식사와 택시 승하차 동선을 함께 확인하세요."
      ],
      "avoidRange": [
        "야시장이나 안핑을 매일 늦게 다녀오려면 택시 동선이 필요합니다. 숙소 주변 저녁 식사 선택지도 확인하세요.",
        "타이난역과 HSR 타이난역을 혼동하는 선택",
        "밤 일정과 아침 출발지를 따로 계산하지 않는 선택"
      ],
      "bestFor": [
        "커플 여행",
        "부모님 동반",
        "미술관",
        "카페"
      ],
      "notFor": [
        "매일 반대편 권역 이동",
        "소음에 매우 민감한 여행",
        "이른 HSR 이동만 중요한 일정"
      ],
      "bookingTips": [
        "같은 중서구라도 하이안로 중심과 공자묘 주변은 밤 분위기가 다릅니다. 밤 산책을 길게 할지, 조용한 숙박을 우선할지 정하세요.",
        "야시장이나 안핑을 매일 늦게 다녀오려면 택시 동선이 필요합니다. 숙소 주변 저녁 식사 선택지도 확인하세요.",
        "최근 객실 사진과 방음·청결 후기를 함께 확인하세요."
      ],
      "chips": [
        "공자묘",
        "공자묘",
        "숙소 위치",
        "타이난 여행"
      ],
      "compareGood": "타이난의 고적과 감성 카페를 차분하게 즐기고 싶다면 중서구 안에서도 가장 균형 잡힌 후보입니다.",
      "compareCaution": "야시장이나 안핑을 매일 늦게 다녀오려면 택시 동선이 필요합니다. 숙소 주변 저녁 식사 선택지도 확인하세요.",
      "mismatchNote": "이번 답변에서 다른 일정 요소를 더 강하게 골랐다면 다른 지역도 함께 비교해보세요.",
      "links": [
        {
          "title": "타이난 공자묘 호텔 추천 TOP5",
          "url": "/post/tainan-confucius-hotels"
        },
        {
          "title": "타이난 첫 여행 호텔 추천 TOP5",
          "url": "/post/tainan-first-trip-hotels"
        },
        {
          "title": "타이난 가족 여행 호텔 추천 TOP5",
          "url": "/post/tainan-family-hotels"
        },
        {
          "title": "타이난 가성비 호텔 추천 TOP5",
          "url": "/post/tainan-value-hotels"
        }
      ],
      "hotels": [
        {
          "name": "실크스 플레이스 타이난",
          "tag": "문화 산책 상급형",
          "location": "공자묘·하야시백화점 접근권",
          "reason": "부모님 동반이나 커플 여행에서 위치와 컨디션을 함께 보기 좋습니다.",
          "meta": [
            "공자묘",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "레이크쇼어 호텔 타이난",
          "tag": "미술관 균형형",
          "location": "제2미술관 생활권",
          "reason": "미술관과 구시가지 산책을 함께 고려하는 일정에 맞습니다.",
          "meta": [
            "공자묘",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "더 플레이스 타이난",
          "tag": "디자인형 후보",
          "location": "동구·문화권 접근",
          "reason": "도심 감성과 호텔 분위기를 함께 보고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "공자묘",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "호텔 코지 시먼 타이난",
          "tag": "가족 도심형",
          "location": "시먼·중서구",
          "reason": "아이 동반이나 쇼핑몰 접근을 고려하는 가족 여행에 어울립니다.",
          "meta": [
            "공자묘",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "창유 호텔",
          "tag": "조용한 실속형",
          "location": "중서구 동쪽",
          "reason": "조용한 도심 숙박과 문화 산책을 함께 보기 좋은 후보입니다.",
          "meta": [
            "공자묘",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        }
      ]
    },
    "east": {
      "name": "동구·난팡쇼핑센터",
      "regionSlug": "east-district-nanfang",
      "regionSlugAliases": [
        "east-district",
        "nanfang",
        "cheng-kung-university",
        "동구",
        "난팡쇼핑센터",
        "성공대"
      ],
      "label": "타이난역 동쪽과 난팡쇼핑센터, 대학가 분위기를 함께 보는 생활 편의형 권역",
      "summary": "동구·난팡쇼핑센터는 타이난역 동쪽, 성공대 주변, 쇼핑몰·식사 동선을 함께 보기 좋은 지역입니다. 관광지 한복판보다 생활 편의, 가족 식사, 차량 이동을 중시할 때 후보가 됩니다.",
      "leadTitle": "숙소 주변의 편의성과 가족 식사, 안정적인 도심 분위기를 우선한다면 동구가 좋은 대안입니다.",
      "leadText": "중서구 고적과 맛집을 매일 도보로 돌기에는 거리가 있습니다. 택시나 버스 이동을 자연스럽게 받아들일 수 있는 일정인지 보세요.",
      "stayRange": [
        "가족 여행, 부모님 동반, 쇼핑몰, 차량 이동, 조용한 도심 숙박, 비 오는 날 일정에 어울립니다.",
        "중서구 고적과 맛집을 매일 도보로 돌기에는 거리가 있습니다. 택시나 버스 이동을 자연스럽게 받아들일 수 있는 일정인지 보세요.",
        "숙소 주변 식사와 택시 승하차 동선을 함께 확인하세요."
      ],
      "avoidRange": [
        "타이난다운 골목 분위기를 숙소 앞에서 기대한다면 중서구나 하이안로 쪽이 더 맞을 수 있습니다.",
        "타이난역과 HSR 타이난역을 혼동하는 선택",
        "밤 일정과 아침 출발지를 따로 계산하지 않는 선택"
      ],
      "bestFor": [
        "가족 여행",
        "부모님 동반",
        "쇼핑몰",
        "차량 이동"
      ],
      "notFor": [
        "매일 반대편 권역 이동",
        "소음에 매우 민감한 여행",
        "이른 HSR 이동만 중요한 일정"
      ],
      "bookingTips": [
        "중서구 고적과 맛집을 매일 도보로 돌기에는 거리가 있습니다. 택시나 버스 이동을 자연스럽게 받아들일 수 있는 일정인지 보세요.",
        "타이난다운 골목 분위기를 숙소 앞에서 기대한다면 중서구나 하이안로 쪽이 더 맞을 수 있습니다.",
        "최근 객실 사진과 방음·청결 후기를 함께 확인하세요."
      ],
      "chips": [
        "동구",
        "동구",
        "숙소 위치",
        "타이난 여행"
      ],
      "compareGood": "숙소 주변의 편의성과 가족 식사, 안정적인 도심 분위기를 우선한다면 동구가 좋은 대안입니다.",
      "compareCaution": "타이난다운 골목 분위기를 숙소 앞에서 기대한다면 중서구나 하이안로 쪽이 더 맞을 수 있습니다.",
      "mismatchNote": "이번 답변에서 다른 일정 요소를 더 강하게 골랐다면 다른 지역도 함께 비교해보세요.",
      "links": [
        {
          "title": "타이난 동구 호텔 추천 TOP5",
          "url": "/post/tainan-east-hotels"
        },
        {
          "title": "타이난 첫 여행 호텔 추천 TOP5",
          "url": "/post/tainan-first-trip-hotels"
        },
        {
          "title": "타이난 가족 여행 호텔 추천 TOP5",
          "url": "/post/tainan-family-hotels"
        },
        {
          "title": "타이난 가성비 호텔 추천 TOP5",
          "url": "/post/tainan-value-hotels"
        }
      ],
      "hotels": [
        {
          "name": "샹그릴라 파 이스턴 타이난",
          "tag": "역 동쪽 상급형",
          "location": "타이난역·성공대 생활권",
          "reason": "부모님 동반이나 가족 여행에서 객실 컨디션과 역 접근을 함께 보기 좋습니다.",
          "meta": [
            "동구",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "더 플레이스 타이난",
          "tag": "쇼핑몰 디자인형",
          "location": "난팡쇼핑센터 생활권",
          "reason": "비 오는 날과 가족 식사, 쇼핑 동선을 함께 잡기 좋습니다.",
          "meta": [
            "동구",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "에버그린 플라자 호텔 타이난",
          "tag": "가족 안정형",
          "location": "동구·문화센터권",
          "reason": "가족 여행에서 안정적인 객실과 차량 이동을 고려하기 좋습니다.",
          "meta": [
            "동구",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "호텔 타이난",
          "tag": "역 접근 실속형",
          "location": "타이난역 동쪽",
          "reason": "기차역 접근과 기본 숙박 편의를 함께 보려는 일정에 맞습니다.",
          "meta": [
            "동구",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "젠다 스위트",
          "tag": "대학가 실속형",
          "location": "성공대 주변",
          "reason": "성공대 주변 생활권과 조용한 도심 숙박을 함께 비교하기 좋습니다.",
          "meta": [
            "동구",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        }
      ]
    },
    "rende": {
      "name": "런더·치메이",
      "regionSlug": "rende-chimei",
      "regionSlugAliases": [
        "rende",
        "chimei",
        "ten-drum",
        "guiren",
        "hsr-tainan",
        "런더",
        "치메이",
        "십고문화촌",
        "고속철도"
      ],
      "label": "치메이박물관과 십고문화촌, 고속철도 이동을 함께 고려하는 남동쪽 실용 권역",
      "summary": "런더·치메이는 치메이박물관, 십고문화촌, 바오안역, HSR 타이난역·구이런 방향 이동을 고려할 때 의미가 있는 권역입니다. 타이난 도심 관광보다는 가족형 근교 일정이나 이동 편의를 우선할 때 후보가 됩니다.",
      "leadTitle": "도심보다 치메이·십고·HSR 이동이 더 중요하다면 실용적인 선택이 될 수 있습니다.",
      "leadText": "시내 맛집과 고적을 주로 볼 계획이라면 매번 이동이 생깁니다. HSR과 근교 일정 비중이 큰 경우에만 우선순위를 올리세요.",
      "stayRange": [
        "치메이박물관, 십고문화촌, 아이 동반, HSR 이동, 렌터카·택시 중심 일정에 어울립니다.",
        "시내 맛집과 고적을 주로 볼 계획이라면 매번 이동이 생깁니다. HSR과 근교 일정 비중이 큰 경우에만 우선순위를 올리세요.",
        "숙소 주변 식사와 택시 승하차 동선을 함께 확인하세요."
      ],
      "avoidRange": [
        "첫 타이난 여행 전체 숙소로는 외곽 체감이 있을 수 있습니다. 첫날·마지막 날 또는 가족형 근교 일정용으로 보는 편이 자연스럽습니다.",
        "타이난역과 HSR 타이난역을 혼동하는 선택",
        "밤 일정과 아침 출발지를 따로 계산하지 않는 선택"
      ],
      "bestFor": [
        "치메이박물관",
        "십고문화촌",
        "아이 동반",
        "HSR 이동"
      ],
      "notFor": [
        "매일 반대편 권역 이동",
        "소음에 매우 민감한 여행",
        "이른 HSR 이동만 중요한 일정"
      ],
      "bookingTips": [
        "시내 맛집과 고적을 주로 볼 계획이라면 매번 이동이 생깁니다. HSR과 근교 일정 비중이 큰 경우에만 우선순위를 올리세요.",
        "첫 타이난 여행 전체 숙소로는 외곽 체감이 있을 수 있습니다. 첫날·마지막 날 또는 가족형 근교 일정용으로 보는 편이 자연스럽습니다.",
        "최근 객실 사진과 방음·청결 후기를 함께 확인하세요."
      ],
      "chips": [
        "런더",
        "런더",
        "숙소 위치",
        "타이난 여행"
      ],
      "compareGood": "도심보다 치메이·십고·HSR 이동이 더 중요하다면 실용적인 선택이 될 수 있습니다.",
      "compareCaution": "첫 타이난 여행 전체 숙소로는 외곽 체감이 있을 수 있습니다. 첫날·마지막 날 또는 가족형 근교 일정용으로 보는 편이 자연스럽습니다.",
      "mismatchNote": "이번 답변에서 다른 일정 요소를 더 강하게 골랐다면 다른 지역도 함께 비교해보세요.",
      "links": [
        {
          "title": "타이난 런더 호텔 추천 TOP5",
          "url": "/post/tainan-rende-hotels"
        },
        {
          "title": "타이난 첫 여행 호텔 추천 TOP5",
          "url": "/post/tainan-first-trip-hotels"
        },
        {
          "title": "타이난 가족 여행 호텔 추천 TOP5",
          "url": "/post/tainan-family-hotels"
        },
        {
          "title": "타이난 가성비 호텔 추천 TOP5",
          "url": "/post/tainan-value-hotels"
        }
      ],
      "hotels": [
        {
          "name": "저스트 슬립 타이난 후산",
          "tag": "치메이 접근형",
          "location": "런더·십고문화촌 주변",
          "reason": "치메이박물관과 십고문화촌, 가족 일정을 함께 보기 좋은 후보입니다.",
          "meta": [
            "런더",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "H 빌라 인",
          "tag": "차량 이동형",
          "location": "런더·남부 도로망",
          "reason": "렌터카나 택시 중심 일정에서 객실 공간을 고려하기 좋습니다.",
          "meta": [
            "런더",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "드라이어드 모텔",
          "tag": "외곽 실속형",
          "location": "런더 생활권",
          "reason": "차량 이동 중심의 실속 숙박 후보로 비교할 수 있습니다.",
          "meta": [
            "런더",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "퀴나 플라자 호텔 타이난",
          "tag": "외곽 가족형",
          "location": "용캉·북동부 접근권",
          "reason": "도심보다 차량 이동과 객실 컨디션을 우선할 때 볼 수 있습니다.",
          "meta": [
            "런더",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        },
        {
          "name": "킹 앤 프린세스 모텔",
          "tag": "차량 숙박형",
          "location": "남동부 접근권",
          "reason": "HSR·치메이 동선을 차량으로 움직이는 일정에서 후보가 됩니다.",
          "meta": [
            "런더",
            "타이난",
            "호텔 위치"
          ],
          "url": "/post/tainan-hotel"
        }
      ]
    }
  },
  "questions": [
    {
      "title": "이번 타이난 여행은 어떤 느낌에 가까운가요?",
      "help": "숙소 위치를 고를 때 가장 먼저 반영할 여행 성격입니다.",
      "options": [
        {
          "title": "처음이에요",
          "scores": {
            "station": 8,
            "confucius": 5,
            "haian": 3
          }
        },
        {
          "title": "두 번째 이상",
          "scores": {
            "haian": 5,
            "anping": 5,
            "confucius": 4
          }
        },
        {
          "title": "가족과 함께",
          "scores": {
            "east": 7,
            "confucius": 6,
            "rende": 5
          }
        },
        {
          "title": "커플·친구 여행",
          "scores": {
            "haian": 7,
            "confucius": 5,
            "anping": 3
          }
        }
      ]
    },
    {
      "title": "가장 기대하는 타이난 일정은 무엇인가요?",
      "help": "낮과 밤에 가장 시간을 쓰고 싶은 동선을 골라주세요.",
      "options": [
        {
          "title": "구시가지 고적·맛집",
          "scores": {
            "station": 8,
            "confucius": 6,
            "haian": 4
          }
        },
        {
          "title": "하이안로·선농지에 밤 산책",
          "scores": {
            "haian": 8,
            "confucius": 4,
            "station": 3
          }
        },
        {
          "title": "안핑 역사·해안 산책",
          "scores": {
            "anping": 8,
            "station": 3
          }
        },
        {
          "title": "치메이·십고·HSR 이동",
          "scores": {
            "rende": 8,
            "east": 4
          }
        }
      ]
    },
    {
      "title": "근교나 외곽 일정은 어느 정도 있나요?",
      "help": "안핑, 치메이, 쓰차오, HSR 이동 비중을 확인합니다.",
      "options": [
        {
          "title": "안핑을 길게 볼 예정",
          "scores": {
            "anping": 7,
            "haian": 3
          }
        },
        {
          "title": "치메이·십고문화촌",
          "scores": {
            "rende": 7,
            "east": 4
          }
        },
        {
          "title": "시내 중심",
          "scores": {
            "station": 6,
            "confucius": 5,
            "haian": 4
          }
        },
        {
          "title": "아직 미정",
          "scores": {
            "station": 5,
            "confucius": 4,
            "east": 3
          }
        }
      ]
    },
    {
      "title": "숙소 주변 분위기는 어떤 쪽이 좋나요?",
      "help": "밤에 돌아왔을 때 편하게 느낄 분위기를 골라주세요.",
      "options": [
        {
          "title": "활기 있는 골목",
          "scores": {
            "haian": 8,
            "station": 3
          }
        },
        {
          "title": "차분한 문화 도심",
          "scores": {
            "confucius": 7,
            "station": 4
          }
        },
        {
          "title": "여유 있는 해안·외곽",
          "scores": {
            "anping": 6,
            "rende": 4
          }
        },
        {
          "title": "생활 편의 우선",
          "scores": {
            "east": 7,
            "station": 4
          }
        }
      ]
    },
    {
      "title": "누구와 함께 가나요?",
      "help": "동반자에 따라 소음, 객실 크기, 식사 동선의 우선순위가 달라집니다.",
      "options": [
        {
          "title": "혼자 또는 친구",
          "scores": {
            "haian": 6,
            "station": 5,
            "confucius": 3
          }
        },
        {
          "title": "커플",
          "scores": {
            "confucius": 6,
            "haian": 5,
            "anping": 3
          }
        },
        {
          "title": "부모님 동반",
          "scores": {
            "confucius": 6,
            "east": 6,
            "station": 4
          }
        },
        {
          "title": "아이와 함께",
          "scores": {
            "east": 7,
            "rende": 6,
            "anping": 4
          }
        }
      ]
    },
    {
      "title": "호텔 예산에서 가장 중요한 기준은 무엇인가요?",
      "help": "숙박비만이 아니라 이동비와 시간까지 함께 생각해보세요.",
      "options": [
        {
          "title": "예산 절약",
          "scores": {
            "station": 5,
            "haian": 4,
            "east": 3
          }
        },
        {
          "title": "가격·위치 균형",
          "scores": {
            "station": 5,
            "confucius": 5,
            "haian": 4
          }
        },
        {
          "title": "위치 우선",
          "scores": {
            "station": 6,
            "haian": 5,
            "confucius": 4
          }
        },
        {
          "title": "호텔 분위기 우선",
          "scores": {
            "confucius": 6,
            "anping": 5,
            "east": 4
          }
        }
      ]
    },
    {
      "title": "가장 피하고 싶은 불편은 무엇인가요?",
      "help": "마지막으로 후회하기 쉬운 요소를 골라주세요.",
      "options": [
        {
          "title": "고속철도 이동 스트레스",
          "scores": {
            "rende": 7,
            "east": 4
          }
        },
        {
          "title": "밤 소음과 혼잡",
          "scores": {
            "confucius": 6,
            "anping": 5,
            "east": 5
          }
        },
        {
          "title": "숙소 주변 할 것 없음",
          "scores": {
            "haian": 6,
            "station": 5,
            "confucius": 4
          }
        },
        {
          "title": "매일 긴 이동",
          "scores": {
            "station": 6,
            "confucius": 5,
            "east": 4
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
      return "동선을 하나씩 맞춰보는 중이에요";
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
  const repeatTrip = answerIs(0, "두 번째 이상");
  const familyTrip = answerIs(0, "가족과 함께");
  const coupleFriendsTrip = answerIs(0, "커플·친구 여행");

  const oldTownFood = answerIs(1, "구시가지 고적·맛집");
  const haianNight = answerIs(1, "하이안로·선농지에 밤 산책");
  const anpingWalk = answerIs(1, "안핑 역사·해안 산책");
  const chimeiHsr = answerIs(1, "치메이·십고·HSR 이동");

  const anpingLong = answerIs(2, "안핑을 길게 볼 예정");
  const chimeiTrip = answerIs(2, "치메이·십고문화촌");
  const cityOnly = answerIs(2, "시내 중심");
  const undecided = answerIs(2, "아직 미정");

  const livelyAlley = answerIs(3, "활기 있는 골목");
  const calmCulture = answerIs(3, "차분한 문화 도심");
  const quietCoast = answerIs(3, "여유 있는 해안·외곽");
  const convenience = answerIs(3, "생활 편의 우선");

  const soloFriends = answerIs(4, "혼자 또는 친구");
  const couple = answerIs(4, "커플");
  const parents = answerIs(4, "부모님 동반");
  const kids = answerIs(4, "아이와 함께");

  const budgetSave = answerIs(5, "예산 절약");
  const balanceBudget = answerIs(5, "가격·위치 균형");
  const locationFirst = answerIs(5, "위치 우선");
  const hotelMoodFirst = answerIs(5, "호텔 분위기 우선");

  const avoidHsrStress = answerIs(6, "고속철도 이동 스트레스");
  const avoidNoiseCrowd = answerIs(6, "밤 소음과 혼잡");
  const avoidNothingNearby = answerIs(6, "숙소 주변 할 것 없음");
  const avoidLongMove = answerIs(6, "매일 긴 이동");

  if (firstTrip && (oldTownFood || cityOnly || undecided || locationFirst || avoidLongMove)) addAreaScore(scores, "station", 6);
  if ((parents || kids || familyTrip) && oldTownFood && !avoidNoiseCrowd) addAreaScore(scores, "station", 2);

  if ((haianNight || livelyAlley || avoidNothingNearby) && (soloFriends || coupleFriendsTrip || couple)) addAreaScore(scores, "haian", 6);
  if (avoidNoiseCrowd) addAreaScore(scores, "haian", -4);
  if (familyTrip && haianNight) addAreaScore(scores, "haian", -1);

  if ((anpingWalk || anpingLong || quietCoast) && !avoidLongMove) addAreaScore(scores, "anping", 6);
  if ((parents || kids || repeatTrip) && anpingWalk) addAreaScore(scores, "anping", 3);
  if (firstTrip && cityOnly) addAreaScore(scores, "anping", -2);

  if ((calmCulture || hotelMoodFirst || balanceBudget) && !haianNight) addAreaScore(scores, "confucius", 5);
  if ((parents || couple || repeatTrip) && calmCulture) addAreaScore(scores, "confucius", 3);
  if (avoidNoiseCrowd) addAreaScore(scores, "confucius", 3);

  if ((convenience || parents || kids || familyTrip) && !haianNight) addAreaScore(scores, "east", 5);
  if (chimeiTrip && (kids || parents)) addAreaScore(scores, "east", 3);
  if (budgetSave && cityOnly) addAreaScore(scores, "east", 1);

  if (chimeiHsr || chimeiTrip || avoidHsrStress) addAreaScore(scores, "rende", 7);
  if (kids && chimeiTrip) addAreaScore(scores, "rende", 4);
  if ((cityOnly || haianNight || oldTownFood) && !chimeiTrip && !avoidHsrStress) addAreaScore(scores, "rende", -3);
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
      setText("hotelSectionDesc", "추천된 위치를 기준으로 먼저 비교해볼 만한 호텔 후보입니다. 실제 예약 전에는 가격, 객실 타입, 취소 조건, 최근 후기를 같이 확인하세요.");
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
        tag.textContent = hotel.tag || "추천 후보";
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
        return `${withJosa(top.name, "은/는")} 가장 잘 맞는 후보지만 ${second.name}도 거의 비슷합니다. 두 지역의 호텔 가격, 객실 크기, 실제 이동 시간을 같이 비교하면 선택이 더 쉬워집니다.`;
      }
      if (gap <= 5) {
        return `${withJosa(top.name, "이/가")} 조금 더 유리합니다. 다만 일정의 중심이 ${second.name} 쪽에 더 가깝다면 ${second.name}도 충분히 좋은 대안입니다.`;
      }
      return `${withJosa(top.name, "은/는")} 이번 일정에서 우선순위가 분명한 지역입니다. 먼저 이 권역 안에서 호텔을 추린 뒤 가격, 객실 크기, 최근 후기를 비교해보세요.`;
    }

        function getAlternativeSentence(area, rankedAreas) {
      const second = rankedAreas?.[1];
      if (!second) return "";

      const gap = rankedAreas[0].score - second.score;
      if (gap <= 2) {
        return `${second.name}도 거의 같은 후보입니다. ${second.compareGood || second.summary}`;
      }
      return `대안으로는 ${withJosa(second.name, "이/가")} 있습니다. ${second.compareGood || second.summary}`;
    }

    function normalizeResultReasons(area, reasons) {
      const next = Array.isArray(reasons) ? [...reasons] : [];
      if (next.length < 4) {
        const cautionText = [area.compareCaution, area.mismatchNote]
          .filter(Boolean)
          .join(" ") || "추천 지역도 일정 성격에 따라 장단점이 달라집니다. 호텔 예약 전 이동 시간, 주변 분위기, 최근 후기를 함께 확인하세요.";
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
          { title: "이동 기준을 단순하게 만들 수 있습니다", text: area.leadText || "숙소 위치를 먼저 정하면 하루 동선이 훨씬 단순해집니다." },
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
  