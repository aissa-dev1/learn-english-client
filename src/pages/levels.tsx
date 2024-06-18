import Container from "@/components/container";
import NavBar from "@/components/dashboard/navBar";
import PageTitle from "@/components/dashboard/pageTitle";
import StarComponent from "@/components/dashboard/starComponent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { useUserStore } from "@/features/user";
import { useTitle } from "@/hooks/use-title";
import { Link } from "react-router-dom";

interface MinimizedLevel {
  id: string;
  title: string;
  to: string;
  disabled: boolean;
}

const levels: MinimizedLevel[] = [
  { id: "1", title: "A1", to: "/dashboard/learn", disabled: false },
  { id: "2", title: "A2", to: "/dashboard/learn", disabled: true },
  { id: "3", title: "B1", to: "/dashboard/learn", disabled: true },
  { id: "4", title: "B2", to: "/dashboard/learn", disabled: true },
  { id: "5", title: "C1", to: "/dashboard/learn", disabled: true },
  { id: "6", title: "C2", to: "/dashboard/learn", disabled: true },
];

function LevelCard({ title, to, disabled }: MinimizedLevel) {
  if (disabled) {
    return (
      <Card className="flex flex-col gap-8 px-4 py-6 lg:gap-4">
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Badge>Not available</Badge>
        </div>
        <Button className="w-full lg:w-fit" disabled>
          Learn
        </Button>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-8 px-4 py-6 lg:gap-4">
      <div className="flex items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Badge>Available</Badge>
      </div>
      <Link to={to} className="w-full lg:w-fit">
        <Button className="w-full">Learn</Button>
      </Link>
    </Card>
  );
}

export default function Levels() {
  const userField = useUserStore((state) => state.field);
  const userStars = useUserStore((state) => state.stars);
  useTitle("Dashboard | Levels");

  return (
    <>
      <Container className="flex flex-col gap-4 pb-24 mt-4">
        <div className="flex items-center justify-between">
          <PageTitle>Levels</PageTitle>
          <div className="flex items-center gap-4">
            <Badge>{userField}</Badge>
            <StarComponent stars={userStars} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {levels.map((level) => (
            <LevelCard key={level.id} {...level} />
          ))}
        </div>
      </Container>
      <NavBar />
    </>
  );
}
