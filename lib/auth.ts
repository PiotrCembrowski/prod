import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    schema,
    provider: "sqlite",
  }),

  cookies: {
    session: {
      name: "better-auth.session",
    },
  },

  emailAndPassword: {
    enabled: true,
  },
});
