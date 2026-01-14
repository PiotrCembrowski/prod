import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sql } from "@/lib/db";
import * as schema from "@/lib/schema";

export const auth = betterAuth({
  database: drizzleAdapter(sql, {
    provider: "sqlite",
    schema,
  }),
});
