import { useQuery } from "@tanstack/react-query";
import { getTagById } from "../api/index";

export default function useTagDataByID(id: string): {
  locationDataById: any | undefined;
  isLoading: boolean;
}{

  const { data: locationDataById, isLoading } = useQuery({
    queryKey: ['TAG_DATA_BY_ID', id],
    queryFn: async(id: any) => await getTagById(id),
    retryOnMount: false
  });

  return {
    locationDataById,
    isLoading
  };
}
