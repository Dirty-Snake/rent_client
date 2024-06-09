import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { patchUser } from "../api/index";

export default function useUpdateUser(): {
  handleUpdate: (id: string, value: any) => void;
  isPending: boolean,
  isSuccess: boolean,
}{

  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isSuccess } = useMutation<any, Error, any>({
    mutationFn: patchUser,
    onError: error => new Error(error?.message)
  });

  const handleUpdate = useCallback(
    async(id: any, data: any) => {

      const dataToSend = { id, data }
      await mutateAsync(dataToSend);
      await queryClient.invalidateQueries({ queryKey: ['USER_BY_ID', id] });
      await queryClient.invalidateQueries({ queryKey: ['USER_DATA'] });
    },
    [mutateAsync]
  );

  return {
    handleUpdate,
    isPending,
    isSuccess,
  };
}
