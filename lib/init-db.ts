import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function init() {
  console.log("🗑️ Cleaning old tables...");

  // Drop tables (order matters because of FKs)
  await client.execute(`DROP TABLE IF EXISTS tasks`);
  await client.execute(`DROP TABLE IF EXISTS days`);
  await client.execute(`DROP TABLE IF EXISTS session`);
  await client.execute(`DROP TABLE IF EXISTS account`);
  await client.execute(`DROP TABLE IF EXISTS verification`);
  await client.execute(`DROP TABLE IF EXISTS user`);

  console.log("🏗️ Creating tables...");

  // --------------------
  // User
  // --------------------
  await client.execute(`
    CREATE TABLE user (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      emailVerified INTEGER DEFAULT 0,
      image TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      health INTEGER DEFAULT 10,
      strength INTEGER DEFAULT 5,
      defense INTEGER DEFAULT 5,
      speed INTEGER DEFAULT 5,
      wisdom INTEGER DEFAULT 5,
      experience INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1
    )
  `);

  // --------------------
  // Session
  // --------------------
  await client.execute(`
    CREATE TABLE session (
      id TEXT PRIMARY KEY,
      expiresAt TEXT NOT NULL,
      token TEXT UNIQUE NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      ipAddress TEXT,
      userAgent TEXT,
      userId TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
    )
  `);

  // --------------------
  // Account
  // --------------------
  await client.execute(`
    CREATE TABLE account (
      id TEXT PRIMARY KEY,
      accountId TEXT NOT NULL,
      providerId TEXT NOT NULL,
      userId TEXT NOT NULL,
      accessToken TEXT,
      refreshToken TEXT,
      idToken TEXT,
      accessTokenExpiresAt TEXT,
      refreshTokenExpiresAt TEXT,
      scope TEXT,
      password TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
    )
  `);

  // --------------------
  // Verification
  // --------------------
  await client.execute(`
    CREATE TABLE verification (
      id TEXT PRIMARY KEY,
      identifier TEXT NOT NULL,
      value TEXT NOT NULL,
      expiresAt TEXT NOT NULL,
      createdAt TEXT,
      updatedAt TEXT
    )
  `);

  // --------------------
  // Days
  // --------------------
  await client.execute(`
    CREATE TABLE days (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      date TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (user_id, date),
      FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
    )
  `);

  // --------------------
  // Tasks
  // --------------------
  await client.execute(`
    CREATE TABLE tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      day_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      priority INTEGER NOT NULL,
      xp INTEGER NOT NULL,
      completed INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
      FOREIGN KEY (day_id) REFERENCES days(id) ON DELETE CASCADE
    )
  `);

  console.log("✅ Database initialized successfully");
}

init().catch((err) => {
  console.error("❌ Init failed:", err);
  process.exit(1);
});
