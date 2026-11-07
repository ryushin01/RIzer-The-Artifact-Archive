import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { TourSync } from "@/features/annotation-tour";
import { getArtifact, getArtifacts } from "@/shared/api/index.server";
import { ArtifactDossier } from "./artifact-dossier";
import { DeepZoomViewer } from "./deep-zoom-viewer";

import { ArtifactLayout, Offline, ViewerColumn } from "./artifact-layout";

type Props = PageProps<"/artifacts/[slug]">;

/** 공개 유물을 모두 미리 그린다. 새로 공개한 유물은 요청 때 그리고 캐시한다. */
export async function generateStaticParams() {
  const { items } = await getArtifacts();
  return items.length ? items.map((a) => ({ slug: a.slug })) : [{ slug: "excalibur" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const detail = await getArtifact(slug);
  if (!detail || detail === "offline") return { title: "유물" };
  const { artifact } = detail;
  return {
    title: artifact.title,
    description: `${artifact.summary} ${artifact.power}`,
    openGraph: {
      title: `${artifact.title} · RIzer Archive`,
      description: artifact.summary,
      images: artifact.image ? [{ url: artifact.image.previewUrl, alt: artifact.imageAlt }] : [],
    },
  };
}

async function Content({ params }: Props) {
  const { slug } = await params;
  const detail = await getArtifact(slug);
  if (detail === "offline") return <Offline />;
  if (!detail) notFound();
  const { artifact, annotations, related } = detail;
  return (
    <ArtifactLayout>
      <TourSync key={artifact.id} ids={annotations.map((a) => a.id)} />
      <ViewerColumn>
        {artifact.image ? (
          <DeepZoomViewer
            key={artifact.image.dziUrl}
            title={artifact.title}
            image={artifact.image}
            imageAlt={artifact.imageAlt}
            annotations={annotations}
          />
        ) : (
          <p>이미지를 준비하고 있습니다.</p>
        )}
      </ViewerColumn>
      <ArtifactDossier artifact={artifact} annotations={annotations} related={related} />
    </ArtifactLayout>
  );
}

export function ArtifactPage(props: Props) {
  return (
    <main id="main" tabIndex={-1}>
      <Suspense fallback={<p style={{ padding: 40 }}>유물을 불러오는 중…</p>}>
        <Content {...props} />
      </Suspense>
    </main>
  );
}
