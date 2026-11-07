"use client";

import { GALLERIES, type ArtifactSummary } from "@rizer/domain";
import Link from "next/link";
import styled, { keyframes } from "styled-components";

import { media } from "@/shared/config/theme";
import { Container, MonoLabel, SectionHeader } from "@/shared/ui";
import { pad2 } from "@/shared/lib/format";

/** 여섯 전시실. 궤도 선화가 천천히 돈다(움직임을 끄면 멈춘다). */
export function Realms({ artifacts }: { artifacts: ArtifactSummary[] }) {
  return (
    <Section id="realms" aria-labelledby="realms-title">
      <Orbit aria-hidden viewBox="0 0 600 600">
        <g>
          {[0, 30, 60, 90, 120, 150].map((r) => (
            <ellipse key={r} cx="300" cy="300" rx="120" ry="280" transform={`rotate(${r} 300 300)`} />
          ))}
        </g>
        <circle cx="300" cy="300" r="6" />
      </Orbit>
      <Container>
        <SectionHeader
          index="02"
          label="Six Realms"
          titleId="realms-title"
          title="여섯 개의 신화, 여섯 개의 전시실"
          description="유물은 처음 등장한 신화와 전설에 따라 전시실로 나뉩니다. 전시실을 고르면 그 전설의 유물만 모아 봅니다."
        />
        <List>
          {GALLERIES.map((g, i) => {
            const items = artifacts.filter((a) => a.gallery === g.id);
            return (
              <li key={g.id}>
                <RealmLink href={`/artifacts?gallery=${g.id}`}>
                  <MonoLabel $tone="accent">{pad2(i + 1)}</MonoLabel>
                  <strong>{g.label}</strong>
                  <MonoLabel>{g.labelEn}</MonoLabel>
                  <span className="names">{items.map((a) => a.title).join(" · ") || "준비 중"}</span>
                  <span className="count">{items.length}점</span>
                </RealmLink>
              </li>
            );
          })}
        </List>
      </Container>
    </Section>
  );
}

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: 140px 0;
  background: linear-gradient(180deg, ${({ theme }) => theme.color.bg}, #0c1024 40%, #0b0d1c 70%, ${({ theme }) => theme.color.bg});
  scroll-margin-top: 24px;
`;
const Orbit = styled.svg`
  position: absolute;
  right: -10%;
  top: 50%;
  width: min(90vw, 760px);
  transform: translateY(-50%);
  opacity: 0.5;
  ellipse {
    fill: none;
    stroke: rgba(244, 242, 238, 0.35);
    stroke-width: 0.8;
  }
  circle {
    fill: ${({ theme }) => theme.color.accent};
  }
  g {
    transform-box: view-box;
    transform-origin: 50% 50%;
    animation: ${spin} 120s linear infinite;
    ${media.reduced} {
      animation: none;
    }
  }
`;
const List = styled.ul`
  position: relative;
  list-style: none;
  display: grid;
  gap: 1px;
  margin-top: 56px;
  background: ${({ theme }) => theme.color.line};
  border-block: 1px solid ${({ theme }) => theme.color.line};
  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const RealmLink = styled(Link)`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: baseline;
  gap: 4px 16px;
  padding: 28px 8px;
  height: 100%;
  background: rgba(8, 9, 18, 0.92);
  text-decoration: none;
  transition: background 0.3s;
  &:hover {
    background: rgba(30, 34, 70, 0.9);
  }
  strong {
    font-size: clamp(20px, 2vw, 26px);
  }
  .names {
    grid-column: 2 / -1;
    color: ${({ theme }) => theme.color.muted};
    font-size: 14px;
  }
  .count {
    grid-column: 3;
    grid-row: 1;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 13px;
  }
  span:nth-of-type(2) {
    grid-column: 2;
  }
`;
