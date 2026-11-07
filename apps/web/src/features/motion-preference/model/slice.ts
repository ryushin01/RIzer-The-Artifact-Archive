import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/** system: 운영체제 설정을 따른다, reduce: 움직임을 멈춘다, full: 움직임을 켠다 */
export type MotionMode = "system" | "reduce" | "full";

export type MotionState = { mode: MotionMode; systemReduced: boolean };

const initialState: MotionState = { mode: "system", systemReduced: false };

export const motionSlice = createSlice({
  name: "motion",
  initialState,
  reducers: {
    modeChanged(state, action: PayloadAction<MotionMode>) {
      state.mode = action.payload;
    },
    systemChanged(state, action: PayloadAction<boolean>) {
      state.systemReduced = action.payload;
    },
    /** 움직임 켜기·끄기 버튼. 지금 보이는 상태의 반대로 바꾼다. */
    toggled(state) {
      const reduced = state.mode === "reduce" || (state.mode === "system" && state.systemReduced);
      state.mode = reduced ? "full" : "reduce";
    },
  },
});

export const { modeChanged, systemChanged, toggled } = motionSlice.actions;

type WithMotion = { motion: MotionState };
export const selectReducedMotion = ({ motion }: WithMotion) =>
  motion.mode === "reduce" || (motion.mode === "system" && motion.systemReduced);
export const selectMotionMode = ({ motion }: WithMotion) => motion.mode;
