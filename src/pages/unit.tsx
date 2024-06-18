import Container from "@/components/container";
import TopicCardList from "@/components/dashboard/learn/topic/topicCardList";
import NavBar from "@/components/dashboard/navBar";
import PageTitle from "@/components/dashboard/pageTitle";
import StarComponent from "@/components/dashboard/starComponent";
import Loader from "@/components/loader";
import { Badge } from "@/components/ui/badge";
import { CardDescription } from "@/components/ui/card";
import useUnitStore from "@/features/unit";
import { useUserStore } from "@/features/user";
import { useGetUnit } from "@/hooks/unit/use-get-unit";
import { useGetUnitTopics } from "@/hooks/unit/use-get-unit-topics";
import { useTitle } from "@/hooks/use-title";
import { useEffect } from "react";

export default function Unit() {
  const userField = useUserStore((state) => state.field);
  const userStars = useUserStore((state) => state.stars);
  const unitLoading = useUnitStore((state) => state.loading);
  const unitTitle = useUnitStore((state) => state.title);
  const topics = useUnitStore((state) => state.topics);
  const topicsLoading = useUnitStore((state) => state.topicsLoading);
  const { getUnitTopics } = useGetUnitTopics();
  const { getUnit } = useGetUnit();
  useTitle(`Learn | ${unitTitle}`);

  useEffect(() => {
    getUnit();
    getUnitTopics();
  }, []);

  return (
    <>
      <Container className="flex flex-col gap-4 pt-4 pb-24">
        <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between lg:gap-0">
          <PageTitle>
            {unitLoading ? (
              <Loader childClassName="size-5 border-black" />
            ) : (
              unitTitle
            )}
          </PageTitle>
          <div className="flex items-center gap-4">
            <Badge>{userField}</Badge>
            <Badge>A1</Badge>
            <StarComponent stars={userStars} />
          </div>
        </div>
        {topicsLoading ? (
          <div className="flex items-center justify-center mt-2">
            <Loader childClassName="border-black" />
          </div>
        ) : topics.length <= 0 ? (
          <CardDescription className="text-center">
            No topics to show!
          </CardDescription>
        ) : (
          <TopicCardList list={topics} />
        )}
      </Container>
      <NavBar />
    </>
  );
}
