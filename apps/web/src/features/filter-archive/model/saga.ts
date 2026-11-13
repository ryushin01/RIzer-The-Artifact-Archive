import type { ArtifactListResponse, ArtifactQuery } from "@rizer/domain";
import type { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, put, select, takeLatest, takeLeading } from "redux-saga/effects";

import { fetchArtifacts, toSearchParams } from "@/shared/api";
import { MESSAGES } from "@/shared/i18n";

import {
  ARCHIVE_PAGE_SIZE,
  cleared,
  fetchFailed,
  fetchSucceeded,
  moreFailed,
  moreRequested,
  moreSucceeded,
  queryChanged,
  retried,
  selectArchive,
  selectArchiveQuery,
  type ArchiveState,
} from "./slice";

/** 검색어를 칠 때는 잠시 기다렸다가 요청한다. 버튼 필터는 바로 요청한다. */
const TYPING_DEBOUNCE_MS = 300;

/** 주소를 검색 조건과 맞춘다(새로고침·공유해도 같은 결과). 기록을 쌓지 않도록 replaceState를 쓴다. */
export function syncUrl(query: ArtifactQuery) {
  const qs = toSearchParams(query).toString();
  window.history.replaceState(window.history.state, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
}

export function* loadArchive(action: PayloadAction<Partial<ArtifactQuery> | undefined>) {
  if (action.type === queryChanged.type && action.payload && "q" in action.payload) {
    yield delay(TYPING_DEBOUNCE_MS);
  }
  const query: ArtifactQuery = yield select(selectArchiveQuery);
  try {
    const result: ArtifactListResponse = yield call(fetchArtifacts, { ...query, limit: ARCHIVE_PAGE_SIZE });
    yield put(fetchSucceeded(result));
    yield call(syncUrl, query);
  } catch {
    yield put(fetchFailed(MESSAGES[query.locale ?? "ko"].archive.loadError));
  }
}

/** "더 보기": 지금 보이는 개수 뒤의 다음 묶음을 읽는다. */
export function* loadMore() {
  const { query, items }: ArchiveState = yield select(selectArchive);
  try {
    const result: ArtifactListResponse = yield call(fetchArtifacts, {
      ...query,
      limit: ARCHIVE_PAGE_SIZE,
      offset: items.length,
    });
    yield put(moreSucceeded({ query, ...result }));
  } catch {
    yield put(moreFailed());
  }
}

/** takeLatest: 새 조건이 오면 진행 중인 요청(과 기다림)을 취소해, 늦게 온 옛 응답이 화면을 덮지 않는다. */
export function* archiveSaga() {
  yield takeLatest([queryChanged.type, retried.type, cleared.type], loadArchive);
  // 빠르게 여러 번 눌러도 한 번만 읽는다.
  yield takeLeading(moreRequested.type, loadMore);
}
