import useAuthStore from "@/features/auth";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
