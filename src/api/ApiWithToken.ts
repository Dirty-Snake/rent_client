import axios from "axios";
import { $user, setUser } from "../entities/user/model/index";
import { api } from "./ApiWithoutToken";

const apiToken = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  headers: {
    "Cache-Control": "no-cache",
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
    Accept: 'application/json',
    Cache: "no-cache",
    withCredentials: false,
  },
  timeout: 10000,
  withCredentials: true,
  timeoutErrorMessage: "Превышено время ожидания ответа от сервера",
  validateStatus: function (status){
    return (
      (status >= 200 && status < 300) ||
      status === 422 ||
      status === 400 ||
      status === 500
    );
  },
});


apiToken.interceptors.request.use(
  async(config: any) => {
    config.headers.Authorization = `Bearer ${$user.getState()?.accessToken}`;
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

apiToken.interceptors.response.use((response: any) => {
  return response
}, async function (error: any){
  const originalRequest = error.config;
  console.log(error.response.status)
  if (error.response.status === 401) {
    const user: any = await api.post<any>('/auth/refresh-token');
    await setUser(user?.data)
    axios.defaults.headers.common['Authorization'] = `Bearer ${user?.data?.accessToken}`;
    return apiToken(originalRequest as any);
  }
  return Promise.reject(error);
});


export { apiToken };
