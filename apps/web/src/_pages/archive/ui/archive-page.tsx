import { artifactQuerySchema, type ArtifactQuery, type Locale } from "@rizer/domain";
import type { Metadata } from "next";
import { Suspense } from "react";

import { ARCHIVE_PAGE_SIZE, ArchiveFilters, ArchiveHydrator } from "@/features/filter-archive";
import { getArtifacts } from "@/shared/api/index.server";
import { MESSAGES } from "@/shared/i18n";
import { Container } from "@/shared/ui";
import { ArchiveGrid } from "./archive-grid";

import { ArchiveHeader } from "./archive-header";
import { ArchiveLayout } from "./archive-layout";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const alternates = { languages: { ko: "/artifacts", en: "/en/artifacts" } };
export const metadata: Metadata = { title: MESSAGES.ko.meta.archiveTitle, description: MESSAGES.ko.meta.archiveDescription, alternates };
export const metadataEn: Metadata = { title: MESSAGES.en.meta.archiveTitle, description: MESSAGES.en.meta.archiveDescription, alternates };

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

function parseQuery(params: Record<string, string | string[] | undefined>): ArtifactQuery {
  const raw = Object.fromEntries(
    ["q", "gallery", "kind", "sort"].flatMap((k) => (one(params[k]) ? [[k, one(params[k])]] : [])),
  );
  return artifactQuerySchema.safeParse(raw).data ?? { sort: "featured" };
}

async function Results({ searchParams, locale }: Props & { locale: Locale }) {
  const parsed = parseQuery(await searchParams);
  const query: ArtifactQuery = locale === "ko" ? parsed : { ...parsed, locale };
  const { items, total } = await getArtifacts({ ...query, limit: ARCHIVE_PAGE_SIZE });
  return (
    <>
      <ArchiveHydrator key={JSON.stringify(query)} query={query} items={items} total={total} />
      <ArchiveFilters key={`f-${JSON.stringify(query)}`} />
      <ArchiveGrid />
    </>
  );
}

export function ArchivePage({ searchParams, locale = "ko" }: Props & { locale?: Locale }) {
  return (
    <main id="main" tabIndex={-1}>
      <Container>
        <ArchiveHeader />
        <ArchiveLayout>
          <Suspense fallback={<p>{MESSAGES[locale].archive.loading}</p>}>
            <Results searchParams={searchParams} locale={locale} />
          </Suspense>
        </ArchiveLayout>
      </Container>
    </main>
  );
}

export const ArchivePageEn = (props: Props) => <ArchivePage {...props} locale="en" />;
