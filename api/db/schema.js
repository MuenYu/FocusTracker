import {
  int,
  mysqlTable,
  timestamp,
  varchar,
  serial,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey().autoincrement(),
  username: varchar("username", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
});

export const records = mysqlTable("records", {
  id: serial("id").primaryKey().autoincrement(),
  task: varchar("task", { length: 255 }).notNull(),
  duration: int("duration").notNull(),
  timestamp: timestamp("timestamp").notNull(),
  owner: int("owner").references(() => users.id),
});
