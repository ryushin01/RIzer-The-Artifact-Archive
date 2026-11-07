"use client";

import type { ArtifactStatus } from "@rizer/domain";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRef, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@rizer/ui/components/button";

import { setStatusAction } from "../api/actions";

/** 공개·비공개 전환. 저장 요청에는 바꿀 상태를 직접 넘기고, 처리 중에는 다시 누를 수 없다. */
export function PublishToggle({ id, status }: { id: string; status: ArtifactStatus }) {
  const [pending, startTransition] = useTransition();
  // pending은 다음 렌더에야 바뀌어 빠른 더블 클릭을 못 막으므로 ref로 잠근다.
  const locked = useRef(false);
  const next: ArtifactStatus = status === "published" ? "draft" : "published";
  const onClick = () => {
    if (locked.current) return;
    locked.current = true;
    startTransition(async () => {
      try {
        const result = await setStatusAction(id, next);
        if (result.ok) toast.success(result.message);
        else toast.error(result.message);
      } finally {
        locked.current = false;
      }
    });
  };

  return (
    <Button type="button" variant={status === "published" ? "outline" : "default"} onClick={onClick} disabled={pending}>
      {pending ? <Loader2 className="animate-spin" aria-hidden /> : status === "published" ? <EyeOff aria-hidden /> : <Eye aria-hidden />}
      {status === "published" ? "비공개로 전환" : "공개하기"}
    </Button>
  );
}
