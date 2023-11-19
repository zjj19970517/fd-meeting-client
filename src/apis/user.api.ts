import { post } from '@/common/fetch';
import { StandardResponse } from '@/common/fetch/types';

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
}

export interface UserInfoResult {
  userInfo: {
    nickName: string;
    email: string;
    avatar: string;
    isFrozen: boolean;
    isAdmin: boolean;
    roles: string[];
    permissions: Array<{
      id: number;
      code: string;
      description: string;
    }>;
  };
}

/**
 * 用户服务接口
 */
const userApi = {
  /**
   * 用户登录
   * @param username
   * @param password
   * @returns
   */
  login(username, password) {
    return post<StandardResponse<LoginResult>>('/api/user/login', {
      username,
      password,
    });
  },
  /**
   * 获取用户信息
   * @returns
   */
  getUserInfo() {
    return post<StandardResponse<UserInfoResult>>('/api/user/info');
  },
};

export default userApi;
