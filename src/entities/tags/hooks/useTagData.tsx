import { useQuery } from "@tanstack/react-query";
import { getTagData } from "../api/index";
import { useState } from "react";

export default function useTagData(): {
  tagData: any | undefined;
  currentPage: number,
  setCurrentPage: (page: number) =>void,
  setLimit: (page: number) =>void,
  isLoading?: boolean;
} {

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)

  const { data: tagData, isLoading } = useQuery({
    queryKey: ['TAG_DATA', currentPage, limit],
    queryFn: async () => await getTagData(currentPage, limit),
    retryOnMount: false
  });

  return {
    tagData,
    currentPage,
    setCurrentPage,
    setLimit,
    isLoading,
  };
}
