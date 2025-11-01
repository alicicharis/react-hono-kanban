import { asc, eq } from 'drizzle-orm';
import { db } from '../db/index';
import { boardItems, columns, boards, InsertBoard } from '../db/schema';

export const boardsRepository = {
  getById: async (id: number) => {
    const data = await db
      .select({
        id: boards.id,
        name: boards.name,
        column: columns,
        item: boardItems,
      })
      .from(boards)
      .where(eq(boards.id, id))
      .leftJoin(columns, eq(boards.id, columns.boardId))
      .leftJoin(boardItems, eq(columns.id, boardItems.columnId))
      .orderBy(asc(columns.createdAt));

    if (data.length === 0) {
      return null;
    }

    return data;
  },
  getAll: async () => {
    return db.select().from(boards).orderBy(asc(boards.createdAt));
  },
  create: async (data: InsertBoard) => {
    return db.insert(boards).values(data).returning();
  },
};
