import { betterAuth } from "better-auth";
import { libsqlAdapter } from "better-auth/adapters/libsql/index.js";
import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const auth = betterAuth({
  database: libsqlAdapter(client),
});
