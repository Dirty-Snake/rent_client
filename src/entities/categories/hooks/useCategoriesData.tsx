import { useQuery } from "@tanstack/react-query";
import { getCategoriesData } from "../api/index";
import { useState } from "react";

export default function useCategoriesData(): {
  categoryData: any | undefined;
  currentPage: number,
  setCurrentPage: (page: number) =>void,
  setLimit: (page: number) =>void,
  isLoading?: boolean;
} {

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)

  const { data: categoryData, isLoading } = useQuery({
    queryKey: ['CATEGORIES_DATA', currentPage, limit],
    queryFn: async () => await getCategoriesData(currentPage, limit),
    retryOnMount: false
  });

  return {
    categoryData,
    currentPage,
    setCurrentPage,
    setLimit,
    isLoading,
  };
}
