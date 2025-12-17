"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Task = {
  id: number;
  name: string;
  description?: string;
  points: number;
  completed: boolean;
  createdAt: string;
};

export function TaskItem({
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
