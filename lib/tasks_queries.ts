"use server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createTask(data: {
  userId: string;
  dayId?: string;
  title: string;
  description: string;
  priority: number;
}) {
  const { userId, dayId, title, description, priority } = data;

  db.prepare(
    `
    INSERT INTO tasks (user_id, day_id, title, description, priority)
    VALUES (?, ?, ?, ?, ?)
  `
  ).run(userId, dayId || null, title, description, priority);
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
