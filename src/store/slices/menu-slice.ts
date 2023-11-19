import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import routeApi from '@/apis/routeApi';
import { MenusList } from '@/common/interfaces/menus-list';
import { getActiveMenuKeys } from '@/utils/business/get-active-menu-keys';

const initialState = {
  menusList: [],
  activeMenu: [],
  hasLoaded: false,
};

// thunk actions
export const getMenusListAction = createAsyncThunk(
  'menu/getMenusList',
  async () => {
    const response = await routeApi.getMenusList();
    return response.data;
  }
);

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
    updateActiveMenu(state, { payload }: { payload: string[] }) {
      const activeMenu = [...payload];
      state.activeMenu = activeMenu;
    },
  },
  extraReducers: (builder) => {
    /** getMenusListAction */
    builder
      .addCase(getMenusListAction.pending, (state) => {
        state.hasLoaded = false;
      })
      .addCase(getMenusListAction.fulfilled, (state, action) => {
        state.hasLoaded = true;
        state.menusList = action.payload.menusList;
        const firstMenuItem = action.payload.menusList[0];
        if (firstMenuItem) {
          state.activeMenu = getActiveMenuKeys(firstMenuItem, true);
        } else {
          state.activeMenu = [];
        }
      })
      .addCase(getMenusListAction.rejected, (state) => {
        state.hasLoaded = true;
        console.error('Failed to exec getMenusListAction', state);
      });
  },
});

// actions
export const { updateMenusList, updateActiveMenuOfFirst, updateActiveMenu } =
  menuSlice.actions;

// reducer
export default menuSlice.reducer;
