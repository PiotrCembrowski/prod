"use server";

import db from "@/lib/db";

export type Task = {
  id: number;
  title: string;
  description: string | null;
  xp: number;
  completed: number;
  created_at: string;
};

export async function getTasksForUser(userId: string) {
  return db
    .prepare(
      `
      SELECT
        id,
        title,
        description,
        xp,
        completed,
        created_at
      FROM tasks
      WHERE user_id = ?
      ORDER BY created_at DESC
    `
    )
    .all(userId) as Task[];
}
