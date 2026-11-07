"use server";

import { revalidatePath } from "next/cache";

import { getDb } from "@/db/server";
import { READ_ONLY_MESSAGE } from "@/entities/user";
import { createArtifactRepository } from "@/server/artifacts/repository";
import { getEditor } from "@/server/auth/guard";
import { ACCEPTED_TYPES, extensionOf, MAX_UPLOAD_BYTES, originalKey, tileAndUpload } from "@/server/images/process";
import { notifyWeb } from "@/server/revalidate";
import { getStorage } from "@/server/storage";
import type { ActionResult } from "@/shared/lib/form";

export type UploadTicket =
  | { ok: true; mode: "presigned"; url: string; key: string }
  | { ok: true; mode: "direct"; url: string }
  | { ok: false; message: string };

/**
 * 업로드 방법을 정한다.
 * - 운영(R2): 브라우저가 서명된 주소로 원본을 직접 올린다. 서버리스 함수의 요청 크기 제한(4.5MB)을 피한다.
 * - 개발(로컬): 어드민의 업로드 라우트로 올린다.
 */
export async function requestUploadAction(id: string, contentType: string, size: number): Promise<UploadTicket> {
  if (!(await getEditor())) return { ok: false, message: READ_ONLY_MESSAGE };
  if (!(ACCEPTED_TYPES as readonly string[]).includes(contentType)) {
    return { ok: false, message: "JPG, PNG, WebP, TIFF 이미지만 올릴 수 있습니다." };
  }
  if (size > MAX_UPLOAD_BYTES) {
    return { ok: false, message: "80MB보다 큰 원본은 pnpm tiles 명령으로 잘라 올려 주세요." };
  }
  if (!(await createArtifactRepository(await getDb()).get(id))) return { ok: false, message: "유물을 찾을 수 없습니다." };

  const key = originalKey(id, extensionOf(contentType));
  const url = await getStorage().presignUpload(key, contentType);
  return url ? { ok: true, mode: "presigned", url, key } : { ok: true, mode: "direct", url: `/api/artifacts/${id}/image` };
}

/** 서명된 주소로 올린 원본을 타일로 자른다. */
export async function processUploadAction(id: string, key: string): Promise<ActionResult> {
  if (!(await getEditor())) return { ok: false, message: READ_ONLY_MESSAGE };
  const repo = createArtifactRepository(await getDb());
  const artifact = await repo.get(id);
  if (!artifact) return { ok: false, message: "유물을 찾을 수 없습니다." };
  if (!key.startsWith(`artifacts/${id}/original.`)) return { ok: false, message: "잘못된 업로드입니다." };

  const storage = getStorage();
  const body = await storage.get(key);
  if (!body) return { ok: false, message: "올린 원본을 찾지 못했습니다. 다시 올려 주세요." };
  const image = await tileAndUpload(storage, id, { key, body }, artifact.image);
  await repo.setImage(id, image);
  notifyWeb([artifact.slug]);
  revalidatePath(`/artifacts/${id}`);
  return { ok: true, message: `타일 ${image.tileCount.toLocaleString("ko-KR")}개를 만들었습니다.` };
}
