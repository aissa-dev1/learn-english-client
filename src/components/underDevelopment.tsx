import { useRefreshAccessToken } from "@/hooks/auth/use-refresh-access-token";
import { removeRefreshToken } from "@/utils/jwt";
import { useEffect } from "react";

export default function UnderDevelopment() {
  const { refreshAccessToken } = useRefreshAccessToken();

  useEffect(() => {
    removeRefreshToken();
    refreshAccessToken();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen px-4 text-center text-red-700 rounded bg-red-500/25">
      <p className="text-lg font-semibold">
        The website is under development, we will be back soon.
      </p>
    </div>
  );
}
