import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ArtifactPagination, pageWindow } from "./artifact-pagination";

describe("pageWindow", () => {
  it("처음·끝과 지금 쪽 앞뒤만 남기고 사이는 줄임표로 접는다", () => {
    expect(pageWindow(1, 4)).toEqual([1, 2, "gap", 4]);
    expect(pageWindow(5, 10)).toEqual([1, "gap", 4, 5, 6, "gap", 10]);
    expect(pageWindow(2, 3)).toEqual([1, 2, 3]);
  });
});

describe("ArtifactPagination", () => {
  it("검색 조건을 유지한 쪽 링크를 만들고 지금 쪽을 알린다", () => {
    render(<ArtifactPagination page={2} pageCount={4} params={{ q: "검", gallery: "norse", status: undefined }} />);
    expect(screen.getByRole("navigation", { name: "유물 목록 쪽" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "2쪽" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "1쪽" })).toHaveAttribute("href", "/artifacts?q=%EA%B2%80&gallery=norse");
    expect(screen.getByRole("link", { name: "다음 페이지" })).toHaveAttribute(
      "href",
      "/artifacts?q=%EA%B2%80&gallery=norse&page=3",
    );
  });

  it("한 쪽뿐이면 그리지 않고, 첫 쪽에는 이전 링크가 없다", () => {
    const { container } = render(<ArtifactPagination page={1} pageCount={1} params={{}} />);
    expect(container).toBeEmptyDOMElement();
    render(<ArtifactPagination page={1} pageCount={3} params={{}} />);
    expect(screen.queryByRole("link", { name: "이전 페이지" })).toBeNull();
  });
});
