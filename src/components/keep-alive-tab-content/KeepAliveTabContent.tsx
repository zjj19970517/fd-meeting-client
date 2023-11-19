import React, { useMemo } from 'react';
import { Tabs } from '@arco-design/web-react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { IconApps } from '@arco-design/web-react/icon';

import lazyload from '@/utils/lazyload';
import { useKeepAliveTabs } from '@/common/hooks/use-keep-alive-tabs';
import { getFlattenMenusList } from '../menu-list/get-flatten-menus';

import styles from './style.module.less';
import { useSelector } from '@/store/hooks';

const TabPane = Tabs.TabPane;

/** @component KeepAlive Tab 内容区域  */
const KeepAliveTabContent: React.FC<unknown> = () => {
  const history = useHistory();
  // 菜单列表数据
  const { menusList } = useSelector((state) => state.menu);
  // 扁平化所有菜单
  const flattenMenusList = useMemo(
    () => getFlattenMenusList(menusList) || [],
    [menusList]
  );
  const {
    keepAliveTabs,
    activeTabRoutePath,
    keepAliveTabKeyToRouteMap,
    setActiveTabRoutePath,
  } = useKeepAliveTabs();

  function handleChangeActiveTab(key) {
    setActiveTabRoutePath(key);
    history.push(keepAliveTabKeyToRouteMap.current[key].routeUrl);
  }

  return (
    <>
      {keepAliveTabs.length ? (
        <Tabs
          type="card-gutter"
          activeTab={activeTabRoutePath}
          direction={'horizontal'}
          scrollPosition={'start'}
          className={styles.keep_alive_tabs}
          onChange={handleChangeActiveTab}
          editable
          size={'large'}
        >
          {keepAliveTabs.map((item) => (
            <TabPane
              key={item.url}
              closable
              title={
                <span>
                  <IconApps style={{ marginRight: 6 }} />
                  {item.meta.title}
                </span>
              }
            />
          ))}
        </Tabs>
      ) : null}
      <div className={styles.keep_alive_content}>
        <Switch>
          {flattenMenusList.map((route) => {
            return (
              <Route
                key={route.key}
                path={route.routeUrl}
                component={lazyload(
                  () => import(`../../pages/${route.componentPath}`)
                )}
              />
            );
          })}
          <Route
            path="*"
            component={lazyload(() => import('../../pages/exception/404'))}
          />
        </Switch>
      </div>
    </>
  );
};

export default KeepAliveTabContent;
