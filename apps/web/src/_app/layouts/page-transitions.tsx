"use client";

import { Ssgoi } from "@ssgoi/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectReducedMotion } from "@/features/motion-preference";

import { selectConfig } from "./page-transitions.config";

/**
 * 화면 전환(SSGOI). 떠나는 화면은 Shell을 기준으로 겹쳐 놓인다.
 * 라우트 그룹 (site)의 레이아웃으로 쓴다. 없는 주소([...missing])는 이 바깥에 둔다.
 */
export function PageTransitions({ children }: { children: ReactNode }) {
  const reduced = useSelector(selectReducedMotion);
  return (
    <Shell>
      <Ssgoi config={selectConfig(reduced)}>
        <RouteBoundary>{children}</RouteBoundary>
      </Ssgoi>
    </Shell>
  );
}

/**
 * 라우트 경계: 주소가 바뀌면 이 요소가 새로 만들어지고, SSGOI가 떠나는 요소와 들어오는 요소를 함께 움직인다.
 *
 * `@ssgoi/react/nextjs`의 SsgoiRouteBoundary(안에 Suspense를 둠)를 쓰면 Lighthouse CI(데스크톱 시뮬레이션)에서
 * 유물 목록의 LCP가 0.37초에서 1.26초로 늦어졌다. 이 경계로는 main과 같은 0.37초다(실제 브라우저에서는 둘 다 같아
 * 정확한 원인은 확인하지 못했다). (site)의 화면들은 바닥글처럼 usePathname을 Suspense 밖에서 읽어도 멈추지 않으므로,
 * SSGOI 문서의 수동 경계(manual boundary)처럼 Suspense 없이 직접 둔다.
 */
function RouteBoundary({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <Page key={pathname} data-ssgoi-transition={pathname}>
      {children}
    </Page>
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
