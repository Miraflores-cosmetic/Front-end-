import { configureStore } from "@reduxjs/toolkit";
import drawerReducer from "./slices/drawerSlice";
import bestSellerSlice from "./slices/bestSellerSlice";
import articleSlice from "./slices/articleSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    bestSellerSlice: bestSellerSlice,
    articleSlice: articleSlice,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
