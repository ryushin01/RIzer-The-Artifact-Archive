import "server-only";

import {
  artifactQuerySchema,
  type ArtifactDetailResponse,
  type ArtifactListResponse,
  type ArtifactQuery,
  type Locale,
  localeSchema,
} from "@rizer/domain";

import { connection } from "next/server";

import { getDb } from "@/db/server";
import { getStorage } from "@/server/storage";

import { localizeAnnotations, localizeArtifact, searchEnglish } from "./localize";
import { toAnnotation, toArtifact, toArtifactSummary } from "./public";
import { type AdminArtifactQuery, createArtifactRepository } from "./repository";

/** DB는 요청마다 읽는다(처음 열 때 시드가 현재 시각을 쓰므로 프리렌더 중에 열지 않는다). */
const repo = async () => {
  await connection();
  return createArtifactRepository(await getDb());
};

/** 어드민 목록(비공개 포함). limit을 주면 그 쪽만 읽고 전체 개수를 함께 준다. */
export async function listForAdmin(query: AdminArtifactQuery) {
  const storage = getStorage();
  const { rows, total } = await (await repo()).page(query);
  return { items: rows.map((r) => toArtifactSummary(r, storage)), total };
}

/** 어드민 상세(비공개 포함) */
export async function getForAdmin(id: string) {
  const r = await repo();
  const row = await r.get(id);
  if (!row) return null;
  return {
    artifact: toArtifact(row, getStorage()),
    annotations: (await r.listAnnotations(id)).map(toAnnotation),
  };
}

export async function getStats() {
  const r = await repo();
  const storage = getStorage();
  const [stats, recent] = await Promise.all([r.stats(), r.recent(6)]);
  return { stats, recent: recent.map((row) => toArtifactSummary(row, storage)) };
}

/** 주소 쿼리를 공개 API 조건으로. 잘못된 값은 무시한다. */
export function parsePublicQuery(params: URLSearchParams): ArtifactQuery {
  const raw = Object.fromEntries(
    ["q", "gallery", "kind", "sort", "limit", "offset", "locale"].flatMap((k) => (params.get(k) ? [[k, params.get(k)]] : [])),
  );
  const parsed = artifactQuerySchema.safeParse(raw);
  return parsed.success ? parsed.data : artifactQuerySchema.parse({});
}

/** 주소의 언어 값. 잘못된 값은 한국어로 본다. */
export const parseLocale = (value: string | null): Locale | undefined => localeSchema.safeParse(value).data;

/** 공개 API: 공개 유물 목록 */
export async function listPublished(query: ArtifactQuery): Promise<ArtifactListResponse> {
  const storage = getStorage();
  const r = await repo();
  const { locale, ...rest } = query;
  if (locale !== "en") {
    const { rows, total } = await r.page({ ...rest, status: "published" });
    return { items: rows.map((row) => toArtifactSummary(row, storage)), total };
  }
  const matched = rest.q ? searchEnglish(rest.q) : undefined;
  const filter = { ...rest, status: "published" as const, alsoSlugs: matched?.all, rankSlugs: matched?.titles };
  // 이름순은 번역한 이름으로 정렬해야 하므로 전부 읽어 여기서 자른다(유물 수가 적다).
  if (rest.sort === "title") {
    const { limit, offset = 0, ...all } = filter;
    const sorted = (await r.list(all))
      .map((row) => localizeArtifact(toArtifactSummary(row, storage)))
      .sort((a, b) => a.title.localeCompare(b.title, "en"));
    return { items: limit ? sorted.slice(offset, offset + limit) : sorted, total: sorted.length };
  }
  const { rows, total } = await r.page(filter);
  return { items: rows.map((row) => localizeArtifact(toArtifactSummary(row, storage))), total };
}

/** 공개 API: 공개 유물 상세 */
export async function getPublished(slug: string, locale?: Locale): Promise<ArtifactDetailResponse | null> {
  const r = await repo();
  const row = await r.getBySlug(slug);
  if (!row || row.status !== "published") return null;
  const storage = getStorage();
  const [annotations, related] = await Promise.all([r.listAnnotations(row.id), r.related(row.gallery, row.id)]);
  const body = {
    artifact: toArtifact(row, storage),
    annotations: annotations.map(toAnnotation),
    related: related.map((x) => toArtifactSummary(x, storage)),
  };
  if (locale !== "en") return body;
  return {
    artifact: localizeArtifact(body.artifact),
    annotations: localizeAnnotations(slug, body.annotations),
    related: body.related.map(localizeArtifact),
  };
}
