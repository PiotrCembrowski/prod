import { Database } from "bun:sqlite";
import path from "path";

// Absolute DB path
const dbPath = path.join(process.cwd(), "mydb.sqlite");
const db = new Database(dbPath, { create: true });

db.run("PRAGMA foreign_keys = ON");

console.log("🗑️  Cleaning old tables...");

// Auth / core tables
db.run("DROP TABLE IF EXISTS session");
db.run("DROP TABLE IF EXISTS account");
db.run("DROP TABLE IF EXISTS verification");
db.run("DROP TABLE IF EXISTS user");

// App tables
db.run("DROP TABLE IF EXISTS tasks");
db.run("DROP TABLE IF EXISTS days");

console.log("🏗️  Creating new tables...");

// --------------------
// User
// --------------------
db.run(`
  CREATE TABLE user (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    emailVerified BOOLEAN NOT NULL DEFAULT 0,
    image TEXT,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
db.run(`
  CREATE TABLE session (
    id TEXT PRIMARY KEY,
    expiresAt DATETIME NOT NULL,
    token TEXT NOT NULL UNIQUE,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    ipAddress TEXT,
    userAgent TEXT,
    userId TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
  )
`);

// --------------------
// Account
// --------------------
db.run(`
  CREATE TABLE account (
    id TEXT PRIMARY KEY,
    accountId TEXT NOT NULL,
    providerId TEXT NOT NULL,
    userId TEXT NOT NULL,
    accessToken TEXT,
    refreshToken TEXT,
    idToken TEXT,
    accessTokenExpiresAt DATETIME,
    refreshTokenExpiresAt DATETIME,
    scope TEXT,
    password TEXT,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
  )
`);

// --------------------
// Verification
// --------------------
db.run(`
  CREATE TABLE verification (
    id TEXT PRIMARY KEY,
    identifier TEXT NOT NULL,
    value TEXT NOT NULL,
    expiresAt DATETIME NOT NULL,
    createdAt DATETIME,
    updatedAt DATETIME
  )
`);

// --------------------
// Days (one per user per date)
// --------------------
db.run(`
  CREATE TABLE IF NOT EXISTS days (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    date TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, date),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
  )
`);

// --------------------
// Tasks
// --------------------
db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    day_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    priority INTEGER NOT NULL,
    xp INTEGER NOT NULL,
    completed INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (day_id) REFERENCES days(id) ON DELETE CASCADE
  )
`);

console.log("✅ Database initialized successfully!");
console.log(
  "📋 Tables found:",
  db.query("SELECT name FROM sqlite_master WHERE type='table'").all()
);

export { db };
