"use client";

import Link from "next/link";
import styled, { css } from "styled-components";

import { media } from "../config/theme";

/** 화면에서는 숨기고 화면 낭독기에는 읽힌다. */
export const VisuallyHidden = styled.span`
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: 16px;
  ${media.md} {
    padding-inline: 40px;
  }
`;

/** 대괄호로 감싼 고정폭 라벨: [THE ARTIFACT ARCHIVE] */
export const MonoLabel = styled.span<{ $tone?: "muted" | "accent" }>`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme, $tone }) => ($tone === "accent" ? theme.color.accentText : theme.color.muted)};
`;

/** 아주 넓은 대문자 제목 */
export const Display = styled.h2<{ $size?: "xl" | "lg" | "md" }>`
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  /* 영어 단어가 중간에서 끊기지 않게 한다(본문은 overflow-wrap: anywhere). */
  overflow-wrap: normal;
  word-break: normal;
  font-size: ${({ $size = "lg" }) =>
    ({ xl: "clamp(40px, 8.4vw, 136px)", lg: "clamp(34px, 7vw, 104px)", md: "clamp(26px, 4vw, 56px)" })[$size]};
`;

const buttonBase = css<{ $variant?: "primary" | "light" | "ghost" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 48px;
  padding: 12px 22px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid transparent;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition:
    background 0.25s ${({ theme }) => theme.ease.out},
    color 0.25s,
    transform 0.25s ${({ theme }) => theme.ease.out};
  &:active {
    transform: scale(0.98);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  ${({ theme, $variant = "light" }) =>
    ({
      primary: css`
        background: ${theme.color.accent};
        color: #fff;
        &:hover {
          background: #c41a2d;
        }
      `,
      light: css`
        background: ${theme.color.text};
        color: ${theme.color.ink};
        &:hover {
          background: #fff;
        }
      `,
      ghost: css`
        background: transparent;
        color: ${theme.color.text};
        border-color: ${theme.color.lineStrong};
        &:hover {
          background: rgba(255, 255, 255, 0.08);
        }
      `,
    })[$variant]}
`;

export const Button = styled.button<{ $variant?: "primary" | "light" | "ghost" }>`
  ${buttonBase}
`;

export const LinkButton = styled(Link)<{ $variant?: "primary" | "light" | "ghost" }>`
  ${buttonBase}
`;

/** 아이콘만 있는 둥근 버튼. 접근 가능한 이름은 aria-label로 준다. */
export const IconButton = styled.button<{ $active?: boolean }>`
  display: inline-grid;
  place-items: center;
  width: 44px;
  height: 44px;
  flex: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.color.lineStrong};
  background: ${({ theme, $active }) => ($active ? theme.color.text : "rgba(10, 10, 12, 0.6)")};
  color: ${({ theme, $active }) => ($active ? theme.color.ink : theme.color.text)};
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${({ $active }) => ($active ? "#fff" : "rgba(255, 255, 255, 0.12)")};
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  svg {
    width: 18px;
    height: 18px;
  }
`;

/** 붉은 점. 강조 표시와 커서에 쓴다. */
export const RedDot = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.accent};
  box-shadow: 0 0 18px ${({ theme }) => theme.color.accent};
  flex: none;
`;

/** 방사형 빛 배경. 붉은 빛과 푸른 빛이 겹친다. */
export const GlowBackdrop = styled.div<{ $intensity?: number }>`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: ${({ $intensity = 1 }) => $intensity};
  background:
    radial-gradient(60% 50% at 70% 30%, ${({ theme }) => theme.color.glowRed}, transparent 70%),
    radial-gradient(50% 50% at 15% 80%, ${({ theme }) => theme.color.glowBlue}, transparent 70%),
    radial-gradient(80% 80% at 50% 50%, rgba(20, 20, 30, 0.6), transparent);
  filter: blur(20px);
`;
