import { configureStore } from "@reduxjs/toolkit";
import drawerReducer from "./slices/drawerSlice";
import bestSellerSlice from "./slices/bestSellerSlice";

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    bestSellerSlice: bestSellerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
