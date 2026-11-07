"use client";

import type { ArtifactSummary } from "@rizer/domain";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { ArtifactCard } from "@/entities/artifact";
import { media } from "@/shared/config/theme";
import { Container, IconArrowLeft, IconArrowRight, IconButton, LinkButton, SectionHeader } from "@/shared/ui";

/**
 * 컬렉션 가로 목록. 손가락·트랙패드로 넘기거나 이전·다음 버튼을 쓴다.
 * 카드가 링크라 Tab으로도 차례로 지나가며, 초점을 받은 카드는 보이는 위치로 스크롤된다.
 */
export function Collection({ artifacts }: { artifacts: ArtifactSummary[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () =>
      setEdge({ start: track.scrollLeft < 8, end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 8 });
    update();
    track.addEventListener("scroll", update, { passive: true });
    return () => track.removeEventListener("scroll", update);
  }, []);

  const scroll = (dir: 1 | -1) => trackRef.current?.scrollBy({ left: dir * trackRef.current.clientWidth * 0.8 });

  return (
    <Section id="collection" aria-labelledby="collection-title">
      <Container>
        <Head>
          <SectionHeader
            index="01"
            label="The Collection"
            titleId="collection-title"
            title="전설이 남긴 열여섯 점"
            description="아서왕의 검부터 신라의 피리까지. 카드를 골라 딥줌 뷰어로 들어가면 사진의 아주 작은 부분까지 확대해 볼 수 있습니다."
          />
          <Arrows>
            <IconButton type="button" aria-label="이전 유물들" onClick={() => scroll(-1)} disabled={edge.start}>
              <IconArrowLeft />
            </IconButton>
            <IconButton type="button" aria-label="다음 유물들" onClick={() => scroll(1)} disabled={edge.end}>
              <IconArrowRight />
            </IconButton>
          </Arrows>
        </Head>
      </Container>
      <Track ref={trackRef} aria-label="유물 목록">
        {artifacts.map((a, i) => (
          <li key={a.id}>
            <ArtifactCard artifact={a} priority={i < 3} />
          </li>
        ))}
      </Track>
      <Container>
        <LinkButton href="/artifacts" $variant="ghost">
          전체 아카이브에서 찾기
          <IconArrowRight width={18} />
        </LinkButton>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  display: grid;
  gap: 40px;
  padding: 120px 0;
  scroll-margin-top: 24px;
`;
const Head = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
`;
const Arrows = styled.div`
  display: flex;
  gap: 8px;
`;
const Track = styled.ul`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min(78vw, 340px);
  gap: 16px;
  list-style: none;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: 16px;
  padding: 8px 16px 16px;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  li {
    scroll-snap-align: start;
  }
  ${media.md} {
    padding-inline: 40px;
    scroll-padding-inline: 40px;
  }
`;
