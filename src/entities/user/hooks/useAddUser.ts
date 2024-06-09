import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "../api/index";

export const useAddUser = () => {

  const queryClient = useQueryClient();

  const { mutateAsync, ...options } = useMutation<any, Error, any>({
    mutationFn: addUser,
    onError: error => new Error(error?.message)
  });

  const handleAdd = useCallback(
    async(data: string) => {

      await mutateAsync(data);
      await queryClient?.invalidateQueries({ queryKey: ['USER_DATA'] });
    },
    [mutateAsync]
  );

  return {
    handleAdd,
    ...options,
  };
};
