import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { sql } from "./db";

export const auth = betterAuth({
  database: sql, // ✅ pass Postgres.js directly
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
  },
});
