import { InsertBoardItem } from '../db/schema.js';
import { boardItemRepository } from '../repositories/board-items.repository.js';

export const boardItemService = {
  getById: async (id: number) => {
    return boardItemRepository.getById(id);
  },
  getAll: async () => {
    return boardItemRepository.getAll();
  },
  create: async (payload: InsertBoardItem) => {
    return boardItemRepository.create(payload);
  },
};
