import "styled-components";

import type { Theme } from "@/shared/config";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- 테마 타입을 styled-components에 알린다.
  export interface DefaultTheme extends Theme {}
}
