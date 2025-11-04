import { store } from "@/store/store";
import { setAuth, clearAuth, setLoading } from "@/store/slices/authSlice";
import { tokenStorage } from "./tokenStorage";
import { authApi } from "@/api/authApi";

/**
 * Initialize authentication state on app startup
 * Checks if token exists and validates it by fetching user data
 */
export const initAuth = async (): Promise<void> => {
  const token = tokenStorage.getToken();

  if (!token) {
    // No token, ensure auth state is cleared
    store.dispatch(clearAuth());
    store.dispatch(setLoading(false));
    return;
  }

  try {
    // Try to get current user data to validate token
    const user = await authApi.getCurrentUser();

    // Token is valid, restore auth state
    const refreshToken = tokenStorage.getRefreshToken();
    store.dispatch(
      setAuth({
        user,
        token,
        refreshToken: refreshToken || undefined,
      })
    );
    store.dispatch(setLoading(false));
  } catch (error) {
    // Token is invalid or expired, clear auth state
    console.error("Failed to initialize auth:", error);
    tokenStorage.clearAll();
    store.dispatch(clearAuth());
    store.dispatch(setLoading(false));
  }
};
