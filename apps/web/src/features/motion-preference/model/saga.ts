import { eventChannel, type EventChannel } from "redux-saga";
import { call, put, select, take, takeEvery, fork } from "redux-saga/effects";

import { safeStorage } from "@/shared/lib/safe-storage";

import { modeChanged, type MotionMode, selectMotionMode, selectReducedMotion, systemChanged, toggled } from "./slice";

const STORAGE_KEY = "rizer:motion";

function systemChannel(): EventChannel<boolean> {
  return eventChannel((emit) => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    emit(query.matches);
    const onChange = (e: MediaQueryListEvent) => emit(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  });
}

/** 운영체제의 "동작 줄이기" 설정을 따라간다. */
function* watchSystem() {
  const channel: EventChannel<boolean> = yield call(systemChannel);
  while (true) {
    const reduced: boolean = yield take(channel);
    yield put(systemChanged(reduced));
    yield call(applyToDocument);
  }
}

/** html[data-motion]을 바꿔 CSS 애니메이션과 스크롤 연출이 함께 멈추게 한다. */
function* applyToDocument() {
  const reduced: boolean = yield select(selectReducedMotion);
  document.documentElement.dataset.motion = reduced ? "reduce" : "full";
}

function* persist() {
  const mode: MotionMode = yield select(selectMotionMode);
  yield call([safeStorage, safeStorage.set], STORAGE_KEY, mode);
  yield call(applyToDocument);
}

export function* motionSaga() {
  if (typeof window === "undefined") return;
  const saved: string | null = yield call([safeStorage, safeStorage.get], STORAGE_KEY);
  if (saved === "reduce" || saved === "full") yield put(modeChanged(saved));
  yield fork(watchSystem);
  yield takeEvery([modeChanged.type, toggled.type], persist);
}
