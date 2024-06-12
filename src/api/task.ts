import axios from "axios";

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
}

export const taskService = new TaskService();
