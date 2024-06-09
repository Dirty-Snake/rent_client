import { IResponseApi } from "../../../api/types/IRequestApi";
import { api } from "../../../api/ApiWithoutToken";
import { apiToken } from "../../../api/ApiWithToken";

export const PreAuth = async (data: {username: string, password: string}): Promise<IResponseApi<any>> => {
  return await api.post("/auth/login", {username: data?.username, password: data.password});
};


export async function getUserData(currentPage: number){
  const response = await apiToken.get<any>(`/users?page=${currentPage}&limit=10`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response?.data;
}
