import Container from "@/components/container";
import NavBar from "@/components/dashboard/navBar";
import PageTitle from "@/components/dashboard/pageTitle";
import StarComponent from "@/components/dashboard/starComponent";
import Loader from "@/components/loader";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import useLevelStore from "@/features/level";
import { useUserStore } from "@/features/user";
import { useGetLevels } from "@/hooks/level/use-get-levels";
import { useTitle } from "@/hooks/use-title";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Levels() {
  const userField = useUserStore((state) => state.field);
  const userStars = useUserStore((state) => state.stars);
  const levels = useLevelStore((state) => state.levels);
  const levelsLoading = useLevelStore((state) => state.levelsLoading);
  const { getLevels } = useGetLevels();
  useTitle("Dashboard | Levels");

  useEffect(() => {
    getLevels();
  }, []);

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
        {levelsLoading ? (
          <div className="flex items-center justify-center mt-2">
            <Loader childClassName="border-black" />
          </div>
        ) : levels.length <= 0 ? (
          <CardDescription className="text-center">
            No levels to show!
          </CardDescription>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {levels.map((level) => (
              <Link to={`/dashboard/levels/${level._id}`} key={level._id}>
                <Card className="p-6">
                  <CardTitle>{level.title}</CardTitle>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Container>
      <NavBar />
    </>
  );
}
