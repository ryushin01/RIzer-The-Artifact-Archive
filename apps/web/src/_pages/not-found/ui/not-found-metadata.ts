import type { Metadata } from "next";

/** 찾을 수 없는 화면도 제목으로 구분되게 한다(KWCAG 6.4.2). */
export const notFoundMetadata: Metadata = { title: "페이지를 찾을 수 없습니다" };
export const notFoundMetadataEn: Metadata = { title: "Page not found" };
