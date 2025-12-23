import { Database } from "bun:sqlite";
import path from "path";

const dbPath = path.join(process.cwd(), "mydb.sqlite");

const db = new Database(dbPath, { create: true });

db.run("PRAGMA foreign_keys = ON;");

export default db;
