import Container from "@/components/container";
import Definitions from "@/components/dashboard/learn/topic/definitions";
import TasksWithQuestions from "@/components/dashboard/learn/topic/tasksWithQuestions";
import PageTitle from "@/components/dashboard/pageTitle";
import StarComponent from "@/components/dashboard/starComponent";
import Loader from "@/components/loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import useTopicStore from "@/features/topic";
import { useUserStore } from "@/features/user";
import { useGetTopic } from "@/hooks/topic/use-get-topic";
import { useGetTopicDefinitions } from "@/hooks/topic/use-get-topic-definitions";
import { useGetTopicTasksWithQuestions } from "@/hooks/topic/use-get-topic-tasks-with-questions";
import { useTitle } from "@/hooks/use-title";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Topic() {
  const topicLoading = useTopicStore((state) => state.loading);
  const unitId = useTopicStore((state) => state.unitId);
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
    <Container className="flex flex-col gap-4 py-4">
      {topicLoading ? (
        <div className="flex items-center justify-center">
          <Loader childClassName="border-black" />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <PageTitle>{topicTitle}</PageTitle>
            <div className="flex items-center gap-4">
              <Badge>{userField}</Badge>
              <StarComponent stars={userStars} />
            </div>
          </div>
          {topicDescription && (
            <CardDescription>{topicDescription}</CardDescription>
          )}
        </div>
      )}
      <Card className="flex items-center justify-between p-4">
        <Link to={`/dashboard/learn/units/${unitId}`}>
          <Button variant="outline">Back</Button>
        </Link>
        <Link to="/dashboard/learn">
          <Button variant="outline">Learn</Button>
        </Link>
      </Card>
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
  );
}
