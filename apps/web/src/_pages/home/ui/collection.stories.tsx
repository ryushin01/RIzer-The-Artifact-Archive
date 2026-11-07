import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ARTIFACT_FIXTURES, makeArtifactFixture } from "@/entities/artifact";

import { Collection } from "./collection";

const meta = {
  title: "Pages/Home/Collection",
  component: Collection,
  args: { artifacts: [...ARTIFACT_FIXTURES, ...[4, 5, 6, 7].map((i) => makeArtifactFixture(i))] },
} satisfies Meta<typeof Collection>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
