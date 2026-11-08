"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { ArtifactCard } from "@/entities/artifact";
import { hasMore, moreRequested, retried, selectArchive } from "@/features/filter-archive";
import { useMessages } from "@/shared/i18n";
import { Button, VisuallyHidden } from "@/shared/ui";

/**
 * 검색 결과 격자. 불러오는 동안에는 이전 결과를 흐리게 두고 aria-busy로 알린다.
 * 결과가 많으면 한 묶음씩 보여 주고 "더 보기"로 이어 붙인다. 이어 붙이면 새로 붙은 첫 카드로 초점을 옮기고
 * 몇 점을 더 불러왔는지 화면 낭독기에 알린다(KWCAG 6.1.2, 7.2.1).
 */
export function ArchiveGrid() {
  const dispatch = useDispatch();
  const t = useMessages().archive;
  const { items, total, status, error, more } = useSelector(selectArchive);
  const canLoadMore = useSelector(hasMore);
  const listRef = useRef<HTMLUListElement>(null);
  /** "더 보기"를 누른 때의 개수. 결과가 붙으면 그 자리의 카드로 초점을 옮긴다. */
  const focusFrom = useRef<number | null>(null);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const from = focusFrom.current;
    if (from === null || items.length <= from) return;
    focusFrom.current = null;
    setAnnouncement(t.moreDone(items.length - from, total, items.length));
    listRef.current?.children[from]?.querySelector<HTMLAnchorElement>("a")?.focus();
  }, [items.length, total, t]);

  const loadMore = () => {
    if (more === "loading") return;
    focusFrom.current = items.length;
    dispatch(moreRequested());
  };

  if (status === "error") {
    return (
      <Notice role="alert">
        <p>{error}</p>
        <Button type="button" $variant="ghost" onClick={() => dispatch(retried())}>
          {t.retry}
        </Button>
      </Notice>
    );
  }
  if (items.length === 0 && status === "idle") {
    return (
      <Notice>
        <p>{t.empty}</p>
      </Notice>
    );
  }
  return (
    <>
      <Grid ref={listRef} aria-busy={status === "loading"} aria-label={t.results} $loading={status === "loading"}>
        {items.map((a, i) => (
          <li key={a.id}>
            <ArtifactCard artifact={a} priority={i < 4} />
          </li>
        ))}
      </Grid>
      <Footer>
        <p>
          {t.shown(total, items.length)}
        </p>
        {canLoadMore && status !== "loading" && (
          // 불러오는 동안에도 버튼을 끄지 않는다(초점을 잃지 않게). 중복 요청은 위와 사가(takeLeading)가 막는다.
          <Button type="button" $variant="ghost" onClick={loadMore} aria-busy={more === "loading"}>
            {more === "loading" ? t.moreLoading : t.more}
          </Button>
        )}
        {more === "error" && <p role="alert">{t.moreError}</p>}
      </Footer>
      <VisuallyHidden aria-live="polite">
        {announcement}
      </VisuallyHidden>
    </>
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
const Footer = styled.div`
  display: grid;
  justify-items: center;
  gap: 16px;
  padding: 48px 0 24px;
  color: ${({ theme }) => theme.color.muted};
  font-size: 14px;
`;
const Notice = styled.div`
  display: grid;
  justify-items: start;
  gap: 16px;
  padding: 48px 0;
  color: ${({ theme }) => theme.color.muted};
`;
