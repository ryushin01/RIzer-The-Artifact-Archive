#!/bin/sh
# Lighthouse CI용 서버. 공개 사이트는 어드민 API에서 유물을 읽으므로 E2E처럼 두 앱을 함께 띄운다.
# 실행 값은 e2e/env.ts와 같다. CI는 작업 환경 변수로 넣고, 로컬에서는 아래 기본값을 쓴다.
# NEXT_PUBLIC_ 값은 빌드할 때 굳으므로, 로컬에서는 같은 값을 넣고 빌드해야 한다(docs/development.md).
set -e
: "${PGLITE_DATA_DIR:=memory://}" "${SEED_DEMO:=1}" "${CURATOR_PASSWORD:=e2e-curator-pass}"
: "${NEXTAUTH_URL:=http://localhost:3180}" "${NEXTAUTH_SECRET:=e2e-only-secret}"
: "${WEB_URL:=http://localhost:3181}" "${WEB_REVALIDATE_URL:=http://localhost:3181/api/revalidate}"
: "${REVALIDATE_SECRET:=e2e-revalidate-secret}" "${ARCHIVE_API_URL:=http://localhost:3180}" "${SITE_URL:=http://localhost:3181}"
export PGLITE_DATA_DIR SEED_DEMO CURATOR_PASSWORD NEXTAUTH_URL NEXTAUTH_SECRET WEB_URL WEB_REVALIDATE_URL REVALIDATE_SECRET ARCHIVE_API_URL SITE_URL

pnpm --dir ../admin start --port 3180 &
pnpm start --port 3181 &
until curl -sf -o /dev/null http://localhost:3180/login && curl -sf -o /dev/null http://localhost:3181/; do sleep 1; done
echo "lighthouse servers ready"
wait
