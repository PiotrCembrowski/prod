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

type Task = {
  id: number;
  name: string;
  description?: string;
  points: number;
  completed: boolean;
  createdAt: string;
};

export function TasksTab({ onAddTask }: { onAddTask: () => void }) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      name: "Complete project proposal",
      description: "Draft and finalize the Q1 project proposal",
      points: 50,
      completed: false,
      createdAt: "2025-12-16",
    },
    {
      id: 2,
      name: "Morning meditation",
      points: 10,
      completed: true,
      createdAt: "2025-12-16",
    },
    {
      id: 3,
      name: "Review team feedback",
      description: "Go through all feedback from yesterday's meeting",
      points: 25,
      completed: false,
      createdAt: "2025-12-15",
    },
    {
      id: 4,
      name: "Update documentation",
      points: 25,
      completed: true,
      createdAt: "2025-12-15",
    },
  ]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);
  const totalXP = completedTasks.reduce((sum, task) => sum + task.points, 0);

  return (
    <>
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
            <ScrollText className="h-8 w-8 text-primary" />
            Quest Log
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your active and completed quests
          </p>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Quests</CardDescription>
            <CardTitle className="text-3xl">{activeTasks.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Completed Today</CardDescription>
            <CardTitle className="text-3xl">{completedTasks.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total XP Earned</CardDescription>
            <CardTitle className="text-3xl text-primary flex items-center gap-2">
              <Trophy className="h-6 w-6" />
              {totalXP}
            </CardTitle>
          </CardHeader>
        </Card>
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
            <div className="text-center py-12">
              <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No active quests. Time to create some!
              </p>
              <Button onClick={onAddTask} className="mt-4 gap-2">
                <Plus className="h-4 w-4" />
                Create Quest
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {activeTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))}
            </div>
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
            <CardDescription>Conquered challenges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
