import { apiToken } from "../../../api/ApiWithToken";

export async function getEquipmentsData(currentPage: number, locationId: string){

  let response;
  if (locationId) {
    response = await apiToken.get<any>(`/equipments?page=${currentPage}&limit=10&location_id=${locationId}`);
  } else {
    response = await apiToken.get<any>(`/equipments?page=${currentPage}&limit=10`);
  }

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
