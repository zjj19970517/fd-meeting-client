import { Message } from '@arco-design/web-react';

import { LoginStorage, StorageKeys } from '@/common/storage/index';
import { bizErrorCodeMap } from '@/common/fetch/codes/biz-error-codes';
import { CustomConfig } from './types';

// 请求 headers 头处理
export const handleChangeRequestHeader = (config) => {
  return config;
};

// 鉴权
export const handleConfigureAuth = (config) => {
  const token = LoginStorage.getItem(StorageKeys.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// 处理自定义配置
export const handleConfigureCustom = (config: CustomConfig) => {
  const defaultCustomConfig: CustomConfig = {
    closeAutoErrorTip: false,
  };
  return {
    ...defaultCustomConfig,
    ...config,
  };
};

// 处理业务异常
export const handleBizError = (
  code: number,
  message = '',
  closeAutoErrorTip = false
) => {
  if (code !== 0) {
    console.error(`[Fetch] 请求异常 code=${code} ${message}`);
    // 业务异常提示拦截
    // 之所有不直接使用服务返回的 message，是因为有些场景下，服务返回的异常类型，并不适合提示给用户
    if (bizErrorCodeMap.hasOwnProperty(code)) {
      !closeAutoErrorTip && Message.error(bizErrorCodeMap[String(code)]);
      return false;
    }
    // 默认业务异常提示
    !closeAutoErrorTip && Message.error(message || '系统异常，请稍后再试');
    return false;
  }
  return true;
};

/**
 * 处理 Http 请求错误
 * @param errStatus
 */
export const handleNetworkError = (
  errStatus: number,
  message: string,
  closeAutoErrorTip: boolean
) => {
  let errMessage = message || `未知错误 ${errStatus}`;
  if (errStatus) {
    switch (errStatus) {
      case 400:
        errMessage = message || '错误的请求';
        break;
      case 401:
        errMessage = message || '未授权，请重新登录';
        break;
      case 403:
        errMessage = message || '拒绝访问';
        break;
      case 404:
        errMessage = message || '请求错误，未找到该资源';
        break;
      case 405:
        errMessage = message || '请求方法未允许';
        break;
      case 408:
        errMessage = message || '请求超时';
        break;
      case 500:
        errMessage = message || '服务器端出错';
        break;
      case 501:
        errMessage = message || '网络未实现';
        break;
      case 502:
        errMessage = message || '网络错误';
        break;
      case 503:
        errMessage = message || '服务不可用';
        break;
      case 504:
        errMessage = message || '网络超时';
        break;
      case 505:
        errMessage = message || 'http 版本不支持该请求';
        break;
      default:
        errMessage = message || `未知错误 ${errStatus}`;
    }
  }
  !closeAutoErrorTip && Message.error(errMessage);
};
