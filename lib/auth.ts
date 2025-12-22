import { betterAuth } from "better-auth";
import { BunSqliteDialect } from "kysely-bun-worker/normal";
import path from "path";

const dbPath = path.join(process.cwd(), "mydb.sqlite");

const dialect = new BunSqliteDialect({
  url: dbPath,
});

export const auth = betterAuth({
  database: dialect,
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
