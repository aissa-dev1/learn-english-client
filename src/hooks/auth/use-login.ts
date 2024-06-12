import { authService } from "@/api/auth";
import { useToast } from "@/components/ui/use-toast";
import useAuthStore from "@/features/auth";
import { useUserStore } from "@/features/user";
import { setAccessToken, setRefreshToken } from "@/utils/jwt";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Data {
  email: string;
  password: string;
  loading: boolean;
}

export function useLogin() {
  const [loginData, setLoginData] = useState<Data>({
    email: "",
    password: "",
    loading: false,
  });
  const { toast } = useToast();
  const updateUser = useUserStore((state) => state.update);
  const authLogin = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  async function login() {
    if (loginData.loading) return;
    try {
      setLoginData((prev) => ({ ...prev, loading: true }));
      const axiosRes = await authService.login({
        email: loginData.email,
        password: loginData.password,
      });
      setAccessToken(axiosRes.data.accessToken);
      setRefreshToken(axiosRes.data.refreshToken);
      updateUser({
        ...axiosRes.data.user,
        sub: axiosRes.data.user._id,
      });
      authLogin();
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Cannot access your account!",
        description: error.response.data.message,
        variant: "destructive",
      });
      setLoginData((prev) => ({ ...prev, loading: false }));
    }
  }

  return { loginData, setLoginData, login };
}
