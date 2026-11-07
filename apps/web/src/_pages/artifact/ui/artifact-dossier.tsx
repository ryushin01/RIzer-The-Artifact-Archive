"use client";

import { galleryOf, kindLabel, storyParagraphs, type Annotation, type Artifact, type ArtifactSummary } from "@rizer/domain";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { ArtifactCard } from "@/entities/artifact";
import { selected, selectTour } from "@/features/annotation-tour";
import { recordYearLabel } from "@/shared/lib/format";
import { IconArrowLeft, IconExternal, MonoLabel, RedDot } from "@/shared/ui";

/**
 * 유물 해설 패널: 이름·권능·기록, 해설, 주석 목록, 이미지 출처, 같은 전시실의 유물.
 * 주석을 고르면 뷰어가 그 부분으로 확대하고, 고른 주석의 설명을 화면 낭독기에 알린다.
 */
export function ArtifactDossier({
  artifact,
  annotations,
  related,
}: {
  artifact: Artifact;
  annotations: Annotation[];
  related: ArtifactSummary[];
}) {
  const dispatch = useDispatch();
  const { activeId } = useSelector(selectTour);
  const active = annotations.find((a) => a.id === activeId);
  const gallery = galleryOf(artifact.gallery);
  const { source } = artifact;

  return (
    <Wrap>
      <Back href="/artifacts">
        <IconArrowLeft width={16} />
        아카이브
      </Back>
      <header>
        <MonoLabel $tone="accent">
          {gallery.labelEn} · {kindLabel(artifact.kind)}
        </MonoLabel>
        <Title>{artifact.title}</Title>
        <Original lang="">{artifact.titleOriginal}</Original>
      </header>

      <Power>
        <RedDot />
        <p>{artifact.power}</p>
      </Power>

      <Meta>
        <div>
          <dt>소유자</dt>
          <dd>{artifact.owner || "—"}</dd>
        </div>
        <div>
          <dt>만든 이</dt>
          <dd>{artifact.maker || "—"}</dd>
        </div>
        <div>
          <dt>첫 기록</dt>
          <dd>
            {artifact.firstRecord}
            <small>{recordYearLabel(artifact.recordYear)}</small>
          </dd>
        </div>
        <div>
          <dt>전시실</dt>
          <dd>
            <Link href={`/artifacts?gallery=${gallery.id}`}>{gallery.label}</Link>
          </dd>
        </div>
      </Meta>

      {annotations.length > 0 && (
        <Section aria-labelledby="notes-title">
          <h2 id="notes-title">
            사진 속 주석 <MonoLabel>{annotations.length}</MonoLabel>
          </h2>
          <Notes>
            {annotations.map((a, i) => (
              <li key={a.id}>
                <NoteButton type="button" aria-pressed={a.id === activeId} onClick={() => dispatch(selected(a.id === activeId ? null : a.id))}>
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="t">{a.title}</span>
                </NoteButton>
                {a.id === activeId && <NoteBody>{a.body}</NoteBody>}
              </li>
            ))}
          </Notes>
          <p className="sr-only" aria-live="polite">
            {active ? `${active.title}. ${active.body}` : ""}
          </p>
        </Section>
      )}

      <Section aria-labelledby="story-title">
        <h2 id="story-title">해설</h2>
        <Story>
          {storyParagraphs(artifact.story).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Story>
      </Section>

      <Credit aria-labelledby="credit-title">
        <h2 id="credit-title">이미지 출처</h2>
        {source.parts.length > 0 ? (
          <>
            <p>아래 소장품 사진 {source.parts.length}장을 이어 붙여 이 아카이브가 만든 합성 이미지입니다.</p>
            <ul>
              {source.parts.map((part) => (
                <li key={part.objectId}>
                  <a href={part.url} target="_blank" rel="noreferrer">
                    {part.objectTitle}
                    <IconExternal width={14} />
                    <span className="sr-only"> (새 창)</span>
                  </a>
                  <span>
                    {[part.objectCulture, part.objectDate].filter(Boolean).join(", ")} · {part.accessionNumber}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>
            사진은{" "}
            <a href={source.url} target="_blank" rel="noreferrer">
              {source.objectTitle}
              <IconExternal width={14} />
              <span className="sr-only"> (새 창)</span>
            </a>
            ({[source.objectCulture, source.objectDate].filter(Boolean).join(", ")})입니다. 전설 속 유물의 모습을 떠올리게 하는 실제 소장품입니다.
          </p>
        )}
        <MonoLabel>
          {source.institution} · {source.license} · {source.creditLine}
        </MonoLabel>
      </Credit>

      {related.length > 0 && (
        <Section aria-labelledby="related-title">
          <h2 id="related-title">{gallery.label}의 다른 유물</h2>
          <Related>
            {related.map((r) => (
              <li key={r.id}>
                <ArtifactCard artifact={r} />
              </li>
            ))}
          </Related>
        </Section>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: grid;
  gap: 40px;
  align-content: start;
  padding: 24px 16px 140px;
  h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 16px;
  }
  @media (min-width: 900px) {
    padding: 40px 40px 160px 8px;
  }
`;
const Back = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  min-height: 44px;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 12px;
  letter-spacing: 0.1em;
  text-decoration: none;
  color: ${({ theme }) => theme.color.muted};
  &:hover {
    color: ${({ theme }) => theme.color.text};
  }
`;
const Title = styled.h1`
  margin-top: 12px;
  font-size: clamp(36px, 4.4vw, 60px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
`;
const Original = styled.p`
  margin-top: 8px;
  font-family: ${({ theme }) => theme.font.display};
  font-size: 15px;
  color: ${({ theme }) => theme.color.muted};
`;
const Power = styled.div`
  display: flex;
  gap: 14px;
  align-items: baseline;
  padding: 20px 22px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: linear-gradient(120deg, rgba(226, 40, 60, 0.18), rgba(40, 70, 200, 0.12));
  border: 1px solid ${({ theme }) => theme.color.line};
  p {
    font-size: 18px;
    line-height: 1.55;
  }
`;
const Meta = styled.dl`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: ${({ theme }) => theme.color.line};
  border: 1px solid ${({ theme }) => theme.color.line};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  div {
    padding: 16px;
    background: ${({ theme }) => theme.color.bg};
  }
  dt {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 11px;
    letter-spacing: 0.12em;
    color: ${({ theme }) => theme.color.muted};
  }
  dd {
    margin-top: 4px;
    font-size: 15px;
  }
  small {
    display: block;
    color: ${({ theme }) => theme.color.muted};
    font-size: 13px;
  }
`;
const Section = styled.section``;
const Notes = styled.ol`
  list-style: none;
  border-top: 1px solid ${({ theme }) => theme.color.line};
  li {
    border-bottom: 1px solid ${({ theme }) => theme.color.line};
  }
`;
const NoteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  min-height: 52px;
  padding: 12px 4px;
  border: 0;
  background: none;
  text-align: left;
  cursor: pointer;
  .n {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 12px;
    color: ${({ theme }) => theme.color.accentText};
  }
  .t {
    font-size: 16px;
  }
  &[aria-pressed="true"] .t {
    font-weight: 700;
  }
  &:hover .t {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;
const NoteBody = styled.p`
  padding: 0 4px 18px 40px;
  color: ${({ theme }) => theme.color.muted};
  font-size: 15px;
`;
const Story = styled.div`
  display: grid;
  gap: 18px;
  font-size: 17px;
  line-height: 1.85;
  p {
    max-width: 38em;
  }
`;
const Credit = styled.section`
  display: grid;
  gap: 10px;
  padding: 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.color.surface};
  font-size: 14px;
  color: ${({ theme }) => theme.color.muted};
  h2 {
    margin-bottom: 0;
    color: ${({ theme }) => theme.color.text};
  }
  a {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: ${({ theme }) => theme.color.text};
    text-underline-offset: 3px;
  }
  ul {
    list-style: none;
    display: grid;
    gap: 8px;
  }
  li {
    display: grid;
  }
`;
const Related = styled.ul`
  list-style: none;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;
