import axios from "axios";

class LeaderboardService {
  async findAll(accessToken: string) {
    const axiosRes = await axios.get(
      `${import.meta.env.VITE_API_URL}/leaderboard`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return axiosRes;
  }
}

export const leaderboardService = new LeaderboardService();
