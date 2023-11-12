export enum ResourceExtType {
  SVG = 'svg',
  ICONFONT = 'iconfont',
  IMG = 'img',
  ARCO_ICON = 'arco_icon',
  UNKNOWN = 'unknown',
}

export function getResourceExt(url: string) {
  if (url.endsWith('.svg')) {
    return ResourceExtType.SVG;
  } else if (['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(url)) {
    return ResourceExtType.IMG;
  } else if (url.startsWith('icon-')) {
    return ResourceExtType.ICONFONT;
  } else if (url.startsWith('Icon')) {
    return ResourceExtType.ARCO_ICON;
  }
  return ResourceExtType.UNKNOWN;
}
