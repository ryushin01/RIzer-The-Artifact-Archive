import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { ARTIFACT_FIXTURES } from "@/entities/artifact";

import { Timeline } from "./timeline";

const meta = {
  title: "Pages/Home/Timeline",
  component: Timeline,
  args: { artifacts: ARTIFACT_FIXTURES },
} satisfies Meta<typeof Timeline>;
export default meta;

/** 첫 기록 연도순으로 정렬한다(기원전 750년이 맨 앞). */
export const Ordered: StoryObj<typeof meta> = {
  play: async ({ canvasElement }) => {
    const items = within(canvasElement).getAllByRole("listitem");
    await expect(items[0]).toHaveTextContent("기원전 750년경");
    await expect(items.at(-1)).toHaveTextContent("1281년");
  },
};

/** 시대 버튼을 누르면 그 시대의 유물만 남고, 누른 버튼은 눌림 상태가 된다. */
export const FilterByEra: StoryObj<typeof meta> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const ancient = canvas.getByRole("button", { name: /기원전/ });
    await userEvent.click(ancient);
    await expect(ancient).toHaveAttribute("aria-pressed", "true");
    await expect(canvas.getAllByRole("listitem")).toHaveLength(1);
    await expect(canvas.getByRole("listitem")).toHaveTextContent("기원전 750년경");
  },
};

