import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@rizer/ui/components/pagination";

/** 처음·끝과 지금 쪽 앞뒤만 보이고 나머지는 줄임표로 접는다. */
export function pageWindow(current: number, last: number): (number | "gap")[] {
  const pages = [...new Set([1, current - 1, current, current + 1, last])].filter((p) => p >= 1 && p <= last).sort((a, b) => a - b);
  return pages.flatMap((p, i) => (i > 0 && p - pages[i - 1]! > 1 ? (["gap", p] as const) : [p]));
}

/**
 * 유물 목록 쪽 이동. 검색 조건(쿼리)을 그대로 두고 page만 바꾼 주소로 가는 링크라 스크립트 없이도 동작한다.
 * 지금 쪽은 aria-current="page"로 알린다. 첫 쪽·마지막 쪽에서는 이전·다음 링크를 숨긴다.
 */
export function ArtifactPagination({
  page,
  pageCount,
  params,
}: {
  page: number;
  pageCount: number;
  /** 유지할 검색 조건(q, gallery, status) */
  params: Record<string, string | undefined>;
}) {
  if (pageCount <= 1) return null;
  const href = (p: number) => {
    const search = new URLSearchParams(Object.entries(params).filter((e): e is [string, string] => Boolean(e[1])));
    if (p > 1) search.set("page", String(p));
    const qs = search.toString();
    return `/artifacts${qs ? `?${qs}` : ""}`;
  };
  return (
    <Pagination aria-label="유물 목록 쪽">
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious href={href(page - 1)} />
          </PaginationItem>
        )}
        {pageWindow(page, pageCount).map((p, i) =>
          p === "gap" ? (
            <PaginationItem key={`gap-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink href={href(p)} isActive={p === page} aria-label={`${p}쪽`}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        {page < pageCount && (
          <PaginationItem>
            <PaginationNext href={href(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
