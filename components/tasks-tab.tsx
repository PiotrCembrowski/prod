"use server";

import { db } from "@/lib/db";
import { task } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";
import TasksTabClient from "./tasks-tab-client";

export default async function TasksTab({ userId }: { userId: string }) {
  const rawTasks = await db
    .select({
      id: task.id,
      title: task.title,
      description: task.description,
      xp: task.xp,
      completed: task.completed,
    })
    .from(task)
    .where(eq(task.userId, userId))
    .orderBy(desc(task.createdAt));

  const tasks = rawTasks.map((entry) => ({
    ...entry,
    completed: Boolean(entry.completed),
  }));

  return <TasksTabClient tasks={tasks} />;
}
