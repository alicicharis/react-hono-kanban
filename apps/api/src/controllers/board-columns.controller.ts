import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { insertBoardColumnSchema } from '../db/schema';
import { boardColumnsService } from '../services/board-columns.service';

export const boardColumnsController = new Hono().post(
  '/',
  zValidator('json', insertBoardColumnSchema),
  async (c) => {
    const { title, boardId } = c.req.valid('json');
    const data = await boardColumnsService.create({ title, boardId });
    return c.json(data, 201);
  }
);
