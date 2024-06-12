import Container from "@/components/container";
import LeaderboardList from "@/components/dashboard/leaderboard/leaderboardList";
import NavBar from "@/components/dashboard/navBar";
import PageTitle from "@/components/dashboard/pageTitle";
import Loader from "@/components/loader";
import { Badge } from "@/components/ui/badge";
import useLeaderboardStore from "@/features/leaderboard";
import { useUserStore } from "@/features/user";
import { useGetLeaderboard } from "@/hooks/leaderboard/use-get-leaderboard";
import { useTitle } from "@/hooks/use-title";
import { useEffect } from "react";

export default function Leaderboard() {
  const userField = useUserStore((state) => state.field);
  const leaderboardList = useLeaderboardStore((state) => state.list);
  const leaderboardLoading = useLeaderboardStore((state) => state.loading);
  const { getLeaderboard } = useGetLeaderboard();
  useTitle("Dashboard | Leaderboard");

  useEffect(() => {
    getLeaderboard();
  }, []);

  return (
    <>
      <Container className="flex flex-col gap-4 pb-24 mt-4">
        <div className="flex items-center justify-between">
          <PageTitle>Leaderboard</PageTitle>
          <Badge>{userField}</Badge>
        </div>
        {leaderboardLoading ? (
          <div className="flex items-center justify-center mt-2">
            <Loader childClassName="border-black" />
          </div>
        ) : (
          <LeaderboardList list={leaderboardList} />
        )}
      </Container>
      <NavBar />
    </>
  );
}
