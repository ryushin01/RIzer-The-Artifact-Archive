import { artifactInputSchema, sourceSchema } from "@rizer/domain";
import { z } from "zod";

/**
 * 유물 편집 폼(FormData → 객체)을 검증한다.
 * 숫자·체크박스는 문자열로 오므로 바꾸고, 출처는 source_ 접두사가 붙은 칸에서 모은다.
 */
export const artifactFormSchema = z
  .object({
    ...artifactInputSchema.shape,
    recordYear: z.coerce
      .number({ error: "연도를 숫자로 입력하세요." })
      .int("연도는 정수로 입력하세요.")
      .min(-3000, "기원전 3000년보다 앞설 수 없습니다.")
      .max(2100),
    featured: z.preprocess((v) => v === "on" || v === "true" || v === true, z.boolean()),
    source_institution: z.string().trim().min(1, "소장처를 입력하세요."),
    source_objectId: z.string().trim().min(1, "소장품 번호를 입력하세요."),
    source_objectTitle: z.string().trim().min(1, "사진 속 소장품 이름을 입력하세요."),
    source_objectDate: z.string().trim().default(""),
    source_objectCulture: z.string().trim().default(""),
    source_url: z.url("소장품 페이지 주소를 입력하세요."),
    source_imageUrl: z.url("원본 이미지 주소를 입력하세요."),
    source_creditLine: z.string().trim().default(""),
    source_accessionNumber: z.string().trim().default(""),
  })
  .transform(
    ({
      source_institution,
      source_objectId,
      source_objectTitle,
      source_objectDate,
      source_objectCulture,
      source_url,
      source_imageUrl,
      source_creditLine,
      source_accessionNumber,
      ...input
    }) => ({
      input,
      source: sourceSchema.parse({
        institution: source_institution,
        objectId: source_objectId,
        objectTitle: source_objectTitle,
        objectDate: source_objectDate,
        objectCulture: source_objectCulture,
        url: source_url,
        imageUrl: source_imageUrl,
        license: "CC0-1.0",
        creditLine: source_creditLine,
        accessionNumber: source_accessionNumber,
      }),
    }),
  );

/** 주석 편집기가 보내는 목록 */
export const annotationListSchema = z.array(
  z.object({
    id: z.string().optional(),
    title: z.string().trim().min(1, "주석 제목을 입력하세요.").max(80),
    body: z.string().trim().min(1, "주석 설명을 입력하세요.").max(1200),
    order: z.number().int().min(0),
    region: z.object({
      x: z.number().min(0).max(100),
      y: z.number().min(0).max(100),
      w: z.number().gt(0).max(100),
      h: z.number().gt(0).max(100),
    }),
  }),
);
