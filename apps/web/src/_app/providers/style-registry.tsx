"use client";

import { useServerInsertedHTML } from "next/navigation";
import { type ReactNode, useState } from "react";
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from "styled-components";

import { theme } from "@/shared/config/theme";
import { GlobalStyle } from "@/shared/styles/global-style";

/**
 * styled-components SSR 등록부(Next.js 공식 방법). 서버에서 그린 스타일을 <head>에 넣어
 * 첫 화면이 스타일 없이 깜박이지 않게 한다.
 */
export function StyledRegistry({ children }: { children: ReactNode }) {
  const [sheet] = useState(() => new ServerStyleSheet());
  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });
  const content = (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
  if (typeof window !== "undefined") return content;
  return <StyleSheetManager sheet={sheet.instance}>{content}</StyleSheetManager>;
}
