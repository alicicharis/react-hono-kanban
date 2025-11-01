import { InsertBoard, boardItems, columns } from '../db/schema';
import { boardsRepository } from '../repositories/boards.repository';

export const boardsService = {
  getById: async (id: number) => {
    const rows = await boardsRepository.getById(id);

    if (!rows) {
      return null;
    }

    const processedBoard = processBoard(rows);

    return processedBoard;
  },
  getAll: async () => {
    return boardsRepository.getAll();
  },
  create: async (payload: InsertBoard) => {
    return boardsRepository.create(payload);
  },
};

function processBoard(
  rows: {
    id: number;
    name: string;
    column: typeof columns.$inferSelect | null;
    item: typeof boardItems.$inferSelect | null;
  }[]
) {
  const board = {
    id: rows[0].id,
    name: rows[0].name,
  };

  const columnsMap = new Map<
    number,
    typeof columns.$inferSelect & {
      items: (typeof boardItems.$inferSelect)[];
    }
  >();
  const itemsSet = new Set<number>();

  for (const row of rows) {
    if (row.column && !columnsMap.has(row.column.id)) {
      columnsMap.set(row.column.id, { ...row.column, items: [] });
    }

    if (row.item && !itemsSet.has(row.item.id)) {
      itemsSet.add(row.item.id);
      const columnId = row.item.columnId;
      if (columnId && columnsMap.has(columnId)) {
        columnsMap.get(columnId)!.items.push(row.item);
      }
    }
  }

  return {
    ...board,
    columns: Array.from(columnsMap.values()),
  };
}
