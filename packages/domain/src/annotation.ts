import { z } from "zod";

/**
 * 이미지 주석. W3C Web Annotation Data Model의 부분 집합이다.
 * 영역은 Media Fragments의 백분율 좌표(xywh=percent:x,y,w,h)로 저장해,
 * 이미지 해상도가 바뀌어도(다시 타일링해도) 위치가 그대로 맞는다.
 * https://www.w3.org/TR/annotation-model/ · https://www.w3.org/TR/media-frags/
 */

export const regionSchema = z
  .object({
    x: z.number().min(0).max(100),
    y: z.number().min(0).max(100),
    w: z.number().gt(0).max(100),
    h: z.number().gt(0).max(100),
  })
  .refine((r) => r.x + r.w <= 100.0001 && r.y + r.h <= 100.0001, "영역이 이미지 밖으로 나갑니다.");
export type Region = z.infer<typeof regionSchema>;

/** 어드민에서 편집하는 입력값 */
export const annotationInputSchema = z.object({
  title: z.string().trim().min(1, "제목을 입력하세요.").max(80),
  body: z.string().trim().min(1, "설명을 입력하세요.").max(1200),
  region: regionSchema,
  /** 공개 사이트의 "안내 투어"에서 보여 주는 순서 */
  order: z.number().int().min(0),
});
export type AnnotationInput = z.infer<typeof annotationInputSchema>;

export const annotationSchema = annotationInputSchema.extend({
  id: z.string(),
  artifactId: z.string(),
});
export type Annotation = z.infer<typeof annotationSchema>;

const round = (n: number) => Math.round(n * 1000) / 1000;

/** 영역을 Media Fragments 문자열로 */
export function toFragment(r: Region): string {
  return `xywh=percent:${round(r.x)},${round(r.y)},${round(r.w)},${round(r.h)}`;
}

/** Media Fragments 문자열(percent·pixel)을 백분율 영역으로. pixel이면 이미지 크기가 필요하다. */
export function fromFragment(value: string, size?: { width: number; height: number }): Region {
  const m = value.match(/^xywh=(?:(percent|pixel):)?([\d.]+),([\d.]+),([\d.]+),([\d.]+)$/);
  if (!m) throw new Error(`알 수 없는 영역 형식: ${value}`);
  const [x, y, w, h] = m.slice(2).map(Number) as [number, number, number, number];
  if (m[1] === "percent") return { x, y, w, h };
  if (!size) throw new Error("픽셀 좌표를 바꾸려면 이미지 크기가 필요합니다.");
  return {
    x: round((x / size.width) * 100),
    y: round((y / size.height) * 100),
    w: round((w / size.width) * 100),
    h: round((h / size.height) * 100),
  };
}

/** 백분율 영역을 이미지 픽셀 좌표로 */
export function toPixels(r: Region, size: { width: number; height: number }) {
  return {
    x: (r.x / 100) * size.width,
    y: (r.y / 100) * size.height,
    w: (r.w / 100) * size.width,
    h: (r.h / 100) * size.height,
  };
}

/** W3C Web Annotation(JSON-LD) 형식으로 내보낸다. 외부 뷰어·IIIF 도구와 주고받을 때 쓴다. */
export function toWebAnnotation(a: Annotation, sourceUrl: string) {
  return {
    "@context": "http://www.w3.org/ns/anno.jsonld",
    id: a.id,
    type: "Annotation",
    body: [
      { type: "TextualBody", purpose: "tagging", value: a.title },
      { type: "TextualBody", purpose: "describing", value: a.body, format: "text/plain", language: "ko" },
    ],
    target: {
      source: sourceUrl,
      selector: {
        type: "FragmentSelector",
        conformsTo: "http://www.w3.org/TR/media-frags/",
        value: toFragment(a.region),
      },
    },
  };
}
