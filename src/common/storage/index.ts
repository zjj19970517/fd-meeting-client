import Storage from './storage';

export const StorageKeys = Object.freeze({
  TOKEN: 'TOKEN', // 登录鉴权 token
});

// 登录态存储
export const LoginStorage = new Storage({
  namespace: 'LOGIN',
  expire: 24 * 60,
});
