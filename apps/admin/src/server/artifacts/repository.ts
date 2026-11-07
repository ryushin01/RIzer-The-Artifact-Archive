import type {
  AnnotationInput,
  ArtifactInput,
  ArtifactQuery,
  ArtifactSource,
  ArtifactStatus,
  GalleryId,
} from "@rizer/domain";
import { and, asc, count, desc, eq, getTableColumns, ilike, inArray, ne, or, sql, type SQL } from "drizzle-orm";

import type { Database } from "@/db/index";
import { newId } from "@/db/ids";
import { annotations, artifacts } from "@/db/schema";
import type { StoredImage } from "@/entities/artifact";

export type ArtifactRow = typeof artifacts.$inferSelect;
export type AnnotationRow = typeof annotations.$inferSelect;
export type ArtifactWithCount = ArtifactRow & { annotationCount: number };

/** 어드민 목록 조건. 공개 API 조건에 상태와 "최근 수정순"을 더한다. */
export type AdminArtifactQuery = Omit<Partial<ArtifactQuery>, "sort"> & {
  status?: ArtifactStatus;
  sort?: ArtifactQuery["sort"] | "updated";
};

/** LIKE 패턴의 특수 문자를 그대로 찾도록 이스케이프한다. */
const escapeLike = (s: string) => s.replace(/[\\%_]/g, (c) => `\\${c}`);

// 서브쿼리 안에서 artifacts.id가 따옴표 없는 "id"로 그려지면 annotations.id로 읽히므로 테이블 이름을 직접 쓴다.
const columns = {
  ...getTableColumns(artifacts),
  annotationCount: sql<number>`(select count(*)::int from "annotations" where "annotations"."artifact_id" = "artifacts"."id")`.as(
    "annotation_count",
  ),
};

export function createArtifactRepository(db: Database) {
  async function list(query: AdminArtifactQuery = {}): Promise<ArtifactWithCount[]> {
    const where: SQL[] = [];
    if (query.status) where.push(eq(artifacts.status, query.status));
    if (query.gallery) where.push(eq(artifacts.gallery, query.gallery));
    if (query.kind) where.push(eq(artifacts.kind, query.kind));
    if (query.q) {
      const pattern = `%${escapeLike(query.q)}%`;
      where.push(
        or(
          ilike(artifacts.title, pattern),
          ilike(artifacts.titleOriginal, pattern),
          ilike(artifacts.owner, pattern),
          ilike(artifacts.summary, pattern),
        )!,
      );
    }
    const order = {
      featured: [desc(artifacts.featured), asc(artifacts.createdAt)],
      oldest: [asc(artifacts.recordYear), asc(artifacts.title)],
      newest: [desc(artifacts.recordYear), asc(artifacts.title)],
      title: [asc(artifacts.title)],
      updated: [desc(artifacts.updatedAt)],
    }[query.sort ?? "featured"];

    return db
      .select(columns)
      .from(artifacts)
      .where(where.length ? and(...where) : undefined)
      .orderBy(...order);
  }

  return {
    list,

    /** 최근 수정한 순서 */
    recent: (limit: number) => list({ sort: "updated" }).then((rows) => rows.slice(0, limit)),

    async get(id: string): Promise<ArtifactWithCount | null> {
      const [row] = await db.select(columns).from(artifacts).where(eq(artifacts.id, id));
      return row ?? null;
    },

    async getBySlug(slug: string): Promise<ArtifactWithCount | null> {
      const [row] = await db
        .select(columns)
        .from(artifacts)
        .where(eq(artifacts.slug, slug));
      return row ?? null;
    },

    async slugTaken(slug: string, exceptId?: string) {
      const [row] = await db
        .select({ id: artifacts.id })
        .from(artifacts)
        .where(exceptId ? and(eq(artifacts.slug, slug), ne(artifacts.id, exceptId)) : eq(artifacts.slug, slug));
      return Boolean(row);
    },

    async create(input: ArtifactInput, source: ArtifactSource, now = new Date()) {
      const id = newId("art");
      await db.insert(artifacts).values({ ...input, source, id, createdAt: now, updatedAt: now });
      return id;
    },

    async update(id: string, input: ArtifactInput, source: ArtifactSource, now = new Date()) {
      const rows = await db
        .update(artifacts)
        .set({ ...input, source, updatedAt: now })
        .where(eq(artifacts.id, id))
        .returning({ slug: artifacts.slug });
      return rows[0] ?? null;
    },

    async setStatus(id: string, status: ArtifactStatus, now = new Date()) {
      const rows = await db
        .update(artifacts)
        .set({ status, updatedAt: now })
        .where(eq(artifacts.id, id))
        .returning({ slug: artifacts.slug });
      return rows[0] ?? null;
    },

    async setImage(id: string, image: StoredImage | null, now = new Date()) {
      const rows = await db
        .update(artifacts)
        .set({ image, updatedAt: now })
        .where(eq(artifacts.id, id))
        .returning({ slug: artifacts.slug });
      return rows[0] ?? null;
    },

    async remove(id: string) {
      const rows = await db.delete(artifacts).where(eq(artifacts.id, id)).returning({ slug: artifacts.slug });
      return rows[0] ?? null;
    },

    /** 같은 전시실의 다른 공개 유물 */
    async related(gallery: GalleryId, exceptId: string, limit = 4): Promise<ArtifactWithCount[]> {
      const rows = await db
        .select(columns)
        .from(artifacts)
        .where(and(eq(artifacts.gallery, gallery), eq(artifacts.status, "published"), ne(artifacts.id, exceptId)))
        .orderBy(desc(artifacts.featured), asc(artifacts.recordYear))
        .limit(limit);
      return rows;
    },

    async stats() {
      const rows = await db
        .select({ status: artifacts.status, n: count(), withImage: sql<number>`count(${artifacts.image})::int` })
        .from(artifacts)
        .groupBy(artifacts.status);
      const [ann] = await db.select({ n: count() }).from(annotations);
      const published = rows.find((r) => r.status === "published");
      const draft = rows.find((r) => r.status === "draft");
      const total = (published?.n ?? 0) + (draft?.n ?? 0);
      return {
        total,
        published: published?.n ?? 0,
        draft: draft?.n ?? 0,
        withImage: (published?.withImage ?? 0) + (draft?.withImage ?? 0),
        annotations: ann?.n ?? 0,
      };
    },

    async listAnnotations(artifactId: string): Promise<AnnotationRow[]> {
      return db.select().from(annotations).where(eq(annotations.artifactId, artifactId)).orderBy(asc(annotations.order));
    },

    /** 주석을 통째로 바꾼다(편집기는 전체 목록을 저장한다). */
    async replaceAnnotations(artifactId: string, inputs: (AnnotationInput & { id?: string })[], now = new Date()) {
      await db.transaction(async (tx) => {
        await tx.delete(annotations).where(eq(annotations.artifactId, artifactId));
        if (inputs.length) {
          await tx.insert(annotations).values(
            inputs.map((a, order) => ({
              id: a.id?.startsWith("ann_") ? a.id : newId("ann"),
              artifactId,
              title: a.title,
              body: a.body,
              ...a.region,
              order,
            })),
          );
        }
        await tx.update(artifacts).set({ updatedAt: now }).where(eq(artifacts.id, artifactId));
      });
    },

    async annotationCounts(ids: string[]) {
      if (!ids.length) return new Map<string, number>();
      const rows = await db
        .select({ id: annotations.artifactId, n: count() })
        .from(annotations)
        .where(inArray(annotations.artifactId, ids))
        .groupBy(annotations.artifactId);
      return new Map(rows.map((r) => [r.id, r.n]));
    },
  };
}

export type ArtifactRepository = ReturnType<typeof createArtifactRepository>;
