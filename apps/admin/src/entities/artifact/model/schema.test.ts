import { SEED_ARTIFACTS } from "@rizer/domain/seed";
import { describe, expect, it } from "vitest";

import { artifactFormSchema } from "./schema";

/** 시드 유물을 폼이 보내는 모양(문자열)으로 바꾼다. */
function toForm(seed = SEED_ARTIFACTS[0]!) {
  const { source, featured, recordYear, ...rest } = seed;
  return {
    ...rest,
    recordYear: String(recordYear),
    ...(featured ? { featured: "on" } : {}),
    ...Object.fromEntries(Object.entries(source).map(([k, v]) => [`source_${k}`, String(v)])),
  };
}

describe("artifactFormSchema", () => {
  it("폼 값을 입력값과 출처로 나눈다", () => {
    const parsed = artifactFormSchema.parse(toForm());
    expect(parsed.input).toMatchObject({ slug: "excalibur", recordYear: 1136, featured: true });
    expect(parsed.source).toMatchObject({ institution: "The Metropolitan Museum of Art", license: "CC0-1.0" });
  });

  it("체크하지 않은 대표 유물은 false", () => {
    const { featured: _f, ...form } = toForm();
    expect(artifactFormSchema.parse(form).input.featured).toBe(false);
  });

  it("잘못된 값은 필드 오류로 알린다", () => {
    const result = artifactFormSchema.safeParse({ ...toForm(), slug: "Bad Slug", recordYear: "abc", title: "" });
    expect(result.success).toBe(false);
    const fields = Object.keys(result.error!.flatten().fieldErrors);
    expect(fields).toEqual(expect.arrayContaining(["slug", "recordYear", "title"]));
  });
});
