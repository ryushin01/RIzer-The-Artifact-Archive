import type { StorybookConfig } from "@storybook/nextjs-vite";

/** 앱과 함께 배포하는 빌드(pnpm build-storybook, pnpm build)인지. 환경 변수 대신 스크립트 이름으로 판단해 Windows에서도 동작합니다. */
const inApp = process.env.npm_lifecycle_event === "build-storybook";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: { name: "@storybook/nextjs-vite", options: {} },
  core: { disableTelemetry: true },
  // 공개 사이트와 함께 배포할 때(pnpm build-storybook)는 public(딥줌 타일 약 95MB)을 복사하지 않는다.
  // 같은 주소에서 열리므로 /tiles 같은 정적 파일은 사이트의 것을 그대로 쓴다.
  viteFinal: (viteConfig) =>
    inApp ? { ...viteConfig, publicDir: false } : viteConfig,
};

export default config;
