import { describe, expect, it } from "vitest";

import {
  annotationInputSchema,
  artifactInputSchema,
  formatYear,
  fromFragment,
  fromWebAnnotations,
  toAnnotationPage,
  storyParagraphs,
  toFragment,
  toPixels,
  toWebAnnotation,
} from "./index";
import { SEED_ANNOTATIONS, SEED_ARTIFACTS, SEED_EN } from "./seed";

describe("주석 영역", () => {
  it("백분율 영역을 Media Fragments로 바꾸고 되돌린다", () => {
    const region = { x: 10.5, y: 20, w: 30, h: 15.25 };
    expect(toFragment(region)).toBe("xywh=percent:10.5,20,30,15.25");
    expect(fromFragment(toFragment(region))).toEqual(region);
  });

  it("픽셀 좌표는 이미지 크기로 백분율로 바꾼다", () => {
    expect(fromFragment("xywh=pixel:100,50,200,100", { width: 1000, height: 500 })).toEqual({
      x: 10,
      y: 10,
      w: 20,
      h: 20,
    });
    expect(() => fromFragment("xywh=100,50,200,100")).toThrow(/이미지 크기/);
    expect(() => fromFragment("nope")).toThrow();
  });

  it("백분율 영역을 픽셀로 바꾼다", () => {
    expect(toPixels({ x: 10, y: 10, w: 50, h: 50 }, { width: 2000, height: 1000 })).toEqual({
      x: 200,
      y: 100,
      w: 1000,
      h: 500,
    });
  });

  it("이미지 밖으로 나가는 영역은 거부한다", () => {
    const result = annotationInputSchema.safeParse({
      title: "a",
      body: "b",
      order: 0,
      region: { x: 90, y: 0, w: 20, h: 10 },
    });
    expect(result.success).toBe(false);
  });

  it("W3C Web Annotation 형식으로 내보낸다", () => {
    const anno = toWebAnnotation(
      { id: "a1", artifactId: "x", title: "칼날", body: "설명", order: 0, region: { x: 1, y: 2, w: 3, h: 4 } },
      "https://example.com/image.dzi",
    );
    expect(anno.type).toBe("Annotation");
    expect(anno.target.selector.value).toBe("xywh=percent:1,2,3,4");
  });
});

describe("주석 가져오기·내보내기", () => {
  const item = { id: "a1", artifactId: "x", title: "칼날", body: "설명", order: 0, region: { x: 1, y: 2, w: 3, h: 4 } };

  it("내보낸 파일을 그대로 다시 읽는다", () => {
    expect(fromWebAnnotations(toAnnotationPage([item], "https://x.dev/a.dzi"))).toEqual([
      { title: "칼날", body: "설명", region: item.region },
    ]);
  });

  it("본문이 하나인 주석과 픽셀 좌표도 읽는다", () => {
    const one = { type: "Annotation", body: { value: "메모" }, target: { selector: { value: "xywh=pixel:100,50,200,100" } } };
    expect(fromWebAnnotations(one, { width: 1000, height: 500 })).toEqual([
      { title: "메모", body: "메모", region: { x: 10, y: 10, w: 20, h: 20 } },
    ]);
  });

  it("잘못된 파일은 몇 번째 주석이 문제인지 알린다", () => {
    expect(() => fromWebAnnotations({ hello: 1 })).toThrow(/찾지 못했습니다/);
    expect(() => fromWebAnnotations([{ body: [], target: {} }])).toThrow(/1번째 주석/);
    const outside = { body: { value: "x" }, target: { selector: { value: "xywh=percent:90,0,20,10" } } };
    expect(() => fromWebAnnotations([outside])).toThrow(/1번째 주석: 영역이 이미지 밖/);
  });
});

describe("유물", () => {
  it("문단을 빈 줄로 나누고 줄바꿈은 공백으로 합친다", () => {
    expect(storyParagraphs("첫 줄\n이어짐\n\n둘째 문단\n\n\n")).toEqual(["첫 줄 이어짐", "둘째 문단"]);
  });

  it("연도를 읽기 쉽게 쓴다", () => {
    expect(formatYear(-750)).toBe("기원전 750년");
    expect(formatYear(1136)).toBe("1136년");
  });

  it("시드 유물은 모두 입력 스키마를 통과하고 슬러그가 겹치지 않는다", () => {
    for (const seed of SEED_ARTIFACTS) {
      expect(artifactInputSchema.safeParse(seed).success, seed.slug).toBe(true);
    }
    const slugs = SEED_ARTIFACTS.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(SEED_ARTIFACTS.length).toBeGreaterThan(80);
    expect(SEED_ARTIFACTS.filter((a) => a.featured).length).toBeGreaterThan(0);
  });

  it("시드 유물의 사진은 서로 다른 소장품이고 CC0다", () => {
    // 합성 이미지는 대표 번호가 첫 조각과 같으므로 조각 번호만 센다.
    const ids = SEED_ARTIFACTS.flatMap((a) =>
      a.source.parts.length
        ? a.source.parts.map((p) => `${a.source.institution}:${p.objectId}`)
        : [`${a.source.institution}:${a.source.objectId}`],
    );
    expect(new Set(ids).size).toBe(ids.length);
    expect(SEED_ARTIFACTS.every((a) => a.source.license === "CC0-1.0")).toBe(true);
  });

  it("모든 시드 유물에 영어 번역이 있고, 주석 수가 같으며, 스키마 길이를 지킨다", () => {
    expect(Object.keys(SEED_EN).sort()).toEqual(SEED_ARTIFACTS.map((a) => a.slug).sort());
    for (const seed of SEED_ARTIFACTS) {
      const en = SEED_EN[seed.slug]!;
      expect(en.annotations.length, seed.slug).toBe(SEED_ANNOTATIONS[seed.slug]?.length);
      const { title, owner, maker, power, firstRecord, summary, story, imageAlt } = en;
      expect(artifactInputSchema.safeParse({ ...seed, title, owner, maker, power, firstRecord, summary, story, imageAlt }).success, seed.slug).toBe(true);
      en.annotations.forEach((a) => expect(annotationInputSchema.shape.title.safeParse(a.title).success, a.title).toBe(true));
      expect(/[가-힣]/.test(`${title}${power}${summary}${story}${imageAlt}`), seed.slug).toBe(false);
    }
  });

  it("시드 주석은 있는 유물을 가리키고 영역이 이미지 안에 있다", () => {
    const slugs = new Set(SEED_ARTIFACTS.map((a) => a.slug));
    for (const [slug, list] of Object.entries(SEED_ANNOTATIONS)) {
      expect(slugs.has(slug), slug).toBe(true);
      list.forEach((a, order) => {
        expect(annotationInputSchema.safeParse({ ...a, order }).success, `${slug} ${a.title}`).toBe(true);
      });
    }
    // 모든 시드 유물에 주석이 두 개 이상 있다(안내 투어가 비지 않게).
    for (const seed of SEED_ARTIFACTS) {
      expect(SEED_ANNOTATIONS[seed.slug]?.length ?? 0, seed.slug).toBeGreaterThanOrEqual(2);
    }
  });
});
