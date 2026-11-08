"use client";

import styled from "styled-components";

import { media } from "@/shared/config";
import { useMessages } from "@/shared/i18n";
import { Container, SectionHeader } from "@/shared/ui";

/** 자주 묻는 질문. 밝은 바탕으로 앞 섹션들과 구분한다. details/summary라 키보드로 펼친다. */
export function Faq() {
  const t = useMessages().faq;
  return (
    <Section id="faq" aria-labelledby="faq-title">
      <Container>
        <Grid>
          <SectionHeader
            index="05"
            label="Questions"
            titleId="faq-title"
            title={t.title}
            tone="light"
          />
          <List>
            {t.items.map((item, i) => (
              <details key={item.q} open={i === 0}>
                <summary>
                  <h3>{item.q}</h3>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </List>
        </Grid>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: 120px 0;
  background: ${({ theme }) => theme.color.paper};
  color: ${({ theme }) => theme.color.ink};
  scroll-margin-top: 24px;
  /* 밝은 바탕에서는 노란 초점 표시가 잘 보이지 않아 진한 파랑으로 바꾼다(KWCAG 6.1.2). */
  *:focus-visible {
    outline-color: #1a4dd6;
  }
`;
const Grid = styled.div`
  display: grid;
  gap: 48px;
  ${media.md} {
    grid-template-columns: 1fr 1.4fr;
  }
`;
const List = styled.div`
  border-top: 1px solid rgba(20, 20, 20, 0.2);
  details {
    border-bottom: 1px solid rgba(20, 20, 20, 0.2);
  }
  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    min-height: 64px;
    padding: 16px 0;
    cursor: pointer;
    list-style: none;
    &::-webkit-details-marker {
      display: none;
    }
    &::after {
      content: "+";
      font-family: ${({ theme }) => theme.font.mono};
      font-size: 22px;
      transition: transform 0.3s;
    }
  }
  details[open] summary::after {
    transform: rotate(45deg);
  }
  h3 {
    font-size: 18px;
    font-weight: 700;
  }
  p {
    padding-bottom: 24px;
    color: ${({ theme }) => theme.color.inkMuted};
    max-width: 40em;
  }
`;
