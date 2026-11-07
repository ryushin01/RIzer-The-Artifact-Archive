"use client";

import type { ArtifactSummary } from "@rizer/domain";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled, { css, keyframes } from "styled-components";

import { selectReducedMotion } from "@/features/motion-preference";
import { media } from "@/shared/config/theme";
import { Display, IconArrowRight, LinkButton, MonoLabel } from "@/shared/ui";

const ROTATE_MS = 6500;

/**
 * 첫 화면. 둥근 액자 안에서 대표 유물 사진이 천천히 확대되며 바뀐다.
 * 사진은 장식이라 대체 텍스트를 비우고, 지금 보이는 유물 이름은 아래 링크로 알린다.
 */
export function Hero({ featured }: { featured: ArtifactSummary[] }) {
  const reduced = useSelector(selectReducedMotion);
  const slides = featured.filter((a) => a.image);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || slides.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduced, slides.length]);

  const current = slides[index];

  return (
    <Section aria-labelledby="hero-title">
      <Frame>
        {slides.map((a, i) => (
          <Slide key={a.id} $active={i === index} $reduced={reduced} style={{ backgroundColor: a.image!.dominantColor }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- 타일 서버의 미리보기 */}
            <img src={a.image!.previewUrl} alt="" loading={i === 0 ? "eager" : "lazy"} />
          </Slide>
        ))}
        <Shade aria-hidden />
        <Content>
          <MonoLabel>[ RIZER · THE ARTIFACT ARCHIVE ]</MonoLabel>
          <Display as="h1" id="hero-title" $size="xl">
            Legends
            <br />
            Archived
          </Display>
          <Lead>
            엑스칼리버, 성배, 묠니르. 이야기로만 전하던 전설의 유물 열여섯 점을 초고해상도로 확대해 보고, 부분마다 달린 해설을 읽는 온라인 전시실입니다.
          </Lead>
          <Actions>
            <LinkButton href="/artifacts" $variant="light">
              아카이브 입장
              <IconArrowRight width={18} />
            </LinkButton>
            {current && (
              <LinkButton href={`/artifacts/${current.slug}`} $variant="ghost">
                지금 보는 유물: {current.title}
              </LinkButton>
            )}
          </Actions>
        </Content>
        <Footnote>
          <MonoLabel>CRAFTED FROM MYTH</MonoLabel>
          <MonoLabel>ARCHIVED IN DETAIL</MonoLabel>
        </Footnote>
        <Scroll aria-hidden>
          <MonoLabel>SCROLL TO DISCOVER →</MonoLabel>
        </Scroll>
      </Frame>
    </Section>
  );
}

const kenburns = keyframes`
  from { transform: scale(1.02) translate3d(0, 0, 0); }
  to { transform: scale(1.14) translate3d(-1.5%, -2%, 0); }
`;

const Section = styled.section`
  padding: 12px;
  height: 100svh;
  min-height: 620px;
  ${media.md} {
    padding: 20px;
  }
`;
const Frame = styled.div`
  position: relative;
  height: 100%;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.color.surface};
  isolation: isolate;
`;
const Slide = styled.div<{ $active: boolean; $reduced: boolean }>`
  position: absolute;
  inset: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 1.4s ease;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: 78% 50%;
    /* 소장품 사진의 밝은 배경이 네모난 판처럼 보이지 않도록 가장자리를 어둠 속으로 감춘다. */
    mask-image: radial-gradient(ellipse 34% 52% at 78% 50%, #000 55%, transparent 100%);
    filter: brightness(0.92) contrast(1.05);
    ${({ $active, $reduced }) =>
      $active &&
      !$reduced &&
      css`
        animation: ${kenburns} ${ROTATE_MS + 1400}ms linear forwards;
      `}
  }
`;
const Shade = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(5, 5, 5, 0.92) 0%, rgba(5, 5, 5, 0.55) 45%, rgba(5, 5, 5, 0.1) 75%),
    linear-gradient(0deg, rgba(5, 5, 5, 0.7), transparent 40%);
`;
const Content = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 24px;
  align-content: center;
  height: 100%;
  padding: 32px 20px;
  max-width: 1000px;
  ${media.md} {
    padding: 64px;
  }
`;
const Lead = styled.p`
  max-width: 34em;
  font-size: clamp(15px, 1.4vw, 18px);
  color: ${({ theme }) => theme.color.muted};
`;
const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;
const Footnote = styled.div`
  position: absolute;
  left: 20px;
  bottom: 96px;
  display: grid;
  ${media.md} {
    left: 64px;
    bottom: 40px;
  }
`;
const Scroll = styled.div`
  position: absolute;
  right: 18px;
  top: 50%;
  writing-mode: vertical-rl;
  transform: translateY(-50%);
  display: none;
  ${media.md} {
    display: block;
  }
`;
