import { apiToken } from "../../../api/ApiWithToken";

export async function getEquipmentsData(currentPage: number, category: string, teg: string, availability: string | null){

  let params = new URLSearchParams();

  if (category) {
    params.append("category_id", category);
  }

  if (teg) {
    params.append("tag_id", teg);
  }

  if (availability !== null) {
    params.append("availability", availability === 'yes' ? true : false as any);
  }

  let response;

  response = await apiToken.get<any>(`/equipments?page=${currentPage}&limit=10`, {
    params,
  });

  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response?.data;
}

export async function addEquipments(data: any){
  const response = await apiToken.post<any>(`/equipments`, data);
  if (response?.status !== 201) {
    throw new Error(response.data.message);
  }
  return response.data.data;
}

export async function startRent(data: any){
  const response = await apiToken.post<any>(`/equipments/${data?.id}/rent`, data?.data);
  if (response?.status !== 201) {
    throw new Error(response.data.message);
  }
  return response.data.data;
}

export async function endRent(data: any){
  const response = await apiToken.post<any>(`/equipments/${data?.id}/return`, data?.data);
  if (response?.status !== 201) {
    throw new Error(response.data.message);
  }
  return response.data.data;
}

export async function deleteEquipments(id: string){
  const response = await apiToken.delete<any>(`/equipments/${id}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data.data;
}

export async function geEquipmentsById(id: any){
  const response = await apiToken.get<any>(`/equipments/${id?.queryKey?.[1]}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
}

export async function patchEquipments(data: any){
  const response = await apiToken.patch<any>(
    `/equipments/${data?.id}`,
    {
      ...data?.data
    }
  );
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
}
