import React, { memo, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

// hooks & tools
import { useSelector } from '@/store/hooks';
import { getFlattenMenusMap } from '../menu-list/get-flatten-menus';
import { getActiveMenuKeys } from '@/utils/business/get-active-menu-keys';

// components
import ComIcon from '@/components/common/com-icon/ComIcon';

// interfaces
import { MenuItem } from '@/common/interfaces/menus-list';
import { SideBarPropsType } from './props-type';

// resources
import styles from './style.module.less';

/** @component 侧边栏 */
const Sidebar: React.FC<SideBarPropsType> = () => {
  const history = useHistory();
  const { menusList, activeMenu } = useSelector((state) => state.menu);
  // 扁平化所有菜单
  const flattenMenusMap = useMemo(
    () => getFlattenMenusMap(menusList) || {},
    [menusList]
  );

  /** 获取激活的第一级菜单 key */
  const activeMenuKey = useMemo(() => {
    return menusList.find((menu) => menu.key === activeMenu[0])?.key;
  }, [activeMenu, menusList]);

  /** 第一级菜单点击事件处理 */
  const onClickMenuItem = (menu: MenuItem) => {
    const keys = getActiveMenuKeys(menu, true);
    const targetMenuItem = flattenMenusMap[keys[keys.length - 1]];
    targetMenuItem && history.push(targetMenuItem.routeUrl);
  };

  return (
    <div className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <ComIcon url={'icon-logo'} width={36} height={36} />
      </div>
      {/* 一级菜单列表 */}
      <div className={styles.sidebar_list}>
        {menusList.map((menu) => {
          return (
            <div
              key={menu.name}
              className={`${styles.menu_item} ${
                activeMenuKey === menu.key ? styles.menu_item_active : ''
              }`}
              onClick={() => onClickMenuItem(menu)}
            >
              {menu.icon ? (
                <ComIcon
                  className={styles.menu_item_icon}
                  url={menu.icon}
                  width={22}
                  height={22}
                />
              ) : null}
              <span className={styles.menu_item_name}>{menu.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Sidebar);
