import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const databaseUrl =
  process.env.TURSO_DATABASE_URL?.trim() || "file:./local.db";

if (!process.env.TURSO_DATABASE_URL) {
  console.warn(
    "TURSO_DATABASE_URL is not set; falling back to local SQLite database at file:./local.db",
  );
}

const client = createClient({
  url: databaseUrl,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client);
