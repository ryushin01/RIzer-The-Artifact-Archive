import { galleryOf, kindLabel, type ArtifactSummary } from "@rizer/domain";
import { FileSearch } from "lucide-react";
import Link from "next/link";

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@rizer/ui/components/empty";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@rizer/ui/components/table";

import { ArtifactThumb, StatusBadge } from "@/entities/artifact";

const formatDate = new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeZone: "Asia/Seoul" });

/** 유물 목록 표. 이름이 편집 화면으로 가는 링크다. */
export function ArtifactTable({ items }: { items: ArtifactSummary[] }) {
  if (items.length === 0) {
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileSearch />
          </EmptyMedia>
          <EmptyTitle>조건에 맞는 유물이 없습니다</EmptyTitle>
          <EmptyDescription>검색어나 전시실을 바꿔 보세요.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }
  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableCaption className="sr-only">유물 {items.length}점</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead scope="col">유물</TableHead>
            <TableHead scope="col">전시실</TableHead>
            <TableHead scope="col">종류</TableHead>
            <TableHead scope="col" className="text-right">
              주석
            </TableHead>
            <TableHead scope="col">상태</TableHead>
            <TableHead scope="col">수정일</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((a) => (
            <TableRow key={a.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <ArtifactThumb src={a.image?.previewUrl} alt="" color={a.image?.dominantColor} />
                  <div className="flex min-w-0 flex-col">
                    <Link href={`/artifacts/${a.id}`} className="font-medium underline-offset-4 hover:underline">
                      {a.title}
                    </Link>
                    <span className="truncate text-xs text-muted-foreground">{a.titleOriginal}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{galleryOf(a.gallery).label}</TableCell>
              <TableCell>{kindLabel(a.kind)}</TableCell>
              <TableCell className="text-right tabular-nums">{a.annotationCount}</TableCell>
              <TableCell>
                <StatusBadge status={a.status} />
              </TableCell>
              <TableCell className="whitespace-nowrap text-muted-foreground">
                <time dateTime={a.updatedAt}>{formatDate.format(new Date(a.updatedAt))}</time>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
