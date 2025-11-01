import { api } from '../lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateBoardColumn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      boardId,
      title,
    }: {
      boardId: number;
      title: string;
    }) => {
      const response = await api['board-columns'].$post({
        json: { title, boardId },
      });
      return response.json();
    },
    onSuccess: (_, { boardId }) => {
      console.log('Invalidating board: ', boardId);
      queryClient.invalidateQueries({ queryKey: ['board', boardId] });
    },
    onError: (error) => {
      console.error('Error creating board column: ', error);
    },
  });
};
