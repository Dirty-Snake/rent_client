import { useQuery } from "@tanstack/react-query";
import { getEquipmentsData } from "../api/index";
import { useState } from "react";

export default function useEquipmentsData(): {
  inventoryBookData: any | undefined;
  currentPage: number,
  categoryId?: string,
  tegId?: string,
  setCurrentPage: (page: number) => void,
  setCategoryId: (id: any) =>void,
  setTegId: (id: any) =>void,
  isLoading?: boolean;
  availability?: boolean | null;
  setAvailability: (flag: boolean) =>void,
} {

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [categoryId, setCategoryId] = useState<any>(null)
  const [tegId, setTegId] = useState<any>(null)
  const [availability, setAvailability] = useState<any>(null)


  const { data: inventoryBookData, isLoading } = useQuery({
    queryKey: ['EQUIPMENTS_DATA', currentPage, categoryId, tegId,availability],
    queryFn: async () => await getEquipmentsData(currentPage, categoryId, tegId,availability),
    retryOnMount: false
  });

  return {
    inventoryBookData,
    currentPage,
    setCurrentPage,
    categoryId,
    tegId,
    setCategoryId,
    setTegId,
    availability,
    setAvailability,
    isLoading,
  };
}
