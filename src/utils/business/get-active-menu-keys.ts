import { MenuItem, MenusList } from '@/common/interfaces/menus-list';

export function getActiveMenuKeys(menuItem: MenuItem, filterHidden = true) {
  const keys = [menuItem.key];
  function travel(_routes: MenusList, _keys) {
    const route = _routes[0];
    if (route) {
      _keys.push(route.key);
      const visibleChildren = (route.children || []).filter((child) =>
        filterHidden ? !child.hidden : true
      );
      travel(visibleChildren, _keys);
    }
  }
  travel(menuItem.children, keys);

  return keys;
}
