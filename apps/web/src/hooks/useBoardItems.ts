import { api } from '../lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateBoardItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      priority,
      columnId,
    }: {
      boardId: number;
      title: string;
      priority: string;
      columnId: number;
    }) => {
      const response = await api['board-items'].$post({
        json: { title, priority, columnId },
      });
      return response.json();
    },
    onSuccess: (_, { boardId }) => {
      queryClient.invalidateQueries({ queryKey: ['board', boardId] });
    },
    onError: (error) => {
      console.error('Error creating board item: ', error);
    },
  });
};
