import { Database } from "bun:sqlite";
import path from "path";

// Same absolute path logic
const dbPath = path.join(process.cwd(), "mydb.sqlite");
const db = new Database(dbPath, { create: true });

// 1. Drop existing tables to ensure a clean slate
console.log("🗑️  Cleaning old tables...");
db.run("DROP TABLE IF EXISTS session");
db.run("DROP TABLE IF EXISTS account");
db.run("DROP TABLE IF EXISTS verification");
db.run("DROP TABLE IF EXISTS user");
db.run("DROP TABLE IF EXISTS users");
db.run("DROP TABLE IF EXISTS tasks"); // Clean up your old tasks table too

// 2. Create Tables
console.log("🏗️  Creating new tables...");

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

console.log("✅ Database initialized successfully!");
console.log(
  "📋 Tables found:",
  db.query("SELECT name FROM sqlite_master WHERE type='table'").all()
);
