"use client";

import { useState } from "react";
import { ScrollText, Circle, CheckCircle2, Plus, Trophy } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TaskItem } from "@/components/task-item";

export type Task = {
  id: number;
  name: string;
  description?: string;
  points: number;
  completed: boolean;
  createdAt: string;
};

export function TasksTabClient({
  tasks: initialTasks,
  onAddTask,
}: {
  tasks: Task[];
  onAddTask: () => void;
}) {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);
  const totalXP = completedTasks.reduce((sum, t) => sum + t.points, 0);

  return (
    <>
      <header className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-4xl font-bold">
            <ScrollText className="h-8 w-8 text-primary" />
            Quest Log
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage your active and completed quests
          </p>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Active Quests" value={activeTasks.length} />
        <StatCard label="Completed Today" value={completedTasks.length} />
        <StatCard
          label="Total XP Earned"
          value={totalXP}
          icon={<Trophy className="h-6 w-6" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Circle className="h-5 w-5 text-primary" />
            Active Quests
          </CardTitle>
          <CardDescription>Tasks awaiting completion</CardDescription>
        </CardHeader>
        <CardContent>
          {activeTasks.length === 0 ? (
            <EmptyState onAddTask={onAddTask} />
          ) : (
            activeTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </CardContent>
      </Card>

      {completedTasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Completed Quests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon?: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription>{label}</CardDescription>
        <CardTitle className="flex items-center gap-2 text-3xl">
          {icon}
          {value}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

function EmptyState({ onAddTask }: { onAddTask: () => void }) {
  return (
    <div className="py-12 text-center">
      <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
      <p className="text-muted-foreground">
        No active quests. Time to create some!
      </p>
      <Button onClick={onAddTask} className="mt-4 gap-2">
        <Plus className="h-4 w-4" />
        Create Quest
      </Button>
    </div>
  );
}
