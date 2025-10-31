import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const boards = pgTable('boards', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const insertBoardSchema = createInsertSchema(boards);
export const selectBoardSchema = createSelectSchema(boards);

export type SelectBoard = typeof boards.$inferSelect;
export type InsertBoard = typeof boards.$inferInsert;

export const columns = pgTable('columns', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  boardId: integer('board_id')
    .notNull()
    .references(() => boards.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type SelectColumn = typeof columns.$inferSelect;
export type InsertColumn = typeof columns.$inferInsert;

export const boardItems = pgTable('board_items', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  priority: text('priority').notNull(),
  columnId: integer('column_id')
    .notNull()
    .references(() => columns.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const boardItemSchema = createSelectSchema(boardItems);
export const insertBoardItemSchema = createInsertSchema(boardItems);

export type SelectBoardItem = typeof boardItems.$inferSelect;
export type InsertBoardItem = typeof boardItems.$inferInsert;
