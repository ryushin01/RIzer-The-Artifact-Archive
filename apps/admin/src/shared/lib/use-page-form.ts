"use client";

import { type FormEvent, useActionState, useRef } from "react";
import { toast } from "sonner";

import type { FormState } from "./form";

type PageFormState = FormState & { attempt: number };
type FormValues = Record<string, string | string[]>;

/**
 * 화면 전체를 차지하는 폼을 서버 액션으로 제출한다.
 * 성공하면 알림을 띄우고, 실패하면 입력값과 필드 오류를 돌려준다.
 * attempt를 form의 key로 써서 다시 마운트해야 defaultValue가 복원된다.
 */
export function usePageForm(
  action: (prev: FormState, formData: FormData) => Promise<FormState>,
  defaults: FormValues,
) {
  // pending은 다음 렌더에야 true가 되어 빠른 연속 클릭을 못 막으므로 ref로 잠근다.
  // 성공해서 화면을 떠나는 경우(redirect)에는 잠금을 풀지 않는다(액션이 던지므로 아래에 닿지 않는다).
  const locked = useRef(false);
  const [state, formAction, pending] = useActionState(
    async (prev: PageFormState, formData: FormData): Promise<PageFormState> => {
      const result = await action(prev, formData);
      locked.current = false;
      const attempt = prev.attempt + 1;
      if (result.status === "success") {
        toast.success(result.message);
        return { status: "idle", attempt };
      }
      if (result.status === "error" && result.formError) toast.error(result.formError);
      return { ...result, attempt };
    },
    { status: "idle", attempt: 0 },
  );
  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.status === "error" ? state.values : defaults;

  /** form의 onSubmit. 처리 중이면 제출을 막는다. */
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (locked.current) event.preventDefault();
    else locked.current = true;
  };

  return {
    formAction,
    onSubmit,
    pending,
    formKey: state.attempt,
    formError: state.status === "error" ? state.formError : undefined,
    text(name: string) {
      const v = values[name];
      return Array.isArray(v) ? (v[0] ?? "") : (v ?? "");
    },
    invalid(name: string) {
      return Boolean(errors[name]?.length);
    },
    errors(name: string) {
      return errors[name]?.map((message) => ({ message }));
    },
    errorCount: Object.values(errors).filter((e) => e?.length).length,
  };
}
