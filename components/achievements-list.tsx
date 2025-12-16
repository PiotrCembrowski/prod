import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Lock, Sparkles } from "lucide-react";

type Achievement = {
  id: number;
  name: string;
  description: string;
  unlocked: boolean;
  rarity: "common" | "rare" | "epic" | "legendary";
};

export function AchievementsList({
  achievements,
}: {
  achievements: Achievement[];
}) {
  const rarityColors = {
    common: "bg-muted text-muted-foreground",
    rare: "bg-chart-3/20 text-chart-3 border-chart-3/50",
    epic: "bg-accent/20 text-accent border-accent/50",
    legendary: "bg-primary/20 text-primary border-primary/50",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative p-4 rounded-lg border transition-all ${
                achievement.unlocked
                  ? "bg-card/50 border-border hover:border-primary/50"
                  : "bg-muted/30 border-border/50 opacity-60"
              }`}
            >
              {achievement.unlocked ? (
                <Sparkles className="absolute top-2 right-2 h-4 w-4 text-primary" />
              ) : (
                <Lock className="absolute top-2 right-2 h-4 w-4 text-muted-foreground" />
              )}

              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className={`${rarityColors[achievement.rarity]} text-xs`}
                >
                  {achievement.rarity}
                </Badge>
                <h4 className="font-semibold text-sm text-foreground text-balance">
                  {achievement.name}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
