import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { boardItemsController } from './controllers/board-items.controller';
import { boardsController } from './controllers/boards.controller';
import { boardColumnsController } from './controllers/board-columns.controller';

const app = new Hono()
  .use('*', cors())
  .get('/', (c) => c.text('Hello Hono!'))
  .get('/health', (c) => c.json({ status: 'ok' }))
  .route('/boards', boardsController)
  .route('/board-items', boardItemsController)
  .route('/board-columns', boardColumnsController);

export type AppType = typeof app;

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
