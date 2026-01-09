"use client";

import { TaskItem } from "@/components/task-item";

export default function TasksTabClient({ tasks }: any) {
  return (
    <div className="space-y-3">
      {tasks.map((task: any) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
