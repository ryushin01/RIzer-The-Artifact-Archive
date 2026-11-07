import { describe, expect, it } from "vitest";

import { padRect, regionToImageRect } from "./geometry";

const size = { width: 4000, height: 2000 };

describe("viewer geometry", () => {
  it("백분율 영역을 이미지 픽셀로 바꾼다", () => {
    expect(regionToImageRect({ x: 10, y: 50, w: 25, h: 10 }, size)).toEqual({ x: 400, y: 1000, width: 1000, height: 200 });
  });

  it("여백을 두되 이미지 밖으로 넓히지 않는다", () => {
    expect(padRect({ x: 0, y: 0, width: 1000, height: 1000 }, size, 0.5)).toEqual({ x: 0, y: 0, width: 1500, height: 1500 });
    expect(padRect({ x: 3500, y: 1500, width: 500, height: 500 }, size, 0.5)).toEqual({ x: 3250, y: 1250, width: 750, height: 750 });
  });
});
