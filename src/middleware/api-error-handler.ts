import { AxiosResponse } from "axios";

export const ApiErrorHandler = (response: AxiosResponse) => {
  if (response.status === 403) {

    return response;
  }
  return response;
};
