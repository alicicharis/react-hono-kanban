import { Hono } from 'hono';
import { boardItemsService } from '../services/board-items.service';
import { zValidator } from '@hono/zod-validator';
import { insertBoardItemSchema } from '../db/schema';

export const boardItemsController = new Hono()
  .get('/', async (c) => {
    const data = await boardItemsService.getAll();
    return c.json(data);
  })
  .get('/:id', async (c) => {
    const { id } = c.req.param();

    const idNumber = parseInt(id);
    if (isNaN(idNumber)) {
      return c.json({ error: 'Invalid ID' }, 400);
    }

    const data = await boardItemsService.getById(idNumber);
    return c.json(data);
  })
  .post('/', zValidator('json', insertBoardItemSchema), async (c) => {
    const { title, priority, columnId } = c.req.valid('json');

    const data = await boardItemsService.create({ title, priority, columnId });
    return c.json(data, 201);
  });
