import {
  Form,
  Input,
  Checkbox,
  Link,
  Button,
  Space,
} from '@arco-design/web-react';
import React, { useEffect, useRef, useState } from 'react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import { Notification } from '@arco-design/web-react';

import useStorage from '@/utils/useStorage';
import useLocale from '@/utils/useLocale';
import locale from './locale';

import styles from './style/index.module.less';
import userApi, { LoginResult } from '@/apis/userApi';
import { loginModule } from '@/modules/login-module/login-module';

/**
 * @component 登录表单组件
 */
export default function LoginForm() {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginParams, setLoginParams, removeLoginParams] =
    useStorage('loginParams');

  const t = useLocale(locale);

  const [rememberPassword, setRememberPassword] = useState(!!loginParams);

  function afterLoginSuccess(params, loginResult: LoginResult) {
    // 记住密码
    if (rememberPassword) {
      setLoginParams(JSON.stringify(params));
    } else {
      removeLoginParams();
    }
    loginModule.login(loginResult);
  }

  async function login(params) {
    try {
      setErrorMessage('');
      setLoading(true);
      const res = await userApi.login(params.userName, params.password);
      if (res && res.code === 0) {
        Notification.success({
          title: '登录成功',
          content: '',
        });
        afterLoginSuccess(params, res.data);
      } else {
        setErrorMessage(res.message || t['login.form.login.errMsg']);
      }
    } catch (e) {
      console.error('[Login] 登录异常', e);
    } finally {
      setLoading(false);
    }
  }

  function onSubmitClick() {
    formRef.current.validate().then((values) => {
      login(values);
    });
  }

  // 读取 localStorage，设置初始值
  useEffect(() => {
    const rememberPassword = !!loginParams;
    setRememberPassword(rememberPassword);
    if (formRef.current && rememberPassword) {
      const parseParams = JSON.parse(loginParams);
      formRef.current.setFieldsValue(parseParams);
    }
  }, [loginParams]);

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>{t['login.form.title']}</div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form
        className={styles['login-form']}
        layout="vertical"
        ref={formRef}
        initialValues={{ userName: 'admin', password: 'admin' }}
      >
        <Form.Item
          field="userName"
          rules={[{ required: true, message: t['login.form.userName.errMsg'] }]}
        >
          <Input
            prefix={<IconUser />}
            placeholder={t['login.form.userName.placeholder']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          field="password"
          rules={[{ required: true, message: t['login.form.password.errMsg'] }]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder={t['login.form.password.placeholder']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Space size={16} direction="vertical">
          <div className={styles['login-form-password-actions']}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              {t['login.form.rememberPassword']}
            </Checkbox>
            <Link>{t['login.form.forgetPassword']}</Link>
          </div>
          {/* 登录按钮 */}
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            {t['login.form.login']}
          </Button>
        </Space>
      </Form>
    </div>
  );
}
