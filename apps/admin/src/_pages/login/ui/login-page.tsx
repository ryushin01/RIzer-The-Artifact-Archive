import { Landmark } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@rizer/ui/components/card";

import { GUEST_PASSWORD, SEED_USERS } from "@/db/seed";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "로그인" };

const ERRORS: Record<string, string> = {
  CredentialsSignin: "이메일 또는 비밀번호가 맞지 않습니다.",
  locked: "로그인을 5번 잘못해 15분 동안 잠겼습니다. 잠시 후 다시 시도해 주세요.",
};

/** 다른 사이트로 보내지 않도록 같은 사이트 안의 경로만 받는다. */
function safeCallback(value: unknown) {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

async function Form({ searchParams }: { searchParams: PageProps<"/login">["searchParams"] }) {
  const params = await searchParams;
  const error = typeof params.error === "string" ? (ERRORS[params.error] ?? "로그인하지 못했습니다.") : undefined;
  return (
    <LoginForm
      callbackUrl={safeCallback(params.callbackUrl)}
      initialError={error}
      guest={{ email: SEED_USERS.guest.email, password: GUEST_PASSWORD }}
    />
  );
}

export function LoginPage({ searchParams }: PageProps<"/login">) {
  return (
    <main id="main" tabIndex={-1} className="flex min-h-svh items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Landmark className="size-5" aria-hidden />
          </div>
          <CardTitle>
            <h1 className="text-xl">Rizer Archive 관리</h1>
          </CardTitle>
          <CardDescription>
            전설 유물 아카이브의 유물·해설·주석을 관리합니다. 둘러보기만 하려면 게스트로 들어오세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense>
            <Form searchParams={searchParams} />
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
}
