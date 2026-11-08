import { describe, expect, it } from "vitest";

import { noteFromSearch, withNote } from "./note-link";

const ids = ["a", "b", "c"];

describe("주석 바로가기 주소", () => {
  it("1부터 세는 번호로 주석을 고르고, 잘못된 값은 무시한다", () => {
    expect(noteFromSearch("?note=2", ids)).toBe("b");
    expect(noteFromSearch("?note=0", ids)).toBeNull();
    expect(noteFromSearch("?note=4", ids)).toBeNull();
    expect(noteFromSearch("?note=1e1", ids)).toBeNull();
    expect(noteFromSearch("", ids)).toBeNull();
  });

  it("고른 주석 번호를 주소에 넣고, 고르지 않으면 뺀다. 다른 쿼리와 해시는 남긴다", () => {
    expect(withNote("https://x.dev/artifacts/excalibur?ref=a#top", ids, "c")).toBe("/artifacts/excalibur?ref=a&note=3#top");
    expect(withNote("https://x.dev/artifacts/excalibur?note=3", ids, null)).toBe("/artifacts/excalibur");
    expect(withNote("https://x.dev/artifacts/excalibur?note=3", ids, "z")).toBe("/artifacts/excalibur");
  });
});
