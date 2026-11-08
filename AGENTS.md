# RIzer — The Artifact Archive

전설 속 유물을 딥줌으로 보는 전시 사이트(apps/web)와 관리 화면(apps/admin)의 pnpm + Turborepo 모노레포. 한국어 UI. pnpm만 쓰고, 명령은 루트에서 `pnpm --filter <이름>`으로 실행한다.

- 먼저 `README.md`, `docs/development.md`(명령·환경 변수·알려진 함정), `docs/architecture.md`(데이터 흐름·FSD·상태 관리·접근성)를 읽는다.
- Next.js 16.4는 학습 데이터와 다르다. 코드를 쓰기 전에 `apps/<앱>/node_modules/next/dist/docs/`의 해당 문서를 읽는다(Cache Components, `revalidateTag(tag, profile)`, 오류 화면의 `retry` 등).
- FSD 계층 이름은 `_app`, `_pages`. `src/app`의 라우트 파일은 다시 내보내기만 한다. 경계는 `pnpm lint`(ESLint + Steiger)가 강제한다. 한 페이지에서만 쓰는 코드는 그 페이지 슬라이스에 둔다.
- 공개 사이트는 styled-components + Redux Toolkit + redux-saga만 쓴다. 관리 화면은 shadcn/ui(`packages/ui`, Base UI의 `render` prop)만 쓴다. 두 스타일 체계를 섞지 않는다.
- 공개 사이트의 styled 컴포넌트 파일은 `"use client"`다. 서버 컴포넌트는 데이터를 읽어 props로 넘긴다.
- 유물 데이터의 원본은 `packages/domain/src/seed`(카탈로그·주석). 바꾸면 `docs/credits.md`와 영어 번역(`seed/en`)도 맞춘다. 사진은 CC0 소장품만 쓰고 출처(`source`)를 밝힌다.
- DB 스키마(`apps/admin/src/db/schema.ts`)를 바꾸면 `pnpm --filter @rizer/admin db:generate`로 마이그레이션을 만들어 커밋한다.
- 새 UI는 KWCAG 2.2 항목을 직접 점검한다. 스토리(`*.stories.tsx`)와 테스트를 컴포넌트 옆에 둔다.

완료 기준: 루트에서 `pnpm typecheck && pnpm lint && pnpm test && pnpm test:storybook && pnpm e2e && pnpm build`가 모두 통과.
