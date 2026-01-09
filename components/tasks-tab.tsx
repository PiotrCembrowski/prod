import { getTasks } from "@/lib/queries";
import TasksTabClient from "./tasks-tab-client";

export default async function TasksTab({ userId }: { userId: string }) {
  const tasks = await getTasks(userId);

  return <TasksTabClient tasks={tasks} />;
}
