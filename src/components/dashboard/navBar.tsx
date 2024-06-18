import { Link, useLocation } from "react-router-dom";
import Container from "../container";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import useTopicStore from "@/features/topic";

interface NavCardProps {
  to: string;
  pathname: string;
  iconSrc: string;
  iconAlt: string;
  iconClassName: string;
}

function NavCard({
  to,
  pathname,
  iconSrc,
  iconAlt,
  iconClassName,
}: NavCardProps) {
  const active = pathname === to;

  return (
    <Link to={to} className="relative group">
      <div
        className={cn(
          "flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 transition-transform transform hover:scale-105 rounded-lg",
          {
            "bg-gradient-to-l from-teal-300 to-teal-500": active,
            "bg-gray-100 hover:bg-gray-200": !active,
          }
        )}
      >
        <img
          src={iconSrc}
          alt={iconAlt}
          className={cn(iconClassName, "w-6 h-6 lg:w-8 lg:h-8")}
        />
      </div>
    </Link>
  );
}

export default function NavBar() {
  const { pathname } = useLocation();
  const unitId = useTopicStore((state) => state.unitId);

  return (
    <Card className="fixed bottom-0 left-0 w-full h-20 rounded-none border-x-transparent border-b-transparent">
      <Container className="flex items-center justify-between h-full lg:justify-center lg:gap-10">
        {pathname.includes("/units") && !pathname.includes("/topics") && (
          <NavCard
            to="/dashboard/learn"
            pathname={pathname}
            iconSrc="/navigation/back.svg"
            iconAlt="learn-back"
            iconClassName="size-8 lg:size-10"
          />
        )}
        {pathname.includes("/topics") && (
          <NavCard
            to={`/dashboard/learn/units/${unitId}`}
            pathname={pathname}
            iconSrc="/navigation/back.svg"
            iconAlt="units-back"
            iconClassName="size-8 lg:size-10"
          />
        )}
        <NavCard
          to="/dashboard/levels"
          pathname={pathname}
          iconSrc="/navigation/paper.svg"
          iconAlt="paper"
          iconClassName="size-8 lg:size-10"
        />
        <NavCard
          to="/dashboard/profile"
          pathname={pathname}
          iconSrc="/navigation/profile.svg"
          iconAlt="profile"
          iconClassName="size-6 lg:size-8"
        />
        <NavCard
          to="/dashboard/leaderboard"
          pathname={pathname}
          iconSrc="/navigation/leaderboard.svg"
          iconAlt="leaderboard"
          iconClassName="size-6 lg:size-8"
        />
        <NavCard
          to="/dashboard/settings"
          pathname={pathname}
          iconSrc="/navigation/settings.svg"
          iconAlt="settings"
          iconClassName="size-6 lg:size-8"
        />
      </Container>
    </Card>
  );
}
