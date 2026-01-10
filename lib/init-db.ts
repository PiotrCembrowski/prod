// lib/init-db.ts
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: "require",
});

async function init() {
  console.log("🗑️ Cleaning old tables...");

  // DROP (order matters because of FKs)
  await sql`DROP TABLE IF EXISTS tasks`;
  await sql`DROP TABLE IF EXISTS days`;
  await sql`DROP TABLE IF EXISTS session`;
  await sql`DROP TABLE IF EXISTS account`;
  await sql`DROP TABLE IF EXISTS verification`;
  await sql`DROP TABLE IF EXISTS "user"`;

  console.log("🏗️ Creating tables...");

  // --------------------
  // User
  // --------------------
  await sql`
    CREATE TABLE "user" (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      "emailVerified" BOOLEAN DEFAULT FALSE,
      image TEXT,
      "createdAt" TIMESTAMPTZ DEFAULT NOW(),
      "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
      health INTEGER DEFAULT 10,
      strength INTEGER DEFAULT 5,
      defense INTEGER DEFAULT 5,
      speed INTEGER DEFAULT 5,
      wisdom INTEGER DEFAULT 5,
      experience INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1
    )
  `;

  // --------------------
  // Session
  // --------------------
  await sql`
    CREATE TABLE session (
      id TEXT PRIMARY KEY,
      "expiresAt" TIMESTAMPTZ NOT NULL,
      token TEXT UNIQUE NOT NULL,
      "createdAt" TIMESTAMPTZ NOT NULL,
      "updatedAt" TIMESTAMPTZ NOT NULL,
      "ipAddress" TEXT,
      "userAgent" TEXT,
      "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
    )
  `;

  // --------------------
  // Account
  // --------------------
  await sql`
    CREATE TABLE account (
      id TEXT PRIMARY KEY,
      "accountId" TEXT NOT NULL,
      "providerId" TEXT NOT NULL,
      "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
      "accessToken" TEXT,
      "refreshToken" TEXT,
      "idToken" TEXT,
      "accessTokenExpiresAt" TIMESTAMPTZ,
      "refreshTokenExpiresAt" TIMESTAMPTZ,
      scope TEXT,
      password TEXT,
      "createdAt" TIMESTAMPTZ NOT NULL,
      "updatedAt" TIMESTAMPTZ NOT NULL
    )
  `;

  // --------------------
  // Verification
  // --------------------
  await sql`
    CREATE TABLE verification (
      id TEXT PRIMARY KEY,
      identifier TEXT NOT NULL,
      value TEXT NOT NULL,
      "expiresAt" TIMESTAMPTZ NOT NULL,
      "createdAt" TIMESTAMPTZ,
      "updatedAt" TIMESTAMPTZ
    )
  `;

  // --------------------
  // Days
  // --------------------
  await sql`
    CREATE TABLE days (
      id SERIAL PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
      date DATE NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE (user_id, date)
    )
  `;

  // --------------------
  // Tasks
  // --------------------
  await sql`
    CREATE TABLE tasks (
      id SERIAL PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
      day_id INTEGER NOT NULL REFERENCES days(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      description TEXT,
      priority INTEGER NOT NULL,
      xp INTEGER NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  console.log("✅ Database initialized successfully");
  await sql.end();
}

init().catch((err) => {
  console.error("❌ Init failed:", err);
  process.exit(1);
});
