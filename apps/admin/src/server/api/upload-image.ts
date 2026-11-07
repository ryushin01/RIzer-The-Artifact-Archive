import "server-only";

import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { getDb } from "@/db/server";
import { READ_ONLY_MESSAGE } from "@/entities/user";
import { createArtifactRepository } from "@/server/artifacts/repository";
import { getEditor } from "@/server/auth/guard";
import { ACCEPTED_TYPES, extensionOf, MAX_UPLOAD_BYTES, originalKey, tileAndUpload } from "@/server/images/process";
import { notifyWeb } from "@/server/revalidate";
import { getStorage } from "@/server/storage";

/**
 * 로컬 스토리지용 업로드. 원본을 받아 저장하고 바로 타일로 자른다.
 * 운영(R2)에서는 브라우저가 서명된 주소로 올리므로 이 라우트를 쓰지 않는다.
 */
export async function uploadImageHandler(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getEditor())) return NextResponse.json({ message: READ_ONLY_MESSAGE }, { status: 403 });
  const { id } = await params;
  const repo = createArtifactRepository(await getDb());
  const artifact = await repo.get(id);
  if (!artifact) return NextResponse.json({ message: "유물을 찾을 수 없습니다." }, { status: 404 });

  const file = (await request.formData()).get("file");
  if (!(file instanceof File)) return NextResponse.json({ message: "파일이 없습니다." }, { status: 400 });
  if (!(ACCEPTED_TYPES as readonly string[]).includes(file.type)) {
    return NextResponse.json({ message: "JPG, PNG, WebP, TIFF 이미지만 올릴 수 있습니다." }, { status: 415 });
  }
  if (file.size > MAX_UPLOAD_BYTES) return NextResponse.json({ message: "80MB까지 올릴 수 있습니다." }, { status: 413 });

  const storage = getStorage();
  const key = originalKey(id, extensionOf(file.type));
  const body = Buffer.from(await file.arrayBuffer());
  await storage.put(key, body, file.type);
  try {
    const image = await tileAndUpload(storage, id, { key, body }, artifact.image);
    await repo.setImage(id, image);
    await notifyWeb([artifact.slug]);
    revalidatePath(`/artifacts/${id}`);
    return NextResponse.json({ message: `타일 ${image.tileCount.toLocaleString("ko-KR")}개를 만들었습니다.` });
  } catch (error) {
    console.error("[upload] 타일링 실패", error);
    return NextResponse.json({ message: "이미지를 읽지 못했습니다. 손상되지 않은 이미지인지 확인해 주세요." }, { status: 422 });
  }
}
