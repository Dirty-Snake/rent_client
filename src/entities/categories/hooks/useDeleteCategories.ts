import {useCallback} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategories } from "../api/index";

export const useDeleteCategories = () => {

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation<any, Error, string>({
    mutationFn: deleteCategories,
    onError: error => new Error(error?.message)
  });

  const handleDelete = useCallback(
    async (id: string) => {

      await mutateAsync(id);
      await queryClient.invalidateQueries({ queryKey: ['CATEGORIES_DATA'] });
    },
    [mutateAsync]
  );

  return {
    handleDelete,
    isLoading: isPending
  };
};
