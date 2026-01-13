"use server";

import { sql } from "@/lib/db";
import DashboardShell from "@/components/dashboard-tabs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const tasks = await sql`
    SELECT id, title, description, xp, completed
    FROM tasks
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;

  return <DashboardShell user={{ id: userId }} tasks={tasks} />;
}
