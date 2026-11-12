# 개발 가이드

## 준비

- Node.js 24(`.node-version`), pnpm 12(`packageManager`에 고정). 저장소 루트에서 명령을 실행합니다.
- 시드 유물의 타일은 저장소(`apps/web/public/tiles`)에 들어 있어, 받은 그대로 실행해도 이미지가 보입니다. 원본부터 다시 만들려면 `pnpm seed:images`로 원본을 받아 `apps/admin/.data/storage`에 자르고(git에 넣지 않음), 공개용으로 바꿀 때는 `pnpm --filter @rizer/admin export:seed-tiles`로 정적 타일과 `src/db/seed-images.json`을 다시 만듭니다. 이유는 [배포](deployment.md)를 보세요.
  - 원본은 The Met·클리블랜드 미술관 Open Access에서 받아 `apps/admin/.data/originals`에 보관합니다. 다시 실행하면 받은 원본을 재사용합니다.
  - 네트워크 없이 확인하려면 `pnpm --filter @rizer/admin seed:images --synthetic`(무늬 이미지, CI·E2E용).
  - 한 점만: `pnpm --filter @rizer/admin seed:images --only excalibur,gram`
  - 새로 추가한 시드 유물만: `pnpm --filter @rizer/admin seed:images --missing` (기본 타일 510px, 긴 변 최대 3000px)
  - 시드 유물을 추가하면 이미 데이터가 있는 DB에도 서버가 시작할 때 없는 슬러그만 골라 넣습니다(주석 포함).
  - 카탈로그의 해설·출처·사진·주석을 고치면, 시드로 넣은 뒤 아무도 고치지 않은 유물(수정 시각 = 생성 시각)은 서버가 시작할 때 맞춰집니다. 큐레이터가 고친 유물은 건드리지 않습니다.
- 개발 DB는 PGlite(`apps/admin/.data/pglite`)입니다. 비어 있으면 시드(계정 2개, 유물 전부, 주석)를 넣고, 이미지가 빈 유물에는 `seed/manifest.json`의 이미지를 붙입니다. 처음부터 다시: `pnpm --filter @rizer/admin db:reset`.

## 명령

| 명령 | 설명 |
|---|---|
| `pnpm dev` | 관리 화면(3000)과 공개 사이트(3001) |
| `pnpm dev:admin` | 관리 화면만 |
| `pnpm typecheck` | TypeScript 7(`tsc7`)로 타입 검사. 도구용 TypeScript는 6입니다(typescript-eslint 호환) |
| `pnpm lint` | ESLint(FSD 경계 규칙 `packages/config/eslint-fsd.mjs`)와 Steiger(FSD 구조 검사) |
| `pnpm test` / `test:coverage` | 단위 테스트(Vitest) |
| `pnpm test:storybook` | 공개 사이트의 모든 스토리를 Chromium에서 그리고 axe 접근성 검사 |
| `pnpm storybook` | Storybook 개발 서버(6006) |
| `pnpm e2e` | 두 앱을 프로덕션 빌드로 띄워 E2E(관리 3180, 공개 3181, 메모리 DB) |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm tiles <원본> <출력 폴더> [이름]` | 큰 원본을 로컬에서 타일로 자른다 |
| `pnpm --filter @rizer/admin db:generate` | `src/db/schema.ts`를 바꾼 뒤 마이그레이션 SQL 생성(커밋한다) |

작업을 마치면 루트에서 `pnpm typecheck && pnpm lint && pnpm test && pnpm test:storybook && pnpm e2e && pnpm build`를 모두 통과시킵니다. CI(`.github/workflows/ci.yml`)도 같은 순서로 돕니다.

## 계정

| 계정 | 비밀번호 | 권한 |
|---|---|---|
| `guest@rizer.dev` | `guest1234` (로그인 화면의 **게스트로 둘러보기**) | 모든 화면 보기. 저장·삭제·업로드는 거절 |
| `curator@rizer.dev` | 개발 `rizer1234`, 운영은 `CURATOR_PASSWORD` | 편집 |

로그인을 15분 안에 5번 틀리면 그 이메일은 15분 동안 잠깁니다.

## 환경 변수

개발 값은 각 앱의 `.env.development`에 있고, 운영 값의 목록은 `.env.example`에 있습니다.

| 앱 | 변수 | 설명 |
|---|---|---|
| admin | `DATABASE_URL` | 비우면 PGlite |
| admin | `NEXTAUTH_URL`, `NEXTAUTH_SECRET` | 로그인 |
| admin | `SEED_DEMO`, `CURATOR_PASSWORD` | 운영에서 시드를 넣을지, 큐레이터 비밀번호 |
| admin | `STORAGE_DRIVER`(`local`·`s3`·`blob`), `S3_*`·`BLOB_READ_WRITE_TOKEN`, `STORAGE_PUBLIC_URL` | 원본·타일 저장소 |
| admin | `STATIC_TILES_URL` | 시드 타일(`tiles/…`)을 내보내는 곳. 기본 `WEB_URL` |
| admin | `WEB_URL`, `WEB_REVALIDATE_URL`, `REVALIDATE_SECRET` | 공개 사이트 링크와 캐시 비우기 |
| web | `ARCHIVE_API_URL`, `NEXT_PUBLIC_ARCHIVE_API_URL` | 관리 화면의 공개 API(서버·브라우저). `NEXT_PUBLIC_`은 빌드 때 들어갑니다 |
| web | `REVALIDATE_SECRET`, `SITE_URL`, `STORAGE_PUBLIC_URL` | 캐시 비우기, 사이트 주소, 타일 도메인(CSP) |

## 테스트

- **단위(Vitest):** 각 패키지·앱의 `*.test.ts(x)`. 저장소 테스트는 테스트마다 새 메모리 PGlite(`createTestDb`)를 씁니다. 사가는 `redux-saga-test-plan`의 `expectSaga`로 확인합니다.
- **스토리(Storybook + Vitest 브라우저 모드):** 공개 사이트 컴포넌트 옆의 `*.stories.tsx`. `play` 함수와 axe 검사가 실패하면 테스트가 실패합니다. 스토어가 필요한 스토리는 `parameters.store`로 처음 상태를 넘깁니다.
- **E2E(Playwright):** `apps/web/e2e`. 관리 화면에서 만들고 공개하면 공개 사이트에 보이는 흐름까지 확인합니다. 데이터를 바꾸는 테스트는 겹치지 않게 고유한 주소(`Date.now()`)나 다른 유물(뒤랑달)을 씁니다.

## 성능 측정

첫 화면의 Lighthouse 12 결과입니다. 로컬 프로덕션 빌드에서 3회 재어 성능 점수의 중앙값을 적었습니다(2026-11-08). 로컬과 운영의 값은 서로 비교하지 않습니다.

| | 모바일 성능 | 모바일 LCP | 데스크톱 성능 | 데스크톱 전송량 | 권장사항 |
|---|---|---|---|---|---|
| 고치기 전 | 58 | 8.9초 | 92 | 1707KB | 93 |
| 고친 뒤 | 57 | 8.9초 | 93 | 1077KB | 96 |

- 고친 것: 히어로의 나머지 슬라이드와 첫 화면 아래 카드를 미리 받지 않음, 첫 사진에 `fetchpriority="high"`, 파비콘 추가.
- 운영(Vercel) 첫 화면, 2026-11-10, 3회 중앙값: 모바일 성능 95(LCP 2.3초), 데스크톱 100, 접근성 100, 권장사항 96, SEO 100. 같은 날 배포 전 0.4.0 운영은 모바일 63, 데스크톱 93이었습니다.
- 로컬 측정에서는 모바일 점수가 달라지지 않았습니다. Lantern 모의 측정에서는 한글 글꼴(Pretendard 조각 27개, 약 720KB)이 가장 큰 비용입니다. 스로틀 없이 잰 실제 첫 페인트는 0.2초입니다.

## 알려진 함정

| 증상 | 원인 | 해결 |
|---|---|---|
| 개발 서버에서 타일이 404 | HMR로 모듈이 다시 로드되면 `globalThis`에 남은 스토리지 인스턴스가 옛 클래스라 `instanceof`가 틀림 | `/files` 라우트는 `driver` 값으로 판단 |
| 없는 유물인데 상태 코드 200 | Suspense 안에서 스트리밍 중에 `notFound()`가 나오면 상태 코드를 바꿀 수 없음 | 404 화면과 `noindex`가 나오므로 그것으로 확인 |
| 서버 렌더링된 아카이브 목록이 비어 있음 | 스토어를 effect로 채우면 서버 렌더링보다 늦음 | `ArchiveHydrator`·`TourSync`가 처음 마운트할 때 바로 dispatch |
| 개발 모드에서 안내 투어 버튼이 사라짐 | StrictMode가 effect를 떼었다 붙일 때 정리 함수가 주석 목록을 비움 | 붙일 때마다 다시 넣음(`TourSync`) |
| CI에서 공개 사이트 빌드가 404로 굳을 것 같음 | 빌드 때는 관리 화면이 꺼져 있음 | 연결 실패는 `"offline"`으로 구분하고 몇 초만 캐시 |
| CI 빌드만 `Route "/": encountered uncached or runtime data during prerendering` | 관리 화면이 꺼져 있으면 목록을 몇 초만 캐시해 요청 때 데이터가 되는데, Suspense 밖에서 읽음. 로컬은 `.next/cache`에 남은 데이터 때문에 드러나지 않음 | 데이터를 읽는 부분을 Suspense 안에 둔다(`HomePage`의 `Exhibition`). 확인은 `.next`를 지우고 빌드 |
| 운영에서만 주석 편집기가 "does not allow unsafe-eval" | Annotorious 번들 안의 PixiJS가 eval을 씀. 개발 모드 CSP는 eval을 허용해 드러나지 않음 | 관리 화면 CSP에만 `allowEval`. E2E가 주석 편집기의 페이지 오류를 확인한다 |
| 운영에서 저장해도 공개 사이트가 그대로 | 알림은 닿지만, 공개 사이트가 다시 그릴 때 CDN에 남은 공개 API의 옛 응답(`s-maxage=60`)을 읽음 | 공개 API는 `no-store`. 캐시는 공개 사이트의 `use cache` + 태그가 맡는다. 알림도 저장 요청 안에서 기다린다(최대 4초) |
| Vercel 배포에서만 CSP에 공개 사이트 주소가 빠짐 | Vercel이 Turborepo로 빌드하면 `turbo.json`에 적지 않은 환경 변수는 빌드에 넘어가지 않음 | 빌드 때 읽는 변수(`next.config.ts`의 CSP 등)는 `turbo.json`의 `build.env`에 적는다 |
| 영어판에 한국어 해설이 나옴 | 시드 한국어를 고치면 번역 대조가 어긋나 해당 필드는 한국어로 남음(의도한 동작) | 시드를 고칠 때 `packages/domain/src/seed/en`의 번역도 맞춘다 |
| 라우트 파일을 옮긴 뒤 `.next/dev/types`에서 타입 오류 | 옛 경로의 생성 타입이 남음 | `apps/web/.next/dev`를 지우고 다시 검사 |
| 운영 404 화면 제목이 사이트 기본 제목으로 나옴 | `metadata`는 루트 `app/not-found`만 지원. 언어별 라우트 그룹의 not-found에서 내보낸 값은 운영의 미리 그린 404 셸에 빠짐(로컬 `next start`에서는 우연히 보임) | `NotFoundScreen`이 `document.title`을 맞춘다. `<title>`을 새로 그리면 제목 요소가 두 개가 됨 |
| 스크립트(tsx)에서 top-level await 오류 | `apps/admin`은 CommonJS 패키지 | 스크립트는 `.mts`로 작성 |
| 주석 개수가 0으로 나옴 | 서브쿼리 안의 `artifacts.id`가 따옴표 없는 `"id"`로 그려져 `annotations.id`로 읽힘 | 테이블 이름을 직접 씀(`repository.ts`) |

## 품질 예산

- **번들 크기:** `pnpm --filter @rizer/web size`가 공개 사이트 전체 JS 440 kB, CSS 96 kB(gzip)를 넘으면 실패합니다. 기준은 `.size-limit.json`에 있습니다.
- **Lighthouse:** `pnpm --filter @rizer/web lhci`가 공개 사이트의 첫 화면·유물 목록·엑스칼리버 상세·영문 첫 화면이 데스크톱 기준 성능 90·접근성 100·권장 사항 95·SEO 90점, LCP 2.5초·TBT 200ms·CLS 0.1 이하인지 3번씩 재서 확인합니다. 기준은 `lighthouserc.json`에 있습니다.
- **접근성 린트:** `eslint-config-next`는 jsx-a11y 규칙을 몇 개만 켭니다. 플러그인은 이미 등록되어 있어 `eslint.config`에서 recommended 규칙만 더해 모두 켭니다.

공개 사이트는 어드민 API에서 유물을 읽으므로 Lighthouse는 `apps/web/scripts/lighthouse-servers.sh`로 E2E와 같은 포트·환경 값(`e2e/env.ts`)에서 두 앱을 함께 띄웁니다.

두 검사 모두 프로덕션 빌드가 먼저 있어야 하며, CI는 빌드 뒤에 돌립니다.

## 모니터링

공개 사이트(`apps/web`)는 `instrumentation-client.ts`에서 `shared/lib/monitoring`을 켜고, Sentry와 web-vitals는 나중에 따로 받습니다.

| 환경 변수 | 내용 |
| --- | --- |
| `NEXT_PUBLIC_SENTRY_DSN` | 있으면 처리하지 못한 오류와 나쁜(poor) Web Vitals를 Sentry로 보냅니다. 없으면 Sentry를 번들에 넣지 않고, 개발 모드에서 Web Vitals를 콘솔에만 찍습니다 |

- Sentry에는 오류 내용만 보내고 사용자 정보·쿠키·헤더·쿼리 문자열, 방문 기록(세션), 이동·클릭 기록(브레드크럼), 콘솔 기록은 모으지 않습니다. Sentry를 받기 전에 난 오류는 모아 두었다가 처리되지 않은 오류로 보냅니다.
- 쓰는 함수만 `sentry.ts`에서 다시 내보내 약 31 kB(gzip)로 받습니다. 모듈 전체를 불러오면 리플레이·피드백까지 들어가 140 kB가 됩니다.
- 브라우저 오류만 모읍니다. 서버에서 난 오류는 호스팅(Vercel 등)의 로그로 확인합니다.
