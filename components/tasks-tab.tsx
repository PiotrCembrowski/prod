import db from "@/lib/db";
import { TasksTabClient } from "./tasks-tab-client";

type Task = {
  id: number;
  title: string;
  description: string | null;
  xp: number;
  completed: number;
  created_at: string;
};

export default async function TasksTab({
  userId,
  onAddTask,
}: {
  userId: string;
  onAddTask: () => void;
}) {
  const tasks = db
    .prepare(
      `
      SELECT
        id,
        title,
        description,
        xp,
        completed,
        created_at
      FROM tasks
      WHERE user_id = ?
      ORDER BY created_at DESC
    `
    )
    .all(userId) as Task[];

  return (
    <TasksTabClient
      tasks={tasks.map((t) => ({
        id: t.id,
        name: t.title,
        description: t.description ?? undefined,
        points: t.xp,
        completed: Boolean(t.completed),
        createdAt: t.created_at,
      }))}
      onAddTask={onAddTask}
    />
  );
}
