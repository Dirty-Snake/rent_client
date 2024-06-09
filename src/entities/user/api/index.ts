import { IResponseApi } from "../../../api/types/IRequestApi";
import { api } from "../../../api/ApiWithoutToken";
import { apiToken } from "../../../api/ApiWithToken";

export const PreAuth = async (data: {username: string, password: string}): Promise<IResponseApi<any>> => {
  return await api.post("/auth/login", {username: data?.username, password: data.password});
};

//users crud
export async function getUserData(currentPage: number, limit: number){
  const response = await apiToken.get<any>(`/users?page=${currentPage}&limit=${limit}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response?.data;
}

export async function addUser(data: any){
  const response = await apiToken.post<any>(`/users`, data);
  if (response?.status !== 201) {
    throw new Error(response.data.message);
  }
  return response.data.data;
}

export async function deleteUser(id: string){
  const response = await apiToken.delete<any>(`/users/${id}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data.data;
}

export async function getUserById(id: any){
  const response = await apiToken.get<any>(`/users/${id?.queryKey?.[1]}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
}

export async function patchUser(data: any){
  const response = await apiToken.patch<any>(
    `/users/${data?.id}`,
    {
      ...data?.data
    }
  );
  if (response?.status !== 200) {
    // throw new Error(response.data.message);
  }
  return response.data;
}
