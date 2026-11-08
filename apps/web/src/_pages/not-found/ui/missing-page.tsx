import { notFound } from "next/navigation";

/** 언어별 루트 레이아웃이 나뉘어 있어, 없는 주소를 not-found 화면으로 보낸다. */
export function MissingPage(): never {
  notFound();
}
