import React from 'react';
import { Carousel } from '@arco-design/web-react';

import { appInfo } from '@/config/app.config';
import styles from './style/index.module.less';

export default function LoginBanner() {
  const data = appInfo.banner;
  return (
    <Carousel className={styles.carousel} animation="fade">
      {data.map((item, index) => (
        <div key={`${index}`}>
          <div className={styles['carousel-item']}>
            <div className={styles['carousel-title']}>{item.slogan}</div>
            <div className={styles['carousel-sub-title']}>{item.subSlogan}</div>
            <img
              alt="banner-image"
              className={styles['carousel-image']}
              src={item.image}
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
}
