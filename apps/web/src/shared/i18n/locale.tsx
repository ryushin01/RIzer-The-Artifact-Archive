"use client";

import type { Locale } from "@rizer/domain";
import { createContext, type ReactNode, use } from "react";

import { MESSAGES } from "./messages";
import { localePath } from "./path";

const LocaleContext = createContext<Locale>("ko");

/** 루트 레이아웃이 언어를 정한다. 스토리에서는 기본값(한국어)을 쓴다. */
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext value={locale}>{children}</LocaleContext>;
}

export const useLocale = () => use(LocaleContext);

/** 지금 언어의 화면 문구 */
export const useMessages = () => MESSAGES[useLocale()];

/** 지금 언어에 맞는 주소를 만드는 함수 */
export function useLocalePath() {
  const locale = useLocale();
  return (path: string) => localePath(locale, path);
}
