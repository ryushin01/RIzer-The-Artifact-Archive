import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { galleryOf, kindLabel } from "@rizer/domain";
import { ImageResponse } from "next/og";
import sharp from "sharp";

import { getArtifact } from "@/shared/api/index.server";

/**
 * 유물마다 공유용 이미지(1200×630). 왼쪽에 소장품 사진, 오른쪽에 이름과 권능을 놓는다.
 * 한글은 Pretendard Bold(OFL)로 그린다. 글꼴에 없는 문자(데바나가리, 한자 등)가 든 원어 이름은 뺀다.
 */
export const alt = "RIzer Archive 유물 공유 이미지";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// pnpm의 node_modules 링크는 서버리스 함수에 남지 않으므로 글꼴을 앱 안(assets/fonts, OFL)에 두고 읽는다.
const FONT = join(process.cwd(), "assets/fonts/Pretendard-Bold.otf");
/** 이름이 길수록 글자를 줄여 두 줄 안에 넣는다. */
const titleSize = (title: string) => (title.length > 10 ? 60 : title.length > 7 ? 76 : 96);
const latinOrHangul = /^[\u0000-ɏḀ-ỿ가-힣\s·'’]+$/;

/**
 * 미리보기 사진을 직접 받아 JPEG data URI로 넘긴다. ImageResponse는 내부 주소를 막고 WebP를 그리지 못한다.
 * 받지 못하면 사진 없이 그린다.
 */
async function photoOf(url: string | undefined): Promise<{ src: string; background: string } | null> {
  if (!url) return null;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const input = Buffer.from(await res.arrayBuffer());
    // 왼쪽 칸을 사진의 바탕색(왼쪽 위 모서리)으로 칠해 사진과 이어 보이게 한다.
    const { data } = await sharp(input).extract({ left: 0, top: 0, width: 1, height: 1 }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const jpeg = await sharp(input).resize({ width: 880, height: 1180, fit: "inside" }).jpeg({ quality: 82 }).toBuffer();
    return { src: `data:image/jpeg;base64,${jpeg.toString("base64")}`, background: `rgb(${data[0]}, ${data[1]}, ${data[2]})` };
  } catch {
    return null;
  }
}

export async function ArtifactOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [font, detail] = await Promise.all([readFile(FONT), getArtifact(slug)]);
  const artifact = detail && detail !== "offline" ? detail.artifact : null;
  const photo = await photoOf(artifact?.image?.previewUrl);
  const original = artifact && latinOrHangul.test(artifact.titleOriginal) ? artifact.titleOriginal : "";

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#050505", color: "#f4f2ee", fontFamily: "Pretendard" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 480,
            height: "100%",
            background: photo?.background ?? artifact?.image?.dominantColor ?? "#1a1a1a",
          }}
        >
          {photo && (
            // eslint-disable-next-line @next/next/no-img-element -- ImageResponse 안에서는 img만 쓴다
            <img src={photo.src} alt="" style={{ maxWidth: 440, maxHeight: 590, objectFit: "contain" }} />
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: "56px 64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, letterSpacing: 4, color: "#b9b4ab" }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#e2283c" }} />
            <div style={{ display: "flex" }}>RIZER · THE ARTIFACT ARCHIVE</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {artifact && (
              <div style={{ display: "flex", fontSize: 26, color: "#e2283c" }}>
                {`${galleryOf(artifact.gallery).label} · ${kindLabel(artifact.kind)}`}
              </div>
            )}
            <div style={{ display: "flex", fontSize: titleSize(artifact?.title ?? ""), lineHeight: 1.1, wordBreak: "keep-all" }}>
              {artifact?.title ?? "전설 속 유물"}
            </div>
            {original && <div style={{ display: "flex", fontSize: 30, color: "#b9b4ab" }}>{original}</div>}
          </div>
          <div style={{ display: "flex", fontSize: 28, lineHeight: 1.45, color: "#e4e0d8", maxHeight: 82, overflow: "hidden", wordBreak: "keep-all" }}>
            {artifact?.power ?? "전설 속 유물을 딥줌으로 확대해 보고 해설을 읽는 온라인 전시실"}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Pretendard", data: font, weight: 700, style: "normal" }] },
  );
}
