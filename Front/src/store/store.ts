import { configureStore } from '@reduxjs/toolkit';
import drawerReducer from './slices/drawerSlice';
import bestSellerSlice from './slices/bestSellerSlice';
import articleSlice from './slices/articleSlice';
import cartSlice from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    bestSellerSlice: bestSellerSlice,
    articleSlice: articleSlice,
    cartSlice: cartSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
