import "server-only";

import { NextResponse, type NextRequest } from "next/server";

import { getPublished, listPublished, parsePublicQuery } from "@/server/artifacts/queries";

/**
 * 공개 API. 공개 사이트가 서버(캐시 태그로 보관)와 브라우저(검색·필터)에서 함께 부른다.
 * CDN에 두지 않는다. 공개 사이트가 알림(revalidate)을 받고 다시 그릴 때 CDN에 남은 옛 응답을 읽으면
 * 저장한 내용이 반영되지 않기 때문이다. 캐시는 공개 사이트 쪽('use cache' + 캐시 태그)이 맡는다.
 */
const CACHE = "no-store";

export async function listHandler(request: NextRequest) {
  const body = await listPublished(parsePublicQuery(request.nextUrl.searchParams));
  return NextResponse.json(body, { headers: { "cache-control": CACHE } });
}

export async function detailHandler(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await getPublished(slug);
  if (!body) return NextResponse.json({ message: "유물을 찾을 수 없습니다." }, { status: 404 });
  return NextResponse.json(body, { headers: { "cache-control": CACHE } });
}

/** 브라우저의 사전 요청(CORS). 허용 헤더는 next.config의 headers()가 붙인다. */
export function optionsHandler() {
  return new Response(null, { status: 204 });
}
