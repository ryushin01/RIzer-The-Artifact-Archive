import type { DeepZoomImage } from "@rizer/domain";

/**
 * DB에 저장하는 딥줌 이미지. 주소 대신 스토리지 키를 저장하고, 응답할 때 공개 주소로 바꾼다.
 * 그래야 스토리지 도메인(로컬 포트, R2 공개 도메인)이 바뀌어도 데이터를 고치지 않는다.
 */
export type StoredImage = Omit<DeepZoomImage, "dziUrl" | "previewUrl"> & {
  dziKey: string;
  previewKey: string;
  /** 원본 파일 키(다시 타일링할 때 쓴다) */
  originalKey: string;
  tileCount: number;
  /** 타일링한 시각. 키 경로의 버전으로도 쓴다. */
  version: string;
};

/** 시드 이미지 목록(scripts/seed-images.ts가 만든다): 슬러그 → 저장된 이미지 */
export type SeedImageManifest = Record<string, StoredImage>;

export const SEED_MANIFEST_KEY = "seed/manifest.json";
