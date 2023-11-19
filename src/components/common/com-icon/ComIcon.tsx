import React, { memo } from 'react';

import ComIconFont from '@/components/common/com-icon-font/ComIconFont';

import { getArcoIconFromKey } from './get-arco-icon-from-key';
import { getSvgIconFromKey } from './get-svg-icon-from-key';

import { BaseTypeProps } from '@/common/interfaces/base-type-props';
import { ResourceExtType, getResourceExt } from './get-resource-type';

interface ComIconPropsType extends BaseTypeProps {
  url: string;
  width?: number;
  height?: number;
  type?: ResourceExtType;
}

/** @component 公共组件 - icon 图标组件 */
const ComIcon: React.FC<ComIconPropsType> = (props) => {
  let { type } = props;
  const { className, style } = props;

  // 识别类型
  if (!type) {
    type = getResourceExt(props.url);
  }

  // 组装样式
  const _style = {
    ...style,
    ...{
      width: props.width ? props.width + 'px' : '24px',
      height: props.height ? props.height + 'px' : '24px',
      fontSize: props.height ? props.height + 'px' : '24px',
    },
  };

  if (type === ResourceExtType.ICONFONT) {
    return (
      <ComIconFont className={className} style={_style} type={props.url} />
    );
  } else if (type === ResourceExtType.IMG) {
    return <img src={props.url} className={className} style={_style} alt="" />;
  } else if (type === ResourceExtType.ARCO_ICON) {
    const IconComponent = getArcoIconFromKey(props.url, className, _style);
    return IconComponent;
  } else if (type === ResourceExtType.SVG) {
    const IconComponent = getSvgIconFromKey(props.url, className, _style);
    return IconComponent;
  }
  // console.error('Unknown Icon Type');
  return null;
};

export default memo(ComIcon);
