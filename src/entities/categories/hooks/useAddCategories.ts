import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategories } from "../api/index";

export const useAddCategories = () => {

  const queryClient = useQueryClient();

  const { mutateAsync, ...options } = useMutation<any, Error, any>({
    mutationFn: addCategories,
    onError: error => new Error(error?.message)
  });

  const handleAdd = useCallback(
    async(data: string) => {

      await mutateAsync(data);
      await queryClient?.invalidateQueries({ queryKey: ['CATEGORIES_DATA'] });
    },
    [mutateAsync]
  );

  return {
    handleAdd,
    ...options,
  };
};
