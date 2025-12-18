import { Database } from "bun:sqlite";

const db = new Database("mydb.sqlite", { create: true });

db.run("PRAGMA foreign_keys = ON;");

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    health INTEGER DEFAULT 10,
    strength INTEGER DEFAULT 5,
    defense INTEGER DEFAULT 5,
    speed INTEGER DEFAULT 5,
    wisdom INTEGER DEFAULT 5,
    experience INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS days (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    date TEXT NOT NULL, -- Format: 'YYYY-MM-DD'
    notes TEXT,
    tasks INTEGER DEFAULT 0,
    is_completed BOOLEAN DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, date)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    day_id INTEGER,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT 0,
    priority INTEGER DEFAULT 1, -- 1: Low, 2: Medium, 3: High
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (day_id) REFERENCES days(id) ON DELETE SET NULL
  )
`);

export default db;
