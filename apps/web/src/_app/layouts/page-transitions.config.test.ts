import { describe, expect, it } from "vitest";

import { motionConfig, reducedConfig, selectConfig, stripLocale } from "./page-transitions.config";

describe("화면 전환 설정", () => {
  it("움직임을 줄이면 전환이 없는 설정을 쓴다", () => {
    expect(selectConfig(true)).toBe(reducedConfig);
    expect(reducedConfig.transitions).toEqual([]);
    expect(selectConfig(false)).toBe(motionConfig);
  });

  it("zoom은 아카이브와 관련 유물에서만 쓰고, 첫 화면은 fade로 둔다", () => {
    const rules = motionConfig.transitions as unknown as { from?: string; to?: string }[];
    const zoomFrom = rules.filter((r) => r.to === "/artifacts/*").map((r) => r.from);
    expect(zoomFrom).toEqual(["/artifacts", "/artifacts/*"]);
  });

  it("영어 화면도 같은 규칙으로 비교한다", () => {
    expect(stripLocale("/en")).toBe("/");
    expect(stripLocale("/en/artifacts/excalibur")).toBe("/artifacts/excalibur");
    expect(stripLocale("/artifacts")).toBe("/artifacts");
    expect(stripLocale("/encyclopedia")).toBe("/encyclopedia");
    expect(motionConfig.middleware?.("/en/artifacts", "/en/artifacts/x")).toEqual({
      from: "/artifacts",
      to: "/artifacts/x",
    });
  });
});
