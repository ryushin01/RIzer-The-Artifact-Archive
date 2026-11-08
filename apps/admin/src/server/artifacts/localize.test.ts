import { type Annotation, type Artifact } from "@rizer/domain";
import { SEED_ANNOTATIONS, SEED_ARTIFACTS, SEED_EN } from "@rizer/domain/seed";
import { describe, expect, it } from "vitest";

import { localizeAnnotations, localizeArtifact, searchEnglish } from "./localize";

const seed = SEED_ARTIFACTS[0]!;
const en = SEED_EN[seed.slug]!;
const artifact = { ...seed, id: "a1" } as unknown as Artifact;

describe("localizeArtifact", () => {
  it("시드와 같은 필드를 영어로 바꾼다", () => {
    const out = localizeArtifact(artifact);
    expect(out.title).toBe(en.title);
    expect(out.story).toBe(en.story);
    expect(out.contentLang).toBe("en");
  });

  it("큐레이터가 고친 본문은 낡은 번역으로 덮지 않고 한국어임을 알린다", () => {
    const out = localizeArtifact({ ...artifact, story: "큐레이터가 고친 해설" });
    expect(out.story).toBe("큐레이터가 고친 해설");
    expect(out.title).toBe(en.title);
    expect(out.contentLang).toBe("ko");
  });

  it("시드에 없는 유물은 그대로 두고 한국어임을 알린다", () => {
    const out = localizeArtifact({ ...artifact, slug: "curator-made", title: "새 유물" });
    expect(out.title).toBe("새 유물");
    expect(out.contentLang).toBe("ko");
  });
});

describe("localizeAnnotations", () => {
  const annotations = (SEED_ANNOTATIONS[seed.slug] ?? []).map((a, i) => ({ ...a, id: `n${i}` })) as unknown as Annotation[];

  it("시드와 같은 주석은 영어로 바꾸고 위치는 유지한다", () => {
    const out = localizeAnnotations(seed.slug, annotations);
    expect(out[0]?.title).toBe(en.annotations[0]?.title);
    expect(out[0]?.id).toBe("n0");
  });

  it("고친 주석은 한국어로 둔다", () => {
    const edited = annotations.map((a, i) => (i === 0 ? { ...a, body: "고친 주석" } : a));
    const out = localizeAnnotations(seed.slug, edited);
    expect(out[0]?.body).toBe("고친 주석");
    expect(out[1]?.title).toBe(en.annotations[1]?.title);
  });
});

describe("searchEnglish", () => {
  it("대소문자와 무관하게 찾고, 이름이 맞은 유물을 따로 돌려준다", () => {
    const { all, titles } = searchEnglish(en.title.toUpperCase());
    expect(all).toContain(seed.slug);
    expect(titles).toContain(seed.slug);
  });

  it("맞는 유물이 없으면 빈 목록이다", () => {
    expect(searchEnglish("zzzz-no-such-relic")).toEqual({ all: [], titles: [] });
  });
});
