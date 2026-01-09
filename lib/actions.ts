"use server";
import db from "@/lib/db";
import sql from "@/lib/db";
import { revalidatePath } from "next/cache";

function xpToPriority(xp: number) {
  if (xp <= 10) return 1;
  if (xp <= 25) return 2;
  if (xp <= 50) return 3;
  return 4;
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

  const priority = xpToPriority(xp);

  // 1️⃣ find or create day
  const [day] = await sql`
    INSERT INTO days (user_id, date)
    VALUES (${userId}, ${date})
    ON CONFLICT (user_id, date)
    DO UPDATE SET date = EXCLUDED.date
    RETURNING id
  `;

  // 2️⃣ create task
  await sql`
    INSERT INTO tasks (user_id, day_id, title, description, xp, priority)
    VALUES (${userId}, ${day.id}, ${title}, ${description}, ${xp}, ${priority})
  `;

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
