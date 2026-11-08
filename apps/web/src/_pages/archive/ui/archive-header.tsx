"use client";

import styled from "styled-components";

import { useMessages } from "@/shared/i18n";
import { Display, GlowBackdrop, MonoLabel } from "@/shared/ui";

export function ArchiveHeader() {
  const lead = useMessages().archive.lead;
  return (
    <Header>
      <GlowBackdrop $intensity={0.45} />
      <div>
        <MonoLabel>[ THE ARCHIVE ]</MonoLabel>
        <Display as="h1" $size="lg">
          Archive
        </Display>
        <p>{lead}</p>
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
