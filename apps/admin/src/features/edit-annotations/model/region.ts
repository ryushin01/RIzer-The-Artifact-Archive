import type { Region } from "@rizer/domain";

export type ImageSize = { width: number; height: number };

/** Annotorious 사각형(이미지 픽셀 좌표) */
export type PixelRect = { x: number; y: number; w: number; h: number };

const round = (n: number) => Math.round(n * 100) / 100;
const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

/** 픽셀 사각형 → 백분율 영역. 이미지 밖으로 나간 부분은 자른다. */
export function pixelsToRegion(rect: PixelRect, size: ImageSize): Region {
  const x0 = clamp(rect.x, 0, size.width);
  const y0 = clamp(rect.y, 0, size.height);
  const x1 = clamp(rect.x + rect.w, 0, size.width);
  const y1 = clamp(rect.y + rect.h, 0, size.height);
  return {
    x: round((x0 / size.width) * 100),
    y: round((y0 / size.height) * 100),
    w: Math.max(0.01, round(((x1 - x0) / size.width) * 100)),
    h: Math.max(0.01, round(((y1 - y0) / size.height) * 100)),
  };
}

/** 백분율 영역 → 픽셀 사각형 */
export function regionToPixels(region: Region, size: ImageSize): PixelRect {
  return {
    x: (region.x / 100) * size.width,
    y: (region.y / 100) * size.height,
    w: (region.w / 100) * size.width,
    h: (region.h / 100) * size.height,
  };
}

/** Annotorious가 쓰는 주석 객체(사각형) */
export function toAnnotoriousShape(id: string, region: Region, size: ImageSize) {
  const { x, y, w, h } = regionToPixels(region, size);
  return {
    id,
    bodies: [],
    target: {
      annotation: id,
      selector: {
        type: "RECTANGLE",
        geometry: { x, y, w, h, bounds: { minX: x, minY: y, maxX: x + w, maxY: y + h } },
      },
    },
  };
}

/** 화면에 보이는 영역(이미지 좌표)을 가운데 60%로 줄여 새 주석 영역으로 쓴다. 끌기 없이 주석을 만드는 방법이다. */
export function regionFromViewport(view: PixelRect, size: ImageSize): Region {
  const shrink = 0.6;
  return pixelsToRegion(
    {
      x: view.x + (view.w * (1 - shrink)) / 2,
      y: view.y + (view.h * (1 - shrink)) / 2,
      w: view.w * shrink,
      h: view.h * shrink,
    },
    size,
  );
}
