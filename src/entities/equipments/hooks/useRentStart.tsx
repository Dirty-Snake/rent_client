import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startRent } from "../api/index";
import { message } from "antd";

export const useRentStart = () => {

  const queryClient = useQueryClient();

  const { mutateAsync, ...options } = useMutation<any, Error, any>({
    mutationFn: startRent,
    onError: error => new Error(error?.message)
  });

  const handleAdd = useCallback(
    async(data: any) => {
      try {
        await mutateAsync(data);
        await queryClient?.invalidateQueries({ queryKey: ['EQUIPMENTS_DATA'] });
      } catch (e: any) {
        message.error(e?.message)
      }
    },
    [mutateAsync]
  );

  return {
    handleAdd,
    ...options,
  };
};
