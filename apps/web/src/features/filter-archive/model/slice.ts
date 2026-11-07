import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ArtifactQuery, ArtifactSummary } from "@rizer/domain";

export type ArchiveState = {
  query: ArtifactQuery;
  items: ArtifactSummary[];
  total: number;
  status: "idle" | "loading" | "error";
  error: string | null;
};

export const initialArchiveState: ArchiveState = {
  query: { sort: "featured" },
  items: [],
  total: 0,
  status: "idle",
  error: null,
};

export const archiveSlice = createSlice({
  name: "archive",
  initialState: initialArchiveState,
  reducers: {
    /** 서버에서 그린 첫 목록으로 채운다. */
    hydrated(state, action: PayloadAction<{ query: ArtifactQuery; items: ArtifactSummary[]; total: number }>) {
      Object.assign(state, action.payload, { status: "idle", error: null });
    },
    /** 검색 조건을 바꾼다. 일부만 넘기면 나머지는 그대로 둔다. undefined는 그 조건을 지운다. */
    queryChanged(state, action: PayloadAction<Partial<ArtifactQuery>>) {
      state.query = { ...state.query, ...action.payload };
      for (const key of Object.keys(state.query) as (keyof ArtifactQuery)[]) {
        if (state.query[key] === undefined || state.query[key] === "") delete state.query[key];
      }
      state.query.sort ??= "featured";
      state.status = "loading";
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
      state.query = { sort: "featured" };
      state.status = "loading";
    },
  },
});

export const { cleared, fetchFailed, fetchSucceeded, hydrated, queryChanged, retried } = archiveSlice.actions;

type WithArchive = { archive: ArchiveState };
export const selectArchive = ({ archive }: WithArchive) => archive;
export const selectArchiveQuery = ({ archive }: WithArchive) => archive.query;
export const hasActiveFilters = (q: ArtifactQuery) => Boolean(q.q || q.gallery || q.kind || q.sort !== "featured");
