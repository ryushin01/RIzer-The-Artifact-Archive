"use client";

import { useEffect, useState } from "react";
import { useStore } from "react-redux";

import { loaded } from "../model/slice";

/**
 * 유물 화면에 들어오면 그 유물의 주석 순서를 스토어에 넣고(서버 렌더링에도 반영되도록 처음 마운트할 때 바로),
 * 나가면 투어를 끝낸다. 유물이 바뀌면 key로 다시 마운트한다.
 */
export function TourSync({ ids }: { ids: string[] }) {
  const store = useStore();
  useState(() => store.dispatch(loaded(ids)));
  const key = ids.join(",");
  // 개발 모드(StrictMode)는 effect를 한 번 떼었다 다시 붙이므로, 붙일 때마다 다시 넣는다.
  useEffect(() => {
    store.dispatch(loaded(key ? key.split(",") : []));
    return () => void store.dispatch(loaded([]));
  }, [store, key]);
  return null;
}
