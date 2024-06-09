import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../api/index";

export default function useUserDataByID(id: string): {
  locationDataById: any | undefined;
  isLoading: boolean;
}{

  const { data: userDataById, isLoading } = useQuery({
    queryKey: ['USER_DATA_BY_ID', id],
    queryFn: async(id: any) => await getUserById(id),
    retryOnMount: false
  });

  return {
    userDataById,
    isLoading
  };
}
