import { AxiosRequestConfig } from 'axios';

export type StandardResponse<D = object> = {
  code: number;
  message: string;
  data: D;
};

export type CustomConfig<D = object> = AxiosRequestConfig<D> & {
  closeAutoErrorTip: boolean; // 是否关闭自动异常提示
};
