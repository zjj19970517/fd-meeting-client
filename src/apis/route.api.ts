import { post } from '@/common/fetch';
import { StandardResponse } from '@/common/fetch/types';
import { MenusList } from '@/common/interfaces/menus-list';

export interface MenusListResponse {
  menusList: MenusList;
}

/**
 * 路由服务
 */
const routeApi = {
  /**
   * 获取菜单列表数据
   * @returns
   */
  getMenusList() {
    return post<StandardResponse<MenusListResponse>>('/api/route/menusList');
  },
};

export default routeApi;
