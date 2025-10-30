export type Priority = 'low' | 'medium' | 'high';

export type BoardItem = {
  id: string;
  title: string;
  priority: Priority;
  columnId: string;
};
