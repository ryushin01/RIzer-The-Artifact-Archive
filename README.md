# RIzer — The Artifact Archive

[![CI](https://github.com/ryushin01/RIzer-The-Artifact-Archive/actions/workflows/ci.yml/badge.svg)](https://github.com/ryushin01/RIzer-The-Artifact-Archive/actions/workflows/ci.yml)
![version](https://img.shields.io/badge/version-0.1.0-e2283c)
![Storybook](https://img.shields.io/badge/Storybook-10-FF4785?logo=storybook&logoColor=white)

엑스칼리버, 성배, 묠니르 같은 전설 속 유물 16점을 고해상도 딥줌으로 확대해 보고, 사진의 부분마다 달린 해설을 읽는 온라인 전시실입니다. 큐레이터는 관리 화면에서 유물·해설·이미지 주석을 편집합니다.

> **프로젝트 상태:** 포트폴리오 프로젝트입니다(배포 준비 중). 전설 속 유물은 실물이 없으므로, 모습이 닮은 실제 소장품의 공개 도메인(CC0) 사진을 빌려 쓰고 출처를 화면에 밝힙니다. 해설·주석·합성 이미지는 이 프로젝트에서 새로 만들었습니다.

## 화면

사진은 [메트로폴리탄 미술관 Open Access](https://www.metmuseum.org/hubs/open-access)(CC0)이고, 계정·주석은 개발용 시드 데이터입니다.

### 공개 사이트

| 첫 화면 | 컬렉션 |
|---|---|
| ![LEGENDS ARCHIVED 제목과 대표 유물 사진이 천천히 확대되는 첫 화면](docs/images/web-hero.jpg) | ![전설 유물 카드가 가로로 이어지는 컬렉션 섹션](docs/images/web-collection.jpg) |

| 딥줌 뷰어와 주석 | 합성 이미지(천부인) |
|---|---|
| ![성배 사진의 포도 덩굴 부분으로 확대하고 오른쪽에 해설을 보여 주는 유물 화면](docs/images/web-viewer.jpg) | ![검·거울·방울 사진 세 장을 이은 10199px 합성 이미지와 주석 번호](docs/images/web-composite.jpg) |

| 아카이브 검색 | 입장 화면 | 모바일 |
|---|---|---|
| ![북유럽 신화 전시실로 거른 유물 카드 목록과 검색 필터](docs/images/web-archive.jpg) | ![RIZER와 ARCHIVE 사이의 붉은 입장 버튼](docs/images/web-gate.jpg) | <img src="docs/images/web-mobile.jpg" alt="모바일의 엑스칼리버 딥줌 뷰어와 주석 번호" width="220"> |

### 관리 화면

| 주석 편집기 | 대시보드 |
|---|---|
| ![방패 사진 위에 영역을 그리고 오른쪽 목록에서 제목·설명·좌표를 고치는 주석 편집기](docs/images/admin-annotations.jpg) | ![유물·공개·딥줌 이미지·주석 수와 최근 수정한 유물 표](docs/images/admin-dashboard.jpg) |

## 주요 기능

| 영역 | 내용 |
|---|---|
| 공개 사이트 | 입장 화면, 스크롤 연출(고정 문장·컬렉션·여섯 전시실·첫 기록 연표·질문), 아카이브 검색(검색어·전시실·종류·정렬, 주소 동기화) |
| 딥줌 뷰어 | DZI 타일, 키보드 확대·이동, 주석 번호 버튼, 안내 투어(자동 재생·멈춤), 미니맵, 전체 화면 |
| 관리 화면 | 유물 작성·수정·공개·삭제, 원본 업로드와 타일 생성, 주석 편집기(끌어서 그리기 + 키보드용 '보이는 영역으로 추가'·숫자 입력), 게스트(읽기 전용) 계정 |
| 연동 | 관리 화면에서 저장하면 공개 사이트 캐시를 바로 비운다(캐시 태그) |
| 접근성 | 본문 바로가기, 움직임 끄기(KWCAG 6.2.2), 색 대비 4.5:1, 스토리·E2E axe 검사 |

## 기술 스택

![React, Next.js, TypeScript, Redux, styled-components, Tailwind CSS, PostgreSQL, pnpm, Vitest, Vercel, Cloudflare](https://skillicons.dev/icons?i=react,nextjs,ts,redux,styledcomponents,tailwind,postgres,pnpm,vitest,vercel,cloudflare)

| 구분 | 사용 기술 |
|---|---|
| 공통 | pnpm 워크스페이스 + Turborepo, Next.js 16 (App Router, Cache Components), React 19, TypeScript, zod |
| 공개 사이트 | styled-components, Redux Toolkit + redux-saga, OpenSeadragon, Pretendard·Unbounded·Space Mono |
| 관리 화면 | shadcn/ui(Base UI) + Tailwind CSS 4, Drizzle ORM + PostgreSQL(개발·테스트는 PGlite), Auth.js, Annotorious |
| 이미지 | sharp(DZI 타일·미리보기·LQIP), S3 호환 스토리지(Cloudflare R2) |
| 품질 | ESLint(FSD 경계 규칙), Vitest + Testing Library, redux-saga-test-plan, Storybook 10 스토리 테스트(axe), Playwright E2E, GitHub Actions |

## 시작하기

Node.js 24(`.node-version`)와 pnpm 12가 필요합니다.

```bash
pnpm install
pnpm seed:images   # 시드 유물 16점의 원본을 받아 딥줌 타일로 자른다(처음 한 번, 몇 분)
pnpm dev           # 관리 화면 http://localhost:3000, 공개 사이트 http://localhost:3001
```

관리 화면은 **게스트로 둘러보기**(읽기 전용) 또는 `curator@rizer.dev` / `rizer1234`(개발용)로 들어갑니다.

| 명령 | 설명 |
|---|---|
| `pnpm typecheck` / `lint` / `test` | 타입 검사 / 린트 / 단위 테스트 (전체 앱·패키지) |
| `pnpm test:storybook` | 모든 스토리를 Chromium에서 그리고 접근성 검사 |
| `pnpm e2e` | 두 앱을 프로덕션 빌드로 띄워 E2E 검사 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm tiles <원본> <출력 폴더>` | 큰 원본을 로컬에서 딥줌 타일로 자르기 |

## 프로젝트 구조

```
apps/
├─ web/        공개 사이트 (3001) — styled-components, Redux + saga, 딥줌 뷰어, E2E(e2e/)
└─ admin/      관리 화면·공개 API (3000) — shadcn/ui, Drizzle, Auth.js, 주석 편집기
packages/
├─ domain/     유물·주석(W3C Web Annotation) 스키마, 공개 API 계약, 시드 유물 16점
├─ tiles/      sharp 딥줌 타일 생성과 CLI
├─ storage/    로컬·S3(R2) 스토리지
├─ ui/         shadcn/ui 컴포넌트와 테마 (관리 화면)
└─ config/     tsconfig, ESLint(FSD 경계), 보안 헤더
```

## 문서

| 문서 | 내용 |
|---|---|
| [개발 가이드](docs/development.md) | 명령, 환경 변수, 시드 이미지, 테스트 |
| [아키텍처](docs/architecture.md) | 앱 구성, 데이터 흐름, 딥줌·주석, 상태 관리, 접근성 |
| [배포](docs/deployment.md) | Vercel + Neon + Cloudflare R2 설정 |
| [이미지 출처](docs/credits.md) | 유물별 사진 출처와 라이선스 |
| [변경 기록](CHANGELOG.md) | 버전별 변경 사항 |
