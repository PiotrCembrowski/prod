"use client";

import { TaskItem } from "@/components/task-item";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTransition } from "react";
import { toggleTask, deleteTask } from "@/lib/actions";

type Task = {
  id: number;
  name: string;
  description?: string;
  points: number;
  completed: boolean;
  createdAt: string;
};

export function TasksTabClient({
  tasks,
  onAddTask,
}: {
  tasks: Task[];
  onAddTask: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = (id: number) => {
    startTransition(() => {
      toggleTask(id);
    });
  };

  const handleDelete = (id: number) => {
    startTransition(() => {
      deleteTask(id);
    });
  };

  if (tasks.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No quests yet</p>
        <Button className="mt-4 gap-2" onClick={onAddTask}>
          <Plus className="h-4 w-4" />
          Create Quest
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
