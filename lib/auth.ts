import "server-only";

import { betterAuth } from "better-auth";
import { PostgresDialect } from "kysely";
import { Pool } from "pg";
import { nextCookies } from "better-auth/next-js";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const dialect = new PostgresDialect({
  pool,
});

export const auth = betterAuth({
  database: dialect,
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      health: { type: "number", defaultValue: 10 },
      strength: { type: "number", defaultValue: 5 },
      defense: { type: "number", defaultValue: 5 },
      speed: { type: "number", defaultValue: 5 },
      wisdom: { type: "number", defaultValue: 5 },
      experience: { type: "number", defaultValue: 0 },
      level: { type: "number", defaultValue: 1 },
    },
  },
});
