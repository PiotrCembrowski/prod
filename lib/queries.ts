"use server";
import sql from "@/lib/db";

export type Task = {
  id: number;
  title: string;
  description: string | null;
  xp: number;
  completed: number;
  created_at: string;
};

export async function getTasks(userId: string) {
  return sql`
    SELECT
      id,
      title AS name,
      description,
      xp AS points,
      completed,
      created_at AS "createdAt"
    FROM tasks
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;
}
