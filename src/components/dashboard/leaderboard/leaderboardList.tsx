import { LeaderBoardUser } from "@/features/types";
import LeaderboardCard from "./leaderboardCard";

interface Props {
  list: LeaderBoardUser[];
}

export default function LeaderboardList({ list }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {list.map((user, i) => (
        <LeaderboardCard key={user._id} {...user} index={i} />
      ))}
    </div>
  );
}
