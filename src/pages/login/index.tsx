import React, { useEffect } from 'react';

// resources
import { appInfo } from '../../config/app.config';
// components
import Footer from '@/components/Footer';
import LoginForm from './form';
import LoginBanner from './banner';
// styles
import styles from './style/index.module.less';

const Logo = appInfo.logo;

/**
 * @page 登录页面
 */
function Login() {
  // 登录页面必须是白天模式
  useEffect(() => {
    document.body.setAttribute('arco-theme', 'light');
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo />
        <div className={styles['logo-text']}>{appInfo.name}</div>
      </div>
      <div className={styles.banner}>
        <div className={styles['banner-inner']}>
          <LoginBanner />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles['content-inner']}>
          <LoginForm />
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
Login.displayName = 'LoginPage';

export default Login;
