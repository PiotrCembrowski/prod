import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/* =====================
   USER
===================== */
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified", { mode: "boolean" }).default(false),
  image: text("image"),
  createdAt: integer("createdAt", { mode: "timestamp" }).defaultNow(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).defaultNow(),
});

/* =====================
   SESSION (REQUIRED BY BETTER AUTH)
===================== */
export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  token: text("token").notNull().unique(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),

  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),

  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
});

/* =====================
   ACCOUNT (REQUIRED BY BETTER AUTH)
===================== */
export const account = sqliteTable("account", {
  id: text("id").primaryKey(),

  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  providerId: text("providerId").notNull(),
  accountId: text("accountId").notNull(),

  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),

  accessTokenExpiresAt: integer("accessTokenExpiresAt", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refreshTokenExpiresAt", {
    mode: "timestamp",
  }),

  scope: text("scope"),
  password: text("password"),

  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

/* =====================
   VERIFICATION (REQUIRED BY BETTER AUTH)
===================== */
export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }),
  updatedAt: integer("updatedAt", { mode: "timestamp" }),
});

/* =====================
   TASKS (APP-SPECIFIC)
===================== */
export const task = sqliteTable("tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  dayId: integer("day_id"),
  title: text("title").notNull(),
  description: text("description"),
  xp: integer("xp").notNull(),
  completed: integer("completed", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).defaultNow(),
});

/* =====================
   SCHEMA EXPORT (CRITICAL)
===================== */
export const schema = {
  user,
  session,
  account,
  verification,
  task,
};
