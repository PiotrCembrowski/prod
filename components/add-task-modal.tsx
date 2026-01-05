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
  id: string;
}

export function AddTaskModal({ open, onOpenChange, id }: AddTaskModalProps) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [customPoints, setCustomPoints] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          <input type="hidden" name="userId" value={id} />
          <input type="hidden" name="date" value="2026-01-05" />

          {/* Task Name */}
          <div className="space-y-2">
            <Label htmlFor="title">Quest Name</Label>
            <Input
              id="title"
              name="title"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Priority / XP */}
          <input type="hidden" name="priority" value={customPoints || points} />

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
              disabled={!taskName || (!points && !customPoints)}
              className="flex-1 gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Quest
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
