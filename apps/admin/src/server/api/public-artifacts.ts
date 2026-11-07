import "server-only";

import { NextResponse, type NextRequest } from "next/server";

import { getPublished, listPublished, parsePublicQuery } from "@/server/artifacts/queries";

/**
 * 공개 API. 공개 사이트가 서버(캐시 태그로 보관)와 브라우저(검색·필터)에서 함께 부른다.
 * CDN에는 짧게 두고, 공개 사이트는 어드민의 알림(revalidate)으로 캐시를 비운다.
 */
const CACHE = "public, s-maxage=60, stale-while-revalidate=600";

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
