import React, { memo, useMemo } from 'react';

// hooks
import { useDispatch, useSelector } from '@/store/hooks';

// components
import ComIcon from '@/components/common/com-icon/ComIcon';

// interfaces
import { MenuItem } from '@/common/interfaces/MenusList';
import { SideBarPropsType } from './props-type';

import { updateActiveMenuOfFirst } from '@/store/slices/menu-slice';

// resources
import styles from './style.module.less';

/** @component 侧边栏 */
const Sidebar: React.FC<SideBarPropsType> = () => {
  const { menusList, activeMenu } = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  /** 获取激活的第一级菜单 key */
  const activeMenuKey = useMemo(() => {
    return menusList.find((menu) => menu.key === activeMenu[0]).key;
  }, [activeMenu, menusList]);

  /** 第一级菜单点击事件处理 */
  const onClickMenuItem = (menu: MenuItem) => {
    dispatch(updateActiveMenuOfFirst(menu.key));
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
                  width={24}
                  height={24}
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
