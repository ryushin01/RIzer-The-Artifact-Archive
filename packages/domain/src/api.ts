import { z } from "zod";

import { annotationSchema } from "./annotation";
import { artifactSchema, artifactSummarySchema, galleryIdSchema, kindIdSchema } from "./artifact";

/**
 * 공개 API 계약. 어드민(apps/admin)이 내보내고 공개 사이트(apps/web)가 읽는다.
 * 경로는 어드민 기준 상대 경로다.
 */
export const PUBLIC_API = {
  artifacts: "/api/public/artifacts",
  artifact: (slug: string) => `/api/public/artifacts/${encodeURIComponent(slug)}`,
} as const;

/** 목록 검색 조건. 공개 사이트의 주소 쿼리와 같은 이름을 쓴다. */
export const artifactQuerySchema = z.object({
  q: z.string().trim().max(60).optional(),
  gallery: galleryIdSchema.optional(),
  kind: kindIdSchema.optional(),
  sort: z.enum(["featured", "oldest", "newest", "title"]).default("featured"),
  /** 한 번에 받을 개수. 없으면 전부. */
  limit: z.coerce.number().int().min(1).max(100).optional(),
  /** 건너뛸 개수("더 보기") */
  offset: z.coerce.number().int().min(0).max(10_000).optional(),
});
export type ArtifactQuery = z.infer<typeof artifactQuerySchema>;

export const artifactListResponseSchema = z.object({
  items: z.array(artifactSummarySchema),
  /** 조건에 맞는 전체 개수(limit과 상관없이) */
  total: z.number().int().nonnegative(),
});
export type ArtifactListResponse = z.infer<typeof artifactListResponseSchema>;

export const artifactDetailResponseSchema = z.object({
  artifact: artifactSchema,
  annotations: z.array(annotationSchema),
  /** 같은 전시실의 다른 유물 */
  related: z.array(artifactSummarySchema),
});
export type ArtifactDetailResponse = z.infer<typeof artifactDetailResponseSchema>;

/** 어드민이 공개 사이트에 캐시를 비우라고 알릴 때 보내는 본문 */
export const revalidateRequestSchema = z.object({
  slugs: z.array(z.string()).default([]),
});
export type RevalidateRequest = z.infer<typeof revalidateRequestSchema>;

/** 캐시 태그. 공개 사이트가 fetch에 붙이고, 어드민의 알림을 받으면 비운다. */
export const CACHE_TAGS = {
  artifacts: "artifacts",
  artifact: (slug: string) => `artifact:${slug}`,
} as const;
