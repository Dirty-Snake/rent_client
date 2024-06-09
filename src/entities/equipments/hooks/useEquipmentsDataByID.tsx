import { useQuery } from "@tanstack/react-query";
import { geEquipmentsById } from "../api/index";

export default function useEquipmentsDataByID(id: string): {
  locationDataById: any | undefined;
  isLoading: boolean;
  isPending: boolean;
}{

  const { data: locationDataById, isLoading, isPending } = useQuery({
    queryKey: ['EQUIPMENTS_DATA_BY_ID', id],
    queryFn: async(id: any) => await geEquipmentsById(id),
    retryOnMount: false
  });

  return {
    locationDataById,
    isLoading,
    isPending
  };
}
