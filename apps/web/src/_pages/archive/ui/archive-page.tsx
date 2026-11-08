import { artifactQuerySchema, type ArtifactQuery } from "@rizer/domain";
import type { Metadata } from "next";
import { Suspense } from "react";

import { ArchiveFilters, ArchiveHydrator } from "@/features/filter-archive";
import { getArtifacts } from "@/shared/api/index.server";
import { Container } from "@/shared/ui";
import { ArchiveGrid } from "./archive-grid";

import { ArchiveHeader } from "./archive-header";
import { ArchiveLayout } from "./archive-layout";

export const metadata: Metadata = {
  title: "아카이브",
  description: "세계 곳곳의 전설 속 유물을 이름, 전시실, 종류로 찾아봅니다.",
};

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

function parseQuery(params: Record<string, string | string[] | undefined>): ArtifactQuery {
  const raw = Object.fromEntries(
    ["q", "gallery", "kind", "sort"].flatMap((k) => (one(params[k]) ? [[k, one(params[k])]] : [])),
  );
  return artifactQuerySchema.safeParse(raw).data ?? { sort: "featured" };
}

async function Results({ searchParams }: { searchParams: PageProps<"/artifacts">["searchParams"] }) {
  const query = parseQuery(await searchParams);
  const { items, total } = await getArtifacts(query);
  return (
    <>
      <ArchiveHydrator key={JSON.stringify(query)} query={query} items={items} total={total} />
      <ArchiveFilters key={`f-${JSON.stringify(query)}`} />
      <ArchiveGrid />
    </>
  );
}

export function ArchivePage({ searchParams }: PageProps<"/artifacts">) {
  return (
    <main id="main" tabIndex={-1}>
      <Container>
        <ArchiveHeader />
        <ArchiveLayout>
          <Suspense fallback={<p>유물을 불러오는 중…</p>}>
            <Results searchParams={searchParams} />
          </Suspense>
        </ArchiveLayout>
      </Container>
    </main>
  );
}
