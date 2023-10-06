import { post } from '@/common/fetch';
import { StandardResponse } from '@/common/fetch/types';

export interface LoginResult {
  userInfo: {
    id: number;
    username: number;
    roles: Array<string>;
    permissions: Array<{
      id: number;
      code: string;
      description: string;
    }>;
  };
  accessToken: string;
  refreshToken: string;
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
    // const config: CustomConfig = {
    //   closeAutoErrorTip: false
    // }
    return post<StandardResponse<LoginResult>>('/api/user/login', {
      username,
      password,
    });
  },
};

export default userApi;
