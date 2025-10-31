import type { AppType } from '@react-hono-kanban/api';
import { hc } from 'hono/client';

const API_URL = 'http://localhost:3000';

export const apiClient = hc<AppType>(API_URL);
