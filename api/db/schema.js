/**
 * database table schema, as the business object in database operations
 */

import {
  int,
  mysqlTable,
  bigint,
  varchar,
  serial,
} from "drizzle-orm/mysql-core";

/**
 * the user table
 */
export const users = mysqlTable("users", {
  id: serial("id").primaryKey().autoincrement(),
  username: varchar("username", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
});

/**
 * the focus records table
 */
export const records = mysqlTable("records", {
  id: serial("id").primaryKey().autoincrement(),
  task: varchar("task", { length: 255 }).notNull(),
  duration: int("duration").notNull(),
  timestamp: bigint("timestamp", { mode: "number", unsigned: true }).notNull(),
  owner: int("owner").references(() => users.id),
});
