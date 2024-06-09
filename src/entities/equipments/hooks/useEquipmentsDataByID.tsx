import { useQuery } from "@tanstack/react-query";
import { geEquipmentsById } from "../api/index";

export default function useEquipmentsDataByID(id: string): {
  equipmentsDataById: any | undefined;
  isLoading: boolean;
  isPending: boolean;
}{

  const { data: equipmentsDataById, isLoading, isPending } = useQuery({
    queryKey: ['EQUIPMENTS_DATA_BY_ID', id],
    queryFn: async(id: any) => await geEquipmentsById(id),
    retryOnMount: false
  });

  return {
    equipmentsDataById,
    isLoading,
    isPending
  };
}
