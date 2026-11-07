/* eslint-disable @next/next/no-img-element -- 타일 서버의 미리보기라 next/image 최적화를 거치지 않는다 */
import { ImageOff } from "lucide-react";

/** 목록용 정사각 미리보기. 이미지가 없으면 자리 표시를 그린다. */
export function ArtifactThumb({ src, alt, color }: { src?: string; alt: string; color?: string }) {
  if (!src) {
    return (
      <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        <ImageOff className="size-4" aria-hidden />
        <span className="sr-only">이미지 없음</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="size-12 shrink-0 rounded-md object-cover"
      style={{ backgroundColor: color }}
    />
  );
}
