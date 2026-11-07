import type { Region } from "@rizer/domain";

/** 백분율 영역 → 이미지 픽셀 사각형 */
export function regionToImageRect(region: Region, size: { width: number; height: number }) {
  return {
    x: (region.x / 100) * size.width,
    y: (region.y / 100) * size.height,
    width: (region.w / 100) * size.width,
    height: (region.h / 100) * size.height,
  };
}

/** 주석으로 확대할 때 둘레에 여백을 둔다(영역 크기의 비율). 이미지 밖으로는 넓히지 않는다. */
export function padRect(
  rect: { x: number; y: number; width: number; height: number },
  size: { width: number; height: number },
  ratio = 0.35,
) {
  const padX = rect.width * ratio;
  const padY = rect.height * ratio;
  const x = Math.max(0, rect.x - padX);
  const y = Math.max(0, rect.y - padY);
  return {
    x,
    y,
    width: Math.min(size.width, rect.x + rect.width + padX) - x,
    height: Math.min(size.height, rect.y + rect.height + padY) - y,
  };
}
