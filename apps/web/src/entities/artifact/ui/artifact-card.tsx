"use client";

import { galleryOf, kindName, type ArtifactSummary } from "@rizer/domain";
import Link from "next/link";
import styled from "styled-components";

import { useLocale, useLocalePath, useMessages, yearLabel } from "@/shared/i18n";
import { MonoLabel } from "@/shared/ui";

/**
 * 유물 카드. 카드 전체가 링크이고 이름이 링크 텍스트다(KWCAG 6.4.3).
 * 미리보기 위에 흐린 저해상도 이미지(LQIP)를 먼저 깔아 둔다.
 */
export function ArtifactCard({ artifact, priority = false }: { artifact: ArtifactSummary; priority?: boolean }) {
  const { image } = artifact;
  const locale = useLocale();
  const t = useMessages().card;
  const path = useLocalePath();
  return (
    <Card lang={locale === "en" && artifact.contentLang === "ko" ? "ko" : undefined}>
      <Media style={{ backgroundColor: image?.dominantColor, backgroundImage: image ? `url(${image.lqip})` : undefined }}>
        {image && (
          // eslint-disable-next-line @next/next/no-img-element -- 타일 서버의 미리보기라 next/image 최적화를 거치지 않는다
          <img
            src={image.previewUrl}
            alt={artifact.imageAlt}
            // 상세 화면의 딥줌 뷰어(data-zoom-enter-key)로 커지는 화면 전환의 출발점
            data-zoom-exit-key={artifact.slug}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            width={image.width}
            height={image.height}
          />
        )}
        <Gallery>
          <MonoLabel>{galleryOf(artifact.gallery).labelEn}</MonoLabel>
        </Gallery>
      </Media>
      <Body>
        <Title>
          <Link href={path(`/artifacts/${artifact.slug}`)}>{artifact.title}</Link>
        </Title>
        <Original>{artifact.titleOriginal}</Original>
        <Power>{artifact.power}</Power>
        <Meta>
          <MonoLabel>{kindName(artifact.kind, locale)}</MonoLabel>
          <MonoLabel>{t.firstRecord(yearLabel(artifact.recordYear, locale))}</MonoLabel>
        </Meta>
      </Body>
    </Card>
  );
}

const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.line};
  overflow: hidden;
  transition: border-color 0.3s, transform 0.5s ${({ theme }) => theme.ease.out};
  &:hover {
    border-color: ${({ theme }) => theme.color.lineStrong};
    transform: translateY(-4px);
  }
  &:focus-within {
    outline: 3px solid ${({ theme }) => theme.color.focus};
    outline-offset: 3px;
  }
`;
const Media = styled.div`
  position: relative;
  aspect-ratio: 4 / 5;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 8%;
    transition: transform 0.8s ${({ theme }) => theme.ease.out};
  }
  ${Card}:hover & img {
    transform: scale(1.06);
  }
`;
const Gallery = styled.div`
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(5, 5, 5, 0.72);
  backdrop-filter: blur(8px);
  span {
    color: ${({ theme }) => theme.color.text};
    font-size: 11px;
  }
`;
const Body = styled.div`
  display: grid;
  gap: 6px;
  padding: 18px 20px 20px;
  flex: 1;
  align-content: start;
`;
const Title = styled.h3`
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  a {
    text-decoration: none;
    /* 카드 전체를 누를 수 있게 링크 영역을 넓힌다. */
    &::after {
      content: "";
      position: absolute;
      inset: 0;
    }
    &:focus-visible {
      outline: none;
    }
  }
`;
const Original = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.color.muted};
`;
const Power = styled.p`
  margin-top: 6px;
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.color.text};
`;
const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 14px;
  margin-top: 10px;
`;
