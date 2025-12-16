"use client";

import { useState } from "react";
import {
  Crown,
  Plus,
  Trophy,
  ScrollText,
  Circle,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KnightDashboard } from "@/components/knight-dashboard";
import { AchievementsList } from "@/components/achievements-list";
import { AddTaskModal } from "@/components/add-task-modal";
import { cn } from "@/lib/utils";

type Task = {
  id: number;
  name: string;
  description?: string;
  points: number;
  completed: boolean;
  createdAt: string;
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
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

  const achievements = [
    {
      id: 1,
      name: "Early Bird",
      description: "Complete 5 tasks before 9 AM",
      unlocked: true,
      rarity: "rare",
    },
    {
      id: 2,
      name: "Streak Master",
      description: "Maintain a 7-day streak",
      unlocked: true,
      rarity: "epic",
    },
    {
      id: 3,
      name: "Dragon Slayer",
      description: "Complete 50 difficult tasks",
      unlocked: false,
      rarity: "legendary",
    },
    {
      id: 4,
      name: "Time Warrior",
      description: "Complete 100 tasks on time",
      unlocked: true,
      rarity: "rare",
    },
    {
      id: 5,
      name: "Night Owl",
      description: "Complete 10 tasks after 10 PM",
      unlocked: false,
      rarity: "common",
    },
    {
      id: 6,
      name: "Speed Demon",
      description: "Complete 20 tasks in one day",
      unlocked: false,
      rarity: "epic",
    },
    {
      id: 7,
      name: "Perfectionist",
      description: "Complete 30 tasks without missing deadline",
      unlocked: true,
      rarity: "rare",
    },
    {
      id: 8,
      name: "Champion",
      description: "Reach level 50",
      unlocked: false,
      rarity: "legendary",
    },
  ];

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
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">
                Knight Quest
              </span>
            </div>

            <Button
              onClick={() => setIsAddTaskOpen(true)}
              size="sm"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Quest
            </Button>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl p-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview" className="gap-2">
              <Crown className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="tasks" className="gap-2">
              <ScrollText className="h-4 w-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2">
              <Trophy className="h-4 w-4" />
              Achievements
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <KnightDashboard />
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
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

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Active Quests</CardDescription>
                  <CardTitle className="text-3xl">
                    {activeTasks.length}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Completed Today</CardDescription>
                  <CardTitle className="text-3xl">
                    {completedTasks.length}
                  </CardTitle>
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

            {/* Active Tasks */}
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
                    <Button
                      onClick={() => setIsAddTaskOpen(true)}
                      className="mt-4 gap-2"
                    >
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

            {/* Completed Tasks */}
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
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <header>
              <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
                <Trophy className="h-8 w-8 text-primary" />
                Achievements
              </h1>
              <p className="text-muted-foreground mt-1">
                Your legendary accomplishments
              </p>
            </header>

            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Progress</CardTitle>
                    <CardDescription>
                      Keep conquering challenges to unlock more
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {unlockedCount} / {achievements.length}
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            <AchievementsList achievements={achievements} />
          </TabsContent>
        </Tabs>
      </div>

      <AddTaskModal open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen} />
    </div>
  );
}

function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 rounded-lg border transition-all",
        task.completed
          ? "bg-muted/50 border-muted opacity-75"
          : "bg-card border-border hover:border-primary/50"
      )}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="h-5 w-5"
      />

      <div className="flex-1 min-w-0">
        <h3
          className={cn(
            "font-medium text-balance",
            task.completed
              ? "line-through text-muted-foreground"
              : "text-foreground"
          )}
        >
          {task.name}
        </h3>
        {task.description && (
          <p className="text-sm text-muted-foreground mt-1 text-pretty">
            {task.description}
          </p>
        )}
      </div>

      <Badge
        variant={task.completed ? "secondary" : "outline"}
        className={
          task.completed
            ? ""
            : task.points >= 100
            ? "bg-orange-500/10 text-orange-500 border-orange-500/20"
            : task.points >= 50
            ? "bg-purple-500/10 text-purple-500 border-purple-500/20"
            : task.points >= 25
            ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
            : "bg-green-500/10 text-green-500 border-green-500/20"
        }
      >
        {task.points} XP
      </Badge>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        className="text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
