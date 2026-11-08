"use client";

import { GALLERIES } from "@rizer/domain";
import styled from "styled-components";

import { media } from "@/shared/config";
import { useLocalePath, useMessages } from "@/shared/i18n";
import { Container, Display, GlowBackdrop, IconArrowRight, LinkButton, MonoLabel } from "@/shared/ui";

/** 마지막 행동 유도: 아카이브로 */
export function FinalCta({ count }: { count: number }) {
  const t = useMessages().cta;
  const path = useLocalePath();
  return (
    <Section aria-labelledby="cta-title">
      <GlowBackdrop $intensity={0.7} />
      <Container>
        <Inner>
          <MonoLabel>[ {count} ARTIFACTS · {GALLERIES.length} REALMS ]</MonoLabel>
          <Display id="cta-title" $size="lg">
            Enter the
            <br />
            Archive
          </Display>
          <Bar href={path("/artifacts")} $variant="primary">
            {t.button}
            <IconArrowRight width={18} />
          </Bar>
          <p>{t.caption}</p>
        </Inner>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: 160px 0 120px;
`;
const Inner = styled.div`
  position: relative;
  display: grid;
  gap: 28px;
  p {
    color: ${({ theme }) => theme.color.muted};
  }
`;
const Bar = styled(LinkButton)`
  width: 100%;
  min-height: 64px;
  font-size: 14px;
  ${media.md} {
    width: min(100%, 880px);
  }
`;
