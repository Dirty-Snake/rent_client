import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchBrand } from "../api/index";
import { useCallback } from "react";

export default function useUpdateBrand(): {
  handleUpdate: (id: string, value: any) => void;
  isPending: boolean,
  isSuccess: boolean,
}{

  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isSuccess } = useMutation<any, Error, any>({
    mutationFn: patchBrand,
    onError: error => new Error(error?.message)
  });

  const handleUpdate = useCallback(
    async(id: any, data: any) => {

      const dataToSend = { id, data }
      await mutateAsync(dataToSend);
      await queryClient.invalidateQueries({ queryKey: ['BRAND_DATA_BY_ID', id] });
      await queryClient.invalidateQueries({ queryKey: ['BRANDS_DATA'] });
    },
    [mutateAsync]
  );

  return {
    handleUpdate,
    isPending,
    isSuccess,
  };
}
