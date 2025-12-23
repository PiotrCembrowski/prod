"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers"; // <--- Import this

export type ActionState = {
  error?: string | null;
};

export async function loginKnight(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const rawFormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    await auth.api.signInEmail({
      body: {
        email: rawFormData.email,
        password: rawFormData.password,
      },
      // CRITICAL: Pass headers so the cookie gets set in the browser
      headers: await headers(),
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Login failed";
    return { error: errorMessage };
  }

  // If we get here, login succeeded and cookie is set
  redirect("/dashboard");
}
