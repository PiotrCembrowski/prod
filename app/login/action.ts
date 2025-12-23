"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers, cookies } from "next/headers";

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

  console.log(
    "Attempting to log in user:",
    rawFormData.email,
    rawFormData.password
  );

  try {
    const response = await auth.api.signInEmail({
      body: {
        email: rawFormData.email,
        password: rawFormData.password,
      },
      headers: await headers(),
    });

    if (response?.token) {
      const cookieStore = await cookies();

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      cookieStore.set("better-auth.session_token", response.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: expiresAt,
      });
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Login failed";
    return { error: errorMessage };
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
