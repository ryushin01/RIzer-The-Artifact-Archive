import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { buttonVariants } from "@rizer/ui/components/button";
import { Skeleton } from "@rizer/ui/components/skeleton";

import { canEdit } from "@/entities/user";
import { getCurrentUser } from "@/server/auth/current-user";
import { getStats } from "@/server/artifacts/queries";
import { PageHeading } from "@/widgets/app-shell";
import { ArtifactTable } from "@/widgets/artifact-table";
import { StatTiles } from "./stat-tiles";

export const metadata: Metadata = { title: "대시보드" };

async function Content() {
  const [user, { stats, recent }] = await Promise.all([getCurrentUser(), getStats()]);
  return (
    <>
      <PageHeading
        title={`${user.name}님, 반갑습니다`}
        description="아카이브의 유물과 딥줌 이미지, 주석 현황입니다."
        actions={
          canEdit(user) && (
            <Link href="/artifacts/new" className={buttonVariants()}>
              <Plus aria-hidden />새 유물
            </Link>
          )
        }
      />
      <StatTiles stats={stats} />
      <section aria-labelledby="recent-title" className="flex flex-col gap-3">
        <h2 id="recent-title" className="text-lg font-semibold">
          최근 수정한 유물
        </h2>
        <ArtifactTable items={recent} />
      </section>
    </>
  );
}

export function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-4" aria-busy="true" aria-label="불러오는 중">
          <Skeleton className="h-9 w-64" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <Skeleton key={n} className="h-28" />
            ))}
          </div>
          <Skeleton className="h-80" />
        </div>
      }
    >
      <Content />
    </Suspense>
  );
}
