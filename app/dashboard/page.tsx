"use server";

import { db } from "@/lib/db";
import DashboardShell from "@/components/dashboard-tabs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { task } from "@/lib/schema";
import { and, eq, gte, lt } from "drizzle-orm";

export default async function DashboardPage() {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

  const userTasks = await db.select().from(task).where(eq(task.userId, userId));
  const todayTasks = await db
    .select({
      id: task.id,
      title: task.title,
      description: task.description,
      xp: task.xp,
      completed: task.completed,
    })
    .from(task)
    .where(
      and(
        eq(task.userId, userId),
        gte(task.createdAt, startOfToday),
        lt(task.createdAt, startOfTomorrow),
      ),
    );

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
      tasks={todayTasks}
      achievements={achievements}
    />
  );
}
