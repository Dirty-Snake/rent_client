import { useQuery } from "@tanstack/react-query";
import { getCategoriesById } from "../api/index";

export default function useCategoriesDataByID(id: string): {
  categoryById: any | undefined;
  isLoading: boolean;
}{

  const { data: categoryById, isLoading } = useQuery({
    queryKey: ['CATEGORIES_DATA_BY_ID', id],
    queryFn: async(id: any) => await getCategoriesById(id),
    retryOnMount: false
  });

  return {
    categoryById,
    isLoading
  };
}
