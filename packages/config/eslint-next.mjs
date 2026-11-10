// Next.js 앱 공통 ESLint 설정. 앱마다 eslint.config.mjs에서 펼쳐 쓴다.
import { globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export const nextAppConfig = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // 구조 분해에서 일부러 빼는 값은 _로 시작한다.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" },
      ],
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "coverage/**", "storybook-static/**", "public/storybook/**", "next-env.d.ts"]),
];
