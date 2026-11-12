#!/bin/sh
# Lighthouse CI용 서버. 공개 사이트는 어드민 API에서 유물을 읽으므로 E2E처럼 두 앱을 함께 띄운다.
# 포트와 환경 변수는 e2e/env.ts와 같다(CI는 작업 환경 변수로 넣는다). 둘 다 응답하면 준비 문구를 찍는다.
set -e
pnpm --dir ../admin start --port 3180 &
pnpm start --port 3181 &
until curl -sf -o /dev/null http://localhost:3180/login && curl -sf -o /dev/null http://localhost:3181/; do sleep 1; done
echo "lighthouse servers ready"
wait
