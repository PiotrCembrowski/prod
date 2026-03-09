"use server";

import { db } from "@/lib/db";
import DashboardShell from "@/components/dashboard-tabs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { task } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default async function DashboardPage() {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;
  const rawTasks = await db
    .select({
      id: task.id,
      title: task.title,
      description: task.description,
      xp: task.xp,
      completed: task.completed,
      priority: task.priority,
    })
    .from(task)
    .where(eq(task.userId, userId));

  const userTasks = rawTasks.map((entry) => ({
    ...entry,
    completed: Boolean(entry.completed),
  }));

  return <DashboardShell user={{ id: userId }} tasks={userTasks} />;
}
