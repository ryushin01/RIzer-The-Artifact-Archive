import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchArtifact, fetchArtifacts, toSearchParams } from "./archive";

afterEach(() => vi.unstubAllGlobals());

describe("toSearchParams", () => {
  it("기본값과 빈 값은 빼고 쿼리를 만든다", () => {
    expect(toSearchParams({ q: "검", gallery: "norse", sort: "featured" }).toString()).toBe("q=%EA%B2%80&gallery=norse");
    expect(toSearchParams({ sort: "oldest" }).toString()).toBe("sort=oldest");
  });
});

describe("archive api", () => {
  it("목록을 부른다", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ items: [], total: 0 })));
    vi.stubGlobal("fetch", fetchMock);
    await expect(fetchArtifacts({ kind: "weapon" })).resolves.toEqual({ items: [], total: 0 });
    expect(fetchMock.mock.calls[0]![0]).toMatch(/\/api\/public\/artifacts\?kind=weapon$/);
  });

  it("없는 유물은 null, 다른 오류는 던진다", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 404 })));
    await expect(fetchArtifact("nope")).resolves.toBeNull();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 500 })));
    await expect(fetchArtifact("x")).rejects.toThrow("500");
  });
});
