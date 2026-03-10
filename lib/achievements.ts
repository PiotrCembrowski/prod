export type AchievementRarity = "common" | "rare" | "epic" | "legendary";

export type AchievementRuleType =
  | "completed_count"
  | "total_xp"
  | "high_priority_completed";

export type AchievementDefinition = {
  id: number;
  name: string;
  description: string;
  rarity: AchievementRarity;
  ruleType: AchievementRuleType;
  threshold: number;
  priorityThreshold?: number | null;
};

export type Achievement = {
  id: number;
  name: string;
  description: string;
  unlocked: boolean;
  rarity: AchievementRarity;
};

export type AchievementTask = {
  completed: boolean;
  xp: number;
  priority?: number;
};

function evaluateAchievement(
  definition: AchievementDefinition,
  stats: {
    completedCount: number;
    totalXp: number;
    highPriorityCompletedByThreshold: Record<number, number>;
  },
): boolean {
  switch (definition.ruleType) {
    case "completed_count":
      return stats.completedCount >= definition.threshold;
    case "total_xp":
      return stats.totalXp >= definition.threshold;
    case "high_priority_completed": {
      const requiredPriority = definition.priorityThreshold ?? 3;
      return (
        (stats.highPriorityCompletedByThreshold[requiredPriority] ?? 0) >=
        definition.threshold
      );
    }
    default:
      return false;
  }
}

export function buildAchievementsFromTasks(
  tasks: AchievementTask[],
  definitions: AchievementDefinition[],
): Achievement[] {
  const completedTasks = tasks.filter((task) => task.completed);

  const priorityLevels = new Set<number>(
    definitions
      .map((definition) => definition.priorityThreshold)
      .filter((value): value is number => typeof value === "number"),
  );

  if (priorityLevels.size === 0) {
    priorityLevels.add(3);
  }

  const highPriorityCompletedByThreshold = Object.fromEntries(
    Array.from(priorityLevels).map((priorityThreshold) => [
      priorityThreshold,
      completedTasks.filter((task) => (task.priority ?? 0) >= priorityThreshold)
        .length,
    ]),
  ) as Record<number, number>;

  const stats = {
    completedCount: completedTasks.length,
    totalXp: completedTasks.reduce((total, task) => total + task.xp, 0),
    highPriorityCompletedByThreshold,
  };

  return definitions.map((definition) => ({
    id: definition.id,
    name: definition.name,
    description: definition.description,
    rarity: definition.rarity,
    unlocked: evaluateAchievement(definition, stats),
  }));
}
