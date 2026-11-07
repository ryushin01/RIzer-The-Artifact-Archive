"use client";

import { Eye, Loader2, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { type FormEvent, useState, useSyncExternalStore, useTransition } from "react";

import { Button } from "@rizer/ui/components/button";
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@rizer/ui/components/field";
import { Input } from "@rizer/ui/components/input";

import { FormErrorAlert } from "@/shared/ui/form-error-alert";

const subscribeNothing = () => () => {};

/**
 * 이메일·비밀번호 로그인. 성공하면 원래 가려던 화면(callbackUrl)으로 간다.
 * guest가 있으면 "게스트로 둘러보기" 버튼으로 공개된 게스트 계정에 바로 로그인한다(포트폴리오 방문자용).
 */
export function LoginForm({
  callbackUrl,
  initialError,
  guest,
}: {
  callbackUrl: string;
  initialError?: string;
  guest?: { email: string; password: string };
}) {
  const router = useRouter();
  const [error, setError] = useState(initialError);
  const [pending, startTransition] = useTransition();
  // 하이드레이션 전에 제출하면 브라우저가 폼을 GET으로 보내 비밀번호가 주소에 실린다. 준비될 때까지 막는다.
  const hydrated = useSyncExternalStore(subscribeNothing, () => true, () => false);

  const login = (email: string, password: string) =>
    startTransition(async () => {
      const result = await signIn("credentials", { email, password, redirect: false });
      if (!result || result.error) {
        setError(
          result?.error === "locked"
            ? "로그인을 5번 잘못해 15분 동안 잠겼습니다. 잠시 후 다시 시도해 주세요."
            : "이메일 또는 비밀번호가 맞지 않습니다.",
        );
        return;
      }
      router.replace(callbackUrl);
      router.refresh();
    });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login(String(data.get("email") ?? ""), String(data.get("password") ?? ""));
  };

  return (
    <form method="post" onSubmit={onSubmit} noValidate>
      <FieldGroup>
        <FormErrorAlert message={error} />
        <Field>
          <FieldLabel htmlFor="login-email">이메일</FieldLabel>
          <Input id="login-email" name="email" type="email" autoComplete="username" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="login-password">비밀번호</FieldLabel>
          <Input id="login-password" name="password" type="password" autoComplete="current-password" required />
        </Field>
        <Button type="submit" disabled={pending || !hydrated}>
          {pending ? <Loader2 className="animate-spin" aria-hidden /> : <LogIn aria-hidden />}
          로그인
        </Button>
        {guest && (
          <>
            <FieldSeparator>또는</FieldSeparator>
            <Button type="button" variant="outline" disabled={pending || !hydrated} onClick={() => login(guest.email, guest.password)}>
              <Eye aria-hidden />
              게스트로 둘러보기
            </Button>
          </>
        )}
      </FieldGroup>
    </form>
  );
}
