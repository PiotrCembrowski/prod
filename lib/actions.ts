"use server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

function xpToPriority(xp: number) {
  if (xp <= 10) return 1; // Easy
  if (xp <= 25) return 2; // Medium
  if (xp <= 50) return 3; // Hard
  return 4; // Epic
}

export async function createTask(formData: FormData) {
  const userId = formData.get("userId") as string;
  const date = formData.get("date") as string;

  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || "";
  const xp = Number(formData.get("xp"));

  if (!userId || !date || !title || !xp) {
    throw new Error("Missing required fields");
  }

  // 1️⃣ Ensure tables exist (safe to call multiple times)
  db.exec(`
    CREATE TABLE IF NOT EXISTS days (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      date TEXT NOT NULL,
      UNIQUE(user_id, date)
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      day_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      priority INTEGER NOT NULL,
      xp INTEGER NOT NULL,
      completed INTEGER DEFAULT 0,
      FOREIGN KEY (day_id) REFERENCES days(id)
    );
  `);

  const priority = xpToPriority(xp);

  // 2️⃣ Transaction: find/create day + insert task
  const transaction = db.transaction(() => {
    const existingDay = db
      .prepare(
        `
        SELECT id FROM days
        WHERE user_id = ? AND date = ?
      `
      )
      .get(userId, date) as { id: number } | undefined;

    let dayId: number;

    if (existingDay) {
      dayId = existingDay.id;
    } else {
      const result = db
        .prepare(
          `
          INSERT INTO days (user_id, date)
          VALUES (?, ?)
        `
        )
        .run(userId, date);

      dayId = Number(result.lastInsertRowid);
    }

    db.prepare(
      `
      INSERT INTO tasks (user_id, day_id, title, description, priority, xp)
      VALUES (?, ?, ?, ?, ?, ?)
    `
    ).run(userId, dayId, title, description, priority, xp);
  });

  transaction();

  // 3️⃣ Refresh UI
  revalidatePath("/dashboard");
}

export async function completeTask(taskId: number, userId: number) {
  // Mark task as completed
  db.prepare("UPDATE tasks SET completed = 1 WHERE id = ?").run(taskId);

  // Award XP
  db.prepare(
    `
    UPDATE users
    SET experience = experience + 10
    WHERE id = ?
  `
  ).run(userId);

  // 3. Check for Level Up (Example: Level up every 100 EXP)
  const user = db
    .query("SELECT experience, level FROM users WHERE id = ?")
    .get(userId) as { experience: number; level: number };

  if (user.experience >= user.level * 100) {
    db.prepare(
      "UPDATE users SET level = level + 1, health = health + 2 WHERE id = ?"
    ).run(userId);
  }

  revalidatePath("/dashboard");
}

export async function createDay(userId: string, notes: string) {
  const date = new Date().toISOString().split("T")[0];

  const dayExists = db
    .query("SELECT id FROM days WHERE user_id = ? AND date = ?")
    .get(userId, date);

  if (dayExists) {
    return;
  }

  db.prepare(
    `
    INSERT INTO days (user_id, date, notes)
    VALUES (?, ?, ?)
  `
  ).run(userId, date, notes);
}

export async function getDayByUserId(userId: string) {
  const date = new Date().toISOString().split("T")[0];

  const query = db
    .query("SELECT * FROM days WHERE user_id = ? AND date = ?")
    .get(userId, date);
  return query;
}
