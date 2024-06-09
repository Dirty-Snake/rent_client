import { useQuery } from "@tanstack/react-query";
import { getLocationById } from "../api/index";

export default function useLocationDataByID(id: string): {
  locationDataById: any | undefined;
  isLoading: boolean;
}{

  const { data: locationDataById, isLoading } = useQuery({
    queryKey: ['LOCATION_DATA_BY_ID', id],
    queryFn: async(id: any) => await getLocationById(id),
    retryOnMount: false
  });

  return {
    locationDataById,
    isLoading
  };
}
