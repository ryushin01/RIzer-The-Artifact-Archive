# 배포

포트폴리오용으로 무료 범위 안에서 운영합니다. 두 앱을 같은 저장소에 연결된 Vercel 프로젝트 둘로 배포하고, `main`에 푸시하면 둘 다 다시 배포됩니다.

| 구성                     | 서비스                                                          | 비고                                                                                                                                                     |
| ------------------------ | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 관리 화면 + 공개 API     | Vercel 프로젝트 `rizer-admin` (Root Directory `apps/admin`)     | https://rizer-admin-ryushin01.vercel.app                                                                                                                 |
| 공개 사이트              | Vercel 프로젝트 `rizer-web` (Root Directory `apps/web`)         | https://rizer-web-ryushin01.vercel.app                                                                                                                   |
| DB                       | Neon PostgreSQL `rizer-db` (Vercel Marketplace, iad1)           | `DATABASE_URL`(pooled)을 쓴다. 관리 화면 함수도 같은 리전(`apps/admin/vercel.json`의 `regions: ["iad1"]`)에서 돌게 해 쿼리마다 태평양을 건너지 않게 한다 |
| 시드 유물의 타일         | 공개 사이트의 정적 파일 `apps/web/public/tiles` (저장소에 포함) | Vercel CDN이 1년 캐시                                                                                                                                    |
| 큐레이터가 올리는 이미지 | Vercel Blob 스토어 `rizer-archive` (공개)                       | 원본은 브라우저가 서명된 주소로 바로 올린다                                                                                                              |

## 시드 타일을 Blob에 두지 않는 이유

Vercel Blob Hobby는 업로드·목록 같은 **고급 작업이 월 2,000회**이고, 넘으면 30일 동안 Blob을 쓸 수 없습니다. 시드 타일은 8,800여 개라 한 번 올리는 것만으로 한도를 넘습니다. 그래서 시드 타일은 저장소에 넣어 공개 사이트가 정적 파일로 내보내고, Blob은 새로 올리는 이미지에만 씁니다.

- 4000px 이미지 한 장을 올리면 타일이 300개 안팎이라 고급 작업 300회쯤을 씁니다. 한 달에 몇 장 정도로 쓴다.
- 시드 이미지를 바꾸면 `pnpm seed:images` → `pnpm --filter @rizer/admin export:seed-tiles`로 `apps/web/public/tiles`와 `apps/admin/src/db/seed-images.json`을 다시 만들어 커밋한다.
- 관리 화면은 `tiles/`로 시작하는 키를 `STATIC_TILES_URL`(기본 `WEB_URL`)로, 나머지 키를 스토리지 공개 주소로 바꾼다(`apps/admin/src/server/storage.ts`).
- 전송 요금이 없는 저장소가 필요해지면 Cloudflare R2(`STORAGE_DRIVER=s3`)로 바꿀 수 있다. 드라이버는 이미 있다.

### 타일을 저장소 밖으로 옮길 때

2026-11-08 기준 시드 타일은 100점, 8,856개, 92MB다. GitHub 권장 한도(1GB)에 한참 못 미치므로 저장소에 둔다. 유물을 크게 늘려 타일이 수백 MB가 되면 옮긴다.

- Git LFS는 쓰지 않는다. 무료 대역폭이 월 1GB라 Vercel이 빌드할 때마다 받으면 금방 넘는다.
- Cloudflare R2(무료 10GB, 쓰기 월 100만 회, 전송 무료)에 `tiles/` 폴더를 그대로 올리고 공개 주소를 연 뒤, 관리 화면의 `STATIC_TILES_URL`만 그 주소로 바꾸면 된다. 키(`tiles/…`)는 그대로라 DB와 코드는 고치지 않는다.
- 공개 사이트에도 같은 `STATIC_TILES_URL`을 넣으면 CSP의 이미지·연결 허용 목록에 들어간다. 그다음 `apps/web/public/tiles`를 지운다.

## 환경 변수

### rizer-admin

| 변수                                                 | 값                                                              |
| ---------------------------------------------------- | --------------------------------------------------------------- |
| `DATABASE_URL`                                       | Neon 연결 시 자동                                               |
| `NEXTAUTH_URL`, `NEXTAUTH_SECRET`                    | `https://rizer-admin-ryushin01.vercel.app`, 임의 문자열         |
| `SEED_DEMO`, `CURATOR_PASSWORD`                      | `1`, 큐레이터 비밀번호                                          |
| `STORAGE_DRIVER`, `BLOB_READ_WRITE_TOKEN`            | `blob`, Blob 스토어 연결 시 자동                                |
| `WEB_URL`, `WEB_REVALIDATE_URL`, `REVALIDATE_SECRET` | 공개 사이트 주소, `…/api/revalidate`, 공개 사이트와 같은 비밀값 |

### rizer-web

| 변수                                             | 값                                                                                                |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| `ARCHIVE_API_URL`, `NEXT_PUBLIC_ARCHIVE_API_URL` | `https://rizer-admin-ryushin01.vercel.app` (`NEXT_PUBLIC_`은 빌드 때 들어가므로 바꾸면 다시 배포) |
| `SITE_URL`                                       | `https://rizer-web-ryushin01.vercel.app`                                                          |
| `STORAGE_DRIVER`                                 | `blob` (CSP에 Blob 공개 도메인을 넣는다)                                                          |
| `REVALIDATE_SECRET`                              | 관리 화면과 같은 값                                                                               |

## 처음 설정할 때 한 일

```bash
vercel api /v11/projects -X POST --input -   # 프로젝트 둘(rootDirectory, GitHub 저장소 연결)
vercel link --project rizer-admin
vercel blob create-store rizer-archive --access public --yes   # rizer-admin에 BLOB_READ_WRITE_TOKEN 연결
vercel integration add neon --name rizer-db --meta region=iad1 --meta auth=false   # 약관 동의는 브라우저에서
vercel api "/v10/projects/<프로젝트>/env?upsert=true" -X POST --input -   # 환경 변수
```

## 배포 순서와 확인

1. 공개 사이트는 관리 화면 API가 꺼져 있어도 빌드된다. 데이터는 요청 때 읽고, 관리 화면이 저장하면 `/api/revalidate`로 캐시를 비운다.
2. 관리 화면에 큐레이터로 들어가 유물 하나를 고치고 저장한 뒤, 공개 사이트의 그 유물 화면을 새로고침하면 바로 바뀌어 있어야 한다.
3. 타일 요청이 `rizer-web-ryushin01.vercel.app/tiles/…`(시드)로 가고 `Cache-Control: immutable`인지 확인한다.

## 디자인 시스템(Storybook)

공개 사이트의 `pnpm build`는 Storybook을 먼저 `apps/web/public/storybook`에 빌드한 뒤 사이트를 빌드합니다. 그래서 같은 주소의 `/storybook`에 함께 배포되고 바닥글의 **디자인 시스템(Storybook)** 링크로 들어갑니다.

- `/storybook`은 정적 파일 폴더라 `/storybook/index.html`로 보냅니다(`next.config.ts`의 `redirects`).
- `/storybook/` 아래만 미리보기 iframe을 위해 `X-Frame-Options: SAMEORIGIN`, `frame-ancestors 'self'`를 쓰고, Storybook에서 `next/font/google`이 받는 Google 글꼴 서버를 허용합니다. 사이트의 나머지 헤더는 그대로입니다.
- `STORYBOOK_IN_APP=1`로 빌드해 `public`(딥줌 타일 약 95MB)을 복사하지 않습니다. 같은 주소에서 열리므로 타일은 사이트의 것을 씁니다.
