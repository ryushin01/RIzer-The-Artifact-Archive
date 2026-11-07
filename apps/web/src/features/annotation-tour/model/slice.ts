import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TourState = {
  /** 투어 순서대로 나열한 주석 id */
  ids: string[];
  activeId: string | null;
  playing: boolean;
  markersVisible: boolean;
};

const initialState: TourState = { ids: [], activeId: null, playing: false, markersVisible: true };

export const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    /** 유물 화면에 들어오면 그 유물의 주석으로 바꾼다. */
    loaded(state, action: PayloadAction<string[]>) {
      state.ids = action.payload;
      state.activeId = null;
      state.playing = false;
    },
    selected(state, action: PayloadAction<string | null>) {
      state.activeId = action.payload;
    },
    next(state) {
      const i = state.activeId ? state.ids.indexOf(state.activeId) : -1;
      state.activeId = state.ids[Math.min(i + 1, state.ids.length - 1)] ?? null;
    },
    prev(state) {
      const i = state.activeId ? state.ids.indexOf(state.activeId) : state.ids.length;
      state.activeId = state.ids[Math.max(i - 1, 0)] ?? null;
    },
    played(state) {
      if (state.ids.length === 0) return;
      state.playing = true;
      state.markersVisible = true;
      // 끝까지 봤거나 처음이면 첫 주석부터
      if (!state.activeId || state.activeId === state.ids.at(-1)) state.activeId = state.ids[0]!;
    },
    paused(state) {
      state.playing = false;
    },
    markersToggled(state) {
      state.markersVisible = !state.markersVisible;
    },
  },
});

export const { loaded, markersToggled, next, paused, played, prev, selected } = tourSlice.actions;

type WithTour = { tour: TourState };
export const selectTour = ({ tour }: WithTour) => tour;
export const selectIsLast = ({ tour }: WithTour) => tour.activeId !== null && tour.activeId === tour.ids.at(-1);
