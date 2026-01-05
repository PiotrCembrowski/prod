import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="flex-1 gap-2">
      <Plus className="h-4 w-4" />
      {pending ? "Creating Quest..." : "Create Quest"}
    </Button>
  );
}
