"use client";

import { useEffect } from "react";

import { useMessages } from "@/shared/i18n";

import { NotFoundPage } from "./not-found-page";

/**
 * 404 라우트 화면. 언어별 라우트 그룹의 not-found는 metadata를 내보낼 수 없고(루트만 지원),
 * 없는 주소는 서버가 본문 없는 오류 셸을 보내고 화면을 브라우저에서 그리므로 제목도 화면이 맞춘다(KWCAG 6.4.2).
 * 없는 유물은 `generateMetadata`가 첫 HTML에 같은 제목을 넣는다.
 * `<title>`을 새로 그리면 레이아웃의 제목과 두 개가 되므로 있는 제목의 값만 바꾼다.
 */
export function NotFoundScreen() {
  const t = useMessages().notFound;
  useEffect(() => {
    document.title = t.pageTitle;
  }, [t.pageTitle]);
  return <NotFoundPage />;
}
