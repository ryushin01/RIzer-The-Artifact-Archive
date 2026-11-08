import type { Annotation, Artifact, ArtifactSummary, DeepZoomImage } from "@rizer/domain";
import type { Storage } from "@rizer/storage";

import type { StoredImage } from "@/entities/artifact";

import type { AnnotationRow, ArtifactWithCount } from "./repository";

/** 저장된 이미지(스토리지 키)를 공개 주소가 담긴 딥줌 이미지로 바꾼다. */
export function toDeepZoomImage(image: StoredImage | null, storage: Pick<Storage, "publicUrl">): DeepZoomImage | null {
  if (!image) return null;
  return {
    dziUrl: storage.publicUrl(image.dziKey),
    previewUrl: storage.publicUrl(image.previewKey),
    width: image.width,
    height: image.height,
    lqip: image.lqip,
    dominantColor: image.dominantColor,
  };
}

export function toArtifact(row: ArtifactWithCount, storage: Pick<Storage, "publicUrl">): Artifact {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    titleOriginal: row.titleOriginal,
    gallery: row.gallery,
    kind: row.kind,
    owner: row.owner,
    maker: row.maker,
    power: row.power,
    firstRecord: row.firstRecord,
    recordYear: row.recordYear,
    summary: row.summary,
    story: row.story,
    imageAlt: row.imageAlt,
    status: row.status,
    featured: row.featured,
    source: row.source,
    image: toDeepZoomImage(row.image, storage),
    annotationCount: Number(row.annotationCount),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export function toArtifactSummary(row: ArtifactWithCount, storage: Pick<Storage, "publicUrl">): ArtifactSummary {
  const { story: _story, source: _source, ...rest } = toArtifact(row, storage);
  return rest;
}

export function toAnnotation(row: AnnotationRow): Annotation {
  return {
    id: row.id,
    artifactId: row.artifactId,
    title: row.title,
    body: row.body,
    order: row.order,
    region: { x: row.x, y: row.y, w: row.w, h: row.h },
  };
}
