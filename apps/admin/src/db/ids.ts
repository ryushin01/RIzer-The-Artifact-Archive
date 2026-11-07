import { randomUUID } from "node:crypto";

/** 사람이 알아보기 쉬운 접두사를 붙인 ID */
export const newId = (prefix: "art" | "ann" | "usr") => `${prefix}_${randomUUID().replace(/-/g, "").slice(0, 16)}`;
