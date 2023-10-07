import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';

import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ConfigProvider } from '@arco-design/web-react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import enUS from '@arco-design/web-react/es/locale/en-US';

// store & context
import store from './store';
import { GlobalContext } from './context';
// component
import PageLayout from './layout';
import Login from './pages/login';
// tools
import changeTheme from './utils/changeTheme';
import { componentConfig } from './config/component.config';
import useStorage from './utils/useStorage';
import './style/global.less';
import './mock';
import { loginModule } from './modules/login-module/login-module';
import { getUserInfoAction } from './store/userSlice';

function Index() {
  const [lang, setLang] = useStorage('arco-lang', 'en-US');
  const [theme, setTheme] = useStorage('arco-theme', 'light');
  const dispatch = useDispatch();

  function getArcoLocale() {
    switch (lang) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return zhCN;
    }
  }

  // 获取用户信息
  function fetchUserInfo() {
    dispatch(getUserInfoAction());
  }

  // 登录校验
  useEffect(() => {
    if (loginModule.checkLogin()) {
      fetchUserInfo();
    } else if (window.location.pathname.replace(/\//g, '') !== 'login') {
      window.location.pathname = '/login';
    }
  }, []);

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
        locale={getArcoLocale()}
        componentConfig={componentConfig}
      >
        <GlobalContext.Provider value={contextValue}>
          <Switch>
            <Route path="/login" component={Login} />
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
