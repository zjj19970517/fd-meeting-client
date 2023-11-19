import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useMount } from 'ahooks';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ConfigProvider } from '@arco-design/web-react';

// store & context
import store from '@/store';
import { useDispatch } from '@/store/hooks';
import { GlobalContext } from '@/context';
import { getMenusListAction } from '@/store/slices/menu-slice';

// component
import PageLayout from '@/components/page-layout/PageLayout';
import PageLogin from '@/pages/login';

// tools & Hooks
import changeTheme from '@/utils/changeTheme';
import useStorage from '@/utils/useStorage';
import { getArcoLocale } from '@/locale/get-arco-locale';

// resources
import { componentConfig } from '@/config/component.config';
import './style/global.less';
import './mock';

function Index() {
  const [lang, setLang] = useStorage('arco-lang', 'zh-CN');
  const [theme, setTheme] = useStorage('arco-theme', 'light');
  const dispatch = useDispatch();

  useMount(() => {
    checkLogin();
    getMenusList();
  });

  /** 获取菜单列表 */
  function getMenusList() {
    dispatch(getMenusListAction());
  }

  /** 校验登录态 */
  function checkLogin() {
    // if (loginModule.checkLogin()) {
    //   fetchUserInfo();
    // } else if (window.location.pathname.replace(/\//g, '') !== 'login') {
    //   window.location.pathname = '/login';
    // }
  }

  // 主题切换
  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  const contextValue = {
    lang,
    setLang,
    theme,
    setTheme,
  };

  return (
    <BrowserRouter>
      <ConfigProvider
        locale={getArcoLocale(lang)}
        componentConfig={componentConfig}
      >
        <GlobalContext.Provider value={contextValue}>
          <Switch>
            <Route path="/login" component={PageLogin} />
            <Route path="/" component={PageLayout} />
          </Switch>
        </GlobalContext.Provider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.getElementById('root')
);
