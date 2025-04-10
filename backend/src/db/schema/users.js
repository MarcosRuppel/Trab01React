import { mysqlTable, int, varchar, timestamp } from "drizzle-orm/mysql-core";

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  avatar: varchar('avatar', { length: 255 }),
  role: varchar('role', { length: 255 }).notNull().default('user'),
  status: varchar('status', { length: 255 }).notNull().default('active'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});
