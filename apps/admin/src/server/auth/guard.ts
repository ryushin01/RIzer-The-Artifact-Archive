import "server-only";

import { canEdit, type User } from "@/entities/user";

import { getCurrentUser } from "./current-user";

/** 편집 권한 확인. 게스트면 null을 돌려준다(액션이 안내 문구로 응답한다). */
export async function getEditor(): Promise<User | null> {
  const user = await getCurrentUser();
  return canEdit(user) ? user : null;
}
