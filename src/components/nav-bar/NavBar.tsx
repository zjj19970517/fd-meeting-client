import React, { memo } from 'react';

import Breadcrumb from '@/components/breadcrumb/Breadcrumb';

import { NavBarPropsType } from './props-type';

import styles from './style/style.module.less';

/** @component 导航条 */
const NavBar: React.FC<NavBarPropsType> = () => {
  return (
    <div className={styles.nav_bar}>
      <div className={styles.nav_bar__left}>
        {/* 面包屑 */}
        <Breadcrumb />
      </div>
      <div className={styles.nav_bar__right}>右侧区域</div>
    </div>
  );
};

export default memo(NavBar);
