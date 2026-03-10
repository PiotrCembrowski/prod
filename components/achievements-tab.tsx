import { Trophy } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AchievementsList } from "@/components/achievements-list";
import { type Achievement, type AchievementTask } from "@/lib/achievements";

function buildAchievementsFromTasks(tasks: AchievementTask[]): Achievement[] {
  const completedTasks = tasks.filter((t) => t.completed);
  const completedCount = completedTasks.length;

  const totalXp = completedTasks.reduce((sum, task) => sum + (task.xp ?? 0), 0);

  const highPriorityCompleted = completedTasks.filter(
    (task) => task.xp >= 50, // simple heuristic for "high priority"
  ).length;

  return [
    {
      id: 1,
      name: "First Victory",
      description: "Complete your first task",
      unlocked: completedCount >= 1,
      rarity: "common",
    },
    {
      id: 2,
      name: "Task Conqueror",
      description: "Complete 10 tasks",
      unlocked: completedCount >= 10,
      rarity: "rare",
    },
    {
      id: 3,
      name: "XP Hoarder",
      description: "Earn at least 100 XP from completed tasks",
      unlocked: totalXp >= 100,
      rarity: "epic",
    },
    {
      id: 4,
      name: "Elite Finisher",
      description: "Finish 5 high-priority tasks",
      unlocked: highPriorityCompleted >= 5,
      rarity: "legendary",
    },
  ];
}

export function AchievementsTab({
  tasks = [],
  achievements,
}: {
  tasks?: AchievementTask[];
  achievements?: Achievement[];
}) {
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const resolvedAchievements =
    achievements && achievements.length > 0
      ? achievements
      : buildAchievementsFromTasks(safeTasks);

  const unlockedCount = resolvedAchievements.filter((a) => a.unlocked).length;

  const totalTasks = safeTasks.length;
  const completedTasks = safeTasks.filter((task) => task.completed).length;

  const completionPercent =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <>
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
              {unlockedCount} / {resolvedAchievements.length}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Task completion</span>
            <span className="font-medium">
              {completedTasks} / {totalTasks} ({completionPercent}%)
            </span>
          </div>

          <Progress value={completionPercent} />
        </CardContent>
      </Card>

      <AchievementsList achievements={resolvedAchievements} tasks={safeTasks} />
    </>
  );
}
