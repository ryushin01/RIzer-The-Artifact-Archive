import { eq } from "drizzle-orm";

import type { Database } from "@/db/index";
import { users } from "@/db/schema";
import type { User } from "@/entities/user";

export function createUserRepository(db: Database) {
  const key = (email: string) => email.trim().toLowerCase();
  return {
    async get(id: string): Promise<User | null> {
      const [row] = await db
        .select({ id: users.id, email: users.email, name: users.name, role: users.role })
        .from(users)
        .where(eq(users.id, id));
      return row ?? null;
    },

    async findForLogin(email: string) {
      const [row] = await db.select().from(users).where(eq(users.email, key(email)));
      if (!row) return null;
      const { passwordHash, ...user } = row;
      return { user: user as User, passwordHash };
    },
  };
}
