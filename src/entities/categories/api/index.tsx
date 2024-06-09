import { apiToken } from "../../../api/ApiWithToken";

export async function getCategoriesData(currentPage: number, limit: number){
  const response = await apiToken.get<any>(`/categories?page=${currentPage}&limit=${limit}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response?.data;
}

export async function addCategories(data: any){
  const response = await apiToken.post<any>(`/categories`, data);
  if (response?.status !== 201) {
    throw new Error(response.data.message);
  }
  return response.data.data;
}

export async function deleteCategories(id: string){
  const response = await apiToken.delete<any>(`/categories/${id}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data.data;
}

export async function getCategoriesById(id: any){
  const response = await apiToken.get<any>(`/categories/${id?.queryKey?.[1]}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
}

export async function patchCategories(data: any){
  const response = await apiToken.patch<any>(
    `/categories/${data?.id}`,
    {
      ...data?.data
    }
  );
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
}

