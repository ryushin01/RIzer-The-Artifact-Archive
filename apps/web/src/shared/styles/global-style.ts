"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  /* 아래쪽 고정 메뉴에 초점이 가리지 않게 스크롤 여백을 둔다(KWCAG 6.1.2). */
  html { -webkit-text-size-adjust: 100%; color-scheme: dark; scroll-padding-bottom: 96px; }
  html, body { margin: 0; padding: 0; }
  body {
    background: ${({ theme }) => theme.color.bg};
    color: ${({ theme }) => theme.color.text};
    font-family: ${({ theme }) => theme.font.body};
    font-size: 16px;
    line-height: 1.65;
    word-break: keep-all;
    overflow-wrap: anywhere;
    -webkit-font-smoothing: antialiased;
  }
  img, svg, canvas { display: block; max-width: 100%; }
  a { color: inherit; }
  button { font: inherit; color: inherit; }
  h1, h2, h3, h4, p, ul, ol, figure, dl, dd { margin: 0; }
  ul, ol { padding: 0; }
  :focus-visible {
    outline: 3px solid ${({ theme }) => theme.color.focus};
    outline-offset: 3px;
  }
  .sr-only {
    position: absolute !important;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
  ::selection { background: ${({ theme }) => theme.color.accent}; color: #fff; }
  /* 사용자가 움직임을 줄였거나 사이트에서 끄면 전환·스크롤 애니메이션을 멈춘다(KWCAG 6.2.2). */
  html[data-motion="reduce"] *, html[data-motion="reduce"] *::before, html[data-motion="reduce"] *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
`;
