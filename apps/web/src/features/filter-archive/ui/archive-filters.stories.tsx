import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { ArchiveFilters } from "./archive-filters";

const meta = {
  title: "Features/ArchiveFilters",
  component: ArchiveFilters,
  parameters: {
    store: { archive: { query: { sort: "featured" }, items: [], total: 16, status: "idle", error: null, more: "idle" } },
  },
} satisfies Meta<typeof ArchiveFilters>;
export default meta;

/** 전시실은 라디오 버튼이라 화살표 키로 고른다. 조건이 생기면 "조건 지우기"가 나타난다. */
export const ChooseGallery: StoryObj<typeof meta> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("status")).toHaveTextContent("유물 16점");
    await userEvent.click(canvas.getByRole("radio", { name: "북유럽·게르만 신화" }));
    await expect(canvas.getByRole("radio", { name: "북유럽·게르만 신화" })).toBeChecked();
    await expect(canvas.getByRole("button", { name: "조건 지우기" })).toBeVisible();
  },
};
