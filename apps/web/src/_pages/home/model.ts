import type { ArtifactSummary } from "@rizer/domain";

/** 연표에 필요한 필드만. 첫 화면은 유물 전체를 싣기 때문에, 클라이언트 컴포넌트에 넘기는 값을 줄인다. */
export type TimelineItem = Pick<ArtifactSummary, "id" | "slug" | "title" | "recordYear" | "firstRecord" | "gallery">;
/** 전시실 목록에 필요한 필드만 */
export type RealmItem = Pick<ArtifactSummary, "id" | "title" | "gallery">;

export const toTimelineItem = ({ id, slug, title, recordYear, firstRecord, gallery }: ArtifactSummary): TimelineItem => ({
  id,
  slug,
  title,
  recordYear,
  firstRecord,
  gallery,
});

export const toRealmItem = ({ id, title, gallery }: ArtifactSummary): RealmItem => ({ id, title, gallery });
