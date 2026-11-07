import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StatusBadge } from "./status-badge";

describe("StatusBadge", () => {
  it("색만이 아니라 글자로 상태를 알린다", () => {
    const { rerender } = render(<StatusBadge status="published" />);
    expect(screen.getByText("공개")).toBeInTheDocument();
    rerender(<StatusBadge status="draft" />);
    expect(screen.getByText("비공개")).toBeInTheDocument();
  });
});
