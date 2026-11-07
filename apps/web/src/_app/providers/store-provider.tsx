"use client";

import { type ReactNode, useState } from "react";
import { Provider } from "react-redux";

import { makeStore } from "../store/make-store";

/** 앱 전체 스토어. 화면별 데이터(목록·주석)는 각 화면이 hydrated·loaded 액션으로 채운다. */
export function StoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => makeStore());
  return <Provider store={store}>{children}</Provider>;
}
