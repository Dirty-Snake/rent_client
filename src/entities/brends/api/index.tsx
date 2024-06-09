import { apiToken } from "../../../api/ApiWithToken";

export async function getBrandsData(currentPage: number, limit: number){
  const response = await apiToken.get<any>(`/items-brands?page=${currentPage}&limit=${limit}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response?.data;
}

export async function addBrand(data: any){
  const response = await apiToken.post<any>(`/items-brands`, data);
  if (response?.status !== 201) {
    throw new Error(response.data.message);
  }
  return response.data.data;
}

export async function deleteBrand(id: string){
  const response = await apiToken.delete<any>(`/items-brands/${id}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data.data;
}

export async function getBrandById(id: any){
  const response = await apiToken.get<any>(`/items-brands/${id?.queryKey?.[1]}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
}

export async function patchBrand(data: any){
  const response = await apiToken.patch<any>(
    `/items-brands/${data?.id}`,
    {
      ...data?.data
    }
  );
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
}

