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
  { value: "10", label: "Easy", color: "bg-green-500/10 text-green-500" },
  { value: "25", label: "Medium", color: "bg-blue-500/10 text-blue-500" },
  { value: "50", label: "Hard", color: "bg-purple-500/10 text-purple-500" },
  { value: "100", label: "Epic", color: "bg-orange-500/10 text-orange-500" },
];

interface AddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
}

export function AddTaskModal({ open, onOpenChange, id }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [xp, setXp] = useState("");
  const [customXp, setCustomXp] = useState("");

  const selectedXp = customXp || xp;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-primary" />
            Create New Quest
          </DialogTitle>
          <DialogDescription>
            Choose a difficulty and define your quest
          </DialogDescription>
        </DialogHeader>

        {/* ✅ NORMAL FORM ACTION — THIS IS CORRECT */}
        <form
          action={async (formData) => {
            await createTask(formData);
            onOpenChange(false); // close modal after success
          }}
          className="space-y-6"
        >
          <input type="hidden" name="userId" value={id} />
          <input type="hidden" name="date" value="2026-01-05" />
          <input type="hidden" name="xp" value={selectedXp} />

          <div className="space-y-2">
            <Label>Quest Name</Label>
            <Input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {pointValues.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setXp(opt.value);
                  setCustomXp("");
                }}
                className={`rounded-lg border p-4 ${
                  xp === opt.value ? "border-primary" : "border-border"
                }`}
              >
                <span>{opt.label}</span>
                <Badge className={opt.color}>{opt.value} XP</Badge>
              </button>
            ))}
          </div>

          <Input
            type="number"
            placeholder="Custom XP"
            value={customXp}
            onChange={(e) => {
              setCustomXp(e.target.value);
              setXp("");
            }}
          />

          <div className="flex gap-3">
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
