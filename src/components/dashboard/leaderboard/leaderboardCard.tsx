import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { LeaderBoardUser } from "@/features/types";
import { useUserStore } from "@/features/user";
import { cn } from "@/lib/utils";
import StarComponent from "../starComponent";

interface Props extends LeaderBoardUser {
  index: number;
}

const badgeStyles: Record<number, string> = {
  0: "bg-yellow-500 text-white hover:bg-yellow-400",
  1: "bg-purple-500 text-white hover:bg-purple-400",
  2: "bg-red-500 text-white hover:bg-red-400",
};

export default function LeaderboardCard({
  _id,
  userName,
  stars,
  index,
}: Props) {
  const userId = useUserStore((state) => state.sub);
  const badgeStyle = index < 3 ? badgeStyles[index] : "";

  return (
    <Card
      className={cn("flex items-center justify-between p-6", {
        "bg-gradient-to-r from-blue-700/10 to-purple-700/10": userId === _id,
      })}
    >
      <div className="flex items-center gap-2">
        <Badge
          className={cn(
            "flex items-center justify-center size-7 rounded-none",
            badgeStyle
          )}
        >
          {index + 1}
        </Badge>
        <CardTitle>{userName}</CardTitle>
      </div>
      <StarComponent stars={stars} />
    </Card>
  );
}
