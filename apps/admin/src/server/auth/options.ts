import "server-only";

import { compare, hashSync } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { getDb } from "@/db/server";
import { createUserRepository } from "@/server/users/repository";

import { createLoginAttemptRepository } from "./login-attempts";

/**
 * 로그인 설정 (Auth.js v4, 이메일·비밀번호).
 * - 세션은 JWT(쿠키). getCurrentUser가 요청마다 DB에서 계정과 역할을 다시 읽는다.
 * - 운영에서는 NEXTAUTH_SECRET·NEXTAUTH_URL을 꼭 설정한다(개발 값은 .env.development).
 */
/** 없는 계정에도 비교를 한 번 해서, 응답 시간으로 계정이 있는지 알 수 없게 한다. */
const DUMMY_HASH = hashSync("no-such-account", 10);

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 12 * 60 * 60 },
  pages: { signIn: "/login", error: "/login" },
  providers: [
    CredentialsProvider({
      name: "이메일",
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim();
        const password = credentials?.password;
        if (!email || !password) return null;
        const db = await getDb();
        const attempts = createLoginAttemptRepository(db);
        const now = new Date();
        if (await attempts.lockedUntil(email, now)) throw new Error("locked");

        const found = await createUserRepository(db).findForLogin(email);
        const ok = await compare(password, found?.passwordHash ?? DUMMY_HASH);
        if (!found || !ok) {
          if (await attempts.recordFailure(email, now)) throw new Error("locked");
          return null;
        }
        await attempts.recordSuccess(email);
        return { id: found.user.id, name: found.user.name, email: found.user.email };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.uid = user.id;
      return token;
    },
    session({ session, token }) {
      if (session.user && typeof token.uid === "string") {
        (session.user as { id?: string }).id = token.uid;
      }
      return session;
    },
  },
};
