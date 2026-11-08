import type { ArtifactSummary } from "@rizer/domain";
import { SEED_ARTIFACTS } from "@rizer/domain/seed";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ArtifactTable } from "./artifact-table";

const item = (i: number): ArtifactSummary => {
  const { story: _story, source: _source, ...seed } = SEED_ARTIFACTS[i]!;
  return { ...seed, id: `art_${i}`, image: null, annotationCount: i, updatedAt: "2026-11-07T00:00:00.000Z" };
};

describe("ArtifactTable", () => {
  it("유물 이름이 편집 화면으로 가는 링크이고, 열 머리가 있다", () => {
    render(<ArtifactTable items={[item(0), item(3)]} />);
    const table = screen.getByRole("table");
    expect(within(table).getAllByRole("columnheader").map((h) => h.textContent)).toEqual([
      "유물",
      "전시실",
      "종류",
      "주석",
      "상태",
      "수정일",
    ]);
    expect(screen.getByRole("link", { name: "엑스칼리버" })).toHaveAttribute("href", "/artifacts/art_0");
    expect(screen.getByText("유물 2점")).toBeInTheDocument();
  });

  it("결과가 없으면 안내를 보여 준다", () => {
    render(<ArtifactTable items={[]} />);
    expect(screen.getByText("조건에 맞는 유물이 없습니다")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });
});
