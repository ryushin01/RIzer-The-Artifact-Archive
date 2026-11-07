import type { MetadataRoute } from "next";
import { connection } from "next/server";

import { getArtifacts } from "@/shared/api/index.server";
import { siteUrl } from "@/shared/config/env";

/** 요청 때 만든다. 빌드 중에는 어드민 API가 꺼져 있을 수 있다(목록 자체는 캐시된 함수가 읽는다). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const base = siteUrl();
  const { items } = await getArtifacts();
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/artifacts`, changeFrequency: "weekly", priority: 0.8 },
    ...items.map((a) => ({ url: `${base}/artifacts/${a.slug}`, lastModified: a.updatedAt, priority: 0.6 })),
  ];
}
