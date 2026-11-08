"use client";

import { GALLERIES, galleryName, type GalleryId } from "@rizer/domain";
import Link from "next/link";
import styled from "styled-components";

import { media } from "@/shared/config";
import { useLocale, useLocalePath, useMessages } from "@/shared/i18n";
import { pad2 } from "@/shared/lib/format";
import { Container, SectionHeader } from "@/shared/ui";

import type { RealmItem } from "../model";

/** 지도(public/map/eurasia-dots.svg)의 범위. 등장방형 투영이라 경도·위도를 그대로 비율로 바꾼다. */
const BOUNDS = { west: -25, east: 150, north: 72, south: 5 };
const toX = (lon: number) => ((lon - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * 100;
const toY = (lat: number) => ((BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south)) * 100;

type Side = "left" | "right" | "above" | "below";

/** 전승의 중심지(대략의 위치)와, 이름표가 겹치지 않도록 정한 방향 */
const PLACES: Record<GalleryId, { lat: number; lon: number; side: Side }> = {
  arthurian: { lat: 51.5, lon: -1, side: "right" },
  celtic: { lat: 53.3, lon: -8, side: "left" },
  norse: { lat: 62, lon: 12, side: "right" },
  greek: { lat: 38, lon: 23, side: "below" },
  sacred: { lat: 31.8, lon: 35.2, side: "below" },
  "near-east": { lat: 33, lon: 46, side: "right" },
  indian: { lat: 22, lon: 78, side: "right" },
  chinese: { lat: 34, lon: 108, side: "below" },
  korean: { lat: 37, lon: 127, side: "above" },
  japanese: { lat: 36, lon: 138, side: "below" },
};

/**
 * 전설이 전해진 곳. 지도 위의 이름표가 곧 전시실로 가는 링크이고, 작은 화면에서는 지도 아래 목록이 된다.
 * 링크는 전시실 순서의 목록 하나뿐이라 키보드와 화면 낭독기로도 그대로 읽힌다. 지도 그림 자체는 장식이다.
 */
export function LegendMap({ artifacts }: { artifacts: RealmItem[] }) {
  const locale = useLocale();
  const { map: t, count: countLabel } = useMessages();
  const path = useLocalePath();
  return (
    <Section id="map" aria-labelledby="map-title">
      <Container>
        <SectionHeader
          index="03"
          label="Where They Were Told"
          titleId="map-title"
          title={t.title}
          description={t.description}
        />
        <MapArea>
          {/* eslint-disable-next-line @next/next/no-img-element -- 크기가 정해진 장식용 정적 SVG */}
          <img src="/map/eurasia-dots.svg" alt="" loading="lazy" width={1000} height={500} />
          <Numbers aria-hidden viewBox="0 0 1000 500">
            {GALLERIES.map((g, i) => (
              <g key={g.id} transform={`translate(${toX(PLACES[g.id].lon) * 10} ${toY(PLACES[g.id].lat) * 5})`}>
                <circle r="20" />
                <text textAnchor="middle" dy="8">
                  {i + 1}
                </text>
              </g>
            ))}
          </Numbers>
          <Places>
            {GALLERIES.map((g, i) => {
              const place = PLACES[g.id];
              const count = artifacts.filter((a) => a.gallery === g.id).length;
              return (
                <Place key={g.id} style={{ left: `${toX(place.lon)}%`, top: `${toY(place.lat)}%` }} data-side={place.side}>
                  <Link href={path(`/artifacts?gallery=${g.id}`)}>
                    <span className="n">{pad2(i + 1)}</span>
                    <span className="name">{galleryName(g.id, locale)}</span>
                    <span className="count">{countLabel(count)}</span>
                  </Link>
                </Place>
              );
            })}
          </Places>
        </MapArea>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: 120px 0 40px;
  scroll-margin-top: 24px;
`;
const MapArea = styled.div`
  position: relative;
  margin-top: 48px;
  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;
const Numbers = styled.svg`
  position: absolute;
  inset: 0 0 auto;
  width: 100%;
  aspect-ratio: 2 / 1;
  circle {
    fill: ${({ theme }) => theme.color.accent};
  }
  text {
    fill: #fff;
    font-size: 24px;
    font-weight: 700;
  }
  ${media.md} {
    display: none;
  }
`;
const Places = styled.ol`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr));
  gap: 1px;
  margin-top: 24px;
  ${media.md} {
    display: block;
    position: absolute;
    inset: 0;
    margin: 0;
  }
`;
const Place = styled.li`
  /* 작은 화면에서는 일반 목록이다. 위치 지정(style의 left·top)은 넓은 화면에서만 쓴다. */
  position: static;
  a {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 44px;
    padding: 6px 10px;
    border-radius: 999px;
    color: ${({ theme }) => theme.color.text};
    font-size: 14px;
    text-decoration: none;
    white-space: nowrap;
  }
  a:hover .name {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  a:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
  }
  .n {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 12px;
    color: ${({ theme }) => theme.color.accentText};
  }
  .name {
    font-weight: 700;
  }
  .count {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 12px;
    color: ${({ theme }) => theme.color.muted};
  }
  ${media.md} {
    position: absolute;
    width: 0;
    height: 0;
    &::before {
      content: "";
      position: absolute;
      left: -5px;
      top: -5px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: ${({ theme }) => theme.color.accent};
      box-shadow: 0 0 0 5px rgba(226, 40, 60, 0.25);
    }
    .n {
      display: none;
    }
    a {
      position: absolute;
      width: max-content;
      background: rgba(8, 9, 18, 0.86);
      min-height: 36px;
    }
    a:hover {
      background: rgba(30, 34, 70, 0.95);
    }
    &[data-side="right"] a {
      left: 12px;
      top: -18px;
    }
    &[data-side="left"] a {
      right: 12px;
      top: -18px;
    }
    &[data-side="above"] a {
      left: 0;
      bottom: 12px;
      transform: translateX(-50%);
    }
    &[data-side="below"] a {
      left: 0;
      top: 12px;
      transform: translateX(-50%);
    }
  }
`;
