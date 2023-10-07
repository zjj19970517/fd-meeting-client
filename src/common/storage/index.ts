import Storage from './storage';

export const LoginStorageKeys = Object.freeze({
  TOKEN: 'TOKEN', // 登录鉴权 token
  REFRESH_TOKEN: 'REFRESH_TOKEN', // 刷新 token
  LOGIN_STATUS: 'LOGIN_STATUS', // 登录状态
});

// 登录相关的存储
export const loginStorage = new Storage({
  namespace: 'LOGIN',
});
