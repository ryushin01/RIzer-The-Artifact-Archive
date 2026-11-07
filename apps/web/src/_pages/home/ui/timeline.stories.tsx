import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

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
