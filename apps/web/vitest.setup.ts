import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Vitest globals를 쓰지 않아 Testing Library가 자동 정리를 등록하지 못하므로 직접 정리한다.
afterEach(() => cleanup());
