import { mkdtemp, rm, writeFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { BlobStorage, blobPublicUrlFromToken, LocalStorage, S3Storage, safeKey, storageFromEnv } from "./index";

let root: string;
beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), "rizer-storage-"));
});
afterAll(async () => {
  await rm(root, { recursive: true, force: true });
});

describe("safeKey", () => {
  it("앞의 /를 지우고 경로를 정리한다", () => {
    expect(safeKey("/a/./b/c.webp")).toBe("a/b/c.webp");
  });
  it("스토리지 밖으로 나가는 경로를 막는다", () => {
    expect(() => safeKey("../etc/passwd")).toThrow();
    expect(() => safeKey("a/../../b")).toThrow();
  });
});

describe("LocalStorage", () => {
  it("파일을 저장·읽기·삭제하고 공개 주소를 만든다", async () => {
    const storage = new LocalStorage(path.join(root, "store"), "/files/");
    await storage.put("art/a/x.txt", Buffer.from("hi"), "text/plain");
    expect((await storage.get("art/a/x.txt"))?.toString()).toBe("hi");
    expect(storage.publicUrl("art/a/x.txt")).toBe("/files/art/a/x.txt");

    await storage.removePrefix("art/a");
    expect(await storage.get("art/a/x.txt")).toBeNull();
    expect(await storage.presignUpload()).toBeNull();
  });

  it("폴더의 파일들을 prefix 아래로 복사한다", async () => {
    const src = path.join(root, "src");
    await mkdir(path.join(src, "t/0"), { recursive: true });
    await writeFile(path.join(src, "t/0/0_0.webp"), "tile");
    const storage = new LocalStorage(path.join(root, "store2"), "/files");
    await storage.putFiles(src, ["t/0/0_0.webp"], "art/v1", () => "image/webp");
    expect((await storage.get("art/v1/t/0/0_0.webp"))?.toString()).toBe("tile");
  });
});

describe("storageFromEnv", () => {
  it("기본은 로컬 스토리지", () => {
    expect(storageFromEnv({}, root).driver).toBe("local");
  });
  it("s3는 필요한 값이 모두 있어야 한다", () => {
    expect(() => storageFromEnv({ STORAGE_DRIVER: "s3" }, root)).toThrow(/S3_ENDPOINT/);
    const s3 = storageFromEnv(
      {
        STORAGE_DRIVER: "s3",
        S3_ENDPOINT: "https://example.r2.cloudflarestorage.com",
        S3_BUCKET: "rizer",
        S3_ACCESS_KEY_ID: "k",
        S3_SECRET_ACCESS_KEY: "s",
        STORAGE_PUBLIC_URL: "https://tiles.example.com/",
      },
      root,
    );
    expect(s3).toBeInstanceOf(S3Storage);
    expect(s3.publicUrl("a/b.dzi")).toBe("https://tiles.example.com/a/b.dzi");
  });

  it("blob은 토큰에서 공개 주소를 만든다", () => {
    expect(() => storageFromEnv({ STORAGE_DRIVER: "blob" }, root)).toThrow(/BLOB_READ_WRITE_TOKEN/);
    const blob = storageFromEnv({ STORAGE_DRIVER: "blob", BLOB_READ_WRITE_TOKEN: "vercel_blob_rw_AbC123_secret" }, root);
    expect(blob).toBeInstanceOf(BlobStorage);
    expect(blob.publicUrl("/artifacts/a/v1/image.dzi")).toBe(
      "https://abc123.public.blob.vercel-storage.com/artifacts/a/v1/image.dzi",
    );
    expect(() => blobPublicUrlFromToken("nope")).toThrow();
  });
});
