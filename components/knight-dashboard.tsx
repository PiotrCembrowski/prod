import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sword, Shield, Zap, Target, Trophy, Crown, Star } from "lucide-react";
import { KnightCharacter } from "./knight-character";
import { AchievementsList } from "./achievements-list";
import { StatsChart } from "./stats-chart";
import { QuestLog } from "./quest-log";

export function KnightDashboard() {
  // Mock data for knight progression
  const knightData = {
    name: "Sir Productive",
    level: 12,
    title: "Knight of Focus",
    experience: 2340,
    experienceToNext: 3000,
    stats: {
      strength: 45,
      defense: 38,
      speed: 52,
      wisdom: 41,
    },
    weeklyProgress: [
      { day: "Mon", tasks: 8, xp: 240 },
      { day: "Tue", tasks: 12, xp: 360 },
      { day: "Wed", tasks: 10, xp: 300 },
      { day: "Thu", tasks: 15, xp: 450 },
      { day: "Fri", tasks: 11, xp: 330 },
      { day: "Sat", tasks: 6, xp: 180 },
      { day: "Sun", tasks: 9, xp: 270 },
    ],
  };

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
  ];

  const quests = [
    {
      id: 1,
      title: "Morning Meditation",
      type: "daily",
      progress: 1,
      total: 1,
      xp: 50,
    },
    {
      id: 2,
      title: "Complete 10 Tasks",
      type: "daily",
      progress: 7,
      total: 10,
      xp: 100,
    },
    {
      id: 3,
      title: "Week Warrior",
      type: "weekly",
      progress: 4,
      total: 7,
      xp: 500,
    },
  ];

  const xpPercentage =
    (knightData.experience / knightData.experienceToNext) * 100;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
              <Crown className="h-8 w-8 text-primary" />
              Quest Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your journey to greatness
            </p>
          </div>
          <Button size="lg" className="gap-2">
            <Trophy className="h-5 w-5" />
            View Leaderboard
          </Button>
        </header>

        {/* Knight Overview */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Knight Character Card */}
          <Card className="md:col-span-1 bg-gradient-to-br from-card to-card/50 border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-balance">
                  {knightData.name}
                </CardTitle>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  <Star className="h-4 w-4 mr-1 inline" />
                  Lv {knightData.level}
                </Badge>
              </div>
              <p className="text-primary font-medium">{knightData.title}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <KnightCharacter level={knightData.level} />

              {/* XP Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-mono text-foreground">
                    {knightData.experience} / {knightData.experienceToNext} XP
                  </span>
                </div>
                <Progress value={xpPercentage} className="h-3" />
                <p className="text-xs text-center text-muted-foreground">
                  {knightData.experienceToNext - knightData.experience} XP until
                  Level {knightData.level + 1}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Knight Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <StatBar
                  icon={<Sword className="h-5 w-5" />}
                  label="Strength"
                  value={knightData.stats.strength}
                  max={100}
                  color="bg-primary"
                />
                <StatBar
                  icon={<Shield className="h-5 w-5" />}
                  label="Defense"
                  value={knightData.stats.defense}
                  max={100}
                  color="bg-accent"
                />
                <StatBar
                  icon={<Zap className="h-5 w-5" />}
                  label="Speed"
                  value={knightData.stats.speed}
                  max={100}
                  color="bg-chart-3"
                />
                <StatBar
                  icon={<Target className="h-5 w-5" />}
                  label="Wisdom"
                  value={knightData.stats.wisdom}
                  max={100}
                  color="bg-chart-4"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress and Achievements */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Weekly Progress Chart */}
          <StatsChart data={knightData.weeklyProgress} />

          {/* Quest Log */}
          <QuestLog quests={quests} />
        </div>

        {/* Achievements */}
        <AchievementsList achievements={achievements} />
      </div>
    </div>
  );
}

function StatBar({
  icon,
  label,
  value,
  max,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const percentage = (value / max) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          {icon}
          {label}
        </div>
        <span className="text-sm font-mono text-muted-foreground">
          {value}/{max}
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
