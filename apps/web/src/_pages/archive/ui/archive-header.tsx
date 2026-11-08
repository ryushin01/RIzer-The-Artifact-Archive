"use client";

import styled from "styled-components";

import { Display, GlowBackdrop, MonoLabel } from "@/shared/ui";

export function ArchiveHeader() {
  return (
    <Header>
      <GlowBackdrop $intensity={0.45} />
      <div>
        <MonoLabel>[ THE ARCHIVE ]</MonoLabel>
        <Display as="h1" $size="lg">
          Archive
        </Display>
        <p>세계 곳곳의 전설 속 유물을 이름, 전시실, 종류로 찾아봅니다. 카드를 고르면 딥줌 뷰어가 열립니다.</p>
      </div>
    </Header>
  );
}

const Header = styled.header`
  position: relative;
  padding: 120px 0 48px;
  > div {
    position: relative;
    display: grid;
    gap: 18px;
  }
  p {
    max-width: 36em;
    color: ${({ theme }) => theme.color.muted};
  }
`;
