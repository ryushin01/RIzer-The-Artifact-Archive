import type { ArtifactInput } from "../../artifact";

/** 이미지(출처·대체 텍스트)를 고르기 전의 전설 해설. 모두 공개 상태로 넣는다. */
export type LegendEntry = Omit<ArtifactInput, "imageAlt" | "status" | "featured"> & { featured?: boolean };
