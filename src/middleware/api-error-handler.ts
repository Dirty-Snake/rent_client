import { AxiosResponse } from "axios";
import { message } from "antd";

export const ApiErrorHandler = (response: AxiosResponse) => {
  message.error(response?.data?.message)

  if (response.status === 403) {
    return response;
  }
  return response;
};
