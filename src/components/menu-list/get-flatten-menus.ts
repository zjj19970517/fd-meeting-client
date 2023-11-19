import { isArray } from '@/utils/is';

import type { MenuItem, MenusList } from '@/common/interfaces/menus-list';

/**
 * 扁平化菜单列表
 * @param menusList
 * @param filterHidden
 * @returns
 */
export function getFlattenMenusMap(menusList: MenusList, filterHidden = false) {
  const res = {} as {
    [key: string]: MenuItem;
  };
  function travel(_routes: MenusList, routePath = '') {
    _routes.forEach((route) => {
      const visibleChildren = (route.children || []).filter((child) =>
        filterHidden ? !child.hidden : true
      );
      if (route.key && (!route.children || !visibleChildren.length)) {
        res[route.key] = { ...route };
        res[route.key].routeUrl = routePath + '/' + route.key;
      }
      if (isArray(route.children) && route.children.length) {
        travel(route.children, routePath + '/' + route.key);
      }
    });
  }
  travel(menusList, '');
  return res;
}

/**
 * 扁平化菜单列表
 * @param menusList
 * @param filterHidden
 * @returns
 */
export function getFlattenMenusList(
  menusList: MenusList,
  filterHidden = false
) {
  const res = [] as MenusList;
  function travel(_routes: MenusList, routePath = '') {
    _routes.forEach((route) => {
      const visibleChildren = (route.children || []).filter((child) =>
        filterHidden ? !child.hidden : true
      );
      if (route.key && (!route.children || !visibleChildren.length)) {
        const _route = { ...route };
        _route.routeUrl = routePath + '/' + route.key;
        res.push(_route);
      }
      if (isArray(route.children) && route.children.length) {
        travel(route.children, routePath + '/' + route.key);
      }
    });
  }
  travel(menusList, '');
  return res;
}
