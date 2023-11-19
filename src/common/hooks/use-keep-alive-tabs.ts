import { useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useSelector } from '@/store/hooks';
import { getFlattenMenusMap } from '@/components/menu-list/get-flatten-menus';
import { MenuItem } from '@/common/interfaces/menus-list';

export type KeepAliveTab = MenuItem & {
  url: string; // 完整 url
};

export function useKeepAliveTabs() {
  const history = useHistory();
  // 菜单列表数据
  const { menusList } = useSelector((state) => state.menu);
  const [keepAliveTabs, setKeepAliveTabs] = useState<KeepAliveTab[]>([]);
  const [activeTabRoutePath, setActiveTabRoutePath] = useState<string>('');
  // 扁平化所有菜单
  const flattenMenusMap = useMemo(
    () => getFlattenMenusMap(menusList) || {},
    [menusList]
  );
  const keepAliveTabKeyToRouteMap = useRef({});

  useEffect(() => {
    const pathname = history.location.pathname;
    const pathKeys = pathname.replace(/^\//, '').split('/');
    const menuItemKey = pathKeys[pathKeys.length - 1];
    if (!menuItemKey || !flattenMenusMap[menuItemKey]) {
      return;
    }
    const existKeepAliveTab = keepAliveTabs.find(
      (item) => item.url === location.href
    );
    if (!existKeepAliveTab) {
      setKeepAliveTabs((prev) => [
        ...prev,
        {
          ...flattenMenusMap[menuItemKey],
          url: window.location.href,
        },
      ]);
      keepAliveTabKeyToRouteMap.current[window.location.href] =
        flattenMenusMap[menuItemKey];
    }
    if (activeTabRoutePath !== window.location.href) {
      setActiveTabRoutePath(window.location.href);
    }
  }, [history.location]);

  return {
    keepAliveTabs,
    activeTabRoutePath,
    keepAliveTabKeyToRouteMap,
    setActiveTabRoutePath,
  };
}
