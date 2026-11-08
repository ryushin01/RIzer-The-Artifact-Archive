import type { Annotation, Artifact, ArtifactSummary } from "@rizer/domain";
import { SEED_ANNOTATIONS, SEED_ARTIFACTS, SEED_EN } from "@rizer/domain/seed";

const seedBySlug = new Map(SEED_ARTIFACTS.map((a) => [a.slug, a]));
const FIELDS = ["title", "owner", "maker", "power", "firstRecord", "summary", "imageAlt", "story"] as const;

/**
 * 영어판 내용을 덮어쓴다. 번역은 시드 문장에 맞춰 쓴 것이므로, DB의 값이 시드와 같은 필드만 바꾼다.
 * 큐레이터가 고친 필드나 새로 만든 유물은 낡은 번역 대신 한국어를 그대로 두고, contentLang으로 알린다.
 */
export function localizeArtifact<T extends ArtifactSummary | Artifact>(item: T): T {
  const en = SEED_EN[item.slug];
  const seed = seedBySlug.get(item.slug);
  if (!en || !seed) return { ...item, contentLang: "ko" };
  const out: Record<string, unknown> = { ...item };
  let untranslated = false;
  for (const field of FIELDS) {
    if (!(field in item)) continue;
    if ((item as Record<string, unknown>)[field] === seed[field]) out[field] = en[field];
    else if (field === "title" || field === "story") untranslated = true;
  }
  return { ...(out as T), contentLang: untranslated ? "ko" : "en" };
}

/** 주석도 시드와 같을 때만 번역을 쓴다. */
export function localizeAnnotations(slug: string, annotations: Annotation[]): Annotation[] {
  const en = SEED_EN[slug]?.annotations;
  const seed = SEED_ANNOTATIONS[slug];
  if (!en || !seed) return annotations;
  return annotations.map((a, i) => (seed[i]?.title === a.title && seed[i]?.body === a.body && en[i] ? { ...a, ...en[i] } : a));
}

const includes = (text: string, q: string) => text.toLowerCase().includes(q);

/** 영어 검색어에 맞는 시드 유물. 이름이 맞은 유물은 앞에 둘 수 있게 따로 돌려준다. */
export function searchEnglish(rawQuery: string): { all: string[]; titles: string[] } {
  const q = rawQuery.toLowerCase();
  const all: string[] = [];
  const titles: string[] = [];
  for (const [slug, en] of Object.entries(SEED_EN)) {
    if (includes(en.title, q)) titles.push(slug);
    const texts = [en.title, en.owner, en.summary, en.story, ...en.annotations.flatMap((a) => [a.title, a.body])];
    if (texts.some((t) => includes(t, q))) all.push(slug);
  }
  return { all, titles };
}
