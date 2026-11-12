import { defineConfig } from "eslint/config";

import { nextAppConfig } from "@rizer/config/eslint-next";

export default defineConfig([
  ...nextAppConfig,
  // shadcn/ui에서 받은 부품이라 원본 모양을 유지한다. 규칙 쪽에서 이유와 함께 예외로 둔다.
  {
    // Label은 쓰는 곳에서 htmlFor를 넘기는 감싸개다.
    files: ["src/components/label.tsx"],
    rules: { "jsx-a11y/label-has-associated-control": "off" },
  },
  {
    // PaginationLink는 링크 글자(children)를 props로 받아 그대로 넘긴다.
    files: ["src/components/pagination.tsx"],
    rules: { "jsx-a11y/anchor-has-content": "off" },
  },
  {
    // 덧붙인 글자·아이콘을 마우스로 눌러도 입력란에 초점을 주는 편의 기능이다. 키보드로는 입력란에 바로 Tab으로 간다.
    files: ["src/components/input-group.tsx"],
    rules: {
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-noninteractive-element-interactions": "off",
    },
  },
]);
