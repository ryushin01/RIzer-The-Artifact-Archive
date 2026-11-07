"use client";

import styled from "styled-components";

import { Container, Display, LinkButton, MonoLabel } from "@/shared/ui";

/** 없는 주소. 오류 화면과 같은 틀을 쓴다. */
export function NotFoundPage({
  title = "Lost Relic",
  message = "찾는 유물이 아카이브에 없습니다. 주소가 바뀌었거나 아직 공개하지 않은 유물입니다.",
  action,
}: {
  title?: string;
  message?: string;
  action?: React.ReactNode;
}) {
  return (
    <main id="main" tabIndex={-1}>
      <Container>
        <Wrap>
          <MonoLabel $tone="accent">[ 404 ]</MonoLabel>
          <Display as="h1" $size="lg">
            {title}
          </Display>
          <p>{message}</p>
          {action ?? (
            <LinkButton href="/artifacts" $variant="light">
              아카이브로 가기
            </LinkButton>
          )}
        </Wrap>
      </Container>
    </main>
  );
}

const Wrap = styled.div`
  display: grid;
  justify-items: start;
  gap: 24px;
  min-height: 80vh;
  align-content: center;
  p {
    color: ${({ theme }) => theme.color.muted};
    max-width: 32em;
  }
`;
