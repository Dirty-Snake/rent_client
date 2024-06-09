import { useQuery } from "@tanstack/react-query";
import { getHistoryData } from "../api/index";
import { useState } from "react";

export default function useHistoryData(): {
  historyData: any | undefined;
  currentPage: number,
  setCurrentPage: (page: number) =>void,
  setLimit: (page: number) =>void,
  isLoading?: boolean;
} {

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)

  const { data: historyData, isLoading } = useQuery({
    queryKey: ['HISTORY_DATA', currentPage, limit],
    queryFn: async () => await getHistoryData(currentPage, limit),
    retryOnMount: false
  });

  return {
    historyData,
    currentPage,
    setCurrentPage,
    setLimit,
    isLoading,
  };
}
