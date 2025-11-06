import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tokenStorage } from "@/utils/tokenStorage";

interface User {
  id: string;
  email: string;
  // Add other user fields as needed
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const token = tokenStorage.getToken();
const initialState: AuthState = {
  user: null,
  token: token,
  isAuthenticated: false, // Will be set to true after validation in initAuth
  isLoading: !!token, // Set loading if token exists (needs validation)
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setAuth: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
        refreshToken?: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      tokenStorage.setToken(action.payload.token);
      if (action.payload.refreshToken) {
        tokenStorage.setRefreshToken(action.payload.refreshToken);
      }
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      tokenStorage.clearAll();
    },
  },
});

export const { setLoading, setError, setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
