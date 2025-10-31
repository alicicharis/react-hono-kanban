import { db } from '../db/index.js';
import { boardItems, InsertBoardItem } from '../db/schema.js';
import { desc } from 'drizzle-orm';
import { eq } from 'drizzle-orm';

export const boardItemRepository = {
  getById: async (id: number) => {
    return db.select().from(boardItems).where(eq(boardItems.id, id)).limit(1);
  },
  getAll: async () => {
    return db.select().from(boardItems).orderBy(desc(boardItems.createdAt));
  },
  create: async (data: InsertBoardItem) => {
    return db.insert(boardItems).values(data).returning();
  },
};
