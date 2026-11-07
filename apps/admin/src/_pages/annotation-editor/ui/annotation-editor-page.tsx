import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { buttonVariants } from "@rizer/ui/components/button";
import { Skeleton } from "@rizer/ui/components/skeleton";

import { canEdit } from "@/entities/user";
import { AnnotationEditor } from "./annotation-editor";
import { getCurrentUser } from "@/server/auth/current-user";
import { getForAdmin } from "@/server/artifacts/queries";
import { PageHeading, ReadOnlyBanner } from "@/widgets/app-shell";

export async function generateMetadata({ params }: PageProps<"/artifacts/[id]/annotations">): Promise<Metadata> {
  const { id } = await params;
  const found = await getForAdmin(id);
  return { title: found ? `${found.artifact.title} 주석` : "주석 편집" };
}

async function Content({ params }: PageProps<"/artifacts/[id]/annotations">) {
  const [{ id }, user] = await Promise.all([params, getCurrentUser()]);
  const found = await getForAdmin(id);
  if (!found) notFound();
  const { artifact, annotations } = found;
  return (
    <>
      <Link href={`/artifacts/${id}`} className={buttonVariants({ variant: "ghost", size: "sm", className: "w-fit" })}>
        <ArrowLeft aria-hidden />
        {artifact.title} 정보
      </Link>
      <PageHeading
        title={`${artifact.title} 주석`}
        description="이미지의 한 부분을 골라 설명을 답니다. 목록 순서가 공개 사이트 안내 투어의 순서입니다."
      />
      {!canEdit(user) && <ReadOnlyBanner />}
      {artifact.image ? (
        <AnnotationEditor
          artifactId={artifact.id}
          image={artifact.image}
          imageAlt={artifact.imageAlt}
          initial={annotations}
          readOnly={!canEdit(user)}
        />
      ) : (
        <p className="text-muted-foreground">먼저 원본 이미지를 올려 주세요.</p>
      )}
    </>
  );
}

export function AnnotationEditorPage(props: PageProps<"/artifacts/[id]/annotations">) {
  return (
    <Suspense fallback={<Skeleton className="h-[70vh]" aria-label="불러오는 중" />}>
      <Content {...props} />
    </Suspense>
  );
}
