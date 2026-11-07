"use client";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { ArtifactCard } from "@/entities/artifact";
import { retried, selectArchive } from "@/features/filter-archive";
import { Button } from "@/shared/ui";

/** 검색 결과 격자. 불러오는 동안에는 이전 결과를 흐리게 두고 aria-busy로 알린다. */
export function ArchiveGrid() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(selectArchive);

  if (status === "error") {
    return (
      <Notice role="alert">
        <p>{error}</p>
        <Button type="button" $variant="ghost" onClick={() => dispatch(retried())}>
          다시 시도
        </Button>
      </Notice>
    );
  }
  if (items.length === 0 && status === "idle") {
    return (
      <Notice>
        <p>조건에 맞는 유물이 없습니다. 검색어를 줄이거나 다른 전시실을 골라 보세요.</p>
      </Notice>
    );
  }
  return (
    <Grid aria-busy={status === "loading"} aria-label="검색 결과" $loading={status === "loading"}>
      {items.map((a, i) => (
        <li key={a.id}>
          <ArtifactCard artifact={a} priority={i < 4} />
        </li>
      ))}
    </Grid>
  );
}

const Grid = styled.ul<{ $loading: boolean }>`
  list-style: none;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
  opacity: ${({ $loading }) => ($loading ? 0.5 : 1)};
  transition: opacity 0.3s;
`;
const Notice = styled.div`
  display: grid;
  justify-items: start;
  gap: 16px;
  padding: 48px 0;
  color: ${({ theme }) => theme.color.muted};
`;
