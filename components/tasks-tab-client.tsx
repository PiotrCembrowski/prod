"use client";

import { TaskItem } from "@/components/task-item";

export default function TasksTabClient({ tasks }: { tasks: any[] }) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={{
            id: task.id,
            name: task.title,
            description: task.description,
            points: task.xp,
            completed: task.completed,
            createdAt: "",
          }}
          onToggle={() => {}}
          onDelete={() => {}}
        />
      ))}
    </div>
  );
}
