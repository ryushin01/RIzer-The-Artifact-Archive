import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: { name: "@storybook/nextjs-vite", options: {} },
  core: { disableTelemetry: true },
  // 공개 사이트와 함께 배포할 때(STORYBOOK_IN_APP=1)는 public(딥줌 타일 약 95MB)을 복사하지 않는다.
  // 같은 주소에서 열리므로 /tiles 같은 정적 파일은 사이트의 것을 그대로 쓴다.
  viteFinal: (viteConfig) =>
    process.env.STORYBOOK_IN_APP
      ? { ...viteConfig, publicDir: false }
      : viteConfig,
};

export default config;
