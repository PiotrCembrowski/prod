"use server";
import { db } from "@/lib/db";
import TasksTabClient from "./tasks-tab-client";

export default async function TasksTab({ userId }: { userId: string }) {
  const tasks = await db`
    SELECT id, title, description, xp, completed
    FROM tasks
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;

  return <TasksTabClient tasks={tasks} />;
}
