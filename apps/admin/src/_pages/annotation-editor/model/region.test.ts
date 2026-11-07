import { describe, expect, it } from "vitest";

import { pixelsToRegion, regionFromViewport, regionToPixels, toAnnotoriousShape } from "./region";

const size = { width: 2000, height: 1000 };

describe("주석 영역 변환", () => {
  it("픽셀과 백분율을 오간다", () => {
    const region = pixelsToRegion({ x: 200, y: 100, w: 400, h: 300 }, size);
    expect(region).toEqual({ x: 10, y: 10, w: 20, h: 30 });
    expect(regionToPixels(region, size)).toEqual({ x: 200, y: 100, w: 400, h: 300 });
  });

  it("이미지 밖으로 나간 부분은 자른다", () => {
    expect(pixelsToRegion({ x: -100, y: 900, w: 300, h: 300 }, size)).toEqual({ x: 0, y: 90, w: 10, h: 10 });
  });

  it("Annotorious 사각형을 만든다", () => {
    const shape = toAnnotoriousShape("a1", { x: 10, y: 10, w: 20, h: 30 }, size);
    expect(shape.target.selector.geometry.bounds).toEqual({ minX: 200, minY: 100, maxX: 600, maxY: 400 });
  });

  it("보이는 영역의 가운데 60%로 새 영역을 만든다", () => {
    expect(regionFromViewport({ x: 0, y: 0, w: 2000, h: 1000 }, size)).toEqual({ x: 20, y: 20, w: 60, h: 60 });
  });
});
