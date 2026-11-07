"use client";

import { NotFoundPage } from "@/_pages/not-found";
import { Button } from "@/shared/ui";

/** 화면을 그리다 오류가 나면. 오류 번호(digest)는 서버 로그와 같다. */
export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  const digest = error instanceof Error ? (error as Error & { digest?: string }).digest : undefined;
  return (
    <NotFoundPage
      title="Broken Seal"
      message={`화면을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.${digest ? ` (오류 번호 ${digest})` : ""}`}
      action={
        <Button type="button" $variant="light" onClick={retry}>
          다시 시도
        </Button>
      }
    />
  );
}
