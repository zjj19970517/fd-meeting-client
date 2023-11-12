import React, { memo } from 'react';
import { Breadcrumb as ArcoBreadcrumb } from '@arco-design/web-react';
import { IconHome } from '@arco-design/web-react/icon';

const ArcoBreadcrumbItem = ArcoBreadcrumb.Item;

/** @component 面包屑组件 */
const Breadcrumb: React.FC<unknown> = () => {
  return (
    <ArcoBreadcrumb>
      <ArcoBreadcrumbItem>
        <IconHome />
      </ArcoBreadcrumbItem>
      <ArcoBreadcrumbItem>Channel</ArcoBreadcrumbItem>
      <ArcoBreadcrumbItem>News</ArcoBreadcrumbItem>
    </ArcoBreadcrumb>
  );
};

export default memo(Breadcrumb);
