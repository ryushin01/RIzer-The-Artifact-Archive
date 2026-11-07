import "server-only";

import type { RevalidateRequest } from "@rizer/domain";

/**
 * 공개 사이트에 캐시를 비우라고 알린다.
 * 응답 뒤(after)에 보내면 서버리스에서 끝나기 전에 함수가 멈추거나, 큐레이터가 바로 공개 사이트를 열 때
 * 이전 화면이 보일 수 있어, 저장 요청 안에서 기다린다(최대 4초).
 * 공개 사이트가 꺼져 있어도 어드민 작업은 성공해야 하므로 실패는 로그만 남긴다.
 */
export async function notifyWeb(slugs: string[]) {
  const url = process.env.WEB_REVALIDATE_URL;
  const secret = process.env.REVALIDATE_SECRET;
  if (!url || !secret) {
    console.warn("[revalidate] WEB_REVALIDATE_URL 또는 REVALIDATE_SECRET이 없어 공개 사이트에 알리지 않았습니다.");
    return;
  }
  const body: RevalidateRequest = { slugs };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${secret}` },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(4000),
      cache: "no-store",
    });
    if (!res.ok) console.warn(`[revalidate] 공개 사이트 응답 ${res.status}`);
  } catch (error) {
    console.warn("[revalidate] 공개 사이트에 알리지 못했습니다.", error instanceof Error ? error.message : error);
  }
}
