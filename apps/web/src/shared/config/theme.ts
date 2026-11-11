/**
 * 디자인 토큰. 어두운 전시실을 바탕으로, 붉은 점(강조)과 차가운 푸른 빛을 쓴다.
 * 대비(KWCAG 5.4.3): text·muted는 bg 대비 4.5:1 이상, accentText는 작은 글자에도 쓸 수 있는 붉은색(5.4:1).
 * accent는 큰 글자·도형·초점 표시에만 쓴다(3:1 이상).
 */
export const theme = {
  color: {
    bg: "#050505",
    surface: "#0e0e10",
    surface2: "#16161a",
    line: "rgba(244, 242, 238, 0.14)",
    lineStrong: "rgba(244, 242, 238, 0.32)",
    text: "#f4f2ee",
    muted: "rgba(244, 242, 238, 0.7)",
    accent: "#e2283c",
    accentText: "#ff6070",
    glowRed: "rgba(170, 20, 40, 0.55)",
    glowBlue: "rgba(40, 70, 200, 0.45)",
    paper: "#f3f1ec",
    ink: "#141414",
    inkMuted: "#4a4845",
    focus: "#ffd166",
  },
  font: {
    // 글꼴을 받기 전이나 받지 못하면 운영체제의 명조와 고정폭 글꼴로 나온다.
    display: "var(--font-display-en), var(--font-display-ko), AppleMyungjo, Batang, serif",
    body: "var(--font-body), AppleMyungjo, Batang, 'Noto Serif CJK KR', serif",
    mono: "var(--font-mono), ui-monospace, Menlo, Consolas, monospace",
  },
  radius: { sm: "8px", md: "14px", lg: "24px", pill: "999px" },
  bp: { sm: "640px", md: "900px", lg: "1200px" },
  z: { nav: 40, cursor: 60, gate: 80 },
  ease: { out: "cubic-bezier(0.22, 1, 0.36, 1)" },
} as const;

export type Theme = typeof theme;

export const media = {
  sm: `@media (min-width: ${theme.bp.sm})`,
  md: `@media (min-width: ${theme.bp.md})`,
  lg: `@media (min-width: ${theme.bp.lg})`,
  reduced: "@media (prefers-reduced-motion: reduce)",
  finePointer: "@media (hover: hover) and (pointer: fine)",
};
