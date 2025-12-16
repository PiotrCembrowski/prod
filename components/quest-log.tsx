import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollText, Sparkles } from "lucide-react";

type Quest = {
  id: number;
  title: string;
  type: "daily" | "weekly";
  progress: number;
  total: number;
  xp: number;
};

export function QuestLog({ quests }: { quests: Quest[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ScrollText className="h-5 w-5 text-primary" />
          Active Quests
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {quests.map((quest) => {
          const percentage = (quest.progress / quest.total) * 100;
          const isComplete = quest.progress === quest.total;

          return (
            <div
              key={quest.id}
              className={`p-4 rounded-lg border transition-all ${
                isComplete
                  ? "bg-primary/10 border-primary/50"
                  : "bg-card/50 border-border"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm text-foreground">
                      {quest.title}
                    </h4>
                    {isComplete && (
                      <Sparkles className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      quest.type === "daily"
                        ? "bg-accent/20 text-accent"
                        : "bg-chart-4/20 text-chart-4"
                    }
                  >
                    {quest.type}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Reward</div>
                  <div className="font-mono text-sm font-semibold text-primary">
                    +{quest.xp} XP
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <Progress value={percentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {quest.progress} / {quest.total} completed
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
