import { useQuery } from "@tanstack/react-query";
import { getEquipmentsData } from "../api/index";
import { useState } from "react";

export default function useEquipmentsData(): {
  inventoryBookData: any | undefined;
  currentPage: number,
  locationId?: string,
  setCurrentPage: (page: number) =>void,
  setLocationId: (page: any) =>void,
  isLoading?: boolean;
} {

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [locationId, setLocationId] = useState<any>(null)


  const { data: inventoryBookData, isLoading } = useQuery({
    queryKey: ['EQUIPMENTS_DATA', currentPage, locationId],
    queryFn: async () => await getEquipmentsData(currentPage, locationId),
    retryOnMount: false
  });

  return {
    inventoryBookData,
    currentPage,
    setCurrentPage,
    locationId,
    setLocationId,
    isLoading,
  };
}
