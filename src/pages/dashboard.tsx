import Loader from "@/components/loader";
import useAuthStore from "@/features/auth";
import { useTitle } from "@/hooks/use-title";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();
  useTitle("Dashboard");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard/learn");
    } else navigate("/login");
  }, []);

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
      <Loader childClassName="size-10 border-black" />
    </div>
  );
}
