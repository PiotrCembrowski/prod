"use server";

import { db } from "@/lib/db";
import { task } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";

export type Task = {
  id: number;
  name: string;
  description: string | null;
  points: number;
  completed: boolean | null;
  createdAt: Date | null;
};

export async function getTasks(userId: string): Promise<Task[]> {
  const rows = await db
    .select({
      id: task.id,
      name: task.title,
      description: task.description,
      points: task.xp,
      completed: task.completed,
      createdAt: task.createdAt,
    })
    .from(task)
    .where(eq(task.userId, userId))
    .orderBy(desc(task.createdAt));

  return rows;
}
