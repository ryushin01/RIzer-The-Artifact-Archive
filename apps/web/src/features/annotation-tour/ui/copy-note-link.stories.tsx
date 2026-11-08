import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { CopyNoteLink } from "./copy-note-link";

const meta = {
  title: "Features/AnnotationTour/CopyNoteLink",
  component: CopyNoteLink,
  // 클립보드 권한이 없는 브라우저에서도 결과가 같도록 흉내 낸다.
  beforeEach: () => {
    const original = navigator.clipboard;
    let copied = "";
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async (text: string) => void (copied = text), readText: async () => copied },
    });
    return () => Object.defineProperty(navigator, "clipboard", { configurable: true, value: original });
  },
} satisfies Meta<typeof CopyNoteLink>;
export default meta;

/** 누르면 지금 주소를 복사하고, 결과를 상태 메시지로 알린다. */
export const Copy: StoryObj<typeof meta> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "이 주석 링크 복사" }));
    await expect(canvas.getByRole("status")).toHaveTextContent("링크를 복사했습니다");
    await expect(await navigator.clipboard.readText()).toBe(window.location.href);
  },
};
