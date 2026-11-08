"use client";

import { galleryOf } from "@rizer/domain";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

import { recordYearLabel } from "@/shared/lib/format";
import { Container, MonoLabel, RedDot, SectionHeader } from "@/shared/ui";

import type { TimelineItem } from "../model";

/** 연표를 나누는 시대. 고른 시대의 유물만 보여 줘 90여 점을 한 줄로 넘기지 않아도 되게 한다. */
export const ERAS = [
  { id: "all", label: "전체", test: () => true },
  { id: "ancient", label: "기원전", test: (y: number) => y < 0 },
  { id: "classical", label: "1~1000년", test: (y: number) => y >= 0 && y <= 1000 },
  { id: "medieval", label: "1001~1500년", test: (y: number) => y > 1000 && y <= 1500 },
  { id: "modern", label: "1501년 이후", test: (y: number) => y > 1500 },
] as const;
type EraId = (typeof ERAS)[number]["id"];

/**
 * 첫 기록 연표. 『리그베다』부터 근대 소설까지, 유물이 처음 글로 남은 순서다.
 * 순서 있는 목록이라 화면 낭독기도 연대순으로 읽는다. 가로로 넘겨 보고, 시대 버튼으로 거른다.
 * 시대 버튼은 눌림 상태(aria-pressed)를 가진 네이티브 버튼이다.
 */
export function Timeline({ artifacts }: { artifacts: TimelineItem[] }) {
  const [era, setEra] = useState<EraId>("all");
  const sorted = [...artifacts].sort((a, b) => a.recordYear - b.recordYear || a.title.localeCompare(b.title));
  const test = ERAS.find((e) => e.id === era)!.test;
  const shown = sorted.filter((a) => test(a.recordYear));
  return (
    <Section id="timeline" aria-labelledby="timeline-title">
      <Container>
        <SectionHeader
          index="04"
          label="First Records"
          titleId="timeline-title"
          title="처음 글로 남은 순간"
          description="전설은 입에서 입으로 먼저 전해졌습니다. 이 연표는 각 유물이 문헌에 처음 기록된 때를 따라갑니다."
        />
        <Eras role="group" aria-label="시대">
          {ERAS.map((e) => (
            <EraButton key={e.id} type="button" aria-pressed={era === e.id} onClick={() => setEra(e.id)}>
              {e.label} <span>{sorted.filter((a) => e.test(a.recordYear)).length}</span>
            </EraButton>
          ))}
        </Eras>
      </Container>
      <Scroller tabIndex={0} aria-labelledby="timeline-title">
        <List key={era}>
          {shown.map((a) => (
            <Item key={a.id}>
              <Year>{recordYearLabel(a.recordYear)}</Year>
              <Marker aria-hidden>
                <RedDot />
              </Marker>
              <Link href={`/artifacts/${a.slug}`}>{a.title}</Link>
              <Record>{a.firstRecord}</Record>
              <MonoLabel>{galleryOf(a.gallery).labelEn}</MonoLabel>
            </Item>
          ))}
        </List>
      </Scroller>
    </Section>
  );
}

const Section = styled.section`
  display: grid;
  gap: 48px;
  padding: 120px 0;
  scroll-margin-top: 24px;
`;
const Scroller = styled.div`
  overflow-x: auto;
  padding: 0 16px 24px;
  scrollbar-width: thin;
  @media (min-width: 900px) {
    padding-inline: 40px;
  }
`;
const List = styled.ol`
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 220px;
  list-style: none;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 46px;
    height: 1px;
    background: ${({ theme }) => theme.color.lineStrong};
  }
`;
const Item = styled.li`
  display: grid;
  gap: 8px;
  align-content: start;
  padding-right: 24px;
  a {
    font-size: 18px;
    font-weight: 700;
    text-underline-offset: 4px;
  }
`;
const Year = styled.span`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 16px;
  font-weight: 700;
  height: 28px;
`;
const Marker = styled.span`
  position: relative;
  height: 20px;
  display: flex;
  align-items: center;
`;
const Record = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.color.muted};
`;
const Eras = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 32px;
`;
const EraButton = styled.button`
  min-height: 44px;
  padding: 0 18px;
  border: 1px solid ${({ theme }) => theme.color.lineStrong};
  border-radius: 999px;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 14px;
  cursor: pointer;
  span {
    margin-left: 4px;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 12px;
    opacity: 0.8;
  }
  &[aria-pressed="true"] {
    background: ${({ theme }) => theme.color.text};
    border-color: ${({ theme }) => theme.color.text};
    color: ${({ theme }) => theme.color.bg};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 3px;
  }
`;
