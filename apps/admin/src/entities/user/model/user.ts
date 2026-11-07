export type Role = "curator" | "guest";

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

export const ROLE_LABEL: Record<Role, string> = {
  curator: "큐레이터",
  guest: "게스트(읽기 전용)",
};

/** 편집(저장·삭제·업로드·공개)은 큐레이터만 할 수 있다. 게스트는 모든 화면을 둘러보기만 한다. */
export const canEdit = (user: Pick<User, "role"> | null | undefined) => user?.role === "curator";

/** 게스트가 편집하려 할 때 보여 주는 안내 */
export const READ_ONLY_MESSAGE = "게스트 계정은 둘러보기만 할 수 있습니다. 변경 내용은 저장되지 않았습니다.";
