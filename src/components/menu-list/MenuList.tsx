import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useMount } from 'ahooks';
import NProgress from 'nprogress';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout, Menu } from '@arco-design/web-react';
import { IconMenuUnfold, IconMenuFold } from '@arco-design/web-react/icon';

// components
import ComIcon from '@/components/common/com-icon/ComIcon';

// tools & store
import lazyload from '@/utils/lazyload';
import { getFlattenMenusMap } from './get-flatten-menus';
import { useSelector, useDispatch } from '@/store/hooks';
import { updateActiveMenuOfFirst } from '@/store/slices/menu-slice';

// interfaces
import type { MenuItem as IMenuItem } from '@/common/interfaces/menus-list';
import { BaseTypeProps } from '@/common/interfaces/base-type-props';

export type MenuListPropsType = BaseTypeProps;

import styles from './style.module.less';

const Sider = Layout.Sider;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

/** @component 二级菜单列表 */
const MenuList: React.FC<MenuListPropsType> = () => {
  const history = useHistory();
  const location = useLocation();
  const pathname = location.pathname;
  const dispatch = useDispatch();
  // 折叠状态
  const [collapsed, setCollapsed] = useState<boolean>(false);
  // 二级菜单开启 keys
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  // 菜单列表数据
  const { menusList, activeMenu } = useSelector((state) => state.menu);
  // 二级菜单选中 keys
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  // 扁平化所有菜单
  const flattenMenusMap = useMemo(
    () => getFlattenMenusMap(menusList) || {},
    [menusList]
  );
  // 组件加载缓存
  const componentLoadCache = useRef({});

  /** 二级菜单列表 */
  const secondaryMenuList = useMemo(() => {
    const [firstMenuKey] = activeMenu;
    if (firstMenuKey) {
      return menusList.find((menu) => menu.key === firstMenuKey)?.children;
    } else {
      return menusList[1]?.children;
    }
  }, [menusList, activeMenu]);

  /** 菜单宽度 */
  const menuWidth = useMemo(() => {
    return collapsed ? 48 : 220;
  }, [collapsed]);

  useMount(() => {
    initDefaultActiveMenusList();
  });

  /** 路由变化，更新菜单状态 */
  useEffect(() => {
    updateMenuStatus();
  }, [pathname]);

  /** 切换折叠状态 */
  const toggleCollapse = () => {
    setCollapsed((collapsed) => !collapsed);
  };

  /** 点击菜单 Item 的事件处理 */
  const onClickMenuItem = (key: string) => {
    const targetMenuItem = flattenMenusMap[key];
    if (componentLoadCache.current[key]) {
      history.push(targetMenuItem.routeUrl);
      return;
    }
    const mod = import.meta.glob('../../pages/**/*.tsx');
    const component = lazyload(
      mod[`../../pages/${targetMenuItem.componentPath}`]
    );
    const preload = component.preload();
    NProgress.start();
    preload.then(() => {
      componentLoadCache.current[key] = true;
      NProgress.done();
      history.push(targetMenuItem.routeUrl);
    });
  };

  /** 基于路由，更新菜单状态 */
  function updateMenuStatus() {
    const pathname = location.pathname;
    const pathKeys = pathname.replace(/^\//, '').split('/');
    const [firstMenuKey, ...otherPaths] = pathKeys;
    if (!activeMenu[0] || firstMenuKey !== activeMenu[0]) {
      // 更新第一级菜单选中 key
      dispatch(updateActiveMenuOfFirst(firstMenuKey));
    }
    // 更新二级菜单选中 keys
    setSelectedKeys(otherPaths);
    // 更新二级菜单开启选中 keys
    setOpenKeys(otherPaths[0] ? [otherPaths[0]] : []);
  }

  /** 初始化默认激活的菜单 */
  function initDefaultActiveMenusList() {
    if (
      pathname === '/' &&
      Array.isArray(activeMenu) &&
      activeMenu.length > 0
    ) {
      onClickMenuItem(activeMenu[activeMenu.length - 1]);
    }
  }

  /** 渲染所有可见菜单项 */
  const renderMenuItems = () => {
    return function travel(menuItems: IMenuItem[], level: number) {
      return menuItems.map((menuItem) => {
        const { hidden, icon, name, key } = menuItem;
        if (hidden) {
          return '';
        }
        const titleDom = (
          <>
            <ComIcon
              url={icon}
              width={16}
              height={16}
              className={styles.menu_item__icon}
            />
            {name}
          </>
        );
        const visibleChildren = menuItem.children.filter(
          (child) => !child.hidden
        );
        if (visibleChildren.length) {
          return (
            <SubMenu key={key} title={titleDom}>
              {travel(visibleChildren, level + 1)}
            </SubMenu>
          );
        }
        return <MenuItem key={key}>{titleDom}</MenuItem>;
      });
    };
  };

  return (
    <Sider
      className={styles['layout-sider']}
      width={menuWidth}
      collapsed={collapsed}
      onCollapse={setCollapsed}
      trigger={null}
      collapsible
      breakpoint="xl"
    >
      <div className={styles['menu-wrapper']}>
        {/* 菜单 */}
        <Menu
          collapse={collapsed}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onClickMenuItem={onClickMenuItem}
          onClickSubMenu={(_, openKeys) => {
            setOpenKeys(openKeys);
          }}
        >
          {secondaryMenuList
            ? renderMenuItems()(secondaryMenuList, 0 /* level */)
            : []}
        </Menu>

        {/* 折叠按钮 */}
        <div className={styles['collapse-btn']} onClick={toggleCollapse}>
          {collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
        </div>
      </div>
    </Sider>
  );
};

export default memo(MenuList);
