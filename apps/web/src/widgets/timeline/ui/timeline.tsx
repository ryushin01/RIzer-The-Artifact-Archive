"use client";

import { galleryOf, type ArtifactSummary } from "@rizer/domain";
import Link from "next/link";
import styled from "styled-components";

import { recordYearLabel } from "@/shared/lib/format";
import { Container, MonoLabel, RedDot, SectionHeader } from "@/shared/ui";

/**
 * 첫 기록 연표. 기원전 8세기의 『일리아스』부터 13세기의 『삼국유사』까지, 유물이 처음 글로 남은 순서다.
 * 순서 있는 목록이라 화면 낭독기도 연대순으로 읽는다. 가로로 넘겨 본다.
 */
export function Timeline({ artifacts }: { artifacts: ArtifactSummary[] }) {
  const sorted = [...artifacts].sort((a, b) => a.recordYear - b.recordYear || a.title.localeCompare(b.title));
  return (
    <Section id="timeline" aria-labelledby="timeline-title">
      <Container>
        <SectionHeader
          index="03"
          label="First Records"
          titleId="timeline-title"
          title="처음 글로 남은 순간"
          description="전설은 입에서 입으로 먼저 전해졌습니다. 이 연표는 각 유물이 문헌에 처음 기록된 때를 따라갑니다."
        />
      </Container>
      <Scroller tabIndex={0} aria-labelledby="timeline-title">
        <List>
          {sorted.map((a) => (
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
