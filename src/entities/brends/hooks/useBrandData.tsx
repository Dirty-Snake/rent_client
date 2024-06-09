import { useQuery } from "@tanstack/react-query";
import { getBrandsData } from "../api/index";
import { useState } from "react";

export default function useBrandData(): {
  brandsData: any | undefined;
  currentPage: number,
  setCurrentPage: (page: number) =>void,
  setLimit: (page: number) =>void,
  isLoading?: boolean;
} {

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)

  const { data: brandsData, isLoading } = useQuery({
    queryKey: ['BRANDS_DATA', currentPage, limit],
    queryFn: async () => await getBrandsData(currentPage, limit),
    retryOnMount: false
  });

  return {
    brandsData,
    currentPage,
    setCurrentPage,
    setLimit,
    isLoading,
  };
}
