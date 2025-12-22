import Database from "better-sqlite3";
import path from "path";

// Resolves to /YourProject/mydb.sqlite explicitly
const dbPath = path.join(process.cwd(), "mydb.sqlite");

const db = new Database(dbPath);
db.pragma("foreign_keys = ON");

export default db;
