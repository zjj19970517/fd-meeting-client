import React, { memo } from 'react';
import { Layout, Spin } from '@arco-design/web-react';

import { PageLayoutContainerPropsType } from './props-type';
import { useSelector } from '@/store/hooks';

// components
import Sidebar from '@/components/sidebar/Sidebar';
import NavBar from '@/components/nav-bar/NavBar';
import MenuList from '@/components/menu-list/MenuList';
import KeepAliveTabContent from '@/components/keep-alive-tab-content/KeepAliveTabContent';

import styles from './styles/style.module.less';

/** @component 页面布局组件 */
const PageLayoutContainer: React.FC<PageLayoutContainerPropsType> = () => {
  const { hasLoaded: menuLoaded } = useSelector((state) => state.menu);
  const { hasLoaded: userLoaded } = useSelector((state) => state.user);

  const hasLoaded = menuLoaded && userLoaded;

  if (!hasLoaded) {
    return <Spin size={40} className={styles['spin']} />;
  }

  return (
    <div className={styles['page-layout-container']}>
      <div className={styles['page-layout__slide']}>
        {/* 侧边栏「一级菜单」 */}
        <Sidebar />
      </div>
      <div className={styles['page-layout__main']}>
        <div className={styles['page-layout__navbar']}>
          {/* 顶部导航条 */}
          <NavBar />
        </div>
        <Layout className={styles['page-layout__bottom']}>
          {/* 二级菜单列表 */}
          <MenuList />
          <div className={styles['layout-content-wrapper']}>
            {/* 核心内容展示区域 */}
            <KeepAliveTabContent />
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default memo(PageLayoutContainer);
