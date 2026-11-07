import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { Faq } from "./faq";

const meta = { title: "Pages/Home/Faq", component: Faq, parameters: { layout: "fullscreen" } } satisfies Meta<typeof Faq>;
export default meta;

/** details/summary라 질문을 누르거나 Enter로 펼친다. 첫 질문은 펼쳐져 있다. */
export const Expand: StoryObj<typeof meta> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const second = canvas.getByText("그럼 사진 속 물건은 무엇인가요?");
    await userEvent.click(second);
    await expect(canvas.getByText(/안티오크 성배/)).toBeVisible();
  },
};
