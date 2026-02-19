"use client";

import { useTransition } from "react";
import { TaskItem } from "@/components/task-item";
import { deleteTask, toggleTask } from "@/lib/actions";

type DashboardTask = {
  id: number;
  title: string;
  description: string | null;
  xp: number;
  completed: boolean;
};

export default function TasksTabClient({ tasks }: { tasks: DashboardTask[] }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = (id: number) => {
    startTransition(async () => {
      await toggleTask(id);
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      await deleteTask(id);
    });
  };

  if (tasks.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
        No quests yet. Add your first quest to start earning XP.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={{
            id: task.id,
            name: task.title,
            description: task.description ?? undefined,
            points: task.xp,
            completed: task.completed,
            createdAt: "",
          }}
          disabled={isPending}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
