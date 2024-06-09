import { apiToken } from "../../../api/ApiWithToken";

export async function getTagData(currentPage: number, limit: number){
  const response = await apiToken.get<any>(`/tags?page=${currentPage}&limit=${limit}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response?.data;
}

export async function addTag(data: any){
  const response = await apiToken.post<any>(`/tags`, data);
  if (response?.status !== 201) {
    throw new Error(response.data.message);
  }
  return response.data.data;
}

export async function deleteTag(id: string){
  const response = await apiToken.delete<any>(`/tags/${id}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data.data;
}

export async function getTagById(id: any){
  const response = await apiToken.get<any>(`/tags/${id?.queryKey?.[1]}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
}

export async function patchTag(data: any){
  const response = await apiToken.patch<any>(
    `/tags/${data?.id}`,
    {
      ...data?.data
    }
  );
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
}

