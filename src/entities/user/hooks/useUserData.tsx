import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../api/index";
import { useState } from "react";

export default function useUserData(): {
  userData: any | undefined;
  currentPage: number,
  limit: number,
  setLimit: (limit: number) =>void,
  setCurrentPage: (page: number) =>void,
  isLoading?: boolean;
} {

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)

  const { data: userData, isLoading } = useQuery({
    queryKey: ['USER_DATA', currentPage],
    queryFn: async () => await getUserData(currentPage, limit),
    retryOnMount: false
  });

  return {
    userData,
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
    isLoading,
  };
}
