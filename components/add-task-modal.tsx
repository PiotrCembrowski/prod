"use client";

import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { useState } from "react";
import { createTask } from "@/lib/actions";

const pointValues = [
  {
    value: "10",
    label: "Easy",
    description: "Simple task, 10 XP",
    color: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  {
    value: "25",
    label: "Medium",
    description: "Moderate effort, 25 XP",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  {
    value: "50",
    label: "Hard",
    description: "Challenging task, 50 XP",
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
  {
    value: "100",
    label: "Epic",
    description: "Major achievement, 100 XP",
    color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  },
];

interface AddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTaskModal({ open, onOpenChange }: AddTaskModalProps) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [customPoints, setCustomPoints] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log("Task created:", {
      name: taskName,
      description,
      points: customPoints || points,
    });

    setTaskName("");
    setDescription("");
    setPoints("");
    setCustomPoints("");
    setIsSubmitting(false);
    onOpenChange(false);

    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("date", "2026-01-05");
    formData.append("title", "Finish report");
    formData.append("description", "Finalize Q1 metrics");
    formData.append("priority", "1");

    await createTask(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-primary" />
            Create New Quest
          </DialogTitle>
          <DialogDescription>
            Fill in the details for your new quest
          </DialogDescription>
        </DialogHeader>

        <form action={createTask} className="space-y-6">
          {/* Task Name */}
          <div className="space-y-2">
            <Label htmlFor="taskName">Quest Name</Label>
            <Input
              id="taskName"
              placeholder="e.g., Complete project proposal"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
              className="text-base"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add details about this quest..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Point Value Selection */}
          <div className="space-y-3">
            <Label>Quest Difficulty & Rewards</Label>
            <div className="grid grid-cols-2 gap-3">
              {pointValues.map((pointValue) => (
                <button
                  key={pointValue.value}
                  type="button"
                  onClick={() => {
                    setPoints(pointValue.value);
                    setCustomPoints("");
                  }}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    points === pointValue.value
                      ? "border-primary bg-primary/5 scale-105"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-foreground">
                      {pointValue.label}
                    </span>
                    <Badge variant="outline" className={pointValue.color}>
                      {pointValue.value} XP
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {pointValue.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Points */}
          <div className="space-y-2">
            <Label htmlFor="customPoints">Custom XP Value (Optional)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="customPoints"
                type="number"
                placeholder="Enter custom XP value"
                value={customPoints}
                onChange={(e) => {
                  setCustomPoints(e.target.value);
                  setPoints("");
                }}
                min="1"
                max="500"
              />
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                XP
              </span>
            </div>
          </div>

          {/* Summary */}
          {(points || customPoints) && taskName && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Quest Summary
                    </p>
                    <p className="font-bold text-lg text-foreground text-balance">
                      {taskName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Reward</p>
                    <p className="text-2xl font-bold text-primary">
                      {customPoints || points} XP
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!taskName || (!points && !customPoints) || isSubmitting}
              className="flex-1 gap-2"
            >
              <Plus className="h-4 w-4" />
              {isSubmitting ? "Creating Quest..." : "Create Quest"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
