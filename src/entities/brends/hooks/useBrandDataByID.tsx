import { useQuery } from "@tanstack/react-query";
import { getBrandById } from "../api/index";

export default function useBrandDataByID(id: string): {
  brandDataById: any | undefined;
  isLoading: boolean;
}{

  const { data: brandDataById, isLoading } = useQuery({
    queryKey: ['BRAND_DATA_BY_ID', id],
    queryFn: async(id: any) => await getBrandById(id),
    retryOnMount: false
  });

  return {
    brandDataById,
    isLoading
  };
}
