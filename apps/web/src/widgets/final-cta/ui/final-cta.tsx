"use client";

import styled from "styled-components";

import { media } from "@/shared/config/theme";
import { Container, Display, GlowBackdrop, IconArrowRight, LinkButton, MonoLabel } from "@/shared/ui";

/** 마지막 행동 유도: 아카이브로 */
export function FinalCta({ count }: { count: number }) {
  return (
    <Section aria-labelledby="cta-title">
      <GlowBackdrop $intensity={0.7} />
      <Container>
        <Inner>
          <MonoLabel>[ {count} ARTIFACTS · 6 REALMS ]</MonoLabel>
          <Display id="cta-title" $size="lg">
            Enter the
            <br />
            Archive
          </Display>
          <Bar href="/artifacts" $variant="primary">
            아카이브 둘러보기
            <IconArrowRight width={18} />
          </Bar>
          <p>검, 잔, 반지, 피리. 전설이 남긴 것들을 가까이에서 들여다보세요.</p>
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
