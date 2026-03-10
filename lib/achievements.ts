export type AchievementRarity = "common" | "rare" | "epic" | "legendary";

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

export function buildAchievementsFromTasks(tasks: AchievementTask[]): Achievement[] {
  const completedTasks = tasks.filter((task) => task.completed);
  const completedCount = completedTasks.length;
  const totalXp = completedTasks.reduce((total, task) => total + task.xp, 0);
  const highPriorityCompleted = completedTasks.filter(
    (task) => (task.priority ?? 0) >= 3,
  ).length;

  return [
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
  ];
}
