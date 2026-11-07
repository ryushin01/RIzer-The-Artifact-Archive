import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";

import { tourSaga, tourSlice } from "@/features/annotation-tour";
import { archiveSaga, archiveSlice } from "@/features/filter-archive";
import { motionSaga, motionSlice } from "@/features/motion-preference";

const rootReducer = combineReducers({
  [motionSlice.name]: motionSlice.reducer,
  [archiveSlice.name]: archiveSlice.reducer,
  [tourSlice.name]: tourSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

function* rootSaga() {
  yield all([fork(motionSaga), fork(archiveSaga), fork(tourSaga)]);
}

/**
 * 요청(또는 스토리)마다 새 스토어를 만든다. 서버에서 그린 데이터는 preloadedState로 넘긴다.
 * 비동기 흐름(검색 요청 취소, 투어 타이머, 설정 저장)은 redux-saga가 맡는다.
 */
export function makeStore(preloadedState?: Partial<RootState>) {
  const saga = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefault) => getDefault({ thunk: false }).concat(saga),
    devTools: process.env.NODE_ENV !== "production",
  });
  saga.run(rootSaga);
  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
