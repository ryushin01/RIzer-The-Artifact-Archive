# 배포

포트폴리오용으로 무료 범위 안에서 운영하는 구성입니다. 두 앱을 Vercel 프로젝트 둘로 나누어 배포합니다.

| 구성 | 서비스 | 비고 |
|---|---|---|
| 관리 화면 + 공개 API | Vercel (Root Directory `apps/admin`) | `DATABASE_URL`이 있으면 PostgreSQL을 쓴다 |
| 공개 사이트 | Vercel (Root Directory `apps/web`) | 빌드 때 관리 화면 API가 꺼져 있어도 빌드는 성공하고, 요청 때 다시 읽는다 |
| DB | Neon PostgreSQL | 처음 연결할 때 마이그레이션을 적용하고, `SEED_DEMO=1`이면 시드를 넣는다 |
| 원본·타일 | Cloudflare R2 + 공개 도메인 | 전송 요금이 없어 타일 요청이 많아도 비용이 늘지 않는다 |

## 1. Cloudflare R2

1. 버킷을 만들고(예: `rizer`) 공개 도메인(또는 r2.dev 주소)을 켠다. 이 주소가 `STORAGE_PUBLIC_URL`이다.
2. API 토큰(Object Read & Write)을 만든다 → `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`. 엔드포인트는 `https://<account-id>.r2.cloudflarestorage.com`.
3. CORS: 공개 사이트·관리 화면이 타일을 읽고, 관리 화면이 서명된 주소로 원본을 올린다.

```json
[
  {
    "AllowedOrigins": ["https://<web 도메인>", "https://<admin 도메인>"],
    "AllowedMethods": ["GET", "PUT"],
    "AllowedHeaders": ["content-type"],
    "MaxAgeSeconds": 86400
  }
]
```

4. 로컬에서 운영 스토리지로 시드 이미지를 올린다. `apps/admin/.env.local`에 `STORAGE_DRIVER=s3`와 `S3_*`, `STORAGE_PUBLIC_URL`을 넣고 `pnpm seed:images`.

## 2. Neon

프로젝트를 만들고 pooled 연결 문자열을 `DATABASE_URL`로 쓴다. 마이그레이션은 관리 화면이 처음 DB를 열 때 적용한다.

## 3. Vercel — 관리 화면

| 변수 | 값 |
|---|---|
| `DATABASE_URL` | Neon 연결 문자열 |
| `NEXTAUTH_URL` | `https://<admin 도메인>` |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `SEED_DEMO` | `1` |
| `CURATOR_PASSWORD` | 큐레이터 비밀번호(비우면 큐레이터 계정을 만들지 않음) |
| `STORAGE_DRIVER`, `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `STORAGE_PUBLIC_URL` | R2 |
| `WEB_URL`, `WEB_REVALIDATE_URL` | `https://<web 도메인>`, `https://<web 도메인>/api/revalidate` |
| `REVALIDATE_SECRET` | 공개 사이트와 같은 임의 문자열 |

빌드 명령은 Vercel이 Turborepo를 감지해 정한다(`turbo run build --filter=@rizer/admin`). 큰 원본의 타일링은 Vercel 함수의 최대 실행 시간(플랜마다 다르다. 업로드 라우트는 `maxDuration = 300`) 안에서 끝나야 하므로, 아주 큰 원본은 `pnpm tiles`로 잘라 올린다.

## 4. Vercel — 공개 사이트

| 변수 | 값 |
|---|---|
| `ARCHIVE_API_URL`, `NEXT_PUBLIC_ARCHIVE_API_URL` | `https://<admin 도메인>` |
| `REVALIDATE_SECRET` | 관리 화면과 같은 값 |
| `SITE_URL` | `https://<web 도메인>` |
| `STORAGE_PUBLIC_URL` | R2 공개 도메인(CSP에 넣는다) |

`NEXT_PUBLIC_` 값은 빌드 때 들어가므로 바꾸면 다시 배포한다.

## 확인

1. 관리 화면에 큐레이터로 들어가 유물 하나를 고치고 저장한다.
2. 공개 사이트의 그 유물 화면을 새로고침하면 바로 바뀌어 있어야 한다(관리 화면 → `/api/revalidate`).
3. 브라우저 개발자 도구에서 타일 요청이 R2 공개 도메인으로 가는지, `Cache-Control: immutable`인지 본다.
