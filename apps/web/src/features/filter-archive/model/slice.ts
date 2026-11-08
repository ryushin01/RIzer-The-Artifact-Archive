import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ArtifactQuery, ArtifactSummary } from "@rizer/domain";

/** 아카이브 한 번에 보여 줄 개수. "더 보기"를 누를 때마다 이만큼 더 읽는다. */
export const ARCHIVE_PAGE_SIZE = 24;

export type ArchiveState = {
  query: ArtifactQuery;
  items: ArtifactSummary[];
  total: number;
  status: "idle" | "loading" | "error";
  error: string | null;
  /** "더 보기" 요청 상태. 목록 전체 상태(status)와 따로 둬 이미 보이는 카드를 흐리지 않는다. */
  more: "idle" | "loading" | "error";
};

const sameQuery = (a: ArtifactQuery, b: ArtifactQuery) => JSON.stringify(a) === JSON.stringify(b);

export const initialArchiveState: ArchiveState = {
  query: { sort: "featured" },
  items: [],
  total: 0,
  status: "idle",
  error: null,
  more: "idle",
};

export const archiveSlice = createSlice({
  name: "archive",
  initialState: initialArchiveState,
  reducers: {
    /** 서버에서 그린 첫 목록으로 채운다. */
    hydrated(state, action: PayloadAction<{ query: ArtifactQuery; items: ArtifactSummary[]; total: number }>) {
      Object.assign(state, action.payload, { status: "idle", error: null, more: "idle" });
    },
    /** 검색 조건을 바꾼다. 일부만 넘기면 나머지는 그대로 둔다. undefined는 그 조건을 지운다. */
    queryChanged(state, action: PayloadAction<Partial<ArtifactQuery>>) {
      state.query = { ...state.query, ...action.payload };
      for (const key of Object.keys(state.query) as (keyof ArtifactQuery)[]) {
        if (state.query[key] === undefined || state.query[key] === "") delete state.query[key];
      }
      state.query.sort ??= "featured";
      state.status = "loading";
      state.more = "idle";
    },
    retried(state) {
      state.status = "loading";
    },
    fetchSucceeded(state, action: PayloadAction<{ items: ArtifactSummary[]; total: number }>) {
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.status = "idle";
      state.error = null;
    },
    fetchFailed(state, action: PayloadAction<string>) {
      state.status = "error";
      state.error = action.payload;
    },
    cleared(state) {
      state.query = { sort: "featured", ...(state.query.locale && { locale: state.query.locale }) };
      state.status = "loading";
      state.more = "idle";
    },
    moreRequested(state) {
      state.more = "loading";
    },
    /** 다음 묶음을 붙인다. 그사이 조건이 바뀌었으면 옛 조건의 결과이므로 버린다. */
    moreSucceeded(state, action: PayloadAction<{ query: ArtifactQuery; items: ArtifactSummary[]; total: number }>) {
      if (!sameQuery(state.query, action.payload.query)) return;
      const seen = new Set(state.items.map((a) => a.id));
      state.items.push(...action.payload.items.filter((a) => !seen.has(a.id)));
      state.total = action.payload.total;
      state.more = "idle";
    },
    moreFailed(state) {
      state.more = "error";
    },
  },
});

export const {
  cleared,
  fetchFailed,
  fetchSucceeded,
  hydrated,
  moreFailed,
  moreRequested,
  moreSucceeded,
  queryChanged,
  retried,
} = archiveSlice.actions;

type WithArchive = { archive: ArchiveState };
export const selectArchive = ({ archive }: WithArchive) => archive;
export const selectArchiveQuery = ({ archive }: WithArchive) => archive.query;
export const hasMore = ({ archive }: WithArchive) => archive.items.length < archive.total;
export const hasActiveFilters = (q: ArtifactQuery) => Boolean(q.q || q.gallery || q.kind || q.sort !== "featured");
