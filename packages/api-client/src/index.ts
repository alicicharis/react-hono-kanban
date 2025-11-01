import type { AppType } from '@react-hono-kanban/api';
import type {
  SelectColumn,
  SelectBoardItem,
} from '@react-hono-kanban/api/schema';
import { hc } from 'hono/client';

const API_URL = 'http://localhost:3000';

export const apiClient = hc<AppType>(API_URL);
export type { SelectColumn, SelectBoardItem };
