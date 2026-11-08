"use client";

import { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";

import { noteFromSearch, withNote } from "../model/note-link";
import { loaded, selected, selectTour } from "../model/slice";

/**
 * 유물 화면에 들어오면 그 유물의 주석 순서를 스토어에 넣고(서버 렌더링에도 반영되도록 처음 마운트할 때 바로),
 * 나가면 투어를 끝낸다. 유물이 바뀌면 key로 다시 마운트한다.
 * 주소의 `?note=N`으로 들어오면 그 주석을 열고, 주석을 고를 때마다 주소를 맞춘다(기록은 쌓지 않는다).
 */
export function TourSync({ ids }: { ids: string[] }) {
  const store = useStore();
  useState(() => store.dispatch(loaded(ids)));
  const key = ids.join(",");
  // 개발 모드(StrictMode)는 effect를 한 번 떼었다 다시 붙이므로, 붙일 때마다 다시 넣는다.
  useEffect(() => {
    const list = key ? key.split(",") : [];
    store.dispatch(loaded(list));
    const fromUrl = noteFromSearch(window.location.search, list);
    if (fromUrl) store.dispatch(selected(fromUrl));
    return () => void store.dispatch(loaded([]));
  }, [store, key]);

  const { activeId, ids: loadedIds } = useSelector(selectTour);
  useEffect(() => {
    if (loadedIds.join(",") !== key) return;
    const next = withNote(window.location.href, loadedIds, activeId);
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (next !== current) window.history.replaceState(window.history.state, "", next);
  }, [activeId, loadedIds, key]);
  return null;
}
