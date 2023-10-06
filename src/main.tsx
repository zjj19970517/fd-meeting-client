import axios from 'axios';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ConfigProvider } from '@arco-design/web-react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import enUS from '@arco-design/web-react/es/locale/en-US';

// store & context
import rootReducer from './store';
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

const store = createStore(rootReducer);

function Index() {
  const [lang, setLang] = useStorage('arco-lang', 'en-US');
  const [theme, setTheme] = useStorage('arco-theme', 'light');

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
    // TODO:
    store.dispatch({
      type: 'update-userInfo',
      payload: { userLoading: true },
    });
    axios.get('/api/user/userInfo').then((res) => {
      store.dispatch({
        type: 'update-userInfo',
        payload: { userInfo: res.data, userLoading: false },
      });
    });
  }

  // 登录校验
  useEffect(() => {
    if (loginModule.checkLogin()) {
      // fetchUserInfo()
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
        <Provider store={store}>
          <GlobalContext.Provider value={contextValue}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={PageLayout} />
            </Switch>
          </GlobalContext.Provider>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
