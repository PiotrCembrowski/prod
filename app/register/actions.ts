"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export type ActionState = {
  error: string | null;
  success?: string | null;
};

export const initialState: ActionState = {
  error: null,
};

export async function registerKnight(
  prevState: ActionState,
  formData: FormData
) {
  const name = formData.get("knight-name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm-password") as string;

  if (password !== confirmPassword) {
    return { error: "Passwords do not match!" };
  }

  try {
    await auth.api.signUpEmail({
      body: { email, password, name },
    });
  } catch (err) {
    return { error: "Failed to forge your legend. Try again." };
  }

  redirect("/dashboard");
}
