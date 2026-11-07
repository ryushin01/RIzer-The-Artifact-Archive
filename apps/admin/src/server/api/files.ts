import "server-only";

import { Readable } from "node:stream";

import { contentTypeOf } from "@rizer/tiles";
import type { LocalStorage } from "@rizer/storage";
import type { NextRequest } from "next/server";

import { getStorage } from "@/server/storage";

/**
 * 로컬 스토리지 파일을 내보낸다(개발·E2E). 운영(R2)에서는 공개 도메인이 직접 내보내므로 404.
 * 캐시 헤더는 next.config의 headers()가 붙인다.
 */
export async function filesHandler(_request: NextRequest, { params }: { params: Promise<{ key: string[] }> }) {
  // instanceof 대신 driver로 고른다. 개발 서버가 모듈을 다시 불러오면 globalThis에 남은 인스턴스는 옛 클래스라 instanceof가 틀린다.
  const storage = getStorage();
  if (storage.driver !== "local") return new Response("Not Found", { status: 404 });
  const local = storage as LocalStorage;
  const { key } = await params;
  const path = key.map(decodeURIComponent).join("/");
  let file;
  try {
    file = await local.stream(path);
  } catch {
    return new Response("Bad Request", { status: 400 });
  }
  if (!file) return new Response("Not Found", { status: 404 });
  return new Response(Readable.toWeb(file.stream) as ReadableStream, {
    headers: { "content-type": contentTypeOf(path), "content-length": String(file.size) },
  });
}
