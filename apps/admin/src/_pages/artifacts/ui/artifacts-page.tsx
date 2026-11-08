import { artifactStatusSchema, galleryIdSchema } from "@rizer/domain";
import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { buttonVariants } from "@rizer/ui/components/button";
import { Skeleton } from "@rizer/ui/components/skeleton";

import { canEdit } from "@/entities/user";
import { getCurrentUser } from "@/server/auth/current-user";
import { listForAdmin } from "@/server/artifacts/queries";
import { PageHeading, ReadOnlyBanner } from "@/widgets/app-shell";
import { ArtifactFilters, ArtifactPagination, ArtifactTable } from "@/widgets/artifact-table";

export const metadata: Metadata = { title: "유물" };

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

/** 한 쪽에 보이는 유물 수 */
const PAGE_SIZE = 30;

async function Content({ searchParams }: { searchParams: PageProps<"/artifacts">["searchParams"] }) {
  const params = await searchParams;
  const q = one(params.q)?.trim() || undefined;
  const gallery = galleryIdSchema.safeParse(one(params.gallery)).data;
  const status = artifactStatusSchema.safeParse(one(params.status)).data;
  const requested = Math.max(1, Number.parseInt(one(params.page) ?? "1", 10) || 1);
  const query = { q, gallery, status, sort: "featured" as const, limit: PAGE_SIZE };
  const [user, first] = await Promise.all([
    getCurrentUser(),
    listForAdmin({ ...query, offset: (requested - 1) * PAGE_SIZE }),
  ]);
  const pageCount = Math.max(1, Math.ceil(first.total / PAGE_SIZE));
  const page = Math.min(requested, pageCount);
  // 없는 쪽(?page=99, 지운 뒤 줄어든 목록)이면 마지막 쪽을 다시 읽는다.
  const { items, total } = page === requested ? first : await listForAdmin({ ...query, offset: (page - 1) * PAGE_SIZE });
  return (
    <>
      <PageHeading
        title="유물"
        description={`전설 속 유물 ${total}점`}
        actions={
          canEdit(user) && (
            <Link href="/artifacts/new" className={buttonVariants()}>
              <Plus aria-hidden />새 유물
            </Link>
          )
        }
      />
      {!canEdit(user) && <ReadOnlyBanner />}
      <ArtifactFilters q={q} gallery={gallery} status={status} />
      <p className="sr-only" role="status">
        검색 결과 {total}점{pageCount > 1 && `, ${pageCount}쪽 중 ${page}쪽`}
      </p>
      <ArtifactTable items={items} />
      <ArtifactPagination page={page} pageCount={pageCount} params={{ q, gallery, status }} />
    </>
  );
}

export function ArtifactsPage({ searchParams }: PageProps<"/artifacts">) {
  return (
    <Suspense fallback={<Skeleton className="h-96" aria-label="불러오는 중" />}>
      <Content searchParams={searchParams} />
    </Suspense>
  );
}
