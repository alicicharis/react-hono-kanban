import { InsertBoardColumn } from '../db/schema.js';
import { boardColumnsRepository } from '../repositories/board-columns.repository.js';

export const boardColumnsService = {
  create: async (payload: InsertBoardColumn) => {
    return boardColumnsRepository.create(payload);
  },
};
