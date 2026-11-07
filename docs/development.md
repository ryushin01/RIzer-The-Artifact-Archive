# 개발 가이드

## 준비

- Node.js 24(`.node-version`), pnpm 12(`packageManager`에 고정). 저장소 루트에서 명령을 실행합니다.
- 처음 한 번 `pnpm seed:images`로 시드 유물 16점의 원본을 받아 딥줌 타일로 자릅니다. 결과는 `apps/admin/.data/storage`에 생기고 git에 넣지 않습니다.
  - 원본은 The Met Open Access에서 받아 `apps/admin/.data/originals`에 보관합니다. 다시 실행하면 받은 원본을 재사용합니다.
  - 네트워크 없이 확인하려면 `pnpm --filter @rizer/admin seed:images --synthetic`(무늬 이미지, CI·E2E용).
  - 한 점만: `pnpm --filter @rizer/admin seed:images --only excalibur,gram`
- 개발 DB는 PGlite(`apps/admin/.data/pglite`)입니다. 비어 있으면 시드(계정 2개, 유물 16점, 주석)를 넣고, 이미지가 빈 유물에는 `seed/manifest.json`의 이미지를 붙입니다. 처음부터 다시: `pnpm --filter @rizer/admin db:reset`.

## 명령

| 명령 | 설명 |
|---|---|
| `pnpm dev` | 관리 화면(3000)과 공개 사이트(3001) |
| `pnpm dev:admin` | 관리 화면만 |
| `pnpm typecheck` | TypeScript 7(`tsc7`)로 타입 검사. 도구용 TypeScript는 6입니다(typescript-eslint 호환) |
| `pnpm lint` | ESLint. 앱에는 FSD 경계 규칙(`packages/config/eslint-fsd.mjs`)이 걸려 있습니다 |
| `pnpm test` / `test:coverage` | 단위 테스트(Vitest) |
| `pnpm test:storybook` | 공개 사이트의 모든 스토리를 Chromium에서 그리고 axe 접근성 검사 |
| `pnpm storybook` | Storybook 개발 서버(6006) |
| `pnpm e2e` | 두 앱을 프로덕션 빌드로 띄워 E2E(관리 3100, 공개 3101, 메모리 DB) |
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
| admin | `STORAGE_DRIVER`(`local`·`s3`), `S3_*`, `STORAGE_PUBLIC_URL` | 원본·타일 저장소 |
| admin | `WEB_URL`, `WEB_REVALIDATE_URL`, `REVALIDATE_SECRET` | 공개 사이트 링크와 캐시 비우기 |
| web | `ARCHIVE_API_URL`, `NEXT_PUBLIC_ARCHIVE_API_URL` | 관리 화면의 공개 API(서버·브라우저). `NEXT_PUBLIC_`은 빌드 때 들어갑니다 |
| web | `REVALIDATE_SECRET`, `SITE_URL`, `STORAGE_PUBLIC_URL` | 캐시 비우기, 사이트 주소, 타일 도메인(CSP) |

## 테스트

- **단위(Vitest):** 각 패키지·앱의 `*.test.ts(x)`. 저장소 테스트는 테스트마다 새 메모리 PGlite(`createTestDb`)를 씁니다. 사가는 `redux-saga-test-plan`의 `expectSaga`로 확인합니다.
- **스토리(Storybook + Vitest 브라우저 모드):** 공개 사이트 컴포넌트 옆의 `*.stories.tsx`. `play` 함수와 axe 검사가 실패하면 테스트가 실패합니다. 스토어가 필요한 스토리는 `parameters.store`로 처음 상태를 넘깁니다.
- **E2E(Playwright):** `apps/web/e2e`. 관리 화면에서 만들고 공개하면 공개 사이트에 보이는 흐름까지 확인합니다. 데이터를 바꾸는 테스트는 겹치지 않게 고유한 주소(`Date.now()`)나 다른 유물(뒤랑달)을 씁니다.

## 알려진 함정

| 증상 | 원인 | 해결 |
|---|---|---|
| 개발 서버에서 타일이 404 | HMR로 모듈이 다시 로드되면 `globalThis`에 남은 스토리지 인스턴스가 옛 클래스라 `instanceof`가 틀림 | `/files` 라우트는 `driver` 값으로 판단 |
| 없는 유물인데 상태 코드 200 | Suspense 안에서 스트리밍 중에 `notFound()`가 나오면 상태 코드를 바꿀 수 없음 | 404 화면과 `noindex`가 나오므로 그것으로 확인 |
| 서버 렌더링된 아카이브 목록이 비어 있음 | 스토어를 effect로 채우면 서버 렌더링보다 늦음 | `ArchiveHydrator`·`TourSync`가 처음 마운트할 때 바로 dispatch |
| 개발 모드에서 안내 투어 버튼이 사라짐 | StrictMode가 effect를 떼었다 붙일 때 정리 함수가 주석 목록을 비움 | 붙일 때마다 다시 넣음(`TourSync`) |
| CI에서 공개 사이트 빌드가 404로 굳을 것 같음 | 빌드 때는 관리 화면이 꺼져 있음 | 연결 실패는 `"offline"`으로 구분하고 몇 초만 캐시 |
| 스크립트(tsx)에서 top-level await 오류 | `apps/admin`은 CommonJS 패키지 | 스크립트는 `.mts`로 작성 |
| 주석 개수가 0으로 나옴 | 서브쿼리 안의 `artifacts.id`가 따옴표 없는 `"id"`로 그려져 `annotations.id`로 읽힘 | 테이블 이름을 직접 씀(`repository.ts`) |
