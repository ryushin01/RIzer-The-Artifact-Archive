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
import { ArtifactFilters, ArtifactTable } from "@/widgets/artifact-table";

export const metadata: Metadata = { title: "유물" };

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

async function Content({ searchParams }: { searchParams: PageProps<"/artifacts">["searchParams"] }) {
  const params = await searchParams;
  const q = one(params.q)?.trim() || undefined;
  const gallery = galleryIdSchema.safeParse(one(params.gallery)).data;
  const status = artifactStatusSchema.safeParse(one(params.status)).data;
  const [user, items] = await Promise.all([
    getCurrentUser(),
    listForAdmin({ q, gallery, status, sort: "featured" }),
  ]);
  return (
    <>
      <PageHeading
        title="유물"
        description={`전설 속 유물 ${items.length}점`}
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
        검색 결과 {items.length}점
      </p>
      <ArtifactTable items={items} />
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
