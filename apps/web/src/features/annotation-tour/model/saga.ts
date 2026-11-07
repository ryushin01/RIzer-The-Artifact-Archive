import { delay, put, race, select, take, takeLatest } from "redux-saga/effects";

import { next, paused, played, selectIsLast, selected } from "./slice";

/** 한 주석에 머무는 시간. 읽을 시간을 넉넉히 둔다(KWCAG 6.2.1 응답 시간). */
export const STEP_MS = 8000;

/**
 * 안내 투어: 주석을 차례로 보여 준다.
 * 기다리는 동안 사용자가 멈추거나 다른 주석을 고르면 투어를 끝낸다(사용자의 선택이 우선).
 * 마지막 주석까지 보면 스스로 멈춘다.
 */
export function* tourLoop() {
  while (true) {
    const { timeout } = (yield race({ timeout: delay(STEP_MS), stop: take([paused.type, selected.type]) })) as {
      timeout?: true;
    };
    if (!timeout) {
      yield put(paused());
      return;
    }
    const last: boolean = yield select(selectIsLast);
    if (last) {
      yield put(paused());
      return;
    }
    yield put(next());
  }
}

export function* tourSaga() {
  yield takeLatest(played.type, tourLoop);
}
