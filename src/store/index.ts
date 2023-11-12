import { configureStore } from '@reduxjs/toolkit';

import userSlice from './slices/user-slice';
import menuSlice from './slices/menu-slice';

const store = configureStore({
  reducer: {
    user: userSlice,
    menu: menuSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
