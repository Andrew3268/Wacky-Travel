/* 호치민 hotel location survey logic. Modernized with the Fukuoka V23 survey UI flow. */
const cityConfig = {
  cityName: "호치민",
  destinationSlug: "ho-chi-minh-city",
  areas: {"district1": {"name": "1군·벤탄", "summary": "벤탄시장과 대표 명소, 식사와 마사지 동선이 짧게 이어지는 중심에서 호치민의 첫날을 가장 쉽게 열고 싶은 당신에게 잘 맞는 활기 있는 기준점입니다.", "leadTitle": "처음 방문자에게 가장 이해하기 쉬운 중심 위치입니다.", "leadText": "벤탄시장, 통일궁, 중앙우체국, 동커이, 부이비엔까지 주요 이동 경로를 짧게 연결하기 좋습니다.", "bestFor": ["첫 여행", "짧은 일정", "맛집·마사지", "근교 투어 픽업"], "notFor": ["조용한 휴식 최우선", "넓은 객실 우선", "부이비엔 소음이 부담되는 여행"], "bookingTips": ["부이비엔과 너무 가까운 저층 객실은 밤 소음 후기를 확인하세요."], "compareGood": "대표 관광과 저녁 이동을 가장 쉽게 묶을 수 있습니다.", "links": [{"title": "호치민 1군 호텔 추천 TOP5", "url": "/post/ho-chi-minh-district-1-hotels"}, {"title": "호치민 첫 여행 호텔 추천 TOP5", "url": "/post/ho-chi-minh-first-trip-hotels"}], "hotels": [{"name": "Silverland Bến Thành", "tag": "벤탄 중심", "location": "1군·벤탄", "reason": "대표 명소와 식사 이동을 짧게 묶기 좋은 중심 후보입니다.", "meta": ["첫 여행", "벤탄", "도보 이동"], "url": "/post/silverland-ben-thanh"}, {"name": "Liberty Central Saigon Centre Hotel", "tag": "중심 실속", "location": "1군 중심", "reason": "1군 중심 접근성과 실속형 숙박을 함께 볼 때 비교하기 좋습니다.", "meta": ["중심", "맛집", "실속"], "url": "/post/liberty-central-saigon-centre"}, {"name": "The Hammock Hotel Fine Arts Museum", "tag": "감각적 숙소", "location": "미술관·벤탄 주변", "reason": "1군 접근성과 개성 있는 숙소 분위기를 함께 기대할 수 있습니다.", "meta": ["부티크", "1군", "카페"], "url": "/post/the-hammock-hotel-fine-arts-museum"}, {"name": "Cochin Zen Hotel", "tag": "도심형 후보", "location": "1군·벤탄", "reason": "대표 관광과 저녁 이동을 단순하게 만들고 싶은 일정에 맞습니다.", "meta": ["도심", "짧은 일정", "마사지"], "url": "/post/cochin-zen-hotel"}, {"name": "Fusion Original Saigon Centre", "tag": "쇼핑 연결", "location": "1군 중심", "reason": "쇼핑몰과 중심 이동을 함께 보는 여행자에게 비교해볼 만합니다.", "meta": ["쇼핑", "중심", "컨디션"], "url": "/post/fusion-original-saigon-centre"}]}, "dongkhoi": {"name": "동커이·응우옌후에", "summary": "세련된 거리와 강변 산책, 깔끔한 호텔과 카페가 자연스럽게 이어지는 중심가에서 호치민을 조금 더 정돈된 분위기로 즐기고 싶은 당신에게 잘 어울리는 도심 지역입니다.", "leadTitle": "중심 접근성과 숙소 만족도의 균형이 좋습니다.", "leadText": "동커이 거리, 응우옌후에 보행자 거리, 오페라하우스, 사이공강 주변을 여유롭게 연결할 수 있습니다.", "bestFor": ["커플 여행", "부모님 동반", "호텔 컨디션", "리버사이드 산책"], "notFor": ["예산 최우선", "로컬 시장 분위기 선호", "밤거리 중심 친구 여행"], "bookingTips": ["동커이·응우옌후에·바손 주변은 현장 분위기가 다르므로 실제 위치를 확인하세요."], "compareGood": "정돈된 도심 분위기와 산책 코스를 함께 챙길 수 있습니다.", "links": [{"title": "호치민 동커이 호텔 추천 TOP5", "url": "/post/ho-chi-minh-dong-khoi-hotels"}, {"title": "호치민 부모님 동반 호텔 추천 TOP5", "url": "/post/ho-chi-minh-parents-hotels"}], "hotels": [{"name": "Caravelle Saigon", "tag": "동커이 중심", "location": "오페라하우스 주변", "reason": "중심 접근성과 호텔 안정감을 함께 보는 여행자에게 잘 맞습니다.", "meta": ["동커이", "부모님", "중심"], "url": "/post/caravelle-saigon"}, {"name": "Hotel Majestic Saigon", "tag": "강변 클래식", "location": "사이공강 주변", "reason": "리버사이드 산책과 고전적인 호텔 분위기를 중요하게 볼 때 유리합니다.", "meta": ["리버사이드", "클래식", "커플"], "url": "/post/hotel-majestic-saigon"}, {"name": "Liberty Central Saigon Citypoint", "tag": "도심 균형", "location": "응우옌후에 인근", "reason": "쇼핑, 식사, 도보 이동을 함께 잡기 편합니다.", "meta": ["쇼핑", "도심", "편의"], "url": "/post/liberty-central-saigon-citypoint"}, {"name": "Park Hyatt Saigon", "tag": "럭셔리 중심", "location": "동커이·오페라하우스", "reason": "특별한 일정과 숙소 만족도를 우선순위로 둘 때 비교할 만합니다.", "meta": ["럭셔리", "커플", "중심"], "url": "/post/park-hyatt-saigon"}, {"name": "The Reverie Saigon", "tag": "고급 리버뷰", "location": "응우옌후에 주변", "reason": "화려한 도심 숙박과 리버사이드 접근성을 기대할 수 있습니다.", "meta": ["리버뷰", "럭셔리", "쇼핑"], "url": "/post/the-reverie-saigon"}]}, "district3": {"name": "3군·전쟁박물관 주변", "summary": "1군의 접근성은 유지하되 조금 더 차분한 거리와 현실적인 숙박비 속에서 호치민 도심을 여유롭게 둘러보고 싶은 당신에게 잘 맞는 위치입니다.", "leadTitle": "가성비와 조용함을 함께 보는 현실적인 대안입니다.", "leadText": "전쟁박물관, 로컬 카페, 맛집 접근성이 좋고 1군까지 그랩 이동도 짧은 편입니다.", "bestFor": ["가성비", "재방문", "조용한 도심", "로컬 카페"], "notFor": ["완전 도보 중심 여행", "밤거리 중심", "공항 접근 최우선"], "bookingTips": ["매일 1군을 오갈 계획이라면 그랩 이동 시간을 함께 계산하세요."], "compareGood": "숙박비 부담과 번잡함을 줄이면서 중심 접근성은 유지할 수 있습니다.", "links": [{"title": "호치민 3군 호텔 추천 TOP5", "url": "/post/ho-chi-minh-district-3-hotels"}, {"title": "호치민 가성비 호텔 추천 TOP5", "url": "/post/ho-chi-minh-value-hotels"}], "hotels": [{"name": "Mai House Saigon Hotel", "tag": "3군 휴식형", "location": "3군", "reason": "차분한 도심 분위기와 호텔 컨디션을 함께 볼 수 있습니다.", "meta": ["3군", "휴식", "컨디션"], "url": "/post/mai-house-saigon-hotel"}, {"name": "Sherwood Residence", "tag": "레지던스형", "location": "3군·1군 인접", "reason": "객실 여유와 장기 숙박 편의성을 중요하게 볼 때 비교해볼 만합니다.", "meta": ["레지던스", "가족", "장기"], "url": "/post/sherwood-residence"}, {"name": "La Vela Saigon Hotel", "tag": "대형 호텔", "location": "3군", "reason": "부대시설과 도심 접근성을 함께 보는 여행자에게 맞습니다.", "meta": ["수영장", "3군", "가성비"], "url": "/post/la-vela-saigon-hotel"}, {"name": "Orchids Saigon Hotel", "tag": "안정형", "location": "3군·전쟁박물관 주변", "reason": "중심 접근성과 차분한 숙소 주변을 함께 기대할 수 있습니다.", "meta": ["차분함", "도심", "실속"], "url": "/post/orchids-saigon-hotel"}, {"name": "Bach Suites Saigon", "tag": "부티크형", "location": "3군 인접", "reason": "작고 깔끔한 도심형 숙소를 선호할 때 비교하기 좋습니다.", "meta": ["부티크", "커플", "차분함"], "url": "/post/bach-suites-saigon"}]}, "thaodien": {"name": "타오디엔·투득", "summary": "브런치 카페와 강변 레스토랑, 조용한 주거지 분위기가 어우러진 동네에서 빠른 관광보다 여유로운 시간을 보내고 싶은 당신에게 잘 어울리는 동네입니다.", "leadTitle": "호치민을 천천히 머물고 싶은 여행자에게 잘 맞습니다.", "leadText": "중심 관광보다 카페, 레스토랑, 리버사이드 분위기와 숙소 체류를 중요하게 볼 때 만족도가 높습니다.", "bestFor": ["재방문", "장기 일정", "카페 여행", "조용한 휴식"], "notFor": ["첫 방문에 대표 명소만 빠르게 둘러보기", "공항 이동 최우선", "밤거리 중심"], "bookingTips": ["메트로역이나 그랩 이동 시간을 함께 확인하세요."], "compareGood": "중심의 번잡함을 줄이고 여유로운 동네 분위기를 즐길 수 있습니다.", "links": [{"title": "호치민 타오디엔 호텔 추천 TOP5", "url": "/post/ho-chi-minh-thao-dien-hotels"}, {"title": "호치민 조용한 숙소 추천 TOP5", "url": "/post/ho-chi-minh-quiet-hotels"}], "hotels": [{"name": "Mia Saigon Luxury Boutique Hotel", "tag": "리버사이드", "location": "타오디엔", "reason": "조용한 휴식과 감각적인 숙소 분위기를 함께 기대할 수 있습니다.", "meta": ["리버사이드", "휴식", "커플"], "url": "/post/mia-saigon-luxury-boutique-hotel"}, {"name": "Somerset Vista Ho Chi Minh City", "tag": "레지던스형", "location": "투득·안푸", "reason": "장기 숙박과 객실 여유를 중요하게 볼 때 비교하기 좋습니다.", "meta": ["레지던스", "장기", "가족"], "url": "/post/somerset-vista-ho-chi-minh-city"}, {"name": "Glenwood City Resort", "tag": "동네형 숙소", "location": "타오디엔", "reason": "카페와 레스토랑 중심의 여유로운 동네 분위기에 맞습니다.", "meta": ["카페", "조용함", "재방문"], "url": "/post/glenwood-city-resort"}, {"name": "Common Inn Thao Dien", "tag": "실속형", "location": "타오디엔", "reason": "타오디엔 분위기를 실속 있게 경험하고 싶을 때 비교해볼 만합니다.", "meta": ["실속", "카페", "조용함"], "url": "/post/common-inn-thao-dien"}, {"name": "Riverside Serviced Apartments", "tag": "장기 숙박", "location": "타오디엔 리버사이드", "reason": "긴 일정과 숙소 생활 편의성을 함께 보는 여행자에게 맞습니다.", "meta": ["장기", "리버사이드", "가족"], "url": "/post/riverside-serviced-apartments"}]}, "airport": {"name": "공항·떤빈", "summary": "이른 비행과 늦은 도착, 짧은 경유처럼 이동 시간이 여행의 피로를 좌우하는 일정에서 부담을 줄이고 싶은 당신에게 잘 맞는 공항 주변 지역입니다.", "leadTitle": "여행 분위기보다 이동 피로를 줄이는 목적이 분명한 위치입니다.", "leadText": "호치민 시내 관광을 위한 위치라기보다 첫날·마지막 날을 편하게 만들기 위한 선택지입니다.", "bestFor": ["밤 도착", "새벽 출국", "출장", "1박 경유"], "notFor": ["대표 관광 중심", "맛집·카페 여행", "도보 여행"], "bookingTips": ["공항과 가까워도 시간대별 교통 체증을 확인하세요."], "compareGood": "비행 전후 이동 피로를 가장 확실하게 줄일 수 있습니다.", "links": [{"title": "호치민 공항 근처 호텔 추천 TOP5", "url": "/post/ho-chi-minh-airport-hotels"}, {"title": "호치민 새벽 출국 호텔 추천 TOP5", "url": "/post/ho-chi-minh-early-flight-hotels"}], "hotels": [{"name": "ibis Saigon Airport", "tag": "공항 실속형", "location": "떤빈·공항 주변", "reason": "공항 접근성을 가장 단순하게 만들고 싶을 때 비교하기 좋습니다.", "meta": ["공항", "실속", "새벽 출국"], "url": "/post/ibis-saigon-airport"}, {"name": "Holiday Inn & Suites Saigon Airport", "tag": "안정형", "location": "공항 주변", "reason": "객실 안정감과 공항 이동을 함께 보는 일정에 맞습니다.", "meta": ["공항", "가족", "출장"], "url": "/post/holiday-inn-suites-saigon-airport"}, {"name": "PARKROYAL Saigon", "tag": "공항·시내 균형", "location": "떤빈", "reason": "공항 근처에 머물면서도 호텔 컨디션을 중요하게 볼 때 비교해볼 만합니다.", "meta": ["공항", "컨디션", "부모님"], "url": "/post/parkroyal-saigon"}, {"name": "First Hotel", "tag": "로컬 안정형", "location": "떤빈", "reason": "공항 주변에서 실용적인 1박을 고려할 때 비교할 수 있습니다.", "meta": ["공항", "1박", "실속"], "url": "/post/first-hotel-saigon"}, {"name": "Bluesky Serviced Apartment Airport Plaza", "tag": "레지던스형", "location": "공항 인근", "reason": "가족이나 긴 대기 시간이 있는 일정에서 객실 여유를 볼 수 있습니다.", "meta": ["레지던스", "공항", "가족"], "url": "/post/bluesky-serviced-apartment-airport-plaza"}]}, "binhthanh": {"name": "빈탄·랜드마크81", "summary": "사이공강 전망과 고층 레지던스, 쇼핑몰과 객실 여유가 함께 놓인 공간에서 가족 여행이나 휴식형 일정을 조금 더 편안하게 보내고 싶은 당신에게 잘 어울리는 지역입니다.", "leadTitle": "숙소에서 쉬는 시간과 객실 여유를 중요하게 볼 때 강점이 있습니다.", "leadText": "랜드마크81 주변은 현대적인 숙소 환경과 쇼핑몰 접근성이 좋아 가족·부모님 동반 일정에 비교할 만합니다.", "bestFor": ["가족 여행", "레지던스형 객실", "리버뷰", "쇼핑몰 접근"], "notFor": ["도보 중심 첫 여행", "밤거리 여행", "예산 최우선"], "bookingTips": ["중심 관광지는 그랩 이동이 기본이므로 이동비를 함께 계산하세요."], "compareGood": "객실 여유와 현대적인 숙소 환경을 기대하기 좋습니다.", "links": [{"title": "호치민 가족 여행 호텔 추천 TOP5", "url": "/post/ho-chi-minh-family-hotels"}, {"title": "호치민 리버뷰 호텔 추천 TOP5", "url": "/post/ho-chi-minh-riverview-hotels"}], "hotels": [{"name": "Vinpearl Landmark 81, Autograph Collection", "tag": "고층 리버뷰", "location": "랜드마크81", "reason": "리버뷰와 현대적인 숙소 경험을 우선한다면 대표적으로 비교해볼 만합니다.", "meta": ["리버뷰", "가족", "쇼핑몰"], "url": "/post/vinpearl-landmark-81"}, {"name": "Oakwood Hotel & Apartments Saigon", "tag": "아파트먼트형", "location": "빈탄", "reason": "객실 여유와 장기 숙박 편의성을 함께 볼 수 있습니다.", "meta": ["레지던스", "가족", "장기"], "url": "/post/oakwood-hotel-apartments-saigon"}, {"name": "Maison De Camille Boutique Hotel", "tag": "부티크 휴식형", "location": "빈탄", "reason": "조용한 동네 분위기와 감각적인 숙소를 원하는 여행자에게 맞습니다.", "meta": ["부티크", "조용함", "커플"], "url": "/post/maison-de-camille"}, {"name": "The Bloom Pham Viet Chanh", "tag": "동네형 후보", "location": "빈탄", "reason": "로컬 동네 분위기와 중심 접근성을 함께 보는 재방문 여행자에게 잘 맞습니다.", "meta": ["로컬", "카페", "재방문"], "url": "/post/the-bloom-pham-viet-chanh"}, {"name": "Somerset Ho Chi Minh City", "tag": "가족형 후보", "location": "1군·빈탄 접근", "reason": "가족형 객실과 도심 접근성을 함께 고려할 때 비교할 만합니다.", "meta": ["가족", "레지던스", "도심"], "url": "/post/somerset-ho-chi-minh-city"}]}},
  questions: [
    { title: "호치민 여행은 몇 번째인가요?", help: "처음이라면 대표 일정을 쉽게 묶는 위치가 중요합니다.", options: [
      { title: "첫 여행", desc: "대표 명소와 식사 이동을 쉽게 잡고 싶어요.", scores: { district1: 5, dongkhoi: 3, district3: 1 } },
      { title: "재방문", desc: "중심만 고집하지 않아도 괜찮아요.", scores: { district3: 3, thaodien: 4, binhthanh: 2 } },
      { title: "짧은 경유", desc: "비행 전후 이동 피로가 가장 중요해요.", scores: { airport: 6, district1: 2 } }
    ]},
    { title: "누구와 함께 가나요?", help: "동행자에 따라 소음, 객실 크기, 이동 방식의 우선순위가 달라집니다.", options: [
      { title: "혼자 여행", desc: "교통과 주변 편의성이 중요해요.", scores: { district1: 3, district3: 3, dongkhoi: 2 } },
      { title: "커플 여행", desc: "카페, 식사, 분위기를 같이 중요하게 봐요.", scores: { dongkhoi: 4, thaodien: 3, district1: 2 } },
      { title: "친구 여행", desc: "밤에도 활기차고 먹거리 많은 곳이 좋아요.", scores: { district1: 5, dongkhoi: 2 } },
      { title: "가족·아이", desc: "무리 없는 이동과 객실 여유가 중요해요.", scores: { binhthanh: 5, dongkhoi: 3, district3: 2 } },
      { title: "부모님 동반", desc: "너무 복잡하지 않고 이동이 단순하면 좋겠어요.", scores: { dongkhoi: 5, binhthanh: 3, district3: 2 } }
    ]},
    { title: "이번 여행에서 가장 중요한 일정은 무엇인가요?", help: "가장 많이 시간을 쓸 활동을 기준으로 숙소를 좁히세요.", options: [
      { title: "대표 관광", desc: "벤탄시장, 통일궁, 중앙우체국 등을 보고 싶어요.", scores: { district1: 5, dongkhoi: 3, district3: 1 } },
      { title: "맛집·마사지", desc: "저녁에도 짧게 이동하고 싶어요.", scores: { district1: 5, dongkhoi: 2 } },
      { title: "카페·여유", desc: "감성 카페와 조용한 동네 분위기가 좋아요.", scores: { thaodien: 5, district3: 3 } },
      { title: "호텔 휴식", desc: "객실 컨디션과 숙소에서 쉬는 시간이 중요해요.", scores: { binhthanh: 4, dongkhoi: 4, thaodien: 2 } }
    ]},
    { title: "공항 이동은 얼마나 중요한가요?", help: "떤선녓공항은 가까워도 시간대에 따라 이동 시간이 달라질 수 있습니다.", options: [
      { title: "매우 중요", desc: "밤 도착이나 새벽 출국이라 최대한 쉽게 이동하고 싶어요.", scores: { airport: 7, district3: 1 } },
      { title: "보통", desc: "공항보다 시내 일정이 더 중요해요.", scores: { district1: 3, dongkhoi: 3, district3: 2 } },
      { title: "중요 낮음", desc: "숙소 주변 분위기와 여행 흐름이 우선이에요.", scores: { thaodien: 3, binhthanh: 3, district1: 1 } }
    ]},
    { title: "근교 투어가 포함되어 있나요?", help: "꾸찌터널·메콩델타 투어는 픽업 가능 구역이 중요합니다.", options: [
      { title: "투어 2개 이상", desc: "아침 출발과 호텔 픽업이 편했으면 해요.", scores: { district1: 5, dongkhoi: 3 } },
      { title: "투어 하루", desc: "시내 관광도 중요하지만 하루쯤 투어를 넣을 예정이에요.", scores: { district1: 4, dongkhoi: 2, district3: 2 } },
      { title: "투어 없음", desc: "시내, 카페, 쇼핑 중심으로 움직일 예정이에요.", scores: { dongkhoi: 3, district1: 3, thaodien: 2 } }
    ]},
    { title: "숙소 주변 분위기는 어떤 쪽이 좋나요?", help: "호치민은 밤 분위기와 숙면 만족도가 크게 갈릴 수 있습니다.", options: [
      { title: "활기찬 중심", desc: "밤에도 주변에 볼거리와 먹거리가 많았으면 해요.", scores: { district1: 6, dongkhoi: 1 } },
      { title: "깔끔한 도심", desc: "쇼핑몰, 카페, 리버사이드 산책이 좋아요.", scores: { dongkhoi: 5, binhthanh: 2 } },
      { title: "차분한 도심", desc: "중심 접근성은 필요하지만 너무 복잡한 건 싫어요.", scores: { district3: 5, dongkhoi: 2 } },
      { title: "조용한 동네", desc: "번화가보다 여유로운 숙박을 원해요.", scores: { thaodien: 6, binhthanh: 3 } }
    ]},
    { title: "예산은 어떤 기준인가요?", help: "숙박비만 보지 말고 매일 이동비와 이동 피로까지 함께 보세요.", options: [
      { title: "예산 절약", desc: "중심 바로 앞이 아니어도 괜찮아요.", scores: { district3: 5, airport: 2, thaodien: 1 } },
      { title: "가격·위치 균형", desc: "너무 비싸지 않으면서 이동도 편했으면 해요.", scores: { district3: 4, district1: 3, dongkhoi: 2 } },
      { title: "위치·컨디션 우선", desc: "짧은 일정이라 이동 시간과 숙소 만족도가 중요해요.", scores: { dongkhoi: 5, district1: 4, binhthanh: 2 } }
    ]}
  ]
};

const areaResultBadges = {
  "district1": "호치민 첫 여행을 시작하기 가장 쉬운 중심",
  "dongkhoi": "리버사이드와 세련된 도심의 산책",
  "district3": "조용한 도심과 실속을 함께 보는 여유",
  "thaodien": "브런치 카페와 강변 분위기를 즐기기 좋은 곳",
  "airport": "비행 전후 이동이 가벼운 실속 동선",
  "binhthanh": "사이공강 야경과 고층 전망을 기대하기 좋은 곳"
};

const hotelAccessPresets = {
  "district1": {
    "station": "벤탄시장·1군 도보권",
    "airport": "떤선녓공항 차량 약 25~40분"
  },
  "dongkhoi": {
    "station": "동커이·응우옌후에 도보권",
    "airport": "공항 차량 약 30~45분"
  },
  "district3": {
    "station": "전쟁박물관·3군 접근",
    "airport": "공항 차량 약 20~35분"
  },
  "thaodien": {
    "station": "타오디엔 카페거리 접근",
    "airport": "공항 차량 약 35~50분"
  },
  "airport": {
    "station": "공항 주변 차량 5~15분",
    "airport": "떤선녓공항 차량 약 5~15분"
  },
  "binhthanh": {
    "station": "랜드마크81·빈탄 접근",
    "airport": "공항 차량 약 30~45분"
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
