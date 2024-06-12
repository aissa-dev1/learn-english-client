import { Link, useLocation } from "react-router-dom";
import Container from "../container";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

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
    <Link to={to}>
      <Card
        className={cn("flex items-center justify-center size-10 lg:size-12", {
          "bg-gradient-to-l from-teal-300": active,
        })}
      >
        <img src={iconSrc} alt={iconAlt} className={iconClassName} />
      </Card>
    </Link>
  );
}

export default function NavBar() {
  const { pathname } = useLocation();

  return (
    <Card className="fixed bottom-0 left-0 w-full h-20 rounded-none border-x-transparent border-b-transparent">
      <Container className="flex items-center justify-between h-full lg:justify-center lg:gap-10">
        <NavCard
          to="/dashboard/learn"
          pathname={pathname}
          iconSrc="/navigation/learn.svg"
          iconAlt="learn"
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
