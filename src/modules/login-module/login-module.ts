import { LoginStorageKeys, loginStorage } from '@/common/storage';
import { LoginResult } from '@/apis/userApi';

export const loginModule = {
  /**
   * 用户登录
   * @param data 登录结果
   */
  login(data: LoginResult) {
    loginStorage.setItem(LoginStorageKeys.LOGIN_STATUS, '1');
    loginStorage.setItem(LoginStorageKeys.TOKEN, data.accessToken);
    loginStorage.setItem(LoginStorageKeys.REFRESH_TOKEN, data.refreshToken);
    window.location.href = '/';
  },
  /**
   * 用户退出登录
   */
  unLogin() {
    loginStorage.remove(LoginStorageKeys.LOGIN_STATUS);
    loginStorage.remove(LoginStorageKeys.TOKEN);
    loginStorage.remove(LoginStorageKeys.REFRESH_TOKEN);
    window.location.href = '/login';
  },
  /**
   * 检查是否已经登录
   */
  checkLogin() {
    return loginStorage.getItem(LoginStorageKeys.LOGIN_STATUS) === '1';
  },
};
