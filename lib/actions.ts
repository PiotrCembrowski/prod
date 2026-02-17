"use server";

import { db } from "@/lib/db";
import { day, task, user } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

function normalizeXp(rawXp: FormDataEntryValue | null): number {
  const xp = Number(rawXp);
  if (!Number.isFinite(xp) || xp <= 0) {
    throw new Error("Invalid XP value");
  }
  return xp;
}

export async function createTask(formData: FormData) {
  const userId = formData.get("userId") as string;
  const date = formData.get("date") as string;
  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || "";
  const xp = normalizeXp(formData.get("xp"));

  if (!userId || !date || !title) {
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

  const dayId = await db.transaction(async (tx) => {
    let [existingDay] = await tx
      .select({ id: day.id })
      .from(day)
      .where(and(eq(day.userId, userId), eq(day.date, date)))
      .limit(1);

    if (!existingDay) {
      const inserted = await tx.insert(day).values({ userId, date }).returning({
        id: day.id,
      });

      [existingDay] = inserted;
    }

    if (!existingDay || typeof existingDay.id !== "number") {
      throw new Error("Could not resolve day for task");
    }

    await tx.insert(task).values({
      userId,
      dayId: existingDay.id,
      title,
      description,
      xp,
    });

    return existingDay.id;
  });

  if (!dayId) {
    throw new Error("Could not create task day reference");
  }

  revalidatePath("/dashboard");
}

export async function completeTask(taskId: number, userId: string) {
  void userId;
  await db.update(task).set({ completed: true }).where(eq(task.id, taskId));
  revalidatePath("/dashboard");
}

export async function toggleTask(id: number) {
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
