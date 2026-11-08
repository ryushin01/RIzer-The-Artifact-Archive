import type { ArtifactSummary } from "@rizer/domain";

/** 스토리·테스트용 가상 유물. 이미지는 네트워크 없이 그리는 SVG다. */
const svg = (hue: number) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000"><rect width="800" height="1000" fill="hsl(${hue},25%,82%)"/><rect x="370" y="120" width="60" height="760" rx="10" fill="hsl(${hue},20%,30%)"/><rect x="250" y="300" width="300" height="40" rx="8" fill="hsl(${hue},30%,40%)"/></svg>`,
  )}`;

export function makeArtifactFixture(i: number, patch: Partial<ArtifactSummary> = {}): ArtifactSummary {
  return {
    id: `art_fixture_${i}`,
    slug: `fixture-${i}`,
    title: ["엑스칼리버", "묠니르", "아이기스", "만파식적"][i % 4]!,
    titleOriginal: ["Excalibur", "Mjölnir", "Aegis", "萬波息笛"][i % 4]!,
    gallery: (["arthurian", "norse", "greek", "korean"] as const)[i % 4]!,
    kind: (["weapon", "weapon", "armor", "treasure"] as const)[i % 4]!,
    owner: "가상의 소유자",
    maker: "가상의 대장장이",
    power: "스토리에서 보여 주기 위한 가상의 권능입니다.",
    firstRecord: "가상의 문헌",
    recordYear: [1136, 1220, -750, 1281][i % 4]!,
    summary: "가상의 요약입니다.",
    imageAlt: "회색 바탕에 세로로 선 막대 모양의 도형",
    status: "published",
    featured: i === 0,
    image: {
      dziUrl: "https://example.com/image.dzi",
      previewUrl: svg(i * 70),
      width: 800,
      height: 1000,
      lqip: svg(i * 70),
      dominantColor: "#cfcac2",
    },
    annotationCount: 3,
    updatedAt: "2026-11-07T00:00:00.000Z",
    ...patch,
  };
}

export const ARTIFACT_FIXTURES = [0, 1, 2, 3].map((i) => makeArtifactFixture(i));
