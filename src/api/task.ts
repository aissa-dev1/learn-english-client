import axios from "axios";
import { CreateTaskQuestionData, CreateTopicTaskData } from "./types";

class TaskService {
  async findTaskQuestions(id: string, accessToken: string) {
    const axiosRes = await axios.get(
      `${import.meta.env.VITE_API_URL}/tasks/${id}/questions`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return axiosRes;
  }

  async createOne(data: CreateTopicTaskData, accessToken: string) {
    const axiosRes = await axios.post(
      `${import.meta.env.VITE_API_URL}/tasks`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return axiosRes;
  }

  async createQuestion(data: CreateTaskQuestionData, accessToken: string) {
    const axiosRes = await axios.post(
      `${import.meta.env.VITE_API_URL}/questions`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return axiosRes;
  }
}

export const taskService = new TaskService();
