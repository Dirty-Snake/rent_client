import {useCallback} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../api/index";

export const useDeleteUser = () => {

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation<any, Error, any>({
    mutationFn: deleteUser,
    onError: error => new Error(error?.message)
  });

  const handleDelete = useCallback(
    async (id: string) => {

      await mutateAsync(id);
      await queryClient.invalidateQueries({ queryKey: ['USER_DATA'] });
    },
    [mutateAsync]
  );

  return {
    handleDelete,
    isLoading: isPending,
  };
};
