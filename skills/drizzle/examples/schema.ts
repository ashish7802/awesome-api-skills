import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});