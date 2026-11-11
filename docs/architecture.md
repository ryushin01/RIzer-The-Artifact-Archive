# 아키텍처

## 앱 구성

```
브라우저 ──▶ apps/web (공개 사이트) ──서버 fetch(캐시 태그)──▶ apps/admin /api/public/*
   │              ▲                                              │
   │              └──── POST /api/revalidate (저장할 때) ◀────────┤
   └── 검색(브라우저 fetch, redux-saga) ─────────────────────────▶│
   └── 딥줌 타일(DZI) ───▶ 시드: 공개 사이트 /tiles 정적 파일 · 새 이미지: 스토리지(Vercel Blob · 개발은 admin /files)
                                                                  │
                                       apps/admin ──▶ PostgreSQL(Neon · 개발은 PGlite)
```

- **관리 화면(apps/admin)이 데이터의 주인입니다.** DB와 스토리지를 쓰고, 공개 사이트가 읽는 공개 API(`/api/public/artifacts`, `/api/public/artifacts/:slug`)를 내보냅니다. 계약 타입은 `packages/domain`의 `api.ts`입니다. 목록은 해설·출처를 뺀 요약만 주고 `limit`·`offset`으로 나눠 받을 수 있습니다(`total`은 전체 개수).
- **공개 사이트(apps/web)는 DB를 모릅니다.** 서버에서 공개 API를 `'use cache'` + `cacheTag`로 읽어 두고, 관리 화면이 저장하면 `/api/revalidate`로 태그를 비웁니다. 개발 중에 PGlite를 한 프로세스만 열게 되는 장점도 있습니다.
- 이미지는 DB에 **스토리지 키**로 저장하고, 공개 API가 응답할 때 공개 주소로 바꿉니다. 스토리지 도메인(개발 포트, Blob 도메인)이 바뀌어도 데이터를 고치지 않습니다. `tiles/`로 시작하는 시드 타일 키는 공개 사이트의 정적 파일 주소로 바꿉니다(Blob 작업 한도 때문, [배포](deployment.md)).

## 화면 구조: Feature-Sliced Design

두 앱 모두 `src` 아래 FSD 계층을 씁니다. Next.js 앱이라 계층 이름은 `_app`, `_pages`이고, `src/app`의 라우트 파일은 `_pages`·`_app`을 다시 내보내기만 합니다. `pnpm lint`가 두 가지로 검사합니다. ESLint(`packages/config/eslint-fsd.mjs`)는 계층 간 import 경계를, Steiger(`steiger.config.mjs`, `fsd/typo-in-layer-name`만 끔)는 공개 API·세그먼트 이름·한 곳에서만 쓰는 슬라이스를 봅니다.

한 페이지에서만 쓰는 코드는 그 페이지 슬라이스에 두고, 두 곳 이상에서 쓰게 되면 `features`·`widgets`로 올립니다.

| 계층 | 공개 사이트 예 | 관리 화면 예 |
|---|---|---|
| `_app` | 루트 레이아웃, 스토어 조립(`model`), styled-components 등록부(`styles`), `/api/revalidate` | 루트·콘솔 레이아웃, 전역 CSS |
| `_pages` | 첫 화면(히어로·고정 문장·컬렉션·전시실·연표·질문), 아카이브(결과 격자), 유물 화면(딥줌 뷰어·해설 패널) | 대시보드(요약 칸), 유물 목록, 유물 편집(폼·업로드·공개·삭제, 서버 액션 `api/`), 주석 편집기, 로그인 |
| `widgets` | 메뉴·진행선, 입장 화면, 커서, 바닥글 | 사이드바·머리글, 유물 표·검색 |
| `features` | 아카이브 검색, 안내 투어, 움직임 설정 (슬라이스 + 사가 + UI) | — |
| `entities` | 유물 카드 | 유물 상태 배지, 사용자 역할 |
| `shared` | 디자인 토큰, API 클라이언트, 기본 UI | 폼 도우미, 오류 화면 |

관리 화면의 서버 코드(DB, 인증, 스토리지, 공개 API)는 FSD 밖 `src/server`, `src/db`에 둡니다.

## 상태 관리: Redux Toolkit + redux-saga (공개 사이트)

| 슬라이스 | 사가가 맡는 비동기 흐름 |
|---|---|
| `archive` | 검색어는 300ms 기다렸다가, 버튼 필터는 바로 불러온다. `takeLatest`로 이전 요청을 취소해 늦게 온 응답이 화면을 덮지 않는다. 끝나면 주소를 `replaceState`로 맞춘다. "더 보기"는 `takeLeading`으로 한 번만 읽어 붙이고(`limit`·`offset`, 주소에는 남기지 않음), 그사이 조건이 바뀌었으면 결과를 버린다 |
| `tour` | 안내 투어: 8초마다 다음 주석. 기다리는 동안 멈춤·직접 선택이 오면 `race`로 투어를 끝낸다(사용자 선택 우선) |
| `motion` | 운영체제의 "동작 줄이기"를 `eventChannel`로 따라가고, 사이트 설정을 저장한 뒤 `html[data-motion]`을 바꾼다 |

스토어는 요청마다 만들고(`makeStore`), 서버에서 읽은 데이터는 `ArchiveHydrator`·`TourSync`가 처음 마운트할 때 바로 넣어 서버 렌더링 결과와 맞춘다.

## 딥줌과 주석

1. 원본을 `packages/tiles`(sharp)가 겹침 1px WebP 타일의 DZI 피라미드로 자른다. 업로드와 시드 이미지는 510px 타일이다(254px보다 파일 수가 약 4분의 1이라 Vercel Blob 업로드 작업 한도를 덜 쓴다). 라이브러리 기본값과 `pnpm tiles` CLI는 254px이다. 미리보기(긴 변 1600px), LQIP(24px data URL), 대표 색도 만든다.
2. 키에 버전(`artifacts/<id>/v<시각>/`)을 넣어, CDN이 1년 캐시해도 새 타일이 바로 보인다. 새로 자르면 이전 버전은 지운다.
3. 운영에서는 브라우저가 서명된 주소로 Vercel Blob(또는 R2)에 원본을 직접 올리고(서버리스 요청 크기 제한 회피), 서버가 타일을 만든다. 80MB를 넘는 원본은 `pnpm tiles` CLI로 자른다.
4. 주석은 W3C Web Annotation의 부분 집합이고, 영역은 **백분율**(`xywh=percent:x,y,w,h`)로 저장한다. 다시 타일링하거나 해상도가 바뀌어도 위치가 맞는다. `toWebAnnotation()`으로 JSON-LD를 내보낼 수 있다.
5. 공개 사이트는 OpenSeadragon 위에 주석마다 실제 `<button>`을 얹는다. 관리 화면은 Annotorious로 사각형을 그리고 고친다.

## 언어판 (한국어·영어)

- **주소:** 한국어는 그대로, 영어는 `/en/...`이다. `<html lang>`이 달라야 하므로 라우트 그룹 `src/app/(ko)`와 `src/app/en`이 각자 루트 레이아웃을 갖는다. 언어를 바꾸는 링크는 루트 레이아웃이 달라 전체 페이지로 이동한다(`<a>`).
- **화면 전환:** SSGOI가 맡는다. 각 언어의 라우트 그룹 `(site)` 레이아웃(`_app/layouts/page-transitions.tsx`)이 `Ssgoi`와 `SsgoiRouteBoundary`를 둔다. 유물 카드 사진(`data-zoom-exit-key`)과 상세 화면의 딥줌 뷰어 틀(`data-zoom-enter-key`)에 같은 slug를 달아, 아카이브와 관련 유물에서 카드가 뷰어로 커진다. SSGOI는 누른 요소가 아니라 같은 키의 첫 요소에서 커지므로, 같은 유물이 두 번 나오는 첫 화면(히어로 바로가기·컬렉션)은 fade로 둔다. 규칙은 `page-transitions.config.ts`에 있고, `/en` 접두어는 middleware로 떼고 비교한다.
  - 경계는 `usePathname()` 때문에 Suspense를 품는다. 그 안에서 `notFound()`가 나면 응답이 이미 시작돼 200이 되므로, 없는 주소(`[...missing]`)는 `(site)` 바깥에 둔다.
  - SSGOI는 `prefers-reduced-motion`을 스스로 읽지 않는다. 움직임 설정(`selectReducedMotion`)이 꺼짐이면 전환이 없는 설정으로 바꾼다.
- **화면 문구:** `shared/i18n/messages.ts`의 사전과 `useMessages()`를 쓴다. 번역 도구를 넣지 않은 것은 Cache Components와 맞추려면 요청 정보를 읽지 않는 편이 단순하기 때문이다. 언어는 라우트가 정적으로 넘긴다.
- **유물 내용:** 번역 원본은 `packages/domain/src/seed/en`이다. 공개 API는 `locale=en`일 때 **DB 값이 시드 한국어와 같은 필드만** 번역으로 바꾼다. 큐레이터가 고친 내용을 낡은 번역으로 덮지 않기 위해서이고, 제목이나 해설이 번역되지 않으면 `contentLang: "ko"`로 알려 화면에 `lang`을 표시한다.
- **영어 검색:** DB에 영어가 없으므로 `searchEnglish()`가 시드 번역에서 찾은 slug를 저장소 질의의 `alsoSlugs`·`rankSlugs`로 넘긴다.

## 접근성 (KWCAG 2.2)

- **키보드:** 딥줌 사진은 화살표·+/−·0으로 조작하고, 주석 번호는 Tab으로 지나가는 버튼이다. 관리 화면의 주석은 끌기 없이 '보이는 영역으로 추가'와 숫자 입력으로도 만든다(6.5.1 단일 포인터).
- **정지:** 스크롤 연출, 히어로 자동 전환, 안내 투어, 커서 효과는 메뉴의 움직임 버튼이나 운영체제 설정으로 멈춘다(6.2.2).
- **대체 텍스트:** 유물마다 사진 속 실제 물건을 설명하는 `imageAlt`가 있다. 뷰어는 초점을 받는 요소를 품고 있어 `role="img"` 대신 설명 글을 둔다.
- **대비:** 본문 4.5:1 이상. 붉은 강조색(`accent`)은 큰 글자·도형에만, 작은 글자는 `accentText`. 밝은 FAQ 섹션은 초점 표시를 파랑으로 바꾼다.
- **검증:** 스토리 테스트와 E2E가 axe로 검사한다. axe 통과가 KWCAG 준수를 보장하지는 않으므로 33개 항목을 직접 점검해 [점검 기록](accessibility.md)에 남긴다.

## 보안

- 두 앱 모두 `packages/config/security-headers.mjs`의 CSP를 쓴다. 이미지·연결은 공개 API와 타일 도메인만 허용한다.
- 관리 화면만 `'unsafe-eval'`을 허용한다. 주석 편집기(Annotorious)가 자기 번들에 넣은 PixiJS가 eval로 셰이더 코드를 만들어, 외부 패치(`@pixi/unsafe-eval`)를 쓸 수 없기 때문이다. 외부 스크립트는 여전히 막혀 있다.
- 공개 API는 공개 상태의 유물만 내보내고 CORS는 읽기(`GET`)만 연다. `/api/revalidate`는 Bearer 비밀값을 시간 차 없는 비교로 확인한다.
- 스토리지 키는 `safeKey`로 경로 조작(`../`)을 막는다. 업로드는 형식(JPG·PNG·WebP·TIFF)과 크기(80MB)를 서버에서 다시 확인한다.
