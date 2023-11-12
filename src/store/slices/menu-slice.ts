import { createSlice } from '@reduxjs/toolkit';

import { MenusList } from '@/common/interfaces/MenusList';

import { MenusListData } from '@/resources/menus-data.mock';

const initialState = {
  menusList: MenusListData as MenusList,
  activeMenu: ['home'] as string[],
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    /** 更新菜单列表数据 */
    updateMenusList(state, { payload }: { payload: MenusList }) {
      state.menusList = payload;
    },
    /** 更新第一级选中的菜单 key */
    updateActiveMenuOfFirst(state, { payload }: { payload: string }) {
      const activeMenu = [...state.activeMenu];
      activeMenu[0] = payload;
      state.activeMenu = activeMenu;
    },
  },
});

// actions
export const { updateMenusList, updateActiveMenuOfFirst } = menuSlice.actions;

// reducer
export default menuSlice.reducer;
