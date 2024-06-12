import { getAccessToken } from "@/utils/jwt";
import { taskService } from "@/api/task";
import { TaskQuestionType } from "@/features/types";

export function useGetTaskQuestions() {
  async function getTaskQuestions(id: string): Promise<TaskQuestionType[]> {
    const accessToken = getAccessToken();
    if (!accessToken) return [];
    const axiosRes = await taskService.findTaskQuestions(id, accessToken);
    const taskQuestions: TaskQuestionType[] = axiosRes.data.questions;
    return taskQuestions;
  }

  return { getTaskQuestions };
}
