"use server";

import { db } from "@/lib/db";
import DashboardShell from "@/components/dashboard-tabs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { schema } from "@/lib/schema";
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
      id: schema.task.id,
      title: schema.task.title,
      description: schema.task.description,
      xp: schema.task.xp,
      completed: schema.task.completed,
      priority: schema.task.priority,
    })
    .from(schema.task)
    .where(eq(schema.task.userId, userId));

  const userTasks = rawTasks.map((entry) => ({
    ...entry,
    completed: Boolean(entry.completed),
  }));

  const definitions = await db
    .select({
      id: schema.achievementDefinition.id,
      name: schema.achievementDefinition.name,
      description: schema.achievementDefinition.description,
      rarity: schema.achievementDefinition.rarity,
      ruleType: schema.achievementDefinition.ruleType,
      threshold: schema.achievementDefinition.threshold,
      priorityThreshold: schema.achievementDefinition.priorityThreshold,
    })
    .from(schema.achievementDefinition)
    .orderBy(schema.achievementDefinition.id);

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
