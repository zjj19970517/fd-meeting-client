import { MenusList } from '@/common/interfaces/MenusList';

export const MenusListData: MenusList = [
  {
    name: '主页',
    icon: 'icon-home',
    activeIcon: '',
    hidden: false,
    key: 'home',
    routeUrl: 'dashboard/workplace',
    routeName: 'dashboard',
    redirect: '',
    meta: {
      title: '主页',
    },
    subMenus: [],
  },
  {
    name: '资产',
    icon: 'icon-me',
    key: 'asset',
    activeIcon: '',
    hidden: false,
    routeUrl: '',
    routeName: '',
    redirect: '',
    meta: {
      title: '资产管理',
    },
    subMenus: [
      {
        name: '用户管理',
        icon: '',
        key: 'userManage',
        activeIcon: '',
        hidden: false,
        routeUrl: '',
        routeName: '',
        redirect: '',
        meta: {
          title: '用户管理',
        },
        subMenus: [],
      },
    ],
  },
  {
    name: '设置',
    icon: 'icon-setting',
    key: 'setting',
    activeIcon: '',
    hidden: false,
    routeUrl: '',
    routeName: '',
    redirect: '',
    meta: {
      title: '设置',
    },
    subMenus: [
      {
        name: '导航管理',
        key: 'routeManage',
        icon: '',
        activeIcon: '',
        hidden: false,
        routeUrl: '',
        routeName: '',
        redirect: '',
        meta: {
          title: '导航管理',
        },
        subMenus: [
          {
            name: '导航列表',
            key: 'routeList',
            icon: '',
            activeIcon: '',
            hidden: false,
            routeUrl: '',
            routeName: '',
            redirect: '',
            meta: {
              title: '导航列表',
            },
            subMenus: [],
          },
        ],
      },
    ],
  },
];
