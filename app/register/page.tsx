"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sword, Shield } from "lucide-react";
import { registerKnight, ActionState } from "./action";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    registerKnight,
    { error: null }
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <Card className="relative z-10 w-full max-w-md border-border bg-card p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Sword className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-card-foreground">
            Begin Your Journey
          </h1>
          <p className="text-muted-foreground">
            Create your knight and embark on your productivity quest
          </p>
        </div>

        <form action={formAction} className="space-y-6">
          {state?.error && (
            <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm">
              {state.error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="knight-name" className="text-card-foreground">
              Knight Name
            </Label>
            <Input
              id="knight-name"
              type="text"
              placeholder="Sir Productive"
              className="bg-background text-foreground"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-card-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="knight@realm.com"
              className="bg-background text-foreground"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-card-foreground">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a strong password"
              className="bg-background text-foreground"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-card-foreground">
              Confirm Password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              className="bg-background text-foreground"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isPending ? "Forging..." : "Forge Your Legend"}
            <Shield className="mr-2 h-4 w-4" />
            Forge Your Legend
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}
