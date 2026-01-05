"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SubmitButtonProps {
  disabled?: boolean;
}

export function SubmitButton({ disabled }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending || disabled}
      className="flex-1 gap-2"
    >
      <Plus className="h-4 w-4" />
      {pending ? "Creating Quest..." : "Create Quest"}
    </Button>
  );
}
