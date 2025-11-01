import { InsertBoardItem } from '../db/schema.js';
import { boardItemsRepository } from '../repositories/board-items.repository.js';

export const boardItemsService = {
  getById: async (id: number) => {
    return boardItemsRepository.getById(id);
  },
  getAll: async () => {
    return boardItemsRepository.getAll();
  },
  create: async (payload: InsertBoardItem) => {
    return boardItemsRepository.create(payload);
  },
};
