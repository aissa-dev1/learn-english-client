import Container from "@/components/container";
import CreateAccountCard from "@/components/create-account/createAccountCard";
import Header from "@/components/header";
import useAuthStore from "@/features/auth";
import { useTitle } from "@/hooks/use-title";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();
  useTitle("PEA App | Create Account");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <Header title="PEA App | Create Account" />
      <Container className="mt-28">
        <CreateAccountCard />
      </Container>
    </>
  );
}
