import "server-only";

import { CACHE_TAGS, type ArtifactDetailResponse, type ArtifactListResponse, type ArtifactQuery } from "@rizer/domain";
import { cacheLife, cacheTag } from "next/cache";

import { fetchArtifact, fetchArtifacts } from "./archive";

/**
 * 서버에서 읽는 공개 API. 결과를 캐시해 두고, 어드민이 바꾸면 /api/revalidate로 태그를 비운다.
 * 어드민에 닿지 못하면(빌드 중 꺼져 있음 등) 빈 결과를 짧게만 캐시해, 다음 요청에서 다시 시도한다.
 */
export async function getArtifacts(query: Partial<ArtifactQuery> = {}): Promise<ArtifactListResponse & { offline?: boolean }> {
  "use cache";
  cacheTag(CACHE_TAGS.artifacts);
  try {
    const result = await fetchArtifacts(query);
    cacheLife("days");
    return result;
  } catch (error) {
    console.warn("[archive] 공개 API에 닿지 못했습니다:", error instanceof Error ? error.message : error);
    cacheLife("seconds");
    return { items: [], total: 0, offline: true };
  }
}

/** 유물 하나. 없으면 null, 어드민에 닿지 못하면 "offline"(404로 굳지 않게 짧게만 캐시한다). */
export async function getArtifact(slug: string): Promise<ArtifactDetailResponse | null | "offline"> {
  "use cache";
  cacheTag(CACHE_TAGS.artifacts, CACHE_TAGS.artifact(slug));
  try {
    const result = await fetchArtifact(slug);
    cacheLife("days");
    return result;
  } catch (error) {
    console.warn(`[archive] ${slug}을(를) 불러오지 못했습니다:`, error instanceof Error ? error.message : error);
    cacheLife("seconds");
    return "offline";
  }
}
