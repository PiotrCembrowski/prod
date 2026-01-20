"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { LoginState } from "@/lib/types";

export async function loginKnight(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
    });
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Login failed",
    };
  }

  redirect("/dashboard");
}

export async function logOutKnight() {
  await auth.api.signOut({
    headers: await headers(),
  });

  console.log("User logged out");

  redirect("/");
}
