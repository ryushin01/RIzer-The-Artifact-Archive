import type { Locale } from "@rizer/domain";

/** 공개 사이트의 화면 문구. 유물 내용은 공개 API가 언어에 맞춰 준다. */
const ko = {
  meta: {
    title: "Rizer — 전설 유물 아카이브",
    description:
      "엑스칼리버, 성배, 묠니르. 전설 속 유물을 초고해상도 딥줌으로 확대해 보고 부분마다 달린 해설을 읽는 온라인 전시실.",
    ogLocale: "ko_KR",
    archiveTitle: "아카이브",
    archiveDescription:
      "세계 곳곳의 전설 속 유물을 이름, 전시실, 종류로 찾아봅니다.",
    artifactFallback: "유물",
    ogAlt: "Rizer Archive 유물 공유 이미지",
    ogFallbackTitle: "전설 속 유물",
    ogFallbackPower:
      "전설 속 유물을 딥줌으로 확대해 보고 해설을 읽는 온라인 전시실",
  },
  newWindow: " (새 창)",
  skipLink: "본문 바로가기",
  nav: {
    label: "주 메뉴",
    home: "Rizer 첫 화면",
    collection: "컬렉션",
    realms: "전시실",
    timeline: "연표",
    faq: "질문",
    archive: "아카이브",
    switchTo: "English",
  },
  gate: { title: "Rizer — 전설 유물 아카이브", enter: "아카이브 입장" },
  motion: {
    label: "움직임 효과",
    on: "움직임 효과 켜기",
    off: "움직임 효과 끄기",
  },
  footer: {
    before:
      "전설 속 유물은 실물이 없습니다. 이 아카이브의 사진은 모습이 닮은 실제 소장품을 빌려 썼으며, 모두 ",
    met: "메트로폴리탄 미술관",
    and: "과 ",
    cleveland: "클리블랜드 미술관",
    after:
      "의 Open Access(CC0) 자료입니다. 해설과 주석은 이 프로젝트에서 새로 썼습니다.",
    admin: "관리 화면 데모",
    storybook: "디자인 시스템(Storybook)",
    language: "English",
  },
  hero: {
    lead: "엑스칼리버, 성배, 묠니르. 이야기로만 전하던 세계 곳곳의 전설 속 유물을 초고해상도로 확대해 보고, 부분마다 달린 해설을 읽는 온라인 전시실입니다.",
    enter: "아카이브 입장",
    nowViewing: (title: string) => `지금 보는 유물: ${title}`,
  },
  statement: {
    title:
      "전설이 남긴 것이 한 자루의 검, 하나의 잔, 하나의 성물이라면 — 그 모습을 가까이 들여다볼 수 있다면",
    words: ["한 자루의 검", "하나의 잔", "하나의 성물"],
  },
  collection: {
    title: "먼저 만나는 대표 유물",
    description:
      "아서왕의 검부터 신라의 피리까지, 전설을 대표하는 유물부터 소개합니다. 카드를 골라 딥줌 뷰어로 들어가면 사진의 아주 작은 부분까지 확대해 볼 수 있습니다.",
    prev: "이전 유물들",
    next: "다음 유물들",
    list: "유물 목록",
    findAll: (total: number) => `전체 ${total}점 아카이브에서 찾기`,
  },
  realms: {
    title: "열 갈래의 신화, 열 개의 전시실",
    description:
      "유물은 처음 등장한 신화와 전설에 따라 전시실로 나뉩니다. 전시실을 고르면 그 전설의 유물만 모아 봅니다.",
    soon: "준비 중",
    more: (names: string, rest: number) => `${names} 외 ${rest}점`,
  },
  map: {
    title: "전설이 전해진 곳",
    description:
      "대서양 끝의 섬에서 동해까지, 유물 이야기가 전해진 땅입니다. 이름을 고르면 그 전시실로 들어갑니다.",
  },
  timeline: {
    title: "처음 글로 남은 순간",
    description:
      "전설은 입에서 입으로 먼저 전해졌습니다. 이 연표는 각 유물이 문헌에 처음 기록된 때를 따라갑니다.",
    eras: "시대",
    all: "전체",
    ancient: "기원전",
    classical: "1~1000년",
    medieval: "1001~1500년",
    modern: "1501년 이후",
  },
  faq: {
    title: "전설을 전시하는 방법에 대한 질문",
    items: [
      {
        q: "이 유물들은 실제로 있나요?",
        a: "아니요. 엑스칼리버, 성배, 묠니르 같은 유물은 신화와 전설 속에만 있습니다. 이 아카이브는 '전설이 실물을 남겼다면'이라는 상상에서 출발한 가상 전시입니다. 해설은 각 전설을 처음 기록한 문헌을 바탕으로 썼습니다.",
      },
      {
        q: "그럼 사진 속 물건은 무엇인가요?",
        a: "모습이 닮은 실제 박물관 소장품입니다. 예를 들어 성배 자리에는 한때 '진짜 성배'로 소개된 6세기 비잔티움의 안티오크 성배를, 쿠사나기 자리에는 6세기 일본의 곧은 칼들을 두었습니다. 유물 화면의 '이미지 출처'에서 실제 소장품 이름과 소장처를 확인할 수 있습니다. 천부인은 세 소장품 사진을 이어 붙인 합성 이미지입니다.",
      },
      {
        q: "사진을 어떻게 그렇게 크게 확대할 수 있나요?",
        a: "원본 사진을 256~512픽셀 조각(타일) 수백~수천 개로 잘라 여러 배율로 저장해 두는 '딥줌' 방식을 씁니다. 화면에 보이는 부분의 조각만 내려받기 때문에, 원본이 커도 처음 화면은 가볍게 열리고 확대할수록 선명한 조각이 채워집니다.",
      },
      {
        q: "이미지를 가져다 써도 되나요?",
        a: "사진은 모두 메트로폴리탄 미술관과 클리블랜드 미술관이 공개 도메인(CC0)으로 내놓은 자료라 자유롭게 쓸 수 있습니다. 다만 해설과 주석, 합성 이미지는 이 프로젝트에서 만든 것입니다.",
      },
      {
        q: "주석은 누가 다나요?",
        a: "큐레이터가 관리 화면에서 사진 위에 영역을 그리고 설명을 씁니다. 관리 화면은 게스트 계정으로 둘러볼 수 있습니다.",
      },
      {
        q: "움직임이 불편해요.",
        a: "아래 메뉴의 물결 모양 버튼으로 스크롤 연출, 자동 전환, 커서 효과를 모두 멈출 수 있습니다. 운영체제에서 '동작 줄이기'를 켜 두었다면 처음부터 멈춘 상태로 보입니다.",
      },
    ],
  },
  cta: {
    button: "아카이브 둘러보기",
    caption: "검, 잔, 반지, 피리. 전설이 남긴 것들을 가까이에서 들여다보세요.",
  },
  count: (n: number) => `${n}점`,
  archive: {
    lead: "세계 곳곳의 전설 속 유물을 이름, 전시실, 종류로 찾아봅니다. 카드를 고르면 딥줌 뷰어가 열립니다.",
    loading: "유물을 불러오는 중…",
    searchLabel: "유물 검색",
    search: "검색",
    placeholder: "이름, 해설, 주석까지 — 예: 무지개",
    kind: "종류",
    allKinds: "모든 종류",
    sort: "정렬",
    sortFeatured: "대표 유물 먼저",
    sortOldest: "오래된 기록순",
    sortNewest: "최근 기록순",
    sortTitle: "이름순",
    gallery: "전시실",
    allGalleries: "전체",
    searching: "찾는 중…",
    total: (n: number) => `유물 ${n}점`,
    clear: "조건 지우기",
    results: "검색 결과",
    retry: "다시 시도",
    empty:
      "조건에 맞는 유물이 없습니다. 검색어를 줄이거나 다른 전시실을 골라 보세요.",
    shown: (total: number, shown: number) => `${total}점 중 ${shown}점`,
    more: "유물 더 보기",
    moreLoading: "불러오는 중…",
    moreError: "더 불러오지 못했습니다. 버튼을 다시 눌러 주세요.",
    moreDone: (added: number, total: number, shown: number) =>
      `${added}점을 더 불러왔습니다. ${total}점 중 ${shown}점을 보고 있습니다.`,
    loadError: "유물 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
  },
  card: { firstRecord: (year: string) => `${year} 첫 기록` },
  artifact: {
    offline: "아카이브에 잠시 연결할 수 없습니다. 잠시 후 새로고침해 주세요.",
    preparing: "이미지를 준비하고 있습니다.",
    loading: "유물을 불러오는 중…",
    back: "아카이브",
    owner: "소유자",
    maker: "만든 이",
    firstRecord: "첫 기록",
    gallery: "전시실",
    notes: "사진 속 주석",
    story: "해설",
    credit: "이미지 출처",
    composite: (n: number) =>
      `아래 소장품 사진 ${n}장을 이어 붙여 이 아카이브가 만든 합성 이미지입니다.`,
    photoBefore: "사진은 ",
    photoAfter:
      "입니다. 전설 속 유물의 모습을 떠올리게 하는 실제 소장품입니다.",
    related: (gallery: string) => `${gallery}의 다른 유물`,
    untranslated: "",
  },
  viewer: {
    label: (title: string) => `${title} 딥줌 뷰어`,
    photo: "사진",
    hint: "사진에 초점을 두고 화살표 키로 움직이고, 더하기·빼기 키로 확대하고 축소합니다. 왼쪽 아래 이동 버튼으로도 옮길 수 있습니다. 사진 위 번호 버튼을 누르면 그 부분의 해설로 확대합니다.",
    marker: (n: number, title: string) => `주석 ${n}: ${title}`,
    zoomGroup: "확대·축소",
    zoomIn: "확대",
    zoomOut: "축소",
    home: "전체 보기",
    fullscreen: "전체 화면",
    panGroup: "사진 이동",
    panLeft: "왼쪽으로 이동",
    panUp: "위로 이동",
    panDown: "아래로 이동",
    panRight: "오른쪽으로 이동",
  },
  tour: {
    label: "안내 투어",
    play: "안내 투어 재생",
    pause: "투어 멈춤",
    prev: "이전 주석",
    next: "다음 주석",
    count: (n: number) => `주석 ${n}개`,
    markers: "주석 표시",
    copy: "이 주석 링크 복사",
    copied: "이 주석으로 오는 링크를 복사했습니다.",
    copyFailed: "복사하지 못했습니다. 주소 표시줄의 주소를 복사해 주세요.",
  },
  notFound: {
    pageTitle: "페이지를 찾을 수 없습니다 · Rizer Archive",
    message:
      "찾는 유물이 아카이브에 없습니다. 주소가 바뀌었거나 아직 공개하지 않은 유물입니다.",
    action: "아카이브로 가기",
    error: "화면을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
    errorCode: (code: string) => ` (오류 번호 ${code})`,
    retry: "다시 시도",
  },
};

export type Messages = typeof ko;

const en: Messages = {
  meta: {
    title: "Rizer — The Artifact Archive",
    description:
      "Excalibur, the Holy Grail, Mjölnir. Zoom deep into legendary artifacts and read the story behind every detail in this online gallery.",
    ogLocale: "en_US",
    archiveTitle: "Archive",
    archiveDescription:
      "Search legendary artifacts from around the world by name, gallery and type.",
    artifactFallback: "Artifact",
    ogAlt: "Rizer Archive artifact share image",
    ogFallbackTitle: "Legendary Artifact",
    ogFallbackPower:
      "An online gallery for zooming into legendary artifacts and reading their stories",
  },
  newWindow: " (opens in a new window)",
  skipLink: "Skip to main content",
  nav: {
    label: "Main menu",
    home: "Rizer home",
    collection: "Collection",
    realms: "Galleries",
    timeline: "Timeline",
    faq: "FAQ",
    archive: "Archive",
    switchTo: "한국어",
  },
  gate: { title: "Rizer — The Artifact Archive", enter: "Enter the archive" },
  motion: {
    label: "Motion effects",
    on: "Turn motion effects on",
    off: "Turn motion effects off",
  },
  footer: {
    before:
      "Legendary artifacts have no physical originals. The photographs here borrow real museum objects that resemble them, all from the Open Access (CC0) collections of ",
    met: "The Metropolitan Museum of Art",
    and: " and ",
    cleveland: "The Cleveland Museum of Art",
    after: ". The commentary and annotations were written for this project.",
    admin: "Admin demo",
    storybook: "Design system (Storybook)",
    language: "한국어",
  },
  hero: {
    lead: "Excalibur, the Holy Grail, Mjölnir. Zoom deep into artifacts that survive only in stories from around the world, and read the commentary attached to every detail.",
    enter: "Enter the archive",
    nowViewing: (title: string) => `Now showing: ${title}`,
  },
  statement: {
    title:
      "If a legend left behind a blade, a vessel, a relic — and you could look at it up close",
    words: ["A single blade", "A single cup", "A sacred relic"],
  },
  collection: {
    title: "Start with the highlights",
    description:
      "From King Arthur's sword to the flute of Silla, begin with the artifacts that define their legends. Choose a card to open the deep zoom viewer and explore the smallest details of the photograph.",
    prev: "Previous artifacts",
    next: "Next artifacts",
    list: "Artifact list",
    findAll: (total: number) => `Search all ${total} in the archive`,
  },
  realms: {
    title: "Ten mythologies, ten galleries",
    description:
      "Artifacts are grouped by the myths and legends in which they first appear. Choose a gallery to see only that tradition.",
    soon: "Coming soon",
    more: (names: string, rest: number) => `${names} and ${rest} more`,
  },
  map: {
    title: "Where the legends were told",
    description:
      "From islands at the edge of the Atlantic to the shores of East Asia, these are the lands that told these stories. Choose a name to enter its gallery.",
  },
  timeline: {
    title: "When they were first written down",
    description:
      "Legends passed from mouth to mouth long before anyone wrote them down. This timeline follows the moment each artifact first appears in a text.",
    eras: "Era",
    all: "All",
    ancient: "BCE",
    classical: "1–1000",
    medieval: "1001–1500",
    modern: "After 1500",
  },
  faq: {
    title: "Questions about exhibiting legends",
    items: [
      {
        q: "Do these artifacts really exist?",
        a: "No. Objects like Excalibur, the Holy Grail and Mjölnir exist only in myth and legend. This archive is an imaginary exhibition that begins with the question, “What if legends had left physical objects behind?” The commentary is based on the earliest texts that record each legend.",
      },
      {
        q: "Then what is in the photographs?",
        a: "Real museum objects that resemble them. The Holy Grail, for example, is represented by the sixth-century Byzantine Antioch “Chalice,” once promoted as the true Grail, and Kusanagi by straight swords from sixth-century Japan. The “Image credit” section on each artifact page names the real object and its museum. Cheonbuin is a composite made from photographs of three objects.",
      },
      {
        q: "How can the photographs zoom so far?",
        a: "Each photograph is cut into hundreds or thousands of 256–512 pixel tiles at several scales, a technique called deep zoom. Only the tiles on screen are downloaded, so even a very large image opens quickly and sharpens as you zoom.",
      },
      {
        q: "May I reuse the images?",
        a: "The photographs are public domain (CC0) releases from The Metropolitan Museum of Art and The Cleveland Museum of Art, so you may use them freely. The commentary, annotations and composite images were created for this project.",
      },
      {
        q: "Who writes the annotations?",
        a: "A curator draws regions on the photograph and writes the notes in the admin screen. You can browse the admin screen with a guest account.",
      },
      {
        q: "The motion bothers me.",
        a: "The wave button in the menu below stops scroll effects, automatic transitions and the cursor effect. If reduced motion is turned on in your operating system, the site starts with them stopped.",
      },
    ],
  },
  cta: {
    button: "Browse the archive",
    caption:
      "Blades, cups, rings, flutes. Take a closer look at what legend left behind.",
  },
  count: (n: number) => String(n),
  archive: {
    lead: "Search legendary artifacts from around the world by name, gallery and type. Choose a card to open the deep zoom viewer.",
    loading: "Loading artifacts…",
    searchLabel: "Search artifacts",
    search: "Search",
    placeholder: "Names, stories and notes — try: rainbow",
    kind: "Type",
    allKinds: "All types",
    sort: "Sort",
    sortFeatured: "Highlights first",
    sortOldest: "Oldest record first",
    sortNewest: "Latest record first",
    sortTitle: "Name",
    gallery: "Gallery",
    allGalleries: "All",
    searching: "Searching…",
    total: (n: number) => `${n} artifact${n === 1 ? "" : "s"}`,
    clear: "Clear filters",
    results: "Search results",
    retry: "Try again",
    empty: "No artifacts match. Try a shorter search or another gallery.",
    shown: (total: number, shown: number) => `Showing ${shown} of ${total}`,
    more: "Show more artifacts",
    moreLoading: "Loading…",
    moreError: "Could not load more. Please press the button again.",
    moreDone: (added: number, total: number, shown: number) =>
      `Loaded ${added} more. Showing ${shown} of ${total}.`,
    loadError:
      "Could not load the artifact list. Please try again in a moment.",
  },
  card: { firstRecord: (year: string) => `First recorded ${year}` },
  artifact: {
    offline:
      "The archive is temporarily unavailable. Please refresh in a moment.",
    preparing: "The image is being prepared.",
    loading: "Loading artifact…",
    back: "Archive",
    owner: "Owner",
    maker: "Maker",
    firstRecord: "First record",
    gallery: "Gallery",
    notes: "Notes on the photograph",
    story: "Story",
    credit: "Image credit",
    composite: (n: number) =>
      `A composite image made by this archive from the ${n} museum photographs below.`,
    photoBefore: "The photograph shows ",
    photoAfter: ", a real museum object that evokes the legendary artifact.",
    related: (gallery: string) => `More from ${gallery}`,
    untranslated:
      "This entry has not been translated yet and appears in Korean.",
  },
  viewer: {
    label: (title: string) => `Deep zoom viewer: ${title}`,
    photo: "Photograph",
    hint: "Focus the photograph, then use the arrow keys to pan and the plus and minus keys to zoom. The buttons at the lower left also move it. Press a numbered button on the photograph to zoom to that note.",
    marker: (n: number, title: string) => `Note ${n}: ${title}`,
    zoomGroup: "Zoom",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    home: "Show whole image",
    fullscreen: "Full screen",
    panGroup: "Move the photograph",
    panLeft: "Move left",
    panUp: "Move up",
    panDown: "Move down",
    panRight: "Move right",
  },
  tour: {
    label: "Guided tour",
    play: "Play guided tour",
    pause: "Pause tour",
    prev: "Previous note",
    next: "Next note",
    count: (n: number) => `${n} note${n === 1 ? "" : "s"}`,
    markers: "Show notes",
    copy: "Copy link to this note",
    copied: "Copied a link to this note.",
    copyFailed: "Could not copy. Please copy the address from the address bar.",
  },
  notFound: {
    pageTitle: "Page not found · Rizer Archive",
    message:
      "This artifact is not in the archive. The address may have changed, or it has not been published yet.",
    action: "Go to the archive",
    error:
      "Something went wrong loading this page. Please try again in a moment.",
    errorCode: (code: string) => ` (error ${code})`,
    retry: "Try again",
  },
};

export const MESSAGES: Record<Locale, Messages> = { ko, en };
