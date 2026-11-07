import { describe, expect, it } from "vitest";

import { modeChanged, motionSlice, selectReducedMotion, systemChanged, toggled } from "./slice";

const reduce = (actions: Parameters<typeof motionSlice.reducer>[1][]) =>
  actions.reduce(motionSlice.reducer, motionSlice.getInitialState());

describe("motion slice", () => {
  it("system이면 운영체제 설정을 따른다", () => {
    expect(selectReducedMotion({ motion: reduce([systemChanged(true)]) })).toBe(true);
    expect(selectReducedMotion({ motion: reduce([systemChanged(false)]) })).toBe(false);
  });

  it("사이트 설정이 운영체제 설정보다 앞선다", () => {
    expect(selectReducedMotion({ motion: reduce([systemChanged(true), modeChanged("full")]) })).toBe(false);
  });

  it("토글은 지금 보이는 상태의 반대로 바꾼다", () => {
    expect(reduce([toggled()]).mode).toBe("reduce");
    expect(reduce([systemChanged(true), toggled()]).mode).toBe("full");
  });
});
