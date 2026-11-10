"use client";

import { useEffect } from "react";

import { useMessages } from "@/shared/i18n";

import { NotFoundPage } from "./not-found-page";

/**
 * 404 라우트 화면. 언어별 라우트 그룹의 not-found는 metadata를 내보낼 수 없고(루트만 지원),
 * 운영에서는 미리 그린 404 셸에 본문을 채우므로 제목을 화면이 맞춘다(KWCAG 6.4.2).
 * `<title>`을 새로 그리면 레이아웃의 제목과 두 개가 되므로 있는 제목의 값만 바꾼다.
 */
export function NotFoundScreen() {
  const t = useMessages().notFound;
  useEffect(() => {
    document.title = t.pageTitle;
  }, [t.pageTitle]);
  return <NotFoundPage />;
}
