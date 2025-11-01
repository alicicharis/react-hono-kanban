import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';

export const useBoard = (id: number) => {
  return useQuery({
    queryKey: ['board', id],
    queryFn: async () => {
      if (!id) return null;

      const response = await api['boards'][':id'].$get({
        param: { id: String(id) },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch board');
      }

      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id,
  });
};

export const useBoards = () => {
  return useQuery({
    queryKey: ['boards'],
    queryFn: async () => {
      const response = await api['boards'].$get();

      if (!response.ok) {
        throw new Error('Failed to fetch boards');
      }

      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      const response = await api['boards'].$post({ json: { name } });

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
    },
    onError: (error) => {
      console.error('Error creating board: ', error);
    },
  });
};
