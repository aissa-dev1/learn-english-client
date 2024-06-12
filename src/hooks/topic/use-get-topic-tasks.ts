import { getAccessToken } from "@/utils/jwt";
import { usePathId } from "../use-pathid";
import { topicService } from "@/api/topic";
import { TopicTaskType } from "@/features/types";

export function useGetTopicTasks() {
  const id = usePathId();

  async function getTopicTasks(): Promise<TopicTaskType[]> {
    const accessToken = getAccessToken();
    if (!accessToken) return [];
    const axiosRes = await topicService.findTopicTasks(id, accessToken);
    const tasks: TopicTaskType[] = axiosRes.data.tasks;
    return tasks;
  }

  return { getTopicTasks };
}
