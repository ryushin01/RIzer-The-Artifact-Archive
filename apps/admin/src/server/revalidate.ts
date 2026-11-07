import "server-only";

import type { RevalidateRequest } from "@rizer/domain";
import { after } from "next/server";

/**
 * 공개 사이트에 캐시를 비우라고 알린다. 응답을 늦추지 않도록 응답을 보낸 뒤(after) 보낸다.
 * 공개 사이트가 꺼져 있어도 어드민 작업은 성공해야 하므로 실패는 로그만 남긴다.
 */
export function notifyWeb(slugs: string[]) {
  const url = process.env.WEB_REVALIDATE_URL;
  const secret = process.env.REVALIDATE_SECRET;
  if (!url || !secret) return;
  const body: RevalidateRequest = { slugs };
  after(async () => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${secret}` },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) console.warn(`[revalidate] 공개 사이트 응답 ${res.status}`);
    } catch (error) {
      console.warn("[revalidate] 공개 사이트에 알리지 못했습니다.", error instanceof Error ? error.message : error);
    }
  });
}
