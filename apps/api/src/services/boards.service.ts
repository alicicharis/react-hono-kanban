import { InsertBoard } from '../db/schema';
import { boardsRepository } from '../repositories/boards.repository';

export const boardsService = {
  getById: async (id: number) => {
    return boardsRepository.getById(id);
  },
  getAll: async () => {
    return boardsRepository.getAll();
  },
  create: async (payload: InsertBoard) => {
    return boardsRepository.create(payload);
  },
};
