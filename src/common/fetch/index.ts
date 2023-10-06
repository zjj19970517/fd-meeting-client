import { AxiosRequestConfig } from 'axios';

import service from '@/common/fetch/service';

export function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return service.get(url, config);
}

export function post<T>(
  url: string,
  data?: object,
  config?: AxiosRequestConfig
): Promise<T> {
  return service.post(url, data, config);
}

export function patch<T>(
  url: string,
  data?: object,
  config?: AxiosRequestConfig
): Promise<T> {
  return service.patch(url, data, config);
}
