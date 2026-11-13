"use client";

import { useEffect } from "react";

import { useMessages } from "@/shared/i18n";
import { reportError } from "@/shared/lib/monitoring";
import { Button } from "@/shared/ui";

import { NotFoundPage } from "./not-found-page";

/** 화면을 그리다 오류가 나면. 오류 번호(digest)는 서버 로그와 같다. */
export function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  const t = useMessages().notFound;
  const digest = error instanceof Error ? (error as Error & { digest?: string }).digest : undefined;
  useEffect(() => reportError(error), [error]);
  return (
    <NotFoundPage
      title="Broken Seal"
      message={`${t.error}${digest ? t.errorCode(digest) : ""}`}
      action={
        <Button type="button" $variant="light" onClick={retry}>
          {t.retry}
        </Button>
      }
    />
  );
}
