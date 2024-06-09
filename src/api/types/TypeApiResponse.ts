export type TypeApiResponse = {
  success: boolean;
  code: string;
  data: { token: string } & Array<any>;
  errors: [];
  message: string;
};
