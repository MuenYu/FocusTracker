import {
  int,
  mysqlTable,
  date,
  varchar,
  serial,
  text,
  primaryKey,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey().autoincrement(),
  username: varchar("username", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
});
