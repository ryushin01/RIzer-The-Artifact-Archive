import type { Locale } from "@rizer/domain";

/** 한국어는 그대로, 영어는 /en을 앞에 붙인다. "/"와 "/#섹션"도 올바른 주소로 만든다. */
export function localePath(locale: Locale, path: string): string {
  if (locale === "ko") return path;
  if (path === "/") return "/en";
  if (path.startsWith("/#")) return `/en${path.slice(1)}`;
  return `/en${path}`;
}

/** 주소에서 언어 접두사를 뗀다. */
export const stripLocale = (pathname: string) => (pathname === "/en" ? "/" : pathname.startsWith("/en/") ? pathname.slice(3) : pathname);

/** 다른 언어판의 같은 화면 주소 */
export const otherLocalePath = (locale: Locale, pathname: string) => localePath(locale === "ko" ? "en" : "ko", stripLocale(pathname));

/** 첫 기록 연도 표시 */
export function yearLabel(year: number, locale: Locale): string {
  if (locale === "en") return year < 0 ? `c. ${-year} BCE` : String(year);
  return year < 0 ? `기원전 ${-year}년경` : `${year}년`;
}
