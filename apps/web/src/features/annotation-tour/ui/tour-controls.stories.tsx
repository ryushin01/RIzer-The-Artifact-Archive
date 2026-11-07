import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { TourControls } from "./tour-controls";

const meta = {
  title: "Features/TourControls",
  component: TourControls,
  parameters: { store: { tour: { ids: ["a", "b", "c"], activeId: null, playing: false, markersVisible: true } } },
} satisfies Meta<typeof TourControls>;
export default meta;

/** 다음·이전으로 주석을 옮기고, 끝에서는 다음 버튼이 비활성이 된다. */
export const StepThrough: StoryObj<typeof meta> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("주석 3개")).toBeVisible();
    const nextButton = canvas.getByRole("button", { name: "다음 주석" });
    await userEvent.click(nextButton);
    await expect(canvas.getByText("01 / 03")).toBeVisible();
    await userEvent.click(nextButton);
    await userEvent.click(nextButton);
    await expect(canvas.getByText("03 / 03")).toBeVisible();
    await expect(nextButton).toBeDisabled();
  },
};

/** 재생하면 첫 주석부터 시작하고 버튼 이름이 "투어 멈춤"으로 바뀐다. */
export const Play: StoryObj<typeof meta> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "안내 투어 재생" }));
    await expect(canvas.getByRole("button", { name: "투어 멈춤" })).toBeVisible();
    await expect(canvas.getByText("01 / 03")).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "투어 멈춤" }));
  },
};
