import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

import { Alert, AlertDescription } from "@rizer/ui/components/alert";
import { buttonVariants } from "@rizer/ui/components/button";
import { Skeleton } from "@rizer/ui/components/skeleton";

import { StatusBadge } from "@/entities/artifact";
import { canEdit } from "@/entities/user";
import { ArtifactForm } from "./artifact-form";
import { DeleteArtifactButton } from "./delete-artifact-button";
import { PublishToggle } from "./publish-toggle";
import { getCurrentUser } from "@/server/auth/current-user";
import { getForAdmin } from "@/server/artifacts/queries";
import { webUrl } from "@/shared/config";
import { PageHeading, ReadOnlyBanner } from "@/widgets/app-shell";

import { ImageCard } from "./image-card";

const fallback = <Skeleton className="h-[70vh]" aria-label="불러오는 중" />;
const backLink = (
  <Link href="/artifacts" className={buttonVariants({ variant: "ghost", size: "sm", className: "w-fit" })}>
    <ArrowLeft aria-hidden />
    유물 목록
  </Link>
);

export const newMetadata: Metadata = { title: "새 유물" };

async function NewContent() {
  const user = await getCurrentUser();
  if (!canEdit(user)) redirect("/artifacts");
  return (
    <>
      {backLink}
      <PageHeading title="새 유물" description="기본 정보를 저장한 뒤 이미지를 올리고 주석을 답니다." />
      <ArtifactForm readOnly={false} />
    </>
  );
}

export function NewArtifactPage() {
  return (
    <Suspense fallback={fallback}>
      <NewContent />
    </Suspense>
  );
}

export async function generateEditMetadata({ params }: PageProps<"/artifacts/[id]">): Promise<Metadata> {
  const { id } = await params;
  const found = await getForAdmin(id);
  return { title: found ? `${found.artifact.title} 편집` : "유물 편집" };
}

async function EditContent({ params, searchParams }: PageProps<"/artifacts/[id]">) {
  const [{ id }, query, user] = await Promise.all([params, searchParams, getCurrentUser()]);
  const found = await getForAdmin(id);
  if (!found) notFound();
  const { artifact } = found;
  const editable = canEdit(user);
  return (
    <>
      {backLink}
      <PageHeading
        title={artifact.title}
        description={
          <span className="flex items-center gap-2">
            <StatusBadge status={artifact.status} />
            {artifact.titleOriginal}
          </span>
        }
        actions={
          <>
            {artifact.status === "published" && (
              <a
                href={`${webUrl()}/artifacts/${artifact.slug}`}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: "ghost" })}
              >
                공개 사이트에서 보기
                <ExternalLink aria-hidden />
                <span className="sr-only">(새 창)</span>
              </a>
            )}
            {editable && <PublishToggle id={artifact.id} status={artifact.status} />}
            {editable && <DeleteArtifactButton id={artifact.id} title={artifact.title} />}
          </>
        }
      />
      {!editable && <ReadOnlyBanner />}
      {query.created && (
        <Alert>
          <AlertDescription>유물을 만들었습니다. 이제 원본 이미지를 올리세요.</AlertDescription>
        </Alert>
      )}
      <ImageCard artifact={artifact} readOnly={!editable} />
      <ArtifactForm artifact={artifact} readOnly={!editable} />
    </>
  );
}

export function EditArtifactPage(props: PageProps<"/artifacts/[id]">) {
  return (
    <Suspense fallback={fallback}>
      <EditContent {...props} />
    </Suspense>
  );
}
