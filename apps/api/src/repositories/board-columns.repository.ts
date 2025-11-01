import { db } from '../db/index.js';
import { columns, InsertBoardColumn } from '../db/schema.js';

export const boardColumnsRepository = {
  create: async (data: InsertBoardColumn) => {
    return db.insert(columns).values(data).returning();
  },
};
