"use server";

import { revalidatePath } from "next/cache";

import { getDb } from "@/db/server";
import { annotationListSchema } from "@/entities/artifact/index.server";
import { READ_ONLY_MESSAGE } from "@/entities/user";
import { createArtifactRepository } from "@/server/artifacts/repository";
import { getEditor } from "@/server/auth/guard";
import { notifyWeb } from "@/server/revalidate";
import type { ActionResult } from "@/shared/lib/form";

/** 주석 목록 저장. 편집기의 전체 목록으로 바꾼다. */
export async function saveAnnotationsAction(id: string, list: unknown): Promise<ActionResult> {
  if (!(await getEditor())) return { ok: false, message: READ_ONLY_MESSAGE };
  const parsed = annotationListSchema.safeParse(list);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    const index = typeof first?.path[0] === "number" ? `${first.path[0] + 1}번째 주석: ` : "";
    return { ok: false, message: `${index}${first?.message ?? "주석을 확인해 주세요."}` };
  }
  const repo = createArtifactRepository(await getDb());
  const artifact = await repo.get(id);
  if (!artifact) return { ok: false, message: "유물을 찾을 수 없습니다." };

  // 영역이 이미지 밖으로 나가지 않게 자른다(편집기에서 끝까지 끌면 소수점 오차가 생긴다).
  const clamped = parsed.data.map((a, order) => {
    const x = Math.max(0, Math.min(a.region.x, 100));
    const y = Math.max(0, Math.min(a.region.y, 100));
    return { ...a, order, region: { x, y, w: Math.min(a.region.w, 100 - x), h: Math.min(a.region.h, 100 - y) } };
  });
  await repo.replaceAnnotations(id, clamped);
  notifyWeb([artifact.slug]);
  revalidatePath(`/artifacts/${id}/annotations`);
  return { ok: true, message: `주석 ${clamped.length}개를 저장했습니다.` };
}
