"use server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createDayWithTask(formData: FormData) {
  const userId = formData.get("userId") as string;
  const date = formData.get("date") as string; // e.g. "2026-01-05"

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const priority = parseInt(formData.get("priority") as string);

  if (!userId || !date || !title) {
    throw new Error("Missing required fields");
  }

  console.log("Creating day + task for user:", userId, date, title);

  const insertDayAndTask = db.transaction(() => {
    // 1. Create the day
    const dayResult = db
      .prepare(
        `
        INSERT INTO days (user_id, date)
        VALUES (?, ?)
        `
      )
      .run(userId, date);

    const dayId = dayResult.lastInsertRowid;

    // 2. Create the task for that day
    db.prepare(
      `
      INSERT INTO tasks (user_id, day_id, title, description, priority)
      VALUES (?, ?, ?, ?, ?)
      `
    ).run(userId, dayId, title, description, priority);

    return dayId;
  });

  const dayId = insertDayAndTask();
  return dayId;
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
