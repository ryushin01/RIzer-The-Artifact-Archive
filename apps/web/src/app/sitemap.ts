import type { MetadataRoute } from "next";

import { getArtifacts } from "@/shared/api/index.server";
import { siteUrl } from "@/shared/config/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const { items } = await getArtifacts();
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/artifacts`, changeFrequency: "weekly", priority: 0.8 },
    ...items.map((a) => ({ url: `${base}/artifacts/${a.slug}`, lastModified: a.updatedAt, priority: 0.6 })),
  ];
}
