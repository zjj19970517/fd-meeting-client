import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  handleChangeRequestHeader,
  handleConfigureAuth,
  handleBizError,
  handleNetworkError,
  handleConfigureCustom,
} from './helper';
import { CustomConfig } from './types';

const service = axios.create({
  timeout: 5000,
});

service.interceptors.request.use(
  (config: CustomConfig) => {
    config = handleChangeRequestHeader(config);
    config = handleConfigureAuth(config);
    config = handleConfigureCustom(config);
    return config;
  },
  (error: AxiosError) => {
    console.log('[fetch] 请求拦截器错误', error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 2xx 范围内的状态码都会触发该回调函数
    handleBizError(
      response.data.code,
      response.data.message,
      (response.config as CustomConfig).closeAutoErrorTip
    );
    return Promise.resolve(response.data);
  },
  (error: AxiosError) => {
    console.error('[Fetch] 请求异常 ', error);
    // 非 2xx 的状态码都会触发该回调函数
    handleNetworkError(
      error.response.status,
      error.response.data.message,
      (error.response.config as CustomConfig).closeAutoErrorTip
    );
    return Promise.reject(error);
  }
);

export default service;
