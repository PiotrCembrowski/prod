import sql from "@/lib/db";
import { TasksTabClient } from "./tasks-tab-client";

export default async function TasksTab({
  userId,
  onAddTask,
}: {
  userId: string;
  onAddTask: () => void;
}) {
  const tasks = await sql`
    SELECT
      id,
      title,
      description,
      xp,
      completed,
      created_at
    FROM tasks
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;

  return (
    <TasksTabClient
      tasks={tasks.map((t) => ({
        id: t.id,
        name: t.title,
        description: t.description ?? undefined,
        points: t.xp,
        completed: t.completed,
        createdAt: t.created_at,
      }))}
      onAddTask={onAddTask}
    />
  );
}
