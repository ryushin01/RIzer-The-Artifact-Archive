import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { PublishToggle } from "./publish-toggle";

const setStatusAction = vi.hoisted(() => vi.fn());
vi.mock("../api/actions", () => ({ setStatusAction }));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe("PublishToggle", () => {
  beforeEach(() => setStatusAction.mockReset());

  it("더블 클릭해도 공개 요청을 한 번만 보내고, 바꿀 상태를 직접 넘긴다", async () => {
    let resolve!: (v: { ok: boolean; message: string }) => void;
    setStatusAction.mockReturnValue(new Promise((r) => (resolve = r)));
    render(<PublishToggle id="art_1" status="draft" />);

    await userEvent.dblClick(screen.getByRole("button", { name: "공개하기" }));
    expect(setStatusAction).toHaveBeenCalledTimes(1);
    expect(setStatusAction).toHaveBeenCalledWith("art_1", "published");

    resolve({ ok: true, message: "공개했습니다." });
    // 끝나면 잠금이 풀려 다시 누를 수 있다.
    setStatusAction.mockResolvedValue({ ok: true, message: "" });
    await vi.waitFor(() => expect(screen.getByRole("button")).toBeEnabled());
    await userEvent.click(screen.getByRole("button"));
    expect(setStatusAction).toHaveBeenCalledTimes(2);
  });
});
