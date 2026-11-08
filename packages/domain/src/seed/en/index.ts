import { EN_CELTIC_ASIA } from "./celtic-asia";
import { EN_EUROPE_NORTH } from "./europe-north";
import { EN_FEATURED } from "./featured";
import { EN_MEDITERRANEAN, EN_MORE } from "./mediterranean";
import type { EnArtifact } from "./types";

export type { EnArtifact } from "./types";

/** 시드 유물의 영어 번역. 공개 API가 locale=en일 때 덮어쓴다. */
export const SEED_EN: Record<string, EnArtifact> = {
  ...EN_FEATURED,
  ...EN_EUROPE_NORTH,
  ...EN_MEDITERRANEAN,
  ...EN_CELTIC_ASIA,
  ...EN_MORE,
};
