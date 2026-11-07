# 아키텍처

## 앱 구성

```
브라우저 ──▶ apps/web (공개 사이트) ──서버 fetch(캐시 태그)──▶ apps/admin /api/public/*
   │              ▲                                              │
   │              └──── POST /api/revalidate (저장할 때) ◀────────┤
   └── 검색(브라우저 fetch, redux-saga) ─────────────────────────▶│
   └── 딥줌 타일(DZI) ───▶ 스토리지(R2 공개 도메인 · 개발은 admin /files)
                                                                  │
                                       apps/admin ──▶ PostgreSQL(Neon · 개발은 PGlite)
```

- **관리 화면(apps/admin)이 데이터의 주인입니다.** DB와 스토리지를 쓰고, 공개 사이트가 읽는 공개 API(`/api/public/artifacts`, `/api/public/artifacts/:slug`)를 내보냅니다. 계약 타입은 `packages/domain`의 `api.ts`입니다.
- **공개 사이트(apps/web)는 DB를 모릅니다.** 서버에서 공개 API를 `'use cache'` + `cacheTag`로 읽어 두고, 관리 화면이 저장하면 `/api/revalidate`로 태그를 비웁니다. 개발 중에 PGlite를 한 프로세스만 열게 되는 장점도 있습니다.
- 이미지는 DB에 **스토리지 키**로 저장하고, 공개 API가 응답할 때 공개 주소로 바꿉니다. 스토리지 도메인(개발 포트, R2 도메인)이 바뀌어도 데이터를 고치지 않습니다.

## 화면 구조: Feature-Sliced Design

두 앱 모두 `src` 아래 FSD 계층을 씁니다. Next.js 앱이라 계층 이름은 `_app`, `_pages`이고, `src/app`의 라우트 파일은 `_pages`·`_app`을 다시 내보내기만 합니다. 경계는 `packages/config/eslint-fsd.mjs`가 `pnpm lint`에서 강제합니다.

| 계층 | 공개 사이트 예 | 관리 화면 예 |
|---|---|---|
| `_app` | 루트 레이아웃, 스토어 조립, styled-components 등록부, `/api/revalidate` | 루트·콘솔 레이아웃, 전역 CSS |
| `_pages` | 첫 화면, 아카이브, 유물 화면 | 대시보드, 유물 목록·편집, 주석 편집 |
| `widgets` | 히어로, 고정 문장, 컬렉션, 딥줌 뷰어, 해설 패널 | 사이드바, 유물 표 |
| `features` | 아카이브 검색, 안내 투어, 움직임 설정 (슬라이스 + 사가 + UI) | 유물 관리, 이미지 업로드, 주석 편집 (서버 액션 + UI) |
| `entities` | 유물 카드 | 유물 상태 배지, 사용자 역할 |
| `shared` | 디자인 토큰, API 클라이언트, 기본 UI | 폼 도우미, 오류 화면 |

관리 화면의 서버 코드(DB, 인증, 스토리지, 공개 API)는 FSD 밖 `src/server`, `src/db`에 둡니다.

## 상태 관리: Redux Toolkit + redux-saga (공개 사이트)

| 슬라이스 | 사가가 맡는 비동기 흐름 |
|---|---|
| `archive` | 검색어는 300ms 기다렸다가, 버튼 필터는 바로 불러온다. `takeLatest`로 이전 요청을 취소해 늦게 온 응답이 화면을 덮지 않는다. 끝나면 주소를 `replaceState`로 맞춘다 |
| `tour` | 안내 투어: 8초마다 다음 주석. 기다리는 동안 멈춤·직접 선택이 오면 `race`로 투어를 끝낸다(사용자 선택 우선) |
| `motion` | 운영체제의 "동작 줄이기"를 `eventChannel`로 따라가고, 사이트 설정을 저장한 뒤 `html[data-motion]`을 바꾼다 |

스토어는 요청마다 만들고(`makeStore`), 서버에서 읽은 데이터는 `ArchiveHydrator`·`TourSync`가 처음 마운트할 때 바로 넣어 서버 렌더링 결과와 맞춘다.

## 딥줌과 주석

1. 원본을 `packages/tiles`(sharp)가 254px+겹침 1px WebP 타일의 DZI 피라미드로 자른다. 미리보기(긴 변 1600px), LQIP(24px data URL), 대표 색도 만든다.
2. 키에 버전(`artifacts/<id>/v<시각>/`)을 넣어, CDN이 1년 캐시해도 새 타일이 바로 보인다. 새로 자르면 이전 버전은 지운다.
3. 운영에서는 브라우저가 서명된 주소로 R2에 원본을 직접 올리고(서버리스 요청 크기 제한 회피), 서버가 타일을 만든다. 80MB를 넘는 원본은 `pnpm tiles` CLI로 자른다.
4. 주석은 W3C Web Annotation의 부분 집합이고, 영역은 **백분율**(`xywh=percent:x,y,w,h`)로 저장한다. 다시 타일링하거나 해상도가 바뀌어도 위치가 맞는다. `toWebAnnotation()`으로 JSON-LD를 내보낼 수 있다.
5. 공개 사이트는 OpenSeadragon 위에 주석마다 실제 `<button>`을 얹는다. 관리 화면은 Annotorious로 사각형을 그리고 고친다.

## 접근성 (KWCAG 2.2)

- **키보드:** 딥줌 사진은 화살표·+/−·0으로 조작하고, 주석 번호는 Tab으로 지나가는 버튼이다. 관리 화면의 주석은 끌기 없이 '보이는 영역으로 추가'와 숫자 입력으로도 만든다(6.5.1 단일 포인터).
- **정지:** 스크롤 연출, 히어로 자동 전환, 안내 투어, 커서 효과는 메뉴의 움직임 버튼이나 운영체제 설정으로 멈춘다(6.2.2).
- **대체 텍스트:** 유물마다 사진 속 실제 물건을 설명하는 `imageAlt`가 있다. 뷰어는 초점을 받는 요소를 품고 있어 `role="img"` 대신 설명 글을 둔다.
- **대비:** 본문 4.5:1 이상. 붉은 강조색(`accent`)은 큰 글자·도형에만, 작은 글자는 `accentText`. 밝은 FAQ 섹션은 초점 표시를 파랑으로 바꾼다.
- **검증:** 스토리 테스트와 E2E가 axe로 검사한다. axe 통과가 KWCAG 준수를 보장하지는 않으므로 위 항목은 직접 점검한다.

## 보안

- 두 앱 모두 `packages/config/security-headers.mjs`의 CSP를 쓴다. 이미지·연결은 공개 API와 타일 도메인만 허용한다.
- 공개 API는 공개 상태의 유물만 내보내고 CORS는 읽기(`GET`)만 연다. `/api/revalidate`는 Bearer 비밀값을 시간 차 없는 비교로 확인한다.
- 스토리지 키는 `safeKey`로 경로 조작(`../`)을 막는다. 업로드는 형식(JPG·PNG·WebP·TIFF)과 크기(80MB)를 서버에서 다시 확인한다.
