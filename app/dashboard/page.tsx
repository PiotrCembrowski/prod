"use server";

import { db } from "@/lib/db";
import DashboardShell from "@/components/dashboard-tabs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { achievementDefinition, task } from "@/lib/schema";
import { eq } from "drizzle-orm";
import {
  buildAchievementsFromTasks,
  type AchievementDefinition,
} from "@/lib/achievements";

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

  const definitions = await db
    .select({
      id: achievementDefinition.id,
      name: achievementDefinition.name,
      description: achievementDefinition.description,
      rarity: achievementDefinition.rarity,
      ruleType: achievementDefinition.ruleType,
      threshold: achievementDefinition.threshold,
      priorityThreshold: achievementDefinition.priorityThreshold,
    })
    .from(achievementDefinition)
    .orderBy(achievementDefinition.id);

  const achievements = buildAchievementsFromTasks(
    userTasks,
    definitions as AchievementDefinition[],
  );

  return (
    <DashboardShell
      user={{ id: userId }}
      tasks={userTasks}
      achievements={achievements}
    />
  );
}
