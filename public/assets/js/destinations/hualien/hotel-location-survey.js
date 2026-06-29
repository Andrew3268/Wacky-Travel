/* 화렌 hotel location survey logic. Modernized with the Fukuoka V23 survey UI flow. */
const cityConfig = {
  "cityName": "화렌",
  "destinationSlug": "hualien",
  "postContentType": "top5_series",
  "areas": {
    "station": {
      "name": "화렌역·시내중심",
      "slug": "hualien-station",
      "summary": "기차로 도착해 짐을 맡기고 투어를 준비하는 동선이 단순하게 이어지는 중심에서 화렌 여행의 시작을 차분하게 정리하고 싶은 당신에게 잘 맞는 실용적인 위치입니다.",
      "lead": "화렌은 대만 서부 도시처럼 지하철로 움직이는 도시가 아닙니다. 기차역 주변에 머물면 도착 첫날과 출발일 동선이 편하고, 동대문 야시장·구시가지·치싱탄·타이루거 방향으로 이동할 때 출발점을 잡기 쉽습니다.",
      "decision": "화렌이 처음이고 기차로 들어온다면 가장 안정적인 기본 선택지입니다.",
      "chips": [
        "첫 여행",
        "기차역",
        "짐 보관",
        "투어 출발",
        "짧은 일정"
      ],
      "regionSlug": "hualien-station",
      "label": "화렌이 처음이고 기차로 들어온다면 가장 안정적인 기본 선택지입니다.",
      "leadTitle": "기차 도착과 시내 이동을 가장 단순하게 묶는 기본 선택지",
      "leadText": "화렌은 대만 서부 도시처럼 지하철로 움직이는 도시가 아닙니다. 기차역 주변에 머물면 도착 첫날과 출발일 동선이 편하고, 동대문 야시장·구시가지·치싱탄·타이루거 방향으로 이동할 때 출발점을 잡기 쉽습니다.",
      "bestFor": [
        "첫 화렌 여행",
        "짧은 일정",
        "기차 이동",
        "짐이 많은 여행",
        "타이루거 투어 출발"
      ],
      "bookingTips": [
        "역 바로 앞이라는 표현만 보지 말고 실제 출구, 택시 승하차 위치, 동대문 야시장까지의 이동 시간을 함께 확인하세요.",
        "저녁 식사와 이동 방식을 함께 확인하세요.",
        "숙소 주변의 소음과 택시 승하차 편의를 함께 보세요."
      ],
      "compareGood": "화렌이 처음이고 기차로 들어온다면 가장 안정적인 기본 선택지입니다.",
      "compareCaution": "밤 먹거리와 산책을 숙소 주변에서 바로 즐기고 싶다면 동대문 야시장·구시가지 쪽이 더 편할 수 있습니다.",
      "mismatchNote": "일정 성격이 다르다면 다른 화렌 지역도 함께 비교해보세요.",
      "links": [
        {
          "title": "화렌역·시내중심 호텔 추천 TOP5",
          "url": "/post/hualien-station-hotels"
        },
        {
          "title": "화렌 숙소 위치 가이드",
          "url": "/destinations/hualien/hotel-guide/"
        }
      ],
      "hotels": [
        {
          "name": "카인드니스 호텔 화렌",
          "englishName": "Kindness Hotel Hualien",
          "tag": "역 접근 실용형",
          "location": "화렌역 생활권",
          "reason": "기차 도착 후 체크인과 시내 이동을 단순하게 묶고 싶은 첫 여행자에게 잘 맞습니다.",
          "meta": [
            "화렌역·시내중심",
            "화렌",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "메씨 호텔",
          "englishName": "Meci Hotel",
          "tag": "감성 실속형",
          "location": "화렌역 주변",
          "reason": "역 주변에서 숙박비와 분위기, 기본 편의성을 함께 보고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "화렌역·시내중심",
            "화렌",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "클래식 시티 리조트",
          "englishName": "Classic City Resort",
          "tag": "안정형 시티호텔",
          "location": "화렌역 도보권",
          "reason": "기차역 접근성과 객실 안정감을 함께 챙기고 싶은 일정에 어울립니다.",
          "meta": [
            "화렌역·시내중심",
            "화렌",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "호텔데이+ 화렌",
          "englishName": "Hotelday+ Hualien",
          "tag": "깔끔한 역세권형",
          "location": "화렌역 생활권",
          "reason": "화렌역을 기준으로 투어와 시내 이동을 계획하는 여행자가 보기 좋습니다.",
          "meta": [
            "화렌역·시내중심",
            "화렌",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "라마다 앙코르 바이 윈덤 화렌",
          "englishName": "Ramada Encore by Wyndham Hualien",
          "tag": "브랜드 안정형",
          "location": "화렌 시내권",
          "reason": "객실 컨디션과 이동 편의를 함께 보고 싶은 가족·커플 일정에 무난합니다.",
          "meta": [
            "화렌역·시내중심",
            "화렌",
            "숙소"
          ],
          "url": "#"
        }
      ]
    },
    "dongdamen": {
      "name": "동대문 야시장·구시가지",
      "slug": "dongdamen-old-town",
      "summary": "저녁이 되면 야시장과 구시가지 골목, 로컬 음식과 작은 상점이 자연스럽게 이어지는 거리에서 화렌의 따뜻한 밤 분위기를 느끼고 싶은 당신에게 잘 어울리는 지역입니다.",
      "lead": "낮에는 치싱탄이나 타이루거처럼 외곽 자연 명소를 다녀오고, 저녁에는 동대문 야시장과 구시가지에서 식사와 산책을 이어가기 좋습니다. 화렌역 바로 앞보다 여행지 분위기가 있고, 완전 외곽보다 식사 선택지가 많아 커플·친구 여행과 재방문 일정에 잘 맞습니다.",
      "decision": "밤 먹거리와 시내 산책, 로컬 분위기를 함께 보고 싶다면 가장 균형 좋은 시내권입니다.",
      "chips": [
        "야시장",
        "구시가지",
        "먹거리",
        "카페",
        "뚜벅이"
      ],
      "regionSlug": "dongdamen-old-town",
      "label": "밤 먹거리와 시내 산책, 로컬 분위기를 함께 보고 싶다면 가장 균형 좋은 시내권입니다.",
      "leadTitle": "야시장과 구시가지를 함께 묶어 화렌의 저녁 시간을 편하게 쓰는 지역",
      "leadText": "낮에는 치싱탄이나 타이루거처럼 외곽 자연 명소를 다녀오고, 저녁에는 동대문 야시장과 구시가지에서 식사와 산책을 이어가기 좋습니다. 화렌역 바로 앞보다 여행지 분위기가 있고, 완전 외곽보다 식사 선택지가 많아 커플·친구 여행과 재방문 일정에 잘 맞습니다.",
      "bestFor": [
        "먹거리 여행",
        "야시장",
        "구시가지 산책",
        "카페",
        "커플·친구 여행"
      ],
      "bookingTips": [
        "야시장과 너무 가까운 숙소는 밤 소음이 있을 수 있습니다. 큰길 접근성과 객실 방음 후기를 함께 보세요.",
        "화렌역에서 숙소까지 이동 방식과 체크인 시간, 밤 복귀 동선을 같이 확인하세요.",
        "중산로, 동대문 야시장, 문화창의산업원구 사이의 실제 도보 시간을 지도에서 확인하면 선택이 쉬워집니다."
      ],
      "compareGood": "저녁 식사, 야시장, 카페, 구시가지 산책을 숙소 주변에서 해결하기 좋습니다.",
      "compareCaution": "기차 도착 직후 짐 이동과 투어 픽업 편의만 보면 화렌역·시내중심이 더 단순할 수 있습니다.",
      "mismatchNote": "시내 분위기보다 조용한 호텔 휴식이나 바다 풍경이 중요하다면 메이룬·항구나 치싱탄·신청도 함께 비교하세요.",
      "links": [
        {
          "title": "동대문 야시장·구시가지 호텔 추천 TOP5",
          "url": "/post/dongdamen-old-town-hotels"
        },
        {
          "title": "화렌 숙소 위치 가이드",
          "url": "/destinations/hualien/hotel-guide/"
        }
      ],
      "hotels": [
        {
          "name": "아르스마 호텔",
          "englishName": "Arsma Hotel",
          "tag": "야시장 접근형",
          "location": "동대문 야시장 생활권",
          "reason": "밤 먹거리와 시내 산책을 숙소 가까이 두고 싶은 일정에 좋습니다.",
          "meta": [
            "동대문 야시장·구시가지",
            "화렌",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "애저 호텔",
          "englishName": "Azure Hotel",
          "tag": "시내 균형형",
          "location": "중산로·시내 생활권",
          "reason": "중심 상권과 주요 식당 접근성을 함께 챙기기 좋은 선택지입니다.",
          "meta": [
            "동대문 야시장·구시가지",
            "화렌",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "저스트 슬립 화렌 중정",
          "englishName": "Just Sleep Hualien Zhongzheng",
          "tag": "구시가지 균형형",
          "location": "구시가지·중정로 주변",
          "reason": "구시가지 산책과 객실 안정감을 함께 보고 싶은 여행에 어울립니다.",
          "meta": [
            "동대문 야시장·구시가지",
            "화렌",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "파인더스 호텔 화렌 다퉁",
          "englishName": "Finders Hotel Hualien Da-Tong",
          "tag": "감성 실속형",
          "location": "문화창의산업원구 주변",
          "reason": "카페와 골목 산책을 중심에 둔 짧은 일정에 잘 맞습니다.",
          "meta": [
            "동대문 야시장·구시가지",
            "화렌",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "풀 카인드 호텔",
          "englishName": "Full Kind Hotel",
          "tag": "도심 편의형",
          "location": "동대문 야시장·구시가지",
          "reason": "저녁 식사와 편의시설을 가까이 두고 싶은 여행자에게 어울립니다.",
          "meta": [
            "동대문 야시장·구시가지",
            "화렌",
            "숙소"
          ],
          "url": "#"
        }
      ]
    },
    "meilun": {
      "name": "메이룬·항구",
      "slug": "meilun-harbor",
      "summary": "시내 중심의 분주함에서 조금 벗어나 항구 바람과 넓은 객실, 차분한 주변 분위기 속에서 가족과 함께 여유롭게 쉬고 싶은 당신에게 잘 맞는 조용한 지역입니다.",
      "lead": "가족 여행이나 부모님 동반처럼 숙소 컨디션, 조식, 택시 이동, 조용한 주변 환경을 중요하게 본다면 메이룬 지역이 편할 수 있습니다. 도심과 완전히 떨어진 외곽은 아니지만 밤 먹거리 중심지와는 거리가 있어 이동 방식을 함께 봐야 합니다.",
      "decision": "조용함과 호텔 컨디션을 우선하면 가족 여행 만족도가 높습니다.",
      "chips": [
        "가족",
        "조용함",
        "호텔 휴식",
        "항구",
        "택시 이동"
      ],
      "regionSlug": "meilun-harbor",
      "label": "조용함과 호텔 컨디션을 우선하면 가족 여행 만족도가 높습니다.",
      "leadTitle": "조용한 분위기와 호텔 체류 만족도를 함께 보기 좋은 북쪽 시내권",
      "leadText": "가족 여행이나 부모님 동반처럼 숙소 컨디션, 조식, 택시 이동, 조용한 주변 환경을 중요하게 본다면 메이룬 지역이 편할 수 있습니다. 도심과 완전히 떨어진 외곽은 아니지만 밤 먹거리 중심지와는 거리가 있어 이동 방식을 함께 봐야 합니다.",
      "bestFor": [
        "가족 여행",
        "부모님 동반",
        "조용한 숙소",
        "호텔 휴식",
        "택시 이동"
      ],
      "bookingTips": [
        "야시장·구시가지 식당까지는 택시나 버스 이동을 고려해야 합니다. 밤 복귀 방식을 미리 정해두세요.",
        "저녁 식사와 이동 방식을 함께 확인하세요.",
        "숙소 주변의 소음과 택시 승하차 편의를 함께 보세요."
      ],
      "compareGood": "조용함과 호텔 컨디션을 우선하면 가족 여행 만족도가 높습니다.",
      "compareCaution": "뚜벅이로 매일 야시장과 구시가지를 오가면 동선이 번거롭게 느껴질 수 있습니다.",
      "mismatchNote": "일정 성격이 다르다면 다른 화렌 지역도 함께 비교해보세요.",
      "links": [
        {
          "title": "메이룬·항구 호텔 추천 TOP5",
          "url": "/post/meilun-harbor-hotels"
        },
        {
          "title": "화렌 숙소 위치 가이드",
          "url": "/destinations/hualien/hotel-guide/"
        }
      ],
      "hotels": [
        {
          "name": "레이크쇼어 호텔 화렌",
          "englishName": "Lakeshore Hotel Hualien",
          "tag": "가족 안정형",
          "location": "메이룬 생활권",
          "reason": "차분한 주변 분위기와 객실 컨디션을 함께 보고 싶은 가족 여행에 좋습니다.",
          "meta": [
            "메이룬·항구",
            "화렌",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "샤토 드 신 호텔 화렌",
          "englishName": "Chateau de Chine Hotel Hualien",
          "tag": "가족형 호텔",
          "location": "메이룬·항구권",
          "reason": "부모님 동반이나 아이와 함께하는 일정에서 호텔 편의성을 보기 좋습니다.",
          "meta": [
            "메이룬·항구",
            "화렌",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "풀론 호텔 화렌",
          "englishName": "Fullon Hotel Hualien",
          "tag": "항구 휴식형",
          "location": "화렌항 주변",
          "reason": "항구 분위기와 호텔 체류를 함께 즐기고 싶은 일정에 어울립니다.",
          "meta": [
            "메이룬·항구",
            "화렌",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "파크뷰 호텔 화렌",
          "englishName": "Parkview Hotel Hualien",
          "tag": "리조트형 휴식",
          "location": "메이룬산 주변",
          "reason": "조용한 휴식과 넓은 시설을 원하는 가족·커플 여행에 비교하기 좋습니다.",
          "meta": [
            "메이룬·항구",
            "화렌",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "카다 호텔",
          "englishName": "Kadda Hotel",
          "tag": "감성 항구형",
          "location": "메이룬·항구 생활권",
          "reason": "차분한 분위기와 감성적인 객실을 함께 보고 싶은 여행자에게 맞습니다.",
          "meta": [
            "메이룬·항구",
            "화렌",
            "숙소"
          ],
          "url": "#"
        }
      ]
    },
    "qixingtan": {
      "name": "치싱탄·신청",
      "slug": "qixingtan-xincheng",
      "summary": "자갈 해변과 넓은 태평양, 자전거길과 타이루거 북쪽 동선이 이어지는 풍경 속에서 바다와 자연을 가까이 두고 머물고 싶은 당신에게 잘 어울리는 해안 지역입니다.",
      "lead": "화렌 시내의 편의성보다 바다와 조용한 풍경이 더 중요하다면 치싱탄 쪽을 비교해볼 만합니다. 다만 밤 식사 선택지와 대중교통은 시내보다 제한적이므로 렌터카·택시·투어 이용 여부를 함께 봐야 합니다.",
      "decision": "바다와 조용한 풍경이 여행의 핵심이라면 1박 또는 여유 일정에 좋습니다.",
      "chips": [
        "바다",
        "조용함",
        "사진",
        "자전거",
        "자연"
      ],
      "regionSlug": "qixingtan-xincheng",
      "label": "바다와 조용한 풍경이 여행의 핵심이라면 1박 또는 여유 일정에 좋습니다.",
      "leadTitle": "바다와 자연 풍경을 여행의 중심에 두는 휴식형 지역",
      "leadText": "화렌 시내의 편의성보다 바다와 조용한 풍경이 더 중요하다면 치싱탄 쪽을 비교해볼 만합니다. 다만 밤 식사 선택지와 대중교통은 시내보다 제한적이므로 렌터카·택시·투어 이용 여부를 함께 봐야 합니다.",
      "bestFor": [
        "바다 휴식",
        "조용한 숙소",
        "사진 여행",
        "자전거",
        "타이루거 접근"
      ],
      "bookingTips": [
        "식당과 편의시설이 시내보다 적습니다. 늦은 체크인이나 저녁 식사 계획을 따로 확인하세요.",
        "저녁 식사와 이동 방식을 함께 확인하세요.",
        "숙소 주변의 소음과 택시 승하차 편의를 함께 보세요."
      ],
      "compareGood": "바다와 조용한 풍경이 여행의 핵심이라면 1박 또는 여유 일정에 좋습니다.",
      "compareCaution": "첫 화렌 여행에서 전체 숙박을 이 지역에만 잡으면 시내 먹거리와 기차 이동이 번거로울 수 있습니다.",
      "mismatchNote": "일정 성격이 다르다면 다른 화렌 지역도 함께 비교해보세요.",
      "links": [
        {
          "title": "치싱탄·신청 호텔 추천 TOP5",
          "url": "/post/qixingtan-xincheng-hotels"
        },
        {
          "title": "화렌 숙소 위치 가이드",
          "url": "/destinations/hualien/hotel-guide/"
        }
      ],
      "hotels": [
        {
          "name": "호텔 베이뷰",
          "englishName": "Hotel Bayview",
          "tag": "바다 전망형",
          "location": "치싱탄 해변 주변",
          "reason": "치싱탄 바다를 가까이 두고 조용히 쉬고 싶은 일정에 잘 맞습니다.",
          "meta": [
            "치싱탄·신청",
            "화렌",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "스타라이즈 레저 호텔",
          "englishName": "Starrise Leisure Hotel",
          "tag": "해변 휴식형",
          "location": "치싱탄 생활권",
          "reason": "해변 산책과 여유로운 숙박을 함께 원하는 여행자에게 좋습니다.",
          "meta": [
            "치싱탄·신청",
            "화렌",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "치싱탄 하이완 B&B",
          "englishName": "Qixingtan Hai Wan B&B",
          "tag": "소규모 감성형",
          "location": "치싱탄 주변",
          "reason": "조용한 숙소와 바다 분위기를 가까이 두고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "치싱탄·신청",
            "화렌",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "리아 백패커 유스 호스텔",
          "englishName": "Lia Backpacker Youth Hostel",
          "tag": "실속 자연형",
          "location": "신청·치싱탄 생활권",
          "reason": "가볍게 머물며 자연 명소를 중심으로 움직이는 일정에 어울립니다.",
          "meta": [
            "치싱탄·신청",
            "화렌",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "타로코 리코 호텔",
          "englishName": "Taroko Liiko Hotels",
          "tag": "신청 거점형",
          "location": "신청역 주변",
          "reason": "신청역과 타이루거·치싱탄 접근을 함께 보고 싶은 일정에 맞습니다.",
          "meta": [
            "치싱탄·신청",
            "화렌",
            "숙소"
          ],
          "url": "#"
        }
      ]
    },
    "taroko": {
      "name": "타이루거·톈샹",
      "slug": "taroko-tianxiang",
      "summary": "협곡과 산악 풍경을 가까이 두고 하루를 길게 보내며, 타이루거 여행에 더 깊게 집중하고 싶은 당신에게 잘 맞는 특별한 위치입니다.",
      "lead": "타이루거 일정이 여행의 핵심이라면 시내 숙소만 고집하지 않아도 됩니다. 다만 타이루거는 도로·탐방로 상황이 변동될 수 있으므로 숙소 예약 전 이동 가능 구간과 운영 여부를 확인해야 합니다.",
      "decision": "타이루거가 여행의 주목적이라면 특별하지만, 일반 시내 여행과는 다른 선택입니다.",
      "chips": [
        "타이루거",
        "자연",
        "1박 분리",
        "투어",
        "여유 일정"
      ],
      "regionSlug": "taroko-tianxiang",
      "label": "타이루거가 여행의 주목적이라면 특별하지만, 일반 시내 여행과는 다른 선택입니다.",
      "leadTitle": "타이루거 일정에 하루를 길게 쓰는 여행자를 위한 자연 거점",
      "leadText": "타이루거 일정이 여행의 핵심이라면 시내 숙소만 고집하지 않아도 됩니다. 다만 타이루거는 도로·탐방로 상황이 변동될 수 있으므로 숙소 예약 전 이동 가능 구간과 운영 여부를 확인해야 합니다.",
      "bestFor": [
        "타이루거 중심 여행",
        "자연 풍경",
        "1박 분리",
        "렌터카·투어",
        "여유 일정"
      ],
      "bookingTips": [
        "식사·교통·운영 상황이 시내보다 제한적입니다. 숙소 자체 식사와 이동 수단, 탐방 가능 구간을 함께 확인하세요.",
        "저녁 식사와 이동 방식을 함께 확인하세요.",
        "숙소 주변의 소음과 택시 승하차 편의를 함께 보세요."
      ],
      "compareGood": "타이루거가 여행의 주목적이라면 특별하지만, 일반 시내 여행과는 다른 선택입니다.",
      "compareCaution": "야시장·구시가지 관광까지 함께 즐기는 첫 여행이라면 화렌역이나 동대문 야시장 쪽이 더 편합니다.",
      "mismatchNote": "일정 성격이 다르다면 다른 화렌 지역도 함께 비교해보세요.",
      "links": [
        {
          "title": "타이루거·톈샹 호텔 추천 TOP5",
          "url": "/post/taroko-tianxiang-hotels"
        },
        {
          "title": "화렌 숙소 위치 가이드",
          "url": "/destinations/hualien/hotel-guide/"
        }
      ],
      "hotels": [
        {
          "name": "실크스 플레이스 타로코",
          "englishName": "Silks Place Taroko",
          "tag": "협곡 리조트형",
          "location": "톈샹 주변",
          "reason": "타이루거 안에서 숙소 체류와 자연 풍경을 함께 즐기고 싶은 일정에 어울립니다.",
          "meta": [
            "타이루거·톈샹",
            "화렌",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "타로코 빌리지 호텔",
          "englishName": "Taroko Village Hotel",
          "tag": "자연 체험형",
          "location": "타이루거 지역",
          "reason": "자연과 원주민 문화 분위기를 함께 보고 싶은 여행에 비교하기 좋습니다.",
          "meta": [
            "타이루거·톈샹",
            "화렌",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "리우 호텔 타로코",
          "englishName": "Liwu Hotel Taroko",
          "tag": "실속 거점형",
          "location": "타이루거 입구권",
          "reason": "타이루거 입구와 이동 편의를 함께 보고 싶은 일정에 맞습니다.",
          "meta": [
            "타이루거·톈샹",
            "화렌",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "타이루거 톈샹 유스 액티비티 센터",
          "englishName": "Taroko Tienhsiang Youth Activity Center",
          "tag": "산악 거점형",
          "location": "톈샹 지역",
          "reason": "협곡 안쪽에 머물며 자연 일정을 크게 잡고 싶은 여행자에게 어울립니다.",
          "meta": [
            "타이루거·톈샹",
            "화렌",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "화렌 타로코 마운틴 드림 B&B",
          "englishName": "Hualien Taroko Mountain Dream B&B",
          "tag": "소규모 자연형",
          "location": "타이루거 주변",
          "reason": "조용한 자연 숙소를 선호하는 커플·소규모 여행에 비교하기 좋습니다.",
          "meta": [
            "타이루거·톈샹",
            "화렌",
            "숙소"
          ],
          "url": "#"
        }
      ]
    }
  },
  "questions": [
    {
      "title": "화렌에 도착하는 방식은 무엇에 가깝나요?",
      "help": "첫날 짐을 들고 움직이는 방식이 숙소 위치에 큰 영향을 줍니다.",
      "options": [
        {
          "title": "기차로 도착해서 바로 체크인하고 싶어요",
          "scores": {
            "station": 6,
            "dongdamen": 2
          }
        },
        {
          "title": "저녁에 바로 야시장과 식당을 보고 싶어요",
          "scores": {
            "station": 1,
            "dongdamen": 6
          }
        },
        {
          "title": "치싱탄이나 신청 쪽 자연 일정이 중요해요",
          "scores": {
            "station": 1,
            "qixingtan": 6,
            "taroko": 2
          }
        },
        {
          "title": "타이루거 일정이 여행의 핵심이에요",
          "scores": {
            "station": 2,
            "qixingtan": 3,
            "taroko": 6
          }
        }
      ]
    },
    {
      "title": "이번 화렌 여행에서 가장 중요한 장면은 무엇인가요?",
      "help": "여행의 중심 장면을 고르면 추천 지역이 더 정확해집니다.",
      "options": [
        {
          "title": "기차역에서 이동이 쉬운 첫 여행",
          "scores": {
            "station": 5,
            "dongdamen": 2
          }
        },
        {
          "title": "동대문 야시장과 시내 먹거리",
          "scores": {
            "dongdamen": 6
          }
        },
        {
          "title": "조용한 호텔과 가족 휴식",
          "scores": {
            "station": 2,
            "meilun": 6
          }
        },
        {
          "title": "바다와 사진, 여유로운 산책",
          "scores": {
            "meilun": 2,
            "qixingtan": 6
          }
        },
        {
          "title": "협곡과 산악 자연 풍경",
          "scores": {
            "qixingtan": 2,
            "taroko": 7
          }
        }
      ]
    },
    {
      "title": "밤에는 어떤 동선이 편할까요?",
      "help": "화렌은 밤 복귀 동선에 따라 숙소 만족도가 달라집니다.",
      "options": [
        {
          "title": "야시장 가까이에서 저녁을 해결하고 싶어요",
          "scores": {
            "dongdamen": 6
          }
        },
        {
          "title": "시내 카페와 골목을 천천히 걷고 싶어요",
          "scores": {
            "dongdamen": 6
          }
        },
        {
          "title": "숙소에서 조용히 쉬는 시간이 중요해요",
          "scores": {
            "meilun": 5,
            "qixingtan": 4,
            "taroko": 2
          }
        },
        {
          "title": "다음 날 자연 일정 때문에 일찍 쉬고 싶어요",
          "scores": {
            "station": 4,
            "qixingtan": 3,
            "taroko": 3
          }
        }
      ]
    },
    {
      "title": "동행자는 누구인가요?",
      "help": "동행자에 따라 체크해야 할 숙소 조건이 달라집니다.",
      "options": [
        {
          "title": "혼자 또는 친구와 가볍게 움직여요",
          "scores": {
            "station": 4,
            "dongdamen": 3
          }
        },
        {
          "title": "커플 여행이라 분위기도 중요해요",
          "scores": {
            "dongdamen": 4,
            "qixingtan": 3
          }
        },
        {
          "title": "부모님이나 아이와 함께해요",
          "scores": {
            "station": 3,
            "meilun": 6,
            "qixingtan": 2
          }
        },
        {
          "title": "렌터카나 택시를 적극적으로 쓸 예정이에요",
          "scores": {
            "meilun": 3,
            "qixingtan": 4,
            "taroko": 4
          }
        }
      ]
    },
    {
      "title": "숙소 주변 분위기는 어떤 쪽이 좋나요?",
      "help": "같은 화렌이라도 숙소 주변 분위기는 꽤 다릅니다.",
      "options": [
        {
          "title": "역 주변처럼 이동이 쉬운 곳",
          "scores": {
            "station": 6,
            "dongdamen": 1
          }
        },
        {
          "title": "먹거리와 상점이 많은 시내",
          "scores": {
            "dongdamen": 5
          }
        },
        {
          "title": "차분한 호텔 주변 환경",
          "scores": {
            "meilun": 6,
            "qixingtan": 2
          }
        },
        {
          "title": "바다와 자연 풍경이 가까운 곳",
          "scores": {
            "qixingtan": 6,
            "taroko": 3
          }
        },
        {
          "title": "아예 자연 속에 머무는 느낌",
          "scores": {
            "qixingtan": 2,
            "taroko": 7
          }
        }
      ]
    },
    {
      "title": "예산과 호텔 컨디션은 어떻게 보고 있나요?",
      "help": "숙박비만 보지 말고 이동비와 식사 선택지도 함께 생각해보세요.",
      "options": [
        {
          "title": "이동비까지 아끼는 실속형이 좋아요",
          "scores": {
            "station": 5,
            "dongdamen": 4
          }
        },
        {
          "title": "야시장 가까운 가성비가 좋아요",
          "scores": {
            "dongdamen": 5
          }
        },
        {
          "title": "숙소 컨디션과 조용함에 더 투자해도 돼요",
          "scores": {
            "meilun": 5,
            "qixingtan": 3
          }
        },
        {
          "title": "특별한 자연 숙소라면 예산을 더 볼 수 있어요",
          "scores": {
            "qixingtan": 3,
            "taroko": 6
          }
        }
      ]
    },
    {
      "title": "가장 피하고 싶은 불편은 무엇인가요?",
      "help": "피하고 싶은 불편을 기준으로 마지막 추천을 보정합니다.",
      "options": [
        {
          "title": "짐 들고 오래 걷는 것",
          "scores": {
            "station": 6,
            "meilun": 2
          }
        },
        {
          "title": "밤 소음과 혼잡한 분위기",
          "scores": {
            "meilun": 5,
            "qixingtan": 4,
            "taroko": 2
          }
        },
        {
          "title": "저녁 식사 선택지가 부족한 것",
          "scores": {
            "station": 2,
            "dongdamen": 5
          }
        },
        {
          "title": "자연 명소까지 이동이 긴 것",
          "scores": {
            "qixingtan": 4,
            "taroko": 5
          }
        }
      ]
    }
  ]
};

const areaResultBadges = {
  "station": "타이루거 투어와 시내 이동을 준비하기 좋은 중심",
  "dongdamen": "야시장과 구시가지 산책이 가까운",
  "meilun": "조용한 항구 분위기에서 여유롭게 쉬기 좋은 곳",
  "qixingtan": "자갈 해변과 태평양 풍경을 가까이 보는 곳",
  "taroko": "타이루거 협곡 안에서 머물며 자연을 깊게 보는 곳"
};

const hotelAccessPresets = {
  "station": {
    "station": "화렌역·투어 픽업 접근",
    "airport": "화렌공항 차량 약 10~20분"
  },
  "dongdamen": {
    "station": "동대문야시장·구시가지 도보권",
    "airport": "화렌공항 차량 약 15~25분"
  },
  "meilun": {
    "station": "메이룬·항구 산책권",
    "airport": "화렌공항 차량 약 10~20분"
  },
  "qixingtan": {
    "station": "치싱탄·신청 해변권",
    "airport": "화렌공항 차량 약 10~20분"
  },
  "taroko": {
    "station": "타이루거·톈샹 접근",
    "airport": "화렌공항/화렌역 차량 이동 확인"
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
