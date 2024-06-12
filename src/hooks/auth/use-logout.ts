import { authService } from "@/api/auth";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from "@/utils/jwt";
import useAuthStore from "@/features/auth";

interface Data {
  loading: boolean;
}

export function useLogout() {
  const [logoutData, setLogoutData] = useState<Data>({
    loading: false,
  });
  const { toast } = useToast();
  const authLogout = useAuthStore((state) => state.logout);
  const setLastVisitedRoute = useAuthStore(
    (state) => state.setLastVisitedRoute
  );
  const navigate = useNavigate();

  async function logout() {
    if (logoutData.loading) return;
    const refreshToken = getRefreshToken()!;
    const accessToken = getAccessToken()!;
    try {
      setLogoutData((prev) => ({ ...prev, loading: true }));
      const axiosRes = await authService.logout(
        {
          token: refreshToken,
        },
        accessToken
      );
      toast({
        title: "In progress",
        description: axiosRes.data.message,
      });
      removeAccessToken();
      removeRefreshToken();
      setLastVisitedRoute("");
      authLogout();
      navigate("/login");
    } catch (error: any) {
      removeAccessToken();
      removeRefreshToken();
      setLastVisitedRoute("");
      navigate("/login");
    }
  }

  return { logoutData, setLogoutData, logout };
}
