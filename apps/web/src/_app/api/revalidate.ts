import "server-only";

import { timingSafeEqual } from "node:crypto";

import { CACHE_TAGS, revalidateRequestSchema } from "@rizer/domain";
import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

const same = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

/**
 * 어드민이 유물을 바꾸면 부르는 캐시 비우기. Authorization: Bearer <REVALIDATE_SECRET>
 * 큐레이터가 저장하고 바로 공개 사이트에서 확인하므로, 오래된 화면을 보여 주지 않고(expire: 0) 다음 요청에서 다시 읽는다.
 */
export async function revalidateHandler(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!secret || !same(token, secret)) return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  const parsed = revalidateRequestSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ message: "bad request" }, { status: 400 });

  revalidateTag(CACHE_TAGS.artifacts, { expire: 0 });
  for (const slug of parsed.data.slugs) revalidateTag(CACHE_TAGS.artifact(slug), { expire: 0 });
  return NextResponse.json({ revalidated: [CACHE_TAGS.artifacts, ...parsed.data.slugs.map(CACHE_TAGS.artifact)] });
}
