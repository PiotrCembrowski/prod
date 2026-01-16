import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/lib/db";
import { schema } from "@/lib/schema";

export const auth = betterAuth({
  plugins: [
    drizzleAdapter(db, {
      schema,
      provider: "sqlite",
    }),
  ],
});
