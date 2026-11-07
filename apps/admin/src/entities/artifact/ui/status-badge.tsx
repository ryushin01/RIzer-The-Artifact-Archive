import type { ArtifactStatus } from "@rizer/domain";
import { CircleCheck, CircleDashed } from "lucide-react";

import { Badge } from "@rizer/ui/components/badge";

/** 공개 상태. 색만으로 구분하지 않도록 아이콘과 글자를 함께 쓴다(KWCAG 5.4.1). */
export function StatusBadge({ status }: { status: ArtifactStatus }) {
  return status === "published" ? (
    <Badge>
      <CircleCheck aria-hidden />
      공개
    </Badge>
  ) : (
    <Badge variant="outline">
      <CircleDashed aria-hidden />
      비공개
    </Badge>
  );
}
