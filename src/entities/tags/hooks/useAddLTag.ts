import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTag } from "../api/index";

export const useAddLTag = () => {

  const queryClient = useQueryClient();

  const { mutateAsync, ...options } = useMutation<any, Error, any>({
    mutationFn: addTag,
    onError: error => new Error(error?.message)
  });

  const handleAdd = useCallback(
    async(data: string) => {

      await mutateAsync(data);
      await queryClient?.invalidateQueries({ queryKey: ['TAG_DATA'] });
    },
    [mutateAsync]
  );

  return {
    handleAdd,
    ...options,
  };
};
