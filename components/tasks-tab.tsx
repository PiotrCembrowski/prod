import sql from "@/lib/db";
import { TasksTabClient } from "./tasks-tab-client";

type Props = {
  userId: string;
  onAddTask: () => void;
};

export async function TasksTab({ userId, onAddTask }: Props) {
  const tasks = await sql`
    SELECT
      id,
      title AS name,
      description,
      xp AS points,
      completed,
      created_at AS "createdAt"
    FROM tasks
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;

  return <TasksTabClient tasks={tasks} onAddTask={onAddTask} />;
}
