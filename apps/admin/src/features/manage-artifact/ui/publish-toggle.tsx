"use client";

import type { ArtifactStatus } from "@rizer/domain";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@rizer/ui/components/button";

import { setStatusAction } from "../api/actions";

/** 공개·비공개 전환. 저장 요청에는 바꿀 상태를 직접 넘기고, 처리 중에는 다시 누를 수 없다. */
export function PublishToggle({ id, status }: { id: string; status: ArtifactStatus }) {
  const [pending, startTransition] = useTransition();
  const next: ArtifactStatus = status === "published" ? "draft" : "published";
  const onClick = () =>
    startTransition(async () => {
      const result = await setStatusAction(id, next);
      if (result.ok) toast.success(result.message);
      else toast.error(result.message);
    });

  return (
    <Button type="button" variant={status === "published" ? "outline" : "default"} onClick={onClick} disabled={pending}>
      {pending ? <Loader2 className="animate-spin" aria-hidden /> : status === "published" ? <EyeOff aria-hidden /> : <Eye aria-hidden />}
      {status === "published" ? "비공개로 전환" : "공개하기"}
    </Button>
  );
}
