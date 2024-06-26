import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEquipments } from "../api/index";
import { message } from "antd";

export const useAddEquipments = () => {

  const queryClient = useQueryClient();

  const { mutateAsync, ...options } = useMutation<any, Error, any>({
    mutationFn: addEquipments,
    onError: error => new Error(error?.message)
  });

  const handleAdd = useCallback(
    async(data: string) => {
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
