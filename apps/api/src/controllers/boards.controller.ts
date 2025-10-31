import { Hono } from 'hono';
import { boardsService } from '../services/boards.service';
import { zValidator } from '@hono/zod-validator';
import { insertBoardSchema } from '../db/schema';

export const boardsController = new Hono()
  .get('/', async (c) => {
    const data = await boardsService.getAll();
    return c.json(data);
  })
  .get('/:id', async (c) => {
    const { id } = c.req.param();

    const idNumber = parseInt(id);
    if (isNaN(idNumber)) {
      return c.json({ error: 'Invalid ID' }, 400);
    }

    const data = await boardsService.getById(idNumber);
    return c.json(data);
  })
  .post('/', zValidator('json', insertBoardSchema), async (c) => {
    const { name } = c.req.valid('json');
    const data = await boardsService.create({ name });
    return c.json(data, 201);
  });
