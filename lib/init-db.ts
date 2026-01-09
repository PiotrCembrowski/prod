import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

async function init() {
  console.log("🗑️  Cleaning old tables...");

  await sql`DROP TABLE IF EXISTS tasks CASCADE`;
  await sql`DROP TABLE IF EXISTS days CASCADE`;
  await sql`DROP TABLE IF EXISTS session CASCADE`;
  await sql`DROP TABLE IF EXISTS account CASCADE`;
  await sql`DROP TABLE IF EXISTS verification CASCADE`;
  await sql`DROP TABLE IF EXISTS "user" CASCADE`;

  console.log("🏗️  Creating new tables...");

  await sql`
    CREATE TABLE "user" (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      email_verified BOOLEAN NOT NULL DEFAULT FALSE,
      image TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      health INTEGER DEFAULT 10,
      strength INTEGER DEFAULT 5,
      defense INTEGER DEFAULT 5,
      speed INTEGER DEFAULT 5,
      wisdom INTEGER DEFAULT 5,
      experience INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1
    )
  `;

  await sql`
    CREATE TABLE session (
      id TEXT PRIMARY KEY,
      expires_at TIMESTAMP NOT NULL,
      token TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP NOT NULL,
      updated_at TIMESTAMP NOT NULL,
      ip_address TEXT,
      user_agent TEXT,
      user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
    )
  `;

  await sql`
    CREATE TABLE account (
      id TEXT PRIMARY KEY,
      account_id TEXT NOT NULL,
      provider_id TEXT NOT NULL,
      user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
      access_token TEXT,
      refresh_token TEXT,
      id_token TEXT,
      access_token_expires_at TIMESTAMP,
      refresh_token_expires_at TIMESTAMP,
      scope TEXT,
      password TEXT,
      created_at TIMESTAMP NOT NULL,
      updated_at TIMESTAMP NOT NULL
    )
  `;

  await sql`
    CREATE TABLE verification (
      id TEXT PRIMARY KEY,
      identifier TEXT NOT NULL,
      value TEXT NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP,
      updated_at TIMESTAMP
    )
  `;

  await sql`
    CREATE TABLE days (
      id SERIAL PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
      date DATE NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE (user_id, date)
    )
  `;

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
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  console.log("✅ Database initialized successfully");
  process.exit(0);
}

init().catch((err) => {
  console.error("❌ DB init failed:", err);
  process.exit(1);
});
