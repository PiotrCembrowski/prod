import { Trophy } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AchievementsList } from "@/components/achievements-list";

export function AchievementsTab() {
  const achievements = [
    {
      id: 1,
      name: "Early Bird",
      description: "Complete 5 tasks before 9 AM",
      unlocked: true,
      rarity: "rare" as const,
    },
    {
      id: 2,
      name: "Streak Master",
      description: "Maintain a 7-day streak",
      unlocked: true,
      rarity: "epic" as const,
    },
    {
      id: 3,
      name: "Dragon Slayer",
      description: "Complete 50 difficult tasks",
      unlocked: false,
      rarity: "legendary" as const,
    },
    {
      id: 4,
      name: "Time Warrior",
      description: "Complete 100 tasks on time",
      unlocked: true,
      rarity: "rare" as const,
    },
    {
      id: 5,
      name: "Night Owl",
      description: "Complete 10 tasks after 10 PM",
      unlocked: false,
      rarity: "common" as const,
    },
    {
      id: 6,
      name: "Speed Demon",
      description: "Complete 20 tasks in one day",
      unlocked: false,
      rarity: "epic" as const,
    },
    {
      id: 7,
      name: "Perfectionist",
      description: "Complete 30 tasks without missing deadline",
      unlocked: true,
      rarity: "rare" as const,
    },
    {
      id: 8,
      name: "Champion",
      description: "Reach level 50",
      unlocked: false,
      rarity: "legendary" as const,
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

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
              {unlockedCount} / {achievements.length}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <AchievementsList achievements={achievements} />
    </>
  );
}
