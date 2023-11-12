import React, { memo, useState } from 'react';

import styles from './style.module.less';
import Sider from '@arco-design/web-react/es/Layout/sider';

/** @component 二级菜单列表 */
const MenuList: React.FC<unknown> = () => {
  // 折叠状态
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const menuWidth = collapsed ? 48 : 220;

  const paddingTop = { paddingTop: '60px' };

  return (
    <Sider
      className={styles['layout-sider']}
      width={menuWidth}
      collapsed={collapsed}
      onCollapse={setCollapsed}
      trigger={null}
      collapsible
      breakpoint="xl"
      style={paddingTop}
    >
      <div className={styles['menu-wrapper']}></div>
    </Sider>
  );
};

export default memo(MenuList);
