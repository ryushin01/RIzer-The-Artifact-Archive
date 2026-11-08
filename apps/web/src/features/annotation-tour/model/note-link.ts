/** 주석 바로가기 주소. `?note=2`는 투어 순서로 두 번째 주석이다(사람이 읽는 번호라 1부터). */
export const NOTE_PARAM = "note";

/** 주소 쿼리에서 고를 주석 id. 없거나 범위를 벗어나면 null */
export function noteFromSearch(search: string, ids: string[]): string | null {
  const raw = new URLSearchParams(search).get(NOTE_PARAM);
  if (!raw || !/^\d+$/.test(raw)) return null;
  return ids[Number(raw) - 1] ?? null;
}

/** 지금 주소에 고른 주석 번호를 넣거나(없으면 뺀) 새 주소. 다른 쿼리와 해시는 그대로 둔다. */
export function withNote(href: string, ids: string[], activeId: string | null): string {
  const url = new URL(href);
  const index = activeId ? ids.indexOf(activeId) : -1;
  if (index >= 0) url.searchParams.set(NOTE_PARAM, String(index + 1));
  else url.searchParams.delete(NOTE_PARAM);
  return `${url.pathname}${url.search}${url.hash}`;
}
