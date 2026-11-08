import type { ArtifactInput, ArtifactSource } from "../artifact";
import { LEGEND_ARTIFACTS } from "./legends";
import { met } from "./met";

/**
 * 시드 유물. 대표 유물 16점(아래)과 추가 전설 유물(legends/)로 이루어진다. 전설 속 유물이므로 실물이 없다.
 * 이미지는 모습이 닮은 메트로폴리탄 미술관(The Met) 소장품의 CC0 사진을 빌려 쓰고, source에 사진 속 실제 물건을 밝힌다.
 * 유물 선정은 나무위키 「전설의 무기」·「전설의 도구」 문서를 참고했고, 해설은 이 프로젝트에서 새로 썼다.
 */
export type SeedArtifact = ArtifactInput & { source: ArtifactSource };

const FEATURED_ARTIFACTS: SeedArtifact[] = [
  {
    slug: "excalibur",
    title: "엑스칼리버",
    titleOriginal: "Excalibur",
    gallery: "arthurian",
    kind: "weapon",
    owner: "아서왕",
    maker: "아발론의 대장장이(전승에 따라 호수의 여인)",
    power: "적의 갑옷을 가르고, 칼집을 지닌 자는 피를 흘리지 않는다.",
    firstRecord: "제프리 오브 몬머스 『브리타니아 열왕사』",
    recordYear: 1136,
    summary: "브리튼의 왕을 증명하는 검. 호수에서 와서 호수로 돌아갔다.",
    story: `엑스칼리버가 처음 이름을 얻은 곳은 12세기 제프리 오브 몬머스의 『브리타니아 열왕사』다. 그는 아서의 검을 '칼리부르누스'라 부르며 아발론 섬에서 벼린 칼이라고 적었다. 웨일스 전승의 '칼레드불흐'와 아일랜드 영웅담의 '칼라드볼그'가 같은 뿌리로 꼽힌다.

검을 얻는 장면은 두 갈래로 전한다. 하나는 바위에 꽂힌 검을 뽑아 왕이 되는 이야기이고, 다른 하나는 호수 위로 솟은 팔에게서 검을 받는 이야기다. 토머스 맬러리의 『아서왕의 죽음』은 두 장면을 모두 싣고, 바위의 검이 부러진 뒤 호수의 여인이 엑스칼리버를 건넸다고 정리한다.

멀린은 검보다 칼집이 더 귀하다고 말했다. 칼집을 지닌 자는 아무리 다쳐도 피를 흘리지 않기 때문이다. 칼집을 잃은 아서는 캄란 전투에서 치명상을 입고, 마지막 기사 베디비어에게 검을 호수에 돌려주라고 명한다. 세 번째 던졌을 때에야 물속에서 손이 올라와 검을 받아 들고 사라졌다.`,
    imageAlt: "15세기 유럽의 한 손 반 검. 곧은 양날 칼날과 십자형 코등이, 둥근 자루 끝이 보인다.",
    status: "published",
    featured: true,
    source: met(
      35888,
      "Hand-and-a-Half Sword",
      "European or possibly British",
      "15th century",
      "https://images.metmuseum.org/CRDImages/aa/original/DP-15647-003.jpg",
      "14.25.1196",
      "Gift of William H. Riggs, 1913",
    ),
  },
  {
    slug: "holy-grail",
    title: "성배",
    titleOriginal: "Holy Grail",
    gallery: "arthurian",
    kind: "vessel",
    owner: "어부왕, 아리마대의 요셉",
    maker: "알려지지 않음",
    power: "보는 이에게 원하는 음식을 내리고, 순결한 기사에게만 모습을 드러낸다.",
    firstRecord: "크레티앵 드 트루아 『페르스발 또는 그라알 이야기』",
    recordYear: 1180,
    summary: "최후의 만찬의 잔이자 원탁 기사들이 끝내 찾아 헤맨 그릇.",
    story: `'그라알'은 원래 넓고 오목한 접시를 뜻하는 말이었다. 1180년대 크레티앵 드 트루아의 미완성 이야기에서 젊은 기사 페르스발은 어부왕의 성에서 빛나는 그라알이 지나가는 것을 보지만, 그것이 누구를 위한 것인지 묻지 않아 왕을 치유할 기회를 놓친다.

몇십 년 뒤 로베르 드 보롱은 이 그릇을 최후의 만찬에 쓰인 잔으로 바꾸어 놓았다. 아리마대의 요셉이 십자가 아래에서 그리스도의 피를 받았고, 그 잔을 서쪽 끝 브리튼으로 가져왔다는 것이다. 이때부터 그라알은 '성배'가 되었다.

13세기 산문 연작 『성배 탐색』에서 원탁의 기사들은 성배를 찾아 흩어진다. 랜슬롯은 죄 때문에 성배에 다가가지 못하고, 그의 아들 갈라하드가 퍼시벌, 보어스와 함께 마침내 성배를 마주한다. 갈라하드는 그 자리에서 숨을 거두고, 성배는 하늘로 들려 올라갔다.

이 사진의 은잔은 20세기 초 시리아 안티오크 근처에서 발견되었다고 전하며 한때 '진짜 성배'로 소개된 '안티오크 성배'다. 지금은 6세기 비잔티움에서 만든 등잔일 가능성이 높다고 본다.`,
    imageAlt: "포도 덩굴 사이에 인물들이 새겨진 금도금 은잔. 둥근 잔 몸체가 낮은 받침 위에 놓여 있다.",
    status: "published",
    featured: true,
    source: met(
      468346,
      'The Antioch "Chalice"',
      "Byzantine",
      "500–550",
      "https://images.metmuseum.org/CRDImages/cl/original/DT113.jpg",
      "50.4",
      "The Cloisters Collection, 1950",
    ),
  },
  {
    slug: "durandal",
    title: "뒤랑달",
    titleOriginal: "Durendal",
    gallery: "arthurian",
    kind: "weapon",
    owner: "롤랑",
    maker: "천사가 샤를마뉴에게 전함",
    power: "바위를 내리쳐도 이가 빠지지 않는다.",
    firstRecord: "『롤랑의 노래』",
    recordYear: 1100,
    summary: "샤를마뉴의 조카 롤랑의 검. 부러지기를 거부했다.",
    story: `11세기 말의 서사시 『롤랑의 노래』에서 뒤랑달은 샤를마뉴가 조카 롤랑에게 준 검이다. 황금 자루 안에는 성 베드로의 이, 성 바실리우스의 피, 성 드니의 머리카락, 성모의 옷자락이 들어 있었다고 한다.

론세스바예스 고개에서 후위를 맡은 롤랑은 매복한 적에게 둘러싸인다. 죽음을 앞둔 그는 검이 적의 손에 넘어가지 않도록 바위에 내리쳐 부수려 했지만, 칼날은 멀쩡하고 바위만 갈라졌다. 피레네 산맥의 '롤랑의 틈'은 이때 생겼다는 이야기가 전한다.

롤랑은 끝내 검을 몸 아래에 깔고 적진 쪽을 향해 누운 채 숨을 거두었다. 프랑스 로카마두르의 절벽에는 지금도 뒤랑달이라고 전하는 칼 한 자루가 박혀 있다.`,
    imageAlt: "15세기 전반 서유럽의 양손검. 긴 칼날과 넓게 뻗은 코등이가 있다.",
    status: "published",
    featured: false,
    source: met(
      35388,
      "Two-Handed Sword",
      "British or Western European",
      "ca. 1400–1450",
      "https://images.metmuseum.org/CRDImages/aa/original/LC-L_2008_32_1-004-Edit.jpg",
      "2023.580.1",
      "Gift of Laird Landmann and Kathleen Kinney Landmann, in celebration of the Museum’s 150th Anniversary, 2023",
    ),
  },
  {
    slug: "mjolnir",
    title: "묠니르",
    titleOriginal: "Mjölnir",
    gallery: "norse",
    kind: "weapon",
    owner: "토르",
    maker: "난쟁이 형제 브로크와 에이트리",
    power: "무엇이든 부수고, 던지면 주인의 손으로 돌아온다.",
    firstRecord: "스노리 스투를루손 『산문 에다』",
    recordYear: 1220,
    summary: "천둥신 토르의 망치. 자루가 짧은 것은 로키의 장난 때문이다.",
    story: `로키는 토르의 아내 시프의 머리카락을 몽땅 잘라 버린 벌로 난쟁이들에게 새 보물을 구해 와야 했다. 그는 난쟁이 브로크에게 '이발디의 아들들보다 더 좋은 보물을 만들 수 없을 것'이라며 자기 머리를 걸고 내기를 걸었다.

브로크의 형제 에이트리가 대장간에서 일하는 동안 브로크는 풀무질을 멈추면 안 됐다. 파리로 변한 로키가 눈두덩을 물어 피가 흐르자 브로크는 한순간 손을 멈췄고, 그 탓에 마지막으로 만든 망치는 자루가 조금 짧게 나왔다.

그래도 신들은 묠니르를 가장 뛰어난 보물로 꼽았다. 무엇을 쳐도 부서지지 않고, 아무리 멀리 던져도 토르의 손으로 돌아오며, 작게 줄여 옷 속에 넣을 수 있었다. 바이킹 시대 사람들은 작은 망치 모양 부적을 목에 걸고 다녔다.`,
    imageAlt: "15세기 중엽 프랑스의 전투용 망치. 강철 머리 한쪽은 망치, 반대쪽은 뾰족한 갈고리이고 나무 자루가 달려 있다.",
    status: "published",
    featured: true,
    source: met(
      25073,
      "War Hammer",
      "French",
      "ca. 1450",
      "https://images.metmuseum.org/CRDImages/aa/original/DP-15647-024.jpg",
      "04.3.49",
      "Rogers Fund, 1904",
    ),
  },
  {
    slug: "gungnir",
    title: "궁니르",
    titleOriginal: "Gungnir",
    gallery: "norse",
    kind: "weapon",
    owner: "오딘",
    maker: "난쟁이 이발디의 아들들",
    power: "던지면 반드시 과녁에 꽂힌다.",
    firstRecord: "스노리 스투를루손 『산문 에다』",
    recordYear: 1220,
    summary: "최고신 오딘의 창. 신들의 첫 전쟁은 이 창을 던지며 시작됐다.",
    story: `궁니르는 로키가 시프의 머리카락을 대신할 황금 머리카락을 주문하면서 함께 얻어 온 보물이다. 이발디의 아들들은 황금 머리카락, 접히는 배 스키드블라드니르와 함께 이 창을 만들었다.

창끝에는 룬 문자가 새겨져 있었고, 한 번 던지면 빗나가는 일이 없었다. 『고(古) 에다』의 「무녀의 예언」은 오딘이 바니르 신족의 군대 위로 창을 던지면서 세상의 첫 전쟁이 시작되었다고 노래한다.

라그나뢰크의 날, 오딘은 궁니르를 들고 거대한 늑대 펜리르에게 맞선다. 창은 빗나가지 않았지만, 오딘은 늑대에게 삼켜지고 만다.`,
    imageAlt: "800~1000년 무렵 유럽의 강철 창날. 버들잎 모양 날과 은으로 장식한 소켓이 보인다.",
    status: "published",
    featured: false,
    source: met(
      24939,
      "Spearhead",
      "European",
      "ca. 800–1000",
      "https://images.metmuseum.org/CRDImages/aa/original/LC-1989_220-001.jpg",
      "1989.220",
      "Purchase, Helmut Nickel Gift; Bequest of Stephen V. Grancsay and Gift of Carl Otto von Kienbusch, by exchange; and Rogers Fund, 1989",
    ),
  },
  {
    slug: "gram",
    title: "그람",
    titleOriginal: "Gram",
    gallery: "norse",
    kind: "weapon",
    owner: "시그문드, 시구르드",
    maker: "오딘이 내리고 대장장이 레긴이 다시 벼림",
    power: "모루를 두 쪽으로 가르고, 용의 심장을 꿰뚫는다.",
    firstRecord: "『뵐숭 일족의 사가』",
    recordYear: 1260,
    summary: "나무에 꽂힌 채 주인을 기다린 검. 부러졌다가 용을 벤 검으로 다시 태어났다.",
    story: `뵐숭 왕의 궁전 한가운데에는 거대한 나무가 자랐다. 결혼 잔치가 열리던 밤, 외눈의 나그네가 들어와 나무 둥치에 칼 한 자루를 깊이 꽂고 '이 칼을 뽑는 자가 주인'이라고 말한 뒤 사라졌다. 나그네는 오딘이었고, 칼을 뽑아낸 사람은 뵐숭의 아들 시그문드뿐이었다.

시그문드의 마지막 전투에서 다시 나타난 오딘이 창을 내밀자 검은 두 동강이 났다. 시그문드의 아내는 그 조각을 간직했다가 아들 시구르드에게 물려주었다.

대장장이 레긴은 조각을 녹여 새 칼을 벼렸다. 시구르드가 시험 삼아 내리치자 모루가 받침까지 갈라졌고, 강물에 흘려보낸 양털이 칼날에 닿자 그대로 두 쪽이 났다. 시구르드는 이 검으로 황금을 지키던 용 파프니르를 아래에서 찔러 쓰러뜨렸다. 독일의 『니벨룽의 노래』와 바그너의 악극에서는 같은 검이 발뭉, 노퉁이라는 이름으로 나온다.`,
    imageAlt: "10세기 스칸디나비아의 바이킹 검. 곧은 양날 칼날과 짧은 코등이, 구리와 은으로 장식한 손잡이가 있다.",
    status: "published",
    featured: false,
    source: met(
      24832,
      "Viking Sword",
      "European, probably Scandinavia",
      "10th century",
      "https://images.metmuseum.org/CRDImages/aa/original/DT758.jpg",
      "55.46.1",
      "Rogers Fund, 1955",
    ),
  },
  {
    slug: "draupnir",
    title: "드라우프니르",
    titleOriginal: "Draupnir",
    gallery: "norse",
    kind: "jewel",
    owner: "오딘",
    maker: "난쟁이 형제 브로크와 에이트리",
    power: "아홉째 밤마다 같은 무게의 금반지 여덟 개를 떨어뜨린다.",
    firstRecord: "스노리 스투를루손 『산문 에다』",
    recordYear: 1220,
    summary: "스스로 불어나는 오딘의 금반지. 이름은 '방울져 떨어지는 것'이라는 뜻이다.",
    story: `드라우프니르는 묠니르와 같은 날, 같은 대장간에서 태어났다. 브로크와 에이트리는 로키와의 내기에서 황금 털 멧돼지 굴린부르스티, 금반지 드라우프니르, 망치 묠니르를 차례로 만들어 신들에게 바쳤다.

반지에서는 아홉째 밤마다 꼭 같은 무게의 금반지 여덟 개가 방울처럼 떨어졌다. 끝없이 불어나는 이 부(富)는 왕이 신하에게 반지를 나누어 주던 북유럽 사회에서 가장 왕다운 보물이었다.

오딘은 아들 발드르가 죽자 화장 장작 위에 이 반지를 올려 함께 태웠다. 저승으로 내려간 헤르모드가 발드르를 데려오지는 못했지만, 발드르는 아버지에게 드라우프니르를 돌려보냈다.`,
    imageAlt: "기원전 4~3세기 그리스의 금반지. 타원형 반지 면 가득 물결치는 머리카락의 얼굴이 돋을새김되어 있다.",
    status: "published",
    featured: false,
    source: met(
      248265,
      "Gold ring",
      "Greek",
      "late 4th–3rd century BCE",
      "https://images.metmuseum.org/CRDImages/gr/original/DP109248.jpg",
      "10.132.1",
      "Purchase, 1910",
    ),
  },
  {
    slug: "aegis",
    title: "아이기스",
    titleOriginal: "Aegis (Αἰγίς)",
    gallery: "greek",
    kind: "armor",
    owner: "제우스, 아테나",
    maker: "전승에 따라 헤파이스토스",
    power: "흔들면 폭풍이 일고, 적의 군대가 공포에 질려 달아난다.",
    firstRecord: "호메로스 『일리아스』",
    recordYear: -750,
    summary: "제우스와 아테나가 두른 방패. 한가운데에 메두사의 머리가 박혀 있다.",
    story: `『일리아스』에서 아이기스는 제우스가 흔들면 천둥과 함께 먹구름이 일어나는 무구다. 아테나와 아폴론도 이것을 빌려 들고 싸움터에 나섰다. 가장자리에는 황금 술 백 개가 늘어져 있었다.

처음에는 염소 가죽으로 만든 망토였다고도 하고, 방패였다고도 한다. 그리스 도자기 그림 속 아테나는 뱀 술이 달린 가죽 망토로 어깨를 덮고 있다. 페르세우스가 메두사의 머리를 바치자 아테나는 그것을 아이기스 한가운데에 붙였고, 그 뒤로 아이기스를 본 적은 그대로 굳어 버렸다.

오늘날 영어로 '누군가의 비호 아래'를 뜻하는 'under the aegis of'는 이 방패에서 나온 말이다.`,
    imageAlt: "1560년 무렵 이탈리아의 검은 원형 방패. 가운데에 인물들이 엉킨 장면, 둘레에 흉상을 담은 둥근 메달들이 돋을새김되어 있다.",
    status: "published",
    featured: true,
    source: met(
      27254,
      "Embossed Shield",
      "Italian",
      "ca. 1560",
      "https://images.metmuseum.org/CRDImages/aa/original/LC-14_25_780-001.jpg",
      "14.25.780",
      "Gift of William H. Riggs, 1913",
    ),
  },
  {
    slug: "golden-fleece",
    title: "황금 양털",
    titleOriginal: "Golden Fleece (Χρυσόμαλλον Δέρας)",
    gallery: "greek",
    kind: "treasure",
    owner: "콜키스의 왕 아이에테스",
    maker: "신의 숫양 크뤼소말로스",
    power: "지닌 나라에 번영과 왕권의 정당성을 가져다준다.",
    firstRecord: "아폴로니오스 『아르고나우티카』",
    recordYear: -250,
    summary: "잠들지 않는 용이 지키던 양털. 이아손과 아르고호 원정대가 바다를 건너 가져왔다.",
    story: `계모의 손에 제물로 바쳐질 뻔한 남매 프릭소스와 헬레는 하늘을 나는 황금 숫양을 타고 달아났다. 헬레는 바다에 떨어졌고, 그 바다는 '헬레의 바다' 헬레스폰토스가 되었다. 흑해 끝 콜키스에 닿은 프릭소스는 숫양을 제물로 바치고 그 가죽을 왕 아이에테스에게 주었다.

왕은 양털을 아레스의 숲 떡갈나무에 걸고 잠들지 않는 용에게 지키게 했다. 왕위를 되찾으려던 이아손은 양털을 가져오라는 명을 받고, 헤라클레스와 오르페우스 같은 영웅들을 모아 아르고호를 띄웠다.

불을 뿜는 황소에게 멍에를 씌우고 용의 이빨에서 솟아난 전사들을 물리치는 시험은 왕의 딸 메데이아의 마법 덕에 넘을 수 있었다. 메데이아가 약초로 용을 재우자 이아손은 양털을 걷어 들고 밤바다로 달아났다.

사진은 기원전 6~4세기 아케메네스 페르시아의 금으로 만든 야생 숫양 머리다. 둥글게 말린 뿔과 굵은 목덜미가 하늘을 날던 황금 숫양 크뤼소말로스를 떠올리게 한다.`,
    imageAlt: "기원전 6~4세기 페르시아의 금 숫양 머리 장식. 둥글게 말린 큰 뿔과 길쭉한 주둥이, 목덜미의 털 무늬가 보인다.",
    status: "published",
    featured: false,
    source: met(
      322494,
      "Head of a wild ram",
      "Achaemenid",
      "ca. 6th–4th century BCE",
      "https://images.metmuseum.org/CRDImages/an/original/DP-27419-001.jpg",
      "17.230.129",
      "Rogers Fund, 1917",
    ),
  },
  {
    slug: "shield-of-achilles",
    title: "아킬레우스의 방패",
    titleOriginal: "Shield of Achilles",
    gallery: "greek",
    kind: "armor",
    owner: "아킬레우스",
    maker: "대장장이 신 헤파이스토스",
    power: "신이 벼린 다섯 겹의 방패. 표면에 세상 전체가 새겨져 있다.",
    firstRecord: "호메로스 『일리아스』 제18권",
    recordYear: -750,
    summary: "하늘과 땅, 전쟁과 평화가 한 면에 담긴 방패. 서양 문학 최초의 예술품 묘사로 꼽힌다.",
    story: `친구 파트로클로스가 아킬레우스의 갑옷을 빌려 입고 나갔다가 헥토르에게 쓰러지자, 갑옷은 적의 손에 넘어갔다. 아들의 슬픔을 본 바다의 여신 테티스는 헤파이스토스의 대장간을 찾아가 새 무구를 부탁했다.

『일리아스』 제18권은 백삼십 행 넘게 방패를 새기는 과정을 따라간다. 가운데에는 땅과 하늘과 바다, 해와 달과 별자리가 있다. 그 둘레로 결혼 잔치가 열리고 재판이 벌어지는 평화의 도시와, 포위당해 매복을 준비하는 전쟁의 도시가 마주한다.

밭을 가는 농부, 포도를 따는 아이들, 사자에게 습격당한 소 떼, 원을 그리며 춤추는 젊은이들이 이어지고, 맨 가장자리를 대양의 강 오케아노스가 감싼다. 방패를 받아 든 아킬레우스는 다시 싸움터로 나가 헥토르를 쓰러뜨린다.

사진은 16세기 프랑스 왕 앙리 2세의 행사용 방패를 가까이 찍은 것이다. 강철 표면에 기마 전투 장면을 돋을새김하고 금과 은으로 꾸몄다.`,
    imageAlt: "1555년 무렵 프랑스 앙리 2세의 강철 방패 아래쪽을 가까이 찍은 사진. 가운데 타원 안에 기마 전투 장면이, 둘레에 인물 메달과 꽃무늬가 돋을새김되어 있고 가장자리를 리벳이 두르고 있다.",
    status: "published",
    featured: false,
    source: met(
      23948,
      "Shield of Henry II of France (reigned 1547–59)",
      "French",
      "ca. 1555",
      "https://images.metmuseum.org/CRDImages/aa/original/DP-12882-008.jpg",
      "34.85",
      "Harris Brisbane Dick Fund, 1934",
    ),
  },
  {
    slug: "spear-of-longinus",
    title: "롱기누스의 창",
    titleOriginal: "Holy Lance (Lancea Longini)",
    gallery: "sacred",
    kind: "weapon",
    owner: "로마 병사 롱기누스",
    maker: "알려지지 않음",
    power: "이 창을 가진 자가 세상의 운명을 쥔다는 전설이 붙었다.",
    firstRecord: "『요한복음』 19장 34절",
    recordYear: 95,
    summary: "십자가 위 그리스도의 옆구리를 찌른 창. 중세 내내 왕과 황제들이 이 창을 찾았다.",
    story: `『요한복음』은 십자가에 달린 예수가 이미 숨진 것을 확인하려고 한 병사가 창으로 옆구리를 찔렀고, 거기서 피와 물이 흘러나왔다고 적는다. 병사의 이름은 성경에 없다. '롱기누스'라는 이름은 4세기 무렵의 외경 『니고데모 복음서』에 처음 나온다.

전설에서 롱기누스는 눈이 어두운 병사였는데, 창을 타고 흘러내린 피가 눈에 닿자 시력을 되찾고 신앙을 얻었다고 한다. 그 뒤로 창 자체가 성유물이 되었다.

1098년 제1차 십자군이 안티오크에서 포위당했을 때, 순례자 페트루스 바르톨로메우스가 꿈의 계시를 따라 성당 바닥을 파서 창날을 찾아냈다. 사기가 오른 십자군은 포위를 뚫었다. 지금도 빈의 호프부르크 궁전, 로마 바티칸, 아르메니아의 에치미아진에 저마다 '성창'이 전한다.`,
    imageAlt: "기원전 1200~800년 청동기 시대의 구리 합금 창날. 가운데 능선이 있는 긴 잎 모양 날에 나무 자루 일부가 남아 있다.",
    status: "published",
    featured: false,
    source: met(
      470329,
      "Spearhead",
      "Bronze Age",
      "1200–800 BCE",
      "https://images.metmuseum.org/CRDImages/md/original/DT4350.jpg",
      "1998.540.1",
      "Gift of Peter Sharrer, 1998",
    ),
  },
  {
    slug: "seal-of-solomon",
    title: "솔로몬의 반지",
    titleOriginal: "Seal of Solomon",
    gallery: "sacred",
    kind: "jewel",
    owner: "솔로몬 왕",
    maker: "대천사 미카엘이 하늘에서 가져옴",
    power: "반지의 인장으로 악령을 부리고, 짐승과 새의 말을 알아듣는다.",
    firstRecord: "『솔로몬의 유언』",
    recordYear: 300,
    summary: "악령을 부려 성전을 지었다는 지혜의 왕의 인장 반지.",
    story: `외경 『솔로몬의 유언』에 따르면, 예루살렘 성전을 짓던 시절 한 악령이 일꾼 소년의 기운을 밤마다 빨아먹었다. 솔로몬이 기도하자 대천사 미카엘이 하늘에서 인장이 새겨진 반지를 가져다주었다.

반지를 손에 넣은 솔로몬은 악령들을 하나씩 불러내 이름과 약점을 캐묻고 성전 공사에 부렸다. 탈무드에는 악령의 왕 아스모데우스가 반지를 빼앗아 솔로몬을 멀리 내던지고 왕 행세를 했다는 이야기도 있다.

이슬람 전승에서도 반지는 '술레이만의 인장'으로 이어진다. 바람과 진(jinn)을 다스리고 새와 개미의 말을 알아들었다는 이야기가 『천일야화』까지 흘러들었다. 인장의 모양은 오각별 또는 육각별로 그려졌다.

사진은 기원전 14세기 이집트 아마르나 시대의 금 인장 반지다.`,
    imageAlt: "기원전 14세기 이집트의 금 인장 반지. 두꺼운 고리에 문양을 새긴 평평한 인장 면이 붙어 있다.",
    status: "published",
    featured: false,
    source: met(
      549201,
      "Signet ring",
      "Egypt, New Kingdom, Amarna Period",
      "ca. 1347–1330 BCE",
      "https://images.metmuseum.org/CRDImages/eg/original/LC-24_2_8_EGDP030813.jpg",
      "24.2.8",
      "Rogers Fund, 1924",
    ),
  },
  {
    slug: "kusanagi",
    title: "쿠사나기노츠루기",
    titleOriginal: "草薙剣 (Kusanagi-no-Tsurugi)",
    gallery: "japanese",
    kind: "weapon",
    owner: "스사노오, 야마토 타케루",
    maker: "야마타노오로치의 꼬리에서 나옴",
    power: "스스로 풀을 베어 불길을 막아 낸다.",
    firstRecord: "『고사기』",
    recordYear: 712,
    summary: "머리 여덟 달린 뱀의 꼬리에서 나온 검. 일본 왕실의 세 신기(神器) 가운데 하나다.",
    story: `하늘에서 쫓겨난 폭풍의 신 스사노오는 이즈모 땅에서 해마다 딸을 하나씩 잡아먹는 머리 여덟, 꼬리 여덟의 큰 뱀 야마타노오로치를 만났다. 그는 독한 술 여덟 통을 준비해 뱀을 취하게 한 뒤 토막 냈다. 가운데 꼬리를 베자 칼날이 무언가에 부딪혀 이가 빠졌고, 그 안에서 칼 한 자루가 나왔다.

스사노오는 이 칼을 '아메노무라쿠모노츠루기', 곧 하늘의 구름을 모으는 검이라 부르며 누이인 태양의 여신 아마테라스에게 바쳤다.

훗날 영웅 야마토 타케루가 동쪽 정벌에 나섰을 때, 적들이 들판에 불을 질러 그를 가두었다. 그가 칼을 뽑아 둘레의 풀을 베어 내고 맞불을 놓자 불길이 적에게로 돌아섰다. 그때부터 칼은 '풀을 벤 검', 쿠사나기라 불린다. 지금은 나고야의 아쓰타 신궁에 모셔져 있다고 하지만 공개된 적은 없다.

사진은 6세기 일본 고분 시대의 곧은 칼들이다. 『고사기』가 쓰이기 전, 신화 속 영웅들이 들었을 칼은 휘어진 일본도가 아니라 이처럼 곧은 칼이었다.`,
    imageAlt: "6세기 일본 고분 시대의 곧은 쇠칼 일곱 자루가 가로로 나란히 놓여 있다. 녹슨 칼날과 금동 칼집 장식, 둥근 고리 자루 끝이 보인다.",
    status: "published",
    featured: true,
    source: met(
      32359,
      "Sword with Scabbard Mounts",
      "Japanese",
      "6th century",
      "https://images.metmuseum.org/CRDImages/aa/original/DT304541.jpg",
      "32.13.3a, b",
      "Fletcher Fund, 1932",
    ),
  },
  {
    slug: "yata-no-kagami",
    title: "야타노카가미",
    titleOriginal: "八咫鏡 (Yata-no-Kagami)",
    gallery: "japanese",
    kind: "treasure",
    owner: "태양의 여신 아마테라스",
    maker: "거울 만드는 신 이시코리도메",
    power: "동굴에 숨은 태양을 다시 불러낸다.",
    firstRecord: "『고사기』",
    recordYear: 712,
    summary: "세상에 빛을 되돌린 청동 거울. 세 신기 가운데 가장 귀하게 모셔진다.",
    story: `스사노오의 난폭한 행동에 상처 입은 태양의 여신 아마테라스는 하늘의 바위 동굴 아마노이와토에 들어가 문을 닫아 버렸다. 세상은 어둠에 잠기고 온갖 재앙이 일어났다.

신들은 동굴 앞에 모여 꾀를 냈다. 이시코리도메가 거울을 만들고, 다마노오야가 굽은 구슬을 꿰어 나무에 걸었다. 여신 아메노우즈메가 엎은 통 위에서 춤을 추자 신들이 크게 웃었다.

바깥이 왜 즐거운지 궁금해진 아마테라스가 문을 살짝 열자, 신들은 거울을 내밀며 '당신보다 더 귀한 신이 오셨다'고 했다. 거울에 비친 자기 빛에 이끌려 몸을 내민 순간, 힘센 신이 손을 잡아 끌어냈고 세상에 다시 해가 떴다. 거울은 훗날 이세 신궁에 모셔졌다고 전한다.

사진은 4~5세기 일본 고분 시대의 청동 거울 뒷면이다. 한나라 거울을 본떠 신선과 짐승, 우주를 새겼다. 야타노카가미도 이 무렵의 거울과 닮았을 것으로 짐작된다.`,
    imageAlt: "4~5세기 일본의 둥근 청동 거울 뒷면. 가운데 둥근 꼭지를 중심으로 네모와 동심원, 작은 돌기와 짐승 무늬가 겹겹이 새겨져 있고 푸른 녹이 덮여 있다.",
    status: "published",
    featured: false,
    source: met(
      44835,
      "Mirror (Shinjūkyō) Based on Han Dynasty Prototype with Cosmological Design",
      "Japan",
      "4th–5th century",
      "https://images.metmuseum.org/CRDImages/as/original/LC-1975_268_383_001.jpg",
      "1975.268.383",
      "The Harry G. C. Packard Collection of Asian Art, Gift of Harry G. C. Packard, and Purchase, Fletcher, Rogers, Harris Brisbane Dick, and Louis V. Bell Funds, Joseph Pulitzer Bequest, and The Annenberg Fund Inc. Gift, 1975",
    ),
  },
  {
    slug: "manpasikjeok",
    title: "만파식적",
    titleOriginal: "萬波息笛",
    gallery: "korean",
    kind: "treasure",
    owner: "신라 신문왕",
    maker: "바다의 용이 내린 대나무",
    power: "불면 적병이 물러가고, 병이 낫고, 가뭄에 비가 오고, 거센 물결이 잔잔해진다.",
    firstRecord: "일연 『삼국유사』",
    recordYear: 1281,
    summary: "'만 개의 파도를 잠재우는 피리'. 신라를 지킨 나라의 보물이다.",
    story: `682년, 신라 신문왕에게 동해 바다에 작은 산 하나가 떠서 감은사 쪽으로 오가고 있다는 보고가 올라왔다. 산 위에는 낮에는 둘로 갈라지고 밤에는 하나로 합쳐지는 대나무가 자라고 있었다.

왕이 배를 타고 산에 들어가자 용이 나타나 검은 옥대를 바쳤다. 용은 '대나무란 합쳐져야 소리가 나는 것'이라며, 바다의 용이 된 문무왕과 하늘의 신이 된 김유신이 마음을 모아 이 보물을 보냈다고 전했다. 왕은 대나무를 베어 피리를 만들고 월성의 천존고에 간직했다.

이 피리를 불면 적의 군대가 물러가고, 병이 낫고, 가뭄에는 비가 오고 장마에는 날이 개며, 바람이 멎고 물결이 잔잔해졌다. 그래서 이름을 '만 개의 물결을 쉬게 하는 피리', 만파식적이라 했다.

사진은 19세기 일본의 대나무 세로피리 샤쿠하치다. 대나무 뿌리 쪽을 그대로 살린 굵은 끝과 마디가 만파식적 이야기 속 '합쳐져야 소리가 나는 대나무'를 떠올리게 한다.`,
    imageAlt: "19세기 일본의 대나무 세로피리 샤쿠하치. 마디가 있는 황금빛 대나무 관에 손가락 구멍이 뚫려 있고, 아래 끝은 뿌리 쪽이라 굵다.",
    status: "published",
    featured: true,
    source: met(
      500684,
      "Shakuhachi",
      "Japanese",
      "19th century",
      "https://images.metmuseum.org/CRDImages/mi/original/DP-41021-001.jpg",
      "89.4.126",
      "The Crosby Brown Collection of Musical Instruments, 1889",
    ),
  },
  {
    slug: "cheonbuin",
    title: "천부인",
    titleOriginal: "天符印",
    gallery: "korean",
    kind: "treasure",
    owner: "환웅",
    maker: "하늘의 임금 환인",
    power: "하늘의 뜻을 받은 자임을 증명하고, 바람·비·구름을 다스린다.",
    firstRecord: "일연 『삼국유사』 「고조선」",
    recordYear: 1281,
    summary: "환웅이 하늘에서 내려올 때 받은 세 개의 신표. 흔히 청동 검, 거울, 방울로 본다.",
    story: `『삼국유사』의 「고조선」 조에 따르면, 하늘의 임금 환인의 아들 환웅은 자주 하늘 아래 인간 세상에 뜻을 두었다. 아버지는 아들의 뜻을 알고 삼위태백을 내려다본 뒤 '널리 인간을 이롭게 할 만하다'며 천부인 세 개를 주어 내려보냈다.

환웅은 무리 삼천을 이끌고 태백산 꼭대기 신단수 아래로 내려와 그곳을 신시라 불렀다. 바람의 신 풍백, 비의 신 우사, 구름의 신 운사를 거느리고 곡식과 생명, 질병과 형벌, 선과 악을 맡아 다스렸다.

기록은 천부인이 무엇인지 밝히지 않는다. 다만 한반도 청동기 유적에서 청동 검과 거울, 방울이 함께 묻혀 나오는 일이 많아, 하늘의 권위를 상징하는 이 세 가지를 천부인으로 보는 해석이 널리 받아들여진다.

이 이미지는 아카이브가 직접 만든 합성 이미지다. 동아시아의 고대 단검, 한나라 양식의 청동 거울, 야요이 시대의 청동 방울 사진 세 장을 나란히 이어 붙여 '검·거울·방울'을 한 화면에 담았다.`,
    imageAlt: "세 장의 사진을 나란히 이은 합성 이미지. 왼쪽은 금 장식 자루가 달린 고대 동아시아 단검, 가운데는 짐승 무늬를 돋을새김한 둥근 청동 거울, 오른쪽은 푸른 녹이 덮인 종 모양 청동 방울이다.",
    status: "published",
    featured: false,
    source: {
      ...met(
        26566,
        "검·거울·방울 합성 이미지 (Short Sword · Mirror in Han style · Dōtaku)",
        "Eastern Central Asian · China · Japan",
        "ca. 4th century BCE – 2nd century CE",
        "https://images.metmuseum.org/CRDImages/aa/original/DT4337.jpg",
        "1998.418 · 10.70 · 18.68",
        "Composited by RIzer Archive from three CC0 images",
      ),
      parts: [
        {
          objectId: "26566",
          objectTitle: "Short Sword (Duan Jian)",
          objectCulture: "Eastern Central Asian",
          objectDate: "ca. 4th–1st century BCE",
          url: "https://www.metmuseum.org/art/collection/search/26566",
          imageUrl: "https://images.metmuseum.org/CRDImages/aa/original/DT4337.jpg",
          accessionNumber: "1998.418",
          creditLine: "Purchase, Bashford Dean Memorial Collection, Funds from various donors, by exchange, 1998",
        },
        {
          objectId: "61370",
          objectTitle: "Mirror in Han style",
          objectCulture: "China",
          objectDate: "14th–15th century or later",
          url: "https://www.metmuseum.org/art/collection/search/61370",
          imageUrl: "https://images.metmuseum.org/CRDImages/as/original/LC-10_70_001.jpg",
          accessionNumber: "10.70",
          creditLine: "Gift of E. Bischoff, 1910",
        },
        {
          objectId: "44831",
          objectTitle: "Dōtaku (Bronze Bell)",
          objectCulture: "Japan",
          objectDate: "1st–2nd century",
          url: "https://www.metmuseum.org/art/collection/search/44831",
          imageUrl: "https://images.metmuseum.org/CRDImages/as/original/DP325051.jpg",
          accessionNumber: "18.68",
          creditLine: "Rogers Fund, 1918",
        },
      ],
    },
  },
];

export const SEED_ARTIFACTS: SeedArtifact[] = [...FEATURED_ARTIFACTS, ...LEGEND_ARTIFACTS];
