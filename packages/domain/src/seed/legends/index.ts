import type { SeedArtifact } from "../catalog";
import { CELTIC_ASIA } from "./celtic-asia";
import { EUROPE_NORTH } from "./europe-north";
import { LEGEND_IMAGES } from "./images";
import { MEDITERRANEAN } from "./mediterranean";
import { MORE_LEGENDS } from "./more";

/** 나무위키 「전설의 무기」·「전설의 도구」에서 더 고른 유물. 해설과 사진(대역)을 합쳐 시드 유물로 만든다. */
export const LEGEND_ARTIFACTS: SeedArtifact[] = [...EUROPE_NORTH, ...MEDITERRANEAN, ...CELTIC_ASIA, ...MORE_LEGENDS].map((entry) => {
  const image = LEGEND_IMAGES[entry.slug];
  if (!image) throw new Error(`전설 유물 ${entry.slug}의 사진이 없습니다.`);
  return { ...entry, ...image, status: "published", featured: entry.featured ?? false };
});
