import React from 'react';

import Logo from '@/assets/icons/logo.svg';

/**
 * 通过 key 获取 SVG Icon 组件
 * @param key 统一约定使用 SVG 文件名 eg: logo.svg
 * @param className
 * @param style
 * @returns
 */
export function getSvgIconFromKey(
  key: string,
  className = '',
  style: React.CSSProperties = {}
) {
  switch (key) {
    case 'logo.svg':
      return <Logo className={className} style={style} />;
    default:
      return (
        <div
          style={{
            ...style,
            ...{ background: '#f7f7f7', borderRadius: '10px' },
          }}
        />
      );
  }
}
