import { describe, expect, it } from "vitest";

import { motionConfig, reducedConfig, selectConfig, stripLocale } from "./page-transitions.config";

type Rule = { on?: unknown; from?: unknown; to?: unknown; priority?: number };
const shape = (rules: unknown) => (rules as Rule[]).map(({ on, from, to, priority }) => ({ on, from, to, priority }));

describe("화면 전환 설정", () => {
  it("움직임을 줄이면 같은 규칙과 middleware를 쓴다(규칙을 비우면 뒤로 가도 맨 위로 간다)", () => {
    expect(selectConfig(true)).toBe(reducedConfig);
    expect(selectConfig(false)).toBe(motionConfig);
    expect(shape(reducedConfig.transitions)).toEqual(shape(motionConfig.transitions));
    expect(reducedConfig.middleware).toBe(motionConfig.middleware);
  });

  it("쌍 규칙(from·to)만 쓴다(on 규칙은 범위 안끼리 오갈 때 뒤로 가기 위치를 잃는다)", () => {
    expect(shape(motionConfig.transitions)).toEqual([
      { on: undefined, from: "/**", to: "/**", priority: -100 },
      { on: undefined, from: "/artifacts", to: "/artifacts/*", priority: undefined },
      { on: undefined, from: "/artifacts/*", to: "/artifacts/*", priority: undefined },
    ]);
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
