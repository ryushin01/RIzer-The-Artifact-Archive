import { z } from "zod";

/** 주소에 쓰는 유물 식별자. 소문자·숫자·하이픈만 쓴다. */
export const slugSchema = z
  .string()
  .min(2)
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "소문자, 숫자, 하이픈(-)만 쓸 수 있습니다.");

export const artifactStatusSchema = z.enum(["draft", "published"]);
export type ArtifactStatus = z.infer<typeof artifactStatusSchema>;

/**
 * 전시실. 유물이 등장하는 신화·전설권으로 나눈다.
 * 공개 사이트의 필터와 어드민 선택지가 같은 목록을 쓴다.
 */
export const GALLERIES = [
  { id: "arthurian", label: "아서왕과 기사 전설", labelEn: "Arthurian & Chivalric" },
  { id: "norse", label: "북유럽·게르만 신화", labelEn: "Norse & Germanic" },
  { id: "celtic", label: "켈트 신화", labelEn: "Celtic" },
  { id: "greek", label: "그리스 신화", labelEn: "Greek" },
  { id: "sacred", label: "성서와 성유물", labelEn: "Sacred Relics" },
  { id: "near-east", label: "이집트·중동 전설", labelEn: "Egypt & Near East" },
  { id: "indian", label: "인도 신화", labelEn: "Indian" },
  { id: "chinese", label: "중국 신화와 전설", labelEn: "Chinese" },
  { id: "japanese", label: "일본 신화", labelEn: "Japanese" },
  { id: "korean", label: "한국 신화와 설화", labelEn: "Korean" },
] as const;
export type GalleryId = (typeof GALLERIES)[number]["id"];
export const galleryIdSchema = z.enum(GALLERIES.map((g) => g.id) as [GalleryId, ...GalleryId[]]);

export function galleryOf(id: GalleryId) {
  return GALLERIES.find((g) => g.id === id) ?? GALLERIES[0];
}

/** 유물 종류 */
export const KINDS = [
  { id: "weapon", label: "무기" },
  { id: "armor", label: "방어구" },
  { id: "vessel", label: "그릇" },
  { id: "jewel", label: "장신구" },
  { id: "treasure", label: "보물" },
  { id: "mount", label: "탈것" },
  { id: "elixir", label: "영약" },
  { id: "book", label: "책과 문서" },
] as const;
export type KindId = (typeof KINDS)[number]["id"];
export const kindIdSchema = z.enum(KINDS.map((k) => k.id) as [KindId, ...KindId[]]);

export function kindLabel(id: KindId) {
  return KINDS.find((k) => k.id === id)?.label ?? id;
}

/**
 * 이미지 출처. 전설 속 유물은 실물이 없으므로, 모습이 닮은 실제 박물관 소장품의
 * 공개 도메인(CC0) 사진을 빌려 쓰고, 사진 속 물건이 무엇인지 함께 밝힌다.
 */
/** 여러 소장품을 합성한 이미지의 구성 요소 */
export const sourcePartSchema = z.object({
  objectId: z.string().min(1),
  objectTitle: z.string().min(1),
  objectCulture: z.string().default(""),
  objectDate: z.string().default(""),
  url: z.url(),
  imageUrl: z.url(),
  accessionNumber: z.string().default(""),
  creditLine: z.string().default(""),
});
export type ArtifactSourcePart = z.infer<typeof sourcePartSchema>;

export const sourceSchema = z.object({
  institution: z.string().min(1),
  objectId: z.string().min(1),
  /** 사진 속 실제 소장품 이름 */
  objectTitle: z.string().min(1),
  /** 실제 소장품의 제작 시기·문화권 */
  objectDate: z.string().default(""),
  objectCulture: z.string().default(""),
  url: z.url(),
  /** 원본 이미지 주소 */
  imageUrl: z.url(),
  license: z.enum(["CC0-1.0"]),
  creditLine: z.string().default(""),
  accessionNumber: z.string().default(""),
  /** 합성 이미지면 구성 소장품들. 비어 있으면 사진 한 장이다. 합성 이미지는 이 프로젝트에서 만들었다. */
  parts: z.array(sourcePartSchema).default([]),
});
export type ArtifactSource = z.infer<typeof sourceSchema>;

/** 딥줌 이미지. 타일은 DZI(Deep Zoom Image) 형식으로 스토리지에 있다. */
export const deepZoomImageSchema = z.object({
  /** DZI 설명 파일(.dzi)의 공개 주소 */
  dziUrl: z.string().min(1),
  /** 목록·카드에 쓰는 미리보기(WebP, 긴 변 1600px) */
  previewUrl: z.string().min(1),
  /** 원본 크기(px) */
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  /** 미리보기가 오기 전에 보여 줄 흐린 저해상도 이미지(data URL) */
  lqip: z.string().startsWith("data:image/"),
  /** 배경·플레이스홀더용 대표 색 */
  dominantColor: z.string().regex(/^#[0-9a-f]{6}$/i),
});
export type DeepZoomImage = z.infer<typeof deepZoomImageSchema>;

/** 어드민에서 편집하는 입력값 */
export const artifactInputSchema = z.object({
  slug: slugSchema,
  title: z.string().trim().min(1, "이름을 입력하세요.").max(80),
  titleOriginal: z.string().trim().max(120).default(""),
  gallery: galleryIdSchema,
  kind: kindIdSchema,
  /** 소유자·사용자 */
  owner: z.string().trim().max(120).default(""),
  /** 만든 이 */
  maker: z.string().trim().max(120).default(""),
  /** 전설 속 권능을 한 문장으로 */
  power: z.string().trim().min(1, "권능을 입력하세요.").max(160),
  /** 처음 기록된 문헌 */
  firstRecord: z.string().trim().min(1, "첫 기록 문헌을 입력하세요.").max(160),
  /** 연표 정렬용: 첫 기록 연도(기원전은 음수) */
  recordYear: z.number().int().min(-3000).max(2100),
  /** 카드·검색 결과에 쓰는 한두 문장 요약 */
  summary: z.string().trim().min(1, "요약을 입력하세요.").max(300),
  /** 해설 본문. 문단은 빈 줄로 나눈다. */
  story: z.string().trim().min(1, "해설을 입력하세요.").max(8000),
  /** 이미지 대체 텍스트: 사진에 실제로 보이는 것을 설명한다. KWCAG 5.1.1 */
  imageAlt: z.string().trim().min(1, "이미지 설명을 입력하세요.").max(300),
  status: artifactStatusSchema.default("draft"),
  featured: z.boolean().default(false),
});
export type ArtifactInput = z.infer<typeof artifactInputSchema>;

/** 공개 API가 내보내는 유물 */
export const artifactSchema = artifactInputSchema.extend({
  id: z.string(),
  source: sourceSchema,
  image: deepZoomImageSchema.nullable(),
  annotationCount: z.number().int().nonnegative(),
  updatedAt: z.iso.datetime(),
});
export type Artifact = z.infer<typeof artifactSchema>;

/** 목록용 요약 (해설 본문 제외) */
/** 목록용 요약. 해설 본문과 사진 출처는 상세에서만 쓰므로 뺀다(목록 응답을 가볍게). */
export const artifactSummarySchema = artifactSchema.omit({ story: true, source: true });
export type ArtifactSummary = z.infer<typeof artifactSummarySchema>;

/** 해설 본문을 문단으로 나눈다. */
export function storyParagraphs(story: string): string[] {
  return story
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);
}

/** 연도를 "기원전 750년경", "1136년"처럼 읽기 쉽게 쓴다. */
export function formatYear(year: number): string {
  return year < 0 ? `기원전 ${Math.abs(year)}년` : `${year}년`;
}
