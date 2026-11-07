import { describe, expect, it } from "vitest";

import { findNavItem } from "./navigation";

describe("findNavItem", () => {
  it("하위 주소도 상위 메뉴로 찾는다", () => {
    expect(findNavItem("/")?.title).toBe("대시보드");
    expect(findNavItem("/artifacts")?.title).toBe("유물");
    expect(findNavItem("/artifacts/art_1/annotations")?.title).toBe("유물");
    expect(findNavItem("/artifactsx")).toBeUndefined();
  });
});
