import { betterAuth } from "better-auth";
import { libsqlAdapter } from "better-auth/adapters/libsql";
import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_URL,
});

export const auth = betterAuth({
  database: libsqlAdapter(client),
});
