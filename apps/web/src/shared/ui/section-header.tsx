"use client";

import type { ReactNode } from "react";
import styled from "styled-components";

/** 번호가 붙은 섹션 머리: "01 COLLECTION" + 제목 + 설명 */
export function SectionHeader({
  index,
  label,
  title,
  titleId,
  description,
  tone = "dark",
}: {
  index: string;
  label: string;
  title: ReactNode;
  titleId: string;
  description?: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <Header $tone={tone}>
      <Eyebrow $tone={tone}>
        <b>{index}</b> {label}
      </Eyebrow>
      <h2 id={titleId}>{title}</h2>
      {description && <p>{description}</p>}
    </Header>
  );
}

const Header = styled.header<{ $tone: "dark" | "light" }>`
  display: grid;
  gap: 16px;
  max-width: 820px;
  h2 {
    font-size: clamp(28px, 4.2vw, 52px);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }
  p {
    font-size: clamp(15px, 1.3vw, 18px);
    color: ${({ theme, $tone }) => ($tone === "light" ? theme.color.inkMuted : theme.color.muted)};
  }
`;
const Eyebrow = styled.span<{ $tone: "dark" | "light" }>`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme, $tone }) => ($tone === "light" ? theme.color.inkMuted : theme.color.muted)};
  b {
    font-weight: 400;
    color: ${({ theme, $tone }) => ($tone === "light" ? "#b3122a" : theme.color.accentText)};
  }
`;
