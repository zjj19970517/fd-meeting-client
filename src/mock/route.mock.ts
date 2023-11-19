import Mock from 'mockjs';
import { isSSR } from '@/utils/is';
import setupMock from '@/utils/setupMock';

import { MenusListData } from '@/resources/menus-data.mock';

if (!isSSR) {
  Mock.XHR.prototype.withCredentials = true;

  setupMock({
    setup: () => {
      // 获取菜单列表数据
      Mock.mock(new RegExp('/api/route/menusList'), () => {
        return Mock.mock({
          code: 0,
          message: 'success',
          data: {
            menusList: MenusListData,
          },
        });
      });
    },
  });
}
