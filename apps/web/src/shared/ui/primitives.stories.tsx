import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { IconArrowRight, IconPlus } from "./icons";
import { Button, Display, IconButton, LinkButton, MonoLabel, RedDot } from "./primitives";
import { SectionHeader } from "./section-header";

const meta = { title: "Shared/Primitives" } satisfies Meta;
export default meta;

/** 버튼 세 가지와 아이콘 버튼. 아이콘 버튼의 이름은 aria-label이다. */
export const Buttons: StoryObj = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Button $variant="primary">아카이브 둘러보기</Button>
      <Button $variant="light">
        아카이브 입장 <IconArrowRight width={18} />
      </Button>
      <Button $variant="ghost">전체 보기</Button>
      <LinkButton href="/artifacts" $variant="ghost">
        링크 버튼
      </LinkButton>
      <IconButton type="button" aria-label="확대">
        <IconPlus />
      </IconButton>
      <IconButton type="button" aria-label="주석 표시" aria-pressed $active>
        <IconPlus />
      </IconButton>
    </div>
  ),
};

/** 넓은 대문자 제목과 대괄호 라벨 */
export const Typography: StoryObj = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <MonoLabel>[ THE ARTIFACT ARCHIVE ]</MonoLabel>
      <Display as="h1" $size="xl">
        Legends Archived
      </Display>
      <p style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <RedDot /> 붉은 점은 강조와 커서에 쓴다.
      </p>
    </div>
  ),
};

export const Header: StoryObj = {
  render: () => (
    <SectionHeader index="01" label="The Collection" titleId="t" title="전설이 남긴 열여섯 점" description="섹션 머리 예시입니다." />
  ),
};
