import type { Decorator, Preview } from "@storybook/nextjs-vite";
import { type ReactNode, useState } from "react";

import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import { makeStore } from "@/_app";
import { theme } from "@/shared/config/theme";
import { GlobalStyle } from "@/shared/styles/global-style";

/** 앱과 같은 테마·전역 스타일·스토어로 그린다. 스토리마다 새 스토어를 만들어 상태가 섞이지 않게 한다. */
function StoryProviders({ preloaded, children }: { preloaded?: Parameters<typeof makeStore>[0]; children: ReactNode }) {
  const [store] = useState(() => makeStore(preloaded));
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div lang="ko" style={{ padding: 24, minHeight: "100vh" }}>
          {children}
        </div>
      </ThemeProvider>
    </Provider>
  );
}

const withProviders: Decorator = (Story, context) => (
  <StoryProviders preloaded={context.parameters.store}>
    <Story />
  </StoryProviders>
);

const preview: Preview = {
  decorators: [withProviders],
  parameters: {
    nextjs: { appDirectory: true },
    layout: "fullscreen",
    backgrounds: { disable: true },
    // 접근성 위반(axe)이 있으면 스토리 테스트를 실패시킨다(pnpm test:storybook).
    a11y: { test: "error" },
  },
};

export default preview;
