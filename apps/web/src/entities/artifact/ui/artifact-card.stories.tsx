import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import { ARTIFACT_FIXTURES } from "../model/fixtures";
import { ArtifactCard } from "./artifact-card";

const meta = {
  title: "Entities/ArtifactCard",
  component: ArtifactCard,
  args: { artifact: ARTIFACT_FIXTURES[0]! },
  decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>],
} satisfies Meta<typeof ArtifactCard>;
export default meta;

type Story = StoryObj<typeof meta>;

/** 카드 전체가 링크이고, 링크 이름은 유물 이름이다. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole("link", { name: "엑스칼리버" });
    await expect(link).toHaveAttribute("href", "/artifacts/fixture-0");
    await expect(within(canvasElement).getByRole("img")).toHaveAccessibleName(/막대 모양/);
  },
};

/** 이미지가 없는 유물 */
export const WithoutImage: Story = {
  args: { artifact: { ...ARTIFACT_FIXTURES[1]!, image: null } },
};
