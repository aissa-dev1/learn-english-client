import { getAccessToken } from "@/utils/jwt";
import useTopicStore from "@/features/topic";
import { TaskWithQuestionsType, TopicTaskType } from "@/features/types";
import { useGetTaskQuestions } from "../task/use-get-task-questions";
import { useGetTopicTasks } from "./use-get-topic-tasks";

export function useGetTopicTasksWithQuestions() {
  const { getTaskQuestions } = useGetTaskQuestions();
  const { getTopicTasks } = useGetTopicTasks();
  const setTasksWithQuestionsLoading = useTopicStore(
    (state) => state.setTasksWithQuestionsLoading
  );
  const updateTasksWithQuestions = useTopicStore(
    (state) => state.updateTasksWithQuestions
  );

  async function getTopicTasksWithQuestions() {
    const accessToken = getAccessToken();
    if (!accessToken) return;
    setTasksWithQuestionsLoading(true);
    const tasks: TopicTaskType[] = await getTopicTasks();
    const tasksWithQuestions: TaskWithQuestionsType[] = await Promise.all(
      tasks.map(async (task) => {
        const taskQuestions = await getTaskQuestions(task._id);
        return {
          ...task,
          questions: taskQuestions,
        };
      })
    );
    updateTasksWithQuestions(tasksWithQuestions);
    setTasksWithQuestionsLoading(false);
  }

  return { getTopicTasksWithQuestions };
}
