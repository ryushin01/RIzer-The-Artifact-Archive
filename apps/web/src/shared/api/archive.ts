import { PUBLIC_API, type ArtifactDetailResponse, type ArtifactListResponse, type ArtifactQuery } from "@rizer/domain";

import { apiBase } from "../config/env";

/** 검색 조건을 주소 쿼리로. 기본값(정렬 featured)과 빈 값은 뺀다. */
export function toSearchParams(query: Partial<ArtifactQuery>): URLSearchParams {
  const params = new URLSearchParams();
  if (query.q) params.set("q", query.q);
  if (query.gallery) params.set("gallery", query.gallery);
  if (query.kind) params.set("kind", query.kind);
  if (query.sort && query.sort !== "featured") params.set("sort", query.sort);
  return params;
}

export class ArchiveApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

async function getJson<T>(path: string, init?: RequestInit): Promise<T> {
  // 캐시는 호출하는 쪽('use cache' 함수, 사가)이 정한다. fetch 자체는 늘 원본을 읽는다.
  const res = await fetch(`${apiBase()}${path}`, { cache: "no-store", ...init, headers: { accept: "application/json" } });
  if (!res.ok) throw new ArchiveApiError(`아카이브 응답 ${res.status}`, res.status);
  return (await res.json()) as T;
}

/** 공개 유물 목록 */
export function fetchArtifacts(query: Partial<ArtifactQuery> = {}, init?: RequestInit) {
  const qs = toSearchParams(query).toString();
  return getJson<ArtifactListResponse>(`${PUBLIC_API.artifacts}${qs ? `?${qs}` : ""}`, init);
}

/** 공개 유물 하나. 없으면 null */
export async function fetchArtifact(slug: string, init?: RequestInit): Promise<ArtifactDetailResponse | null> {
  try {
    return await getJson<ArtifactDetailResponse>(PUBLIC_API.artifact(slug), init);
  } catch (error) {
    if (error instanceof ArchiveApiError && error.status === 404) return null;
    throw error;
  }
}
