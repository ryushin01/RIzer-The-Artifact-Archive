"use server";

import type { ArtifactStatus } from "@rizer/domain";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getDb } from "@/db/server";
import { artifactFormSchema } from "@/entities/artifact/index.server";
import { READ_ONLY_MESSAGE } from "@/entities/user";
import { createArtifactRepository } from "@/server/artifacts/repository";
import { getEditor } from "@/server/auth/guard";
import { notifyWeb } from "@/server/revalidate";
import { getStorage } from "@/server/storage";
import { type ActionResult, formDataToObject, formError, type FormState } from "@/shared/lib/form";

/** 유물 저장. id가 있으면 고치고, 없으면 새로 만든 뒤 편집 화면으로 옮긴다. */
export async function saveArtifactAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = formDataToObject(formData);
  if (!(await getEditor())) return formError(values, READ_ONLY_MESSAGE);

  const parsed = artifactFormSchema.safeParse(values);
  if (!parsed.success) return formError(values, parsed.error);
  const { input, source } = parsed.data;

  const repo = createArtifactRepository(await getDb());
  const id = typeof values.id === "string" && values.id ? values.id : undefined;
  if (await repo.slugTaken(input.slug, id)) {
    return { status: "error", fieldErrors: { slug: ["이미 쓰고 있는 주소입니다."] }, values };
  }

  if (id) {
    const before = await repo.get(id);
    if (!before) return formError(values, "유물을 찾을 수 없습니다. 이미 삭제됐을 수 있습니다.");
    // 합성 이미지의 구성 소장품(parts)은 폼에 없으므로 기존 값을 유지한다.
    await repo.update(id, input, { ...source, parts: before.source.parts ?? [] });
    notifyWeb([...new Set([before.slug, input.slug])]);
    revalidatePath("/artifacts");
    return { status: "success", message: `「${input.title}」을(를) 저장했습니다.` };
  }

  const newId = await repo.create(input, source);
  notifyWeb([input.slug]);
  revalidatePath("/artifacts");
  redirect(`/artifacts/${newId}?created=1`);
}

/** 공개·비공개 전환 */
export async function setStatusAction(id: string, status: ArtifactStatus): Promise<ActionResult> {
  if (!(await getEditor())) return { ok: false, message: READ_ONLY_MESSAGE };
  const repo = createArtifactRepository(await getDb());
  const current = await repo.get(id);
  if (!current) return { ok: false, message: "유물을 찾을 수 없습니다." };
  if (status === "published" && !current.image) {
    return { ok: false, message: "이미지를 올린 뒤에 공개할 수 있습니다." };
  }
  await repo.setStatus(id, status);
  notifyWeb([current.slug]);
  revalidatePath("/artifacts");
  revalidatePath(`/artifacts/${id}`);
  return { ok: true, message: status === "published" ? "공개했습니다." : "비공개로 바꿨습니다." };
}

/** 삭제. 원본과 타일도 스토리지에서 지운다. */
export async function deleteArtifactAction(id: string): Promise<ActionResult> {
  if (!(await getEditor())) return { ok: false, message: READ_ONLY_MESSAGE };
  const removed = await createArtifactRepository(await getDb()).remove(id);
  if (!removed) return { ok: false, message: "유물을 찾을 수 없습니다." };
  await getStorage().removePrefix(`artifacts/${id}`);
  notifyWeb([removed.slug]);
  revalidatePath("/artifacts");
  redirect("/artifacts?deleted=1");
}
