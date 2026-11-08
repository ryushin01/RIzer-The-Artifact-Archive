import { GALLERIES } from "@rizer/domain";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import { LegendMap } from "./legend-map";

const meta = {
  title: "Pages/Home/LegendMap",
  component: LegendMap,
  args: {
    artifacts: [
      { id: "a", title: "엑스칼리버", gallery: "arthurian" },
      { id: "b", title: "성배", gallery: "arthurian" },
      { id: "c", title: "만파식적", gallery: "korean" },
    ],
  },
} satisfies Meta<typeof LegendMap>;
export default meta;

/** 전시실마다 링크가 하나씩이고, 개수와 함께 그 전시실로 간다. */
export const Places: StoryObj<typeof meta> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole("link")).toHaveLength(GALLERIES.length);
    await expect(canvas.getByRole("link", { name: /아서왕과 기사 전설\s*2점/ })).toHaveAttribute("href", "/artifacts?gallery=arthurian");
  },
};
