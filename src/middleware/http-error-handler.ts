import { message } from "antd";

export const HttpErrorHandler = (error: any) => {
  message.error(error.message)
};
