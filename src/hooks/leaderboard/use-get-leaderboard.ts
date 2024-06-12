import { leaderboardService } from "@/api/leaderboard";
import useLeaderboardStore from "@/features/leaderboard";
import { getAccessToken } from "@/utils/jwt";

export function useGetLeaderboard() {
  const setLeaderboardLoading = useLeaderboardStore(
    (state) => state.setLoading
  );
  const updateLeaderboardList = useLeaderboardStore(
    (state) => state.updateList
  );

  async function getLeaderboard() {
    const accessToken = getAccessToken();
    if (!accessToken) return;
    setLeaderboardLoading(true);
    const axiosRes = await leaderboardService.findAll(accessToken);
    updateLeaderboardList(axiosRes.data.leaderboard);
    setLeaderboardLoading(false);
  }

  return { getLeaderboard };
}
