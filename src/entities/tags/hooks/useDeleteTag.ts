import {useCallback} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTag } from "../api/index";

export const useDeleteTag = () => {

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation<any, Error, any>({
    mutationFn: deleteTag,
    onError: error => new Error(error?.message)
  });

  const handleDelete = useCallback(
    async (id: string) => {

      await mutateAsync(id);
      await queryClient.invalidateQueries({ queryKey: ['TAG_DATA'] });
    },
    [mutateAsync]
  );

  return {
    handleDelete,
    isLoading: isPending,
  };
};
