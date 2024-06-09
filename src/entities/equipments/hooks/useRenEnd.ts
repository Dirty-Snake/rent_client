import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { endRent } from "../api/index";
import { message } from "antd";

export const useRenEnd = () => {

  const queryClient = useQueryClient();

  const { mutateAsync, ...options } = useMutation<any, Error, any>({
    mutationFn: endRent,
    onError: error => new Error(error?.message)
  });

  const handleAdd = useCallback(
    async(data: any) => {
      try {
        await mutateAsync(data);
        await queryClient?.invalidateQueries({ queryKey: ['EQUIPMENTS_DATA'] });
      } catch (e: any) {
        message.error(e?.message as string)
      }
    },
    [mutateAsync]
  );

  return {
    handleAdd,
    ...options,
  };
};
