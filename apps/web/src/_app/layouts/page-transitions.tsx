"use client";

import { Ssgoi } from "@ssgoi/react";
import { SsgoiRouteBoundary } from "@ssgoi/react/nextjs";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectReducedMotion } from "@/features/motion-preference";

import { selectConfig } from "./page-transitions.config";

/**
 * 화면 전환(SSGOI). 떠나는 화면은 Shell을 기준으로 겹쳐 놓인다.
 * 라우트 그룹 (site)의 레이아웃으로 쓴다. 없는 주소([...missing])는 이 바깥에 둔다: 경계의 Suspense 안에서
 * notFound()가 나면 이미 응답이 시작돼 404 대신 200이 되기 때문이다.
 */
export function PageTransitions({ children }: { children: ReactNode }) {
  const reduced = useSelector(selectReducedMotion);
  return (
    <Shell>
      <Ssgoi config={selectConfig(reduced)}>
        <SsgoiRouteBoundary as={Page}>{children}</SsgoiRouteBoundary>
      </Ssgoi>
    </Shell>
  );
}

/** relative·z-0: 떠나는 화면의 기준과 쌓임 맥락. overflow-x는 hidden이 아니라 clip이어야 스크롤 복원이 맞다. */
const Shell = styled.div`
  position: relative;
  z-index: 0;
  min-height: 100dvh;
  overflow-x: clip;
`;

/** 겹쳐 움직이는 동안 뒤 화면이 비치지 않도록 화면마다 바탕을 칠한다. */
const Page = styled.div`
  min-height: 100dvh;
  background: ${({ theme }) => theme.color.bg};
`;
