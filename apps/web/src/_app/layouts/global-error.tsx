"use client";

import { useEffect } from "react";

import { reportError } from "@/shared/lib/monitoring";

/** 루트 레이아웃까지 실패했을 때. 스타일 시스템 없이도 읽히도록 인라인 스타일만 쓴다. */
export function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => reportError(error), [error]);
  return (
    <html lang="ko">
      <body style={{ margin: 0, background: "#050505", color: "#f4f2ee", fontFamily: "system-ui, sans-serif" }}>
        <title>오류 · Rizer Archive</title>
        <main style={{ display: "grid", placeItems: "center", minHeight: "100vh", padding: 16, textAlign: "center" }}>
          <div>
            <h1>화면을 불러오지 못했습니다</h1>
            <p>잠시 후 다시 시도해 주세요.</p>
            <button type="button" onClick={retry} style={{ minHeight: 44, padding: "0 20px" }}>
              다시 시도
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
