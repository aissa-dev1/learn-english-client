import Container from "@/components/container";
import Definitions from "@/components/dashboard/learn/topic/definitions";
import TasksWithQuestions from "@/components/dashboard/learn/topic/tasksWithQuestions";
import NavBar from "@/components/dashboard/navBar";
import PageTitle from "@/components/dashboard/pageTitle";
import StarComponent from "@/components/dashboard/starComponent";
import Loader from "@/components/loader";
import { Badge } from "@/components/ui/badge";
import { CardDescription } from "@/components/ui/card";
import useTopicStore from "@/features/topic";
import { useUserStore } from "@/features/user";
import { useGetTopic } from "@/hooks/topic/use-get-topic";
import { useGetTopicDefinitions } from "@/hooks/topic/use-get-topic-definitions";
import { useGetTopicTasksWithQuestions } from "@/hooks/topic/use-get-topic-tasks-with-questions";
import { useTitle } from "@/hooks/use-title";
import { useEffect } from "react";

export default function Topic() {
  const topicLoading = useTopicStore((state) => state.loading);
  const topicTitle = useTopicStore((state) => state.title);
  const topicDescription = useTopicStore((state) => state.description);
  const definitionsLoading = useTopicStore((state) => state.definitionsLoading);
  const definitions = useTopicStore((state) => state.definitions);
  const tasksWithQuestionsLoading = useTopicStore(
    (state) => state.tasksWithQuestionsLoading
  );
  const tasksWithQuestions = useTopicStore((state) => state.tasksWithQuestions);
  const userField = useUserStore((state) => state.field);
  const userStars = useUserStore((state) => state.stars);
  const { getTopic } = useGetTopic();
  const { getTopicDefinitions } = useGetTopicDefinitions();
  const { getTopicTasksWithQuestions } = useGetTopicTasksWithQuestions();
  useTitle(topicTitle);

  useEffect(() => {
    getTopic();
    getTopicDefinitions();
    getTopicTasksWithQuestions();
  }, []);

  return (
    <>
      <Container className="flex flex-col gap-4 pt-4 pb-24">
        {topicLoading ? (
          <div className="flex items-center justify-center">
            <Loader childClassName="border-black" />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between lg:gap-0">
              <PageTitle>{topicTitle}</PageTitle>
              <div className="flex items-center gap-4">
                <Badge>{userField}</Badge>
                <Badge>A1</Badge>
                <StarComponent stars={userStars} />
              </div>
            </div>
            {topicDescription && (
              <CardDescription>{topicDescription}</CardDescription>
            )}
          </div>
        )}
        {definitionsLoading ? (
          <div className="flex items-center justify-center">
            <Loader childClassName="border-black" />
          </div>
        ) : (
          <Definitions list={definitions} />
        )}
        {tasksWithQuestionsLoading ? (
          <div className="flex items-center justify-center">
            <Loader childClassName="border-black" />
          </div>
        ) : (
          <TasksWithQuestions list={tasksWithQuestions} />
        )}
      </Container>
      <NavBar />
    </>
  );
}
