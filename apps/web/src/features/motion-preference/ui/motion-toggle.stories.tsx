import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { MotionToggle } from "./motion-toggle";

const meta = { title: "Features/MotionToggle", component: MotionToggle } satisfies Meta<typeof MotionToggle>;
export default meta;

/** 누르면 움직임 효과가 꺼지고(aria-pressed=false) html[data-motion]이 reduce가 된다. */
export const Toggle: StoryObj<typeof meta> = {
  parameters: { store: { motion: { mode: "full", systemReduced: false } } },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "움직임 효과" });
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(button);
    await expect(button).toHaveAttribute("aria-pressed", "false");
    await expect(document.documentElement.dataset.motion).toBe("reduce");
  },
};
