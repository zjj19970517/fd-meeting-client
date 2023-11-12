export type MenusList = Array<MenuItem>;

export interface MenuItem {
  name: string; // 菜单名称
  key: string; // 菜单的唯一key
  icon?: string; // icon 图标
  activeIcon?: string; // 激活后的 icon 图标
  hidden?: boolean; // 是否隐藏
  routeUrl?: string; // 路由 url 路径
  routeName?: string; // 路由名称
  redirect?: string; // 重定向地址
  meta: {
    title?: string; // 标题文案
  };
  subMenus: Array<MenuItem>; // 子菜单列表
}
