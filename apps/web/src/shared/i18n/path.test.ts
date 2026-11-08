import { describe, expect, it } from "vitest";

import { localePath, otherLocalePath, stripLocale, yearLabel } from "./path";

describe("언어별 주소", () => {
  it("영어는 /en을 붙이고 한국어는 그대로 둔다", () => {
    expect(localePath("ko", "/artifacts")).toBe("/artifacts");
    expect(localePath("en", "/artifacts?gallery=norse")).toBe("/en/artifacts?gallery=norse");
    expect(localePath("en", "/")).toBe("/en");
    expect(localePath("en", "/#faq")).toBe("/en#faq");
  });

  it("언어판을 서로 오간다", () => {
    expect(stripLocale("/en")).toBe("/");
    expect(stripLocale("/en/artifacts/gram")).toBe("/artifacts/gram");
    expect(stripLocale("/english")).toBe("/english");
    expect(otherLocalePath("ko", "/artifacts/gram")).toBe("/en/artifacts/gram");
    expect(otherLocalePath("en", "/en/artifacts/gram")).toBe("/artifacts/gram");
    expect(otherLocalePath("en", "/en")).toBe("/");
  });

  it("연도를 언어에 맞게 쓴다", () => {
    expect(yearLabel(-750, "ko")).toBe("기원전 750년경");
    expect(yearLabel(1136, "ko")).toBe("1136년");
    expect(yearLabel(-750, "en")).toBe("c. 750 BCE");
    expect(yearLabel(1136, "en")).toBe("1136");
  });
});
