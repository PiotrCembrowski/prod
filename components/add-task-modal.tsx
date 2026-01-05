"use client";

import { useState } from "react";

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
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

import { SubmitButton } from "@/components/ui/submit-button";
import { createTask } from "@/lib/actions";

const pointValues = [
  {
    value: "10",
    label: "Easy",
    description: "Simple task",
    color: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  {
    value: "25",
    label: "Medium",
    description: "Moderate effort",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  {
    value: "50",
    label: "Hard",
    description: "Challenging task",
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
  {
    value: "100",
    label: "Epic",
    description: "Major achievement",
    color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  },
];

interface AddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string; // userId
}

export function AddTaskModal({ open, onOpenChange, id }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [xp, setXp] = useState("");
  const [customXp, setCustomXp] = useState("");

  const selectedXp = customXp || xp;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-primary" />
            Create New Quest
          </DialogTitle>
          <DialogDescription>
            Choose a difficulty and define your quest
          </DialogDescription>
        </DialogHeader>

        <form action={createTask} className="space-y-6">
          {/* Hidden server fields */}
          <input type="hidden" name="userId" value={id} />
          <input type="hidden" name="date" value="2026-01-05" />
          <input type="hidden" name="xp" value={selectedXp} />

          {/* Quest title */}
          <div className="space-y-2">
            <Label htmlFor="title">Quest Name</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g. Finish project report"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Optional details about this quest"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Difficulty / Priority */}
          <div className="space-y-3">
            <Label>Difficulty & Priority</Label>

            <div className="grid grid-cols-2 gap-3">
              {pointValues.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setXp(option.value);
                    setCustomXp("");
                  }}
                  className={`rounded-lg border-2 p-4 text-left transition-all ${
                    xp === option.value
                      ? "border-primary bg-primary/5 scale-[1.02]"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">{option.label}</span>
                    <Badge variant="outline" className={option.color}>
                      {option.value} XP
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom XP */}
          <div className="space-y-2">
            <Label htmlFor="customXp">Custom XP (optional)</Label>
            <Input
              id="customXp"
              type="number"
              min={1}
              max={500}
              placeholder="Enter custom XP value"
              value={customXp}
              onChange={(e) => {
                setCustomXp(e.target.value);
                setXp("");
              }}
            />
          </div>

          {/* Priority preview */}
          {selectedXp && (
            <p className="text-sm text-muted-foreground">
              Priority level:{" "}
              <span className="font-semibold text-foreground">
                {Number(selectedXp) <= 10 && "Low"}
                {Number(selectedXp) > 10 &&
                  Number(selectedXp) <= 25 &&
                  "Medium"}
                {Number(selectedXp) > 25 && Number(selectedXp) <= 50 && "High"}
                {Number(selectedXp) > 50 && "Critical"}
              </span>
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>

            <SubmitButton disabled={!title || !selectedXp} />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
