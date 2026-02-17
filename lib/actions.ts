"use server";

import { db } from "@/lib/db";
import { task, user } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createTask(formData: FormData) {
  const userId = formData.get("userId") as string;
  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || "";
  const xp = Number(formData.get("xp"));

  if (!userId || !title || !xp) {
    throw new Error("Missing required fields");
  }

  const [existingUser] = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  if (!existingUser) {
    throw new Error("User does not exist in database");
  }

  await db.insert(task).values({
    userId,
    title,
    description,
    xp,
  });

  revalidatePath("/dashboard");
}

export async function completeTask(taskId: number, userId: string) {
  void userId;
  await db.update(task).set({ completed: true }).where(eq(task.id, taskId));
  revalidatePath("/dashboard");
}

export async function toggleTask(id: number) {
  await sql`UPDATE tasks SET completed = NOT completed WHERE id = ${id}`;
  const [existingTask] = await db
    .select({ completed: task.completed })
    .from(task)
    .where(eq(task.id, id))
    .limit(1);

  if (!existingTask) {
    throw new Error("Task not found");
  }

  await db
    .update(task)
    .set({ completed: !existingTask.completed })
    .where(eq(task.id, id));

  revalidatePath("/dashboard");
}

export async function deleteTask(id: number) {
  await db.delete(task).where(eq(task.id, id));
  revalidatePath("/dashboard");
}

export async function createDay(userId: string, notes: string) {
  void userId;
  void notes;
  return;
}

export async function getDayByUserId(userId: string) {
  void userId;
  return null;
}
