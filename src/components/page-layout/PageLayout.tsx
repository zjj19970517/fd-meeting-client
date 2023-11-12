import React from 'react';
import { Layout } from '@arco-design/web-react';

import { PageLayoutContainerPropsType } from './props-type';

// components
import Sidebar from '@/components/sidebar/Sidebar';
import NavBar from '@/components/nav-bar/NavBar';
import MenuList from '@/components/menu-list/MenuList';

import styles from './styles/style.module.less';

/** @component 页面布局组件 */
const PageLayoutContainer: React.FC<PageLayoutContainerPropsType> = () => {
  return (
    <Layout className={styles['page-layout-container']}>
      <div className={styles['page-layout__slide']}>
        {/* 侧边栏 - 一级菜单 */}
        <Sidebar />
      </div>

      <div className={styles['page-layout__main']}>
        <div className={styles['page-layout__navbar']}>
          {/* 顶部导航条 */}
          <NavBar />
        </div>
        <Layout>
          <MenuList></MenuList>
          <Layout className={styles['layout-content']}>
            <div className={styles['layout-content-wrapper']}>
              {/* 内容 */}
              <p>内容</p>
            </div>
          </Layout>
        </Layout>
      </div>
    </Layout>
  );
};

export default PageLayoutContainer;
