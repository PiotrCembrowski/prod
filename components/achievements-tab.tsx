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
import {
  buildAchievementsFromTasks,
  type Achievement,
  type AchievementTask as LibAchievementTask,
} from "@/lib/achievements";

type AchievementsTabProps = {
  tasks?: LibAchievementTask[];
  achievements?: Achievement[];
};

export function AchievementsTab({
  tasks = [],
  achievements,
}: AchievementsTabProps) {
  const resolvedTasks = Array.isArray(tasks) ? tasks : [];
  const resolvedAchievements =
    achievements?.length && achievements.length > 0
      ? achievements
      : buildAchievementsFromTasks(resolvedTasks);

  const unlockedCount = resolvedAchievements.filter((a) => a.unlocked).length;
  const totalTasks = resolvedTasks.length;
  const completedTasks = resolvedTasks.filter((task) => task.completed).length;
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

      <AchievementsList achievements={resolvedAchievements} />
    </>
  );
}
