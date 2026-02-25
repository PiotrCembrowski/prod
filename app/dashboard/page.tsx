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

  const userTasks = await db.select().from(task).where(eq(task.userId, userId));

  const completedTasks = userTasks.filter((item) => item.completed);
  const completedCount = completedTasks.length;
  const totalXp = completedTasks.reduce((total, item) => total + item.xp, 0);
  const highPriorityCompleted = completedTasks.filter(
    (item) => item.priority >= 3,
  ).length;

  const achievements = [
    {
      id: 1,
      name: "First Victory",
      description: "Complete your first task",
      unlocked: completedCount >= 1,
      rarity: "common",
    },
    {
      id: 2,
      name: "Task Conqueror",
      description: "Complete 10 tasks",
      unlocked: completedCount >= 10,
      rarity: "rare",
    },
    {
      id: 3,
      name: "XP Hoarder",
      description: "Earn at least 100 XP from completed tasks",
      unlocked: totalXp >= 100,
      rarity: "epic",
    },
    {
      id: 4,
      name: "Elite Finisher",
      description: "Finish 5 high-priority tasks",
      unlocked: highPriorityCompleted >= 5,
      rarity: "legendary",
    },
  ] as const;

  return (
    <DashboardShell
      user={{ id: userId }}
      tasks={userTasks}
      achievements={achievements}
    />
  );
}
