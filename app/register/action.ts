"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export type ActionState = {
  error?: string | null;
};

export async function registerKnight(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const rawFormData = {
    name: formData.get("knight-name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirm-password") as string,
  };

  if (rawFormData.password !== rawFormData.confirmPassword) {
    return { error: "Passwords do not match!" };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        email: rawFormData.email,
        password: rawFormData.password,
        name: rawFormData.name,
      },
      headers: await headers(),
    });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    return { error: errorMessage };
  }

  redirect("/dashboard");
}
