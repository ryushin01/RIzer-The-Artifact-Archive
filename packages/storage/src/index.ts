import { createReadStream } from "node:fs";
import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  DeleteObjectsCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * 원본 이미지와 딥줌 타일을 두는 곳.
 * - local: 개발·테스트. 앱의 .data/storage 폴더에 두고, 어드민의 /files 경로로 내보낸다.
 * - s3: 운영. Cloudflare R2 같은 S3 호환 스토리지에 두고, 공개 도메인(CDN)으로 내보낸다.
 */
export interface Storage {
  readonly driver: "local" | "s3";
  put(key: string, body: Buffer, contentType: string, cacheControl?: string): Promise<void>;
  /** 로컬 폴더 안의 파일들을 prefix 아래로 올린다. 타일처럼 파일이 많을 때 쓴다. */
  putFiles(
    localDir: string,
    files: string[],
    prefix: string,
    contentTypeOf: (file: string) => string,
  ): Promise<void>;
  get(key: string): Promise<Buffer | null>;
  removePrefix(prefix: string): Promise<void>;
  /** 공개 주소 */
  publicUrl(key: string): string;
  /** 브라우저가 직접 올릴 수 있는 서명된 주소. local이면 null(어드민 API로 올린다). */
  presignUpload(key: string, contentType: string): Promise<string | null>;
}

/** 타일·미리보기는 내용이 바뀌면 경로(버전)가 바뀌므로 오래 캐시한다. */
export const IMMUTABLE = "public, max-age=31536000, immutable";

/** 경로 조작(../)을 막는다. */
export function safeKey(key: string): string {
  const normalized = path.posix.normalize(key).replace(/^\/+/, "");
  if (!normalized || normalized.startsWith("..") || normalized.includes("/../")) {
    throw new Error(`잘못된 스토리지 키: ${key}`);
  }
  return normalized;
}

async function mapLimit<T>(items: T[], limit: number, fn: (item: T) => Promise<void>) {
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) await fn(items[next++]!);
  });
  await Promise.all(workers);
}

export class LocalStorage implements Storage {
  readonly driver = "local" as const;
  constructor(
    private readonly root: string,
    private readonly baseUrl: string,
  ) {}

  private file(key: string) {
    return path.join(/*turbopackIgnore: true*/ this.root, safeKey(key));
  }

  // 로컬 파일은 확장자로 Content-Type을 정하므로(어드민의 /files 라우트) 받은 값은 쓰지 않는다.
  async put(key: string, body: Buffer, _contentType?: string) {
    const file = this.file(key);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, body);
  }

  async putFiles(localDir: string, files: string[], prefix: string, _contentTypeOf?: (file: string) => string) {
    await mapLimit(files, 32, async (f) => this.put(`${prefix}/${f}`, await readFile(path.join(/*turbopackIgnore: true*/ localDir, f))));
  }

  async get(key: string) {
    try {
      return await readFile(this.file(key));
    } catch {
      return null;
    }
  }

  /** 큰 파일을 스트림으로 읽는다(어드민의 /files 라우트). */
  async stream(key: string) {
    const file = this.file(key);
    try {
      const info = await stat(file);
      return info.isFile() ? { stream: createReadStream(file), size: info.size } : null;
    } catch {
      return null;
    }
  }

  async removePrefix(prefix: string) {
    await rm(this.file(prefix), { recursive: true, force: true });
  }

  publicUrl(key: string) {
    return `${this.baseUrl.replace(/\/$/, "")}/${safeKey(key)}`;
  }

  async presignUpload() {
    return null;
  }
}

export type S3Config = {
  endpoint: string;
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
  publicUrl: string;
  region?: string;
};

export class S3Storage implements Storage {
  readonly driver = "s3" as const;
  private readonly client: S3Client;
  constructor(private readonly config: S3Config) {
    this.client = new S3Client({
      region: config.region ?? "auto",
      endpoint: config.endpoint,
      credentials: { accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey },
    });
  }

  async put(key: string, body: Buffer, contentType: string, cacheControl = IMMUTABLE) {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.config.bucket,
        Key: safeKey(key),
        Body: body,
        ContentType: contentType,
        CacheControl: cacheControl,
      }),
    );
  }

  async putFiles(localDir: string, files: string[], prefix: string, contentTypeOf: (file: string) => string) {
    await mapLimit(files, 24, async (f) =>
      this.put(`${prefix}/${f}`, await readFile(path.join(/*turbopackIgnore: true*/ localDir, f)), contentTypeOf(f)),
    );
  }

  async get(key: string) {
    try {
      const res = await this.client.send(new GetObjectCommand({ Bucket: this.config.bucket, Key: safeKey(key) }));
      return res.Body ? Buffer.from(await res.Body.transformToByteArray()) : null;
    } catch {
      return null;
    }
  }

  async removePrefix(prefix: string) {
    const Prefix = `${safeKey(prefix)}/`;
    let token: string | undefined;
    do {
      const list = await this.client.send(
        new ListObjectsV2Command({ Bucket: this.config.bucket, Prefix, ContinuationToken: token }),
      );
      const keys = (list.Contents ?? []).map((o) => ({ Key: o.Key! }));
      if (keys.length) {
        await this.client.send(new DeleteObjectsCommand({ Bucket: this.config.bucket, Delete: { Objects: keys } }));
      }
      token = list.IsTruncated ? list.NextContinuationToken : undefined;
    } while (token);
  }

  publicUrl(key: string) {
    return `${this.config.publicUrl.replace(/\/$/, "")}/${safeKey(key)}`;
  }

  async presignUpload(key: string, contentType: string) {
    return getSignedUrl(
      this.client,
      new PutObjectCommand({ Bucket: this.config.bucket, Key: safeKey(key), ContentType: contentType }),
      { expiresIn: 600 },
    );
  }
}

/** 환경 변수로 스토리지를 고른다. STORAGE_DRIVER=s3이면 S3_* 값이 모두 있어야 한다. */
export function storageFromEnv(env: NodeJS.ProcessEnv, localRoot: string, localBaseUrl = "/files"): Storage {
  if (env.STORAGE_DRIVER !== "s3") return new LocalStorage(localRoot, env.STORAGE_PUBLIC_URL || localBaseUrl);
  const required = ["S3_ENDPOINT", "S3_BUCKET", "S3_ACCESS_KEY_ID", "S3_SECRET_ACCESS_KEY", "STORAGE_PUBLIC_URL"];
  const missing = required.filter((k) => !env[k]);
  if (missing.length) throw new Error(`S3 스토리지 설정이 없습니다: ${missing.join(", ")}`);
  return new S3Storage({
    endpoint: env.S3_ENDPOINT!,
    bucket: env.S3_BUCKET!,
    accessKeyId: env.S3_ACCESS_KEY_ID!,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY!,
    publicUrl: env.STORAGE_PUBLIC_URL!,
  });
}
