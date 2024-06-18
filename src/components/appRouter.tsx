import App from "@/App";
import { useRefreshAccessToken } from "@/hooks/auth/use-refresh-access-token";
import CreateAccount from "@/pages/createAccount";
import Dashboard from "@/pages/dashboard";
import Leaderboard from "@/pages/leaderboard";
import Login from "@/pages/login";
import Profile from "@/pages/profile";
import Settings from "@/pages/settings";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "./auth/privateRoute";
import useAuthStore from "@/features/auth";
import Unit from "@/pages/unit";
import Topic from "@/pages/topic";
import Learn from "@/pages/learn";
import Levels from "@/pages/levels";

export default function AppRouter() {
  const { refreshAccessToken } = useRefreshAccessToken();
  const setLastVisitedRoute = useAuthStore(
    (state) => state.setLastVisitedRoute
  );
  const location = useLocation();

  useEffect(() => {
    refreshAccessToken();
  }, []);

  useEffect(() => {
    setLastVisitedRoute(location.pathname);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/leaderboard" element={<Leaderboard />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/levels" element={<Levels />} />
        <Route path="/dashboard/learn" element={<Learn />} />
        <Route path="/dashboard/learn/units/:id" element={<Unit />} />
        <Route
          path="/dashboard/learn/units/:id/topics/:id"
          element={<Topic />}
        />
        <Route path="*" element={<App />} />
      </Route>
    </Routes>
  );
}
