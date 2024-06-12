import Container from "@/components/container";
import LoginCard from "@/components/login/loginCard";
import Header from "@/components/header";
import { useTitle } from "@/hooks/use-title";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "@/features/auth";
import { useUserStore } from "@/features/user";
import Loader from "@/components/loader";

export default function Login() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userLoading = useUserStore((state) => state.loading);
  const navigate = useNavigate();
  useTitle("PEA App | Login");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, []);

  return userLoading ? (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
      <Loader childClassName="size-10 border-black" />
    </div>
  ) : (
    <>
      <Header title="PEA App | Login" />
      <Container className="mt-28">
        <LoginCard />
      </Container>
    </>
  );
}
