import { desc, eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { boards, InsertBoard } from '../db/schema.js';

export const boardsRepository = {
  getById: async (id: number) => {
    return db.select().from(boards).where(eq(boards.id, id)).limit(1);
  },
  getAll: async () => {
    return db.select().from(boards).orderBy(desc(boards.createdAt));
  },
  create: async (data: InsertBoard) => {
    return db.insert(boards).values(data).returning();
  },
};
