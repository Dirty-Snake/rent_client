import { apiToken } from "../../../api/ApiWithToken";

export async function getHistoryData(currentPage: number, limit: number){
  const response = await apiToken.get<any>(`/histories?page=${currentPage}&limit=${limit}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response?.data;
}

