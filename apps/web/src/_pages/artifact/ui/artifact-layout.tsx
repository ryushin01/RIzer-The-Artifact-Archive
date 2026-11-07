"use client";

import styled from "styled-components";

import { media } from "@/shared/config";

/** 넓은 화면: 왼쪽에 뷰어를 고정하고 오른쪽 해설을 스크롤한다. 좁은 화면: 뷰어 아래에 해설. */
export const ArtifactLayout = styled.div`
  display: grid;
  ${media.md} {
    grid-template-columns: minmax(0, 1.5fr) minmax(360px, 1fr);
  }
`;

/** 아카이브(어드민 API)에 닿지 못할 때 */
export function Offline() {
  return (
    <OfflineBox role="alert">
      <p>아카이브에 잠시 연결할 수 없습니다. 잠시 후 새로고침해 주세요.</p>
    </OfflineBox>
  );
}

const OfflineBox = styled.div`
  min-height: 60vh;
  display: grid;
  place-items: center;
  padding: 24px;
  color: ${({ theme }) => theme.color.muted};
`;

export const ViewerColumn = styled.div`
  height: 72svh;
  padding: 12px;
  ${media.md} {
    position: sticky;
    top: 0;
    height: 100svh;
    padding: 20px;
  }
`;
