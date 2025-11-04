import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { clearAuth } from "@/store/slices/authSlice";
import { authApi } from "@/api/authApi";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const signOut = async () => {
    try {
      await authApi.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      dispatch(clearAuth());
    }
  };

  return {
    ...auth,
    signOut,
  };
};
