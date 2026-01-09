"use server";

import "server-only";
import sql from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createTask(_prevState: any, formData: FormData) {
  const userId = formData.get("userId") as string;
  const date = formData.get("date") as string;
  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || "";
  const xp = Number(formData.get("xp"));

  if (!userId || !date || !title || !xp) {
    return { success: false };
  }

  // ensure day
  const [day] = await sql`
    INSERT INTO days (user_id, date)
    VALUES (${userId}, ${date})
    ON CONFLICT (user_id, date)
    DO UPDATE SET date = EXCLUDED.date
    RETURNING id
  `;

  await sql`
    INSERT INTO tasks (user_id, day_id, title, description, priority, xp)
    VALUES (${userId}, ${day.id}, ${title}, ${description}, ${xp}, ${xp})
  `;

  revalidatePath("/dashboard");
  return { success: true };
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

export async function toggleTask(id: number) {
  await sql`UPDATE tasks SET completed = NOT completed WHERE id = ${id}`;
  revalidatePath("/dashboard");
}

export async function deleteTask(id: number) {
  await sql`DELETE FROM tasks WHERE id = ${id}`;
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
