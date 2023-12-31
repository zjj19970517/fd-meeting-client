import React from 'react';

import {
  IconLanguage,
  IconTool,
  IconMindMapping,
  IconDashboard,
  IconApps,
} from '@arco-design/web-react/icon';

/**
 * 通过 key 获取 Arco Icon 组件
 * @param key 统一约定使用 Arco Icon 的名称
 * @param className
 * @param style
 * @returns
 */
export function getArcoIconFromKey(
  key: string,
  className = '',
  style: React.CSSProperties = {}
) {
  switch (key) {
    case 'IconLanguage':
      return <IconLanguage className={className} style={style} />;
    case 'IconMindMapping':
      return <IconMindMapping className={className} style={style} />;
    case 'IconTool':
      return <IconTool className={className} style={style} />;
    case 'IconDashboard':
      return <IconDashboard className={className} style={style} />;
    case 'IconApps':
      return <IconApps className={className} style={style} />;
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
