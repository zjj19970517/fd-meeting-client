import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '@/apis/user.api';

export interface UserInfo {
  nickName: string;
  avatar: string;
  email: string;
}

// thunk actions
export const getUserInfoAction = createAsyncThunk(
  'user/getUserInfo',
  async () => {
    const response = await userApi.getUserInfo();
    return response.data;
  }
);

// 用户分片
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    // 用户基本信息
    userInfo: {
      nickName: '',
      avatar: '',
      email: '',
    },
    // 是否加载完毕
    hasLoaded: true,
  },
  reducers: {
    // 更新用户信息
    updateUserInfo(state, { payload }: { payload: UserInfo }) {
      state.userInfo = payload;
    },
    // 更新用户信息是否加载完毕的状态
    updateUserInfoLoadStatus(state, { payload }: { payload: boolean }) {
      state.hasLoaded = payload;
    },
  },
  extraReducers: (builder) => {
    // getUserInfoAction
    builder
      .addCase(getUserInfoAction.pending, (state) => {
        state.hasLoaded = false;
      })
      .addCase(getUserInfoAction.fulfilled, (state, action) => {
        state.hasLoaded = true;
        state.userInfo = action.payload.userInfo;
      })
      .addCase(getUserInfoAction.rejected, (state) => {
        state.hasLoaded = true;
        state.userInfo = {
          nickName: '',
          avatar: '',
          email: '',
        };
      });
    // ...
  },
});

// actions
export const { updateUserInfo, updateUserInfoLoadStatus } = userSlice.actions;

// reducer
export default userSlice.reducer;
