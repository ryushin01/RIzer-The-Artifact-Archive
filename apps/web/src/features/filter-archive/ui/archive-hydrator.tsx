"use client";

import type { ArtifactQuery, ArtifactSummary } from "@rizer/domain";
import { useState } from "react";
import { useStore } from "react-redux";

import { hydrated } from "../model/slice";

/**
 * 서버에서 읽은 첫 목록을 스토어에 넣는다. 서버 렌더링 때 목록이 그려지도록 effect가 아니라
 * 처음 마운트할 때 한 번만 바로 넣는다(아래 형제 컴포넌트보다 먼저 그려진다). 조건이 바뀌면 key로 다시 마운트한다.
 */
export function ArchiveHydrator(props: { query: ArtifactQuery; items: ArtifactSummary[]; total: number }) {
  const store = useStore();
  useState(() => store.dispatch(hydrated(props)));
  return null;
}
