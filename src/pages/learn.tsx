import Container from "@/components/container";
import UnitCardList from "@/components/dashboard/learn/unit/unitCardList";
import NavBar from "@/components/dashboard/navBar";
import PageTitle from "@/components/dashboard/pageTitle";
import StarComponent from "@/components/dashboard/starComponent";
import Loader from "@/components/loader";
import { Badge } from "@/components/ui/badge";
import { CardDescription } from "@/components/ui/card";
import useUnitStore from "@/features/unit";
import { useUserStore } from "@/features/user";
import { useGetUnits } from "@/hooks/unit/use-get-units";
import { useTitle } from "@/hooks/use-title";
import { useEffect } from "react";

export default function Learn() {
  const userField = useUserStore((state) => state.field);
  const userStars = useUserStore((state) => state.stars);
  const units = useUnitStore((state) => state.units);
  const unitsLoading = useUnitStore((state) => state.unitsLoading);
  const { getUnits } = useGetUnits();
  useTitle("Dashboard | Learn");

  useEffect(() => {
    getUnits();
  }, []);

  return (
    <>
      <Container className="flex flex-col gap-4 pb-24 mt-4">
        <div className="flex items-center justify-between">
          <PageTitle>Learn</PageTitle>
          <div className="flex items-center gap-4">
            <Badge>{userField}</Badge>
            <StarComponent stars={userStars} />
          </div>
        </div>
        {unitsLoading ? (
          <div className="flex items-center justify-center mt-2">
            <Loader childClassName="border-black" />
          </div>
        ) : units.length <= 0 ? (
          <CardDescription className="text-center">
            No units to show!
          </CardDescription>
        ) : (
          <UnitCardList list={units} />
        )}
      </Container>
      <NavBar />
    </>
  );
}
