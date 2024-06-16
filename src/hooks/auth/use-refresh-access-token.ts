import { authService } from "@/api/auth";
import useAuthStore from "@/features/auth";
import { useUserStore } from "@/features/user";
import {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
} from "@/utils/jwt";
import { useNavigate } from "react-router-dom";

export function useRefreshAccessToken() {
  const userFetched = useUserStore((state) => state.fetched);
  const setUserLoading = useUserStore((state) => state.setLoading);
  const updateUser = useUserStore((state) => state.update);
  const lastVisitedRoute = useAuthStore((state) => state.lastVisitedRoute);
  const authLogin = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  async function refreshAccessToken() {
    const refreshToken = getRefreshToken()!;
    if (userFetched) return;
    try {
      setUserLoading(true);
      const axiosRes = await authService.refreshAccessToken({
        token: refreshToken,
      });
      setAccessToken(axiosRes.data.accessToken);
      updateUser({
        ...axiosRes.data.user,
        sub: axiosRes.data.user._id,
      });
      authLogin();
      setUserLoading(false);
      navigate(lastVisitedRoute || "/dashboard");
    } catch (error: any) {
      removeAccessToken();
      removeRefreshToken();
      setUserLoading(false);
      navigate("/login");
    }
  }

  return { refreshAccessToken };
}
