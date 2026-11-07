import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ArtifactForm } from "./artifact-form";

const saveArtifactAction = vi.hoisted(() => vi.fn());
vi.mock("../api/actions", () => ({ saveArtifactAction }));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe("ArtifactForm", () => {
  it("만들기 버튼을 더블 클릭해도 저장 요청은 한 번이다", async () => {
    let resolve!: (v: unknown) => void;
    saveArtifactAction.mockReturnValue(new Promise((r) => (resolve = r)));
    render(<ArtifactForm readOnly={false} />);
    await userEvent.dblClick(screen.getByRole("button", { name: "만들기" }));
    await vi.waitFor(() => expect(saveArtifactAction).toHaveBeenCalledTimes(1));
    await new Promise((r) => setTimeout(r, 50));
    expect(saveArtifactAction).toHaveBeenCalledTimes(1);
    // React는 진행 중인 액션들을 함께 묶으므로, 다음 테스트를 막지 않게 끝내 둔다.
    resolve({ status: "idle" });
    await vi.waitFor(() => expect(screen.getByRole("button", { name: "만들기" })).toBeEnabled());
  });

  it("칸마다 레이블이 있고 필드 오류를 그 칸 아래에 보여 준다", async () => {
    saveArtifactAction.mockResolvedValue({
      status: "error",
      fieldErrors: { slug: ["소문자, 숫자, 하이픈(-)만 쓸 수 있습니다."] },
      values: { slug: "Bad Slug" },
    });
    render(<ArtifactForm readOnly={false} />);
    await userEvent.click(screen.getByRole("button", { name: "만들기" }));
    // 실패하면 폼을 다시 그리며 입력값과 오류를 복원한다.
    await vi.waitFor(() => expect(screen.getByLabelText("주소")).toHaveAttribute("aria-invalid", "true"));
    expect(screen.getByLabelText("주소")).toHaveValue("Bad Slug");
    expect(screen.getByText("소문자, 숫자, 하이픈(-)만 쓸 수 있습니다.")).toBeInTheDocument();
  });
});
