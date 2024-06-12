import axios from "axios";
import { CreateTopicData } from "./types";

class TopicService {
  async findOne(id: string, accessToken: string) {
    const axiosRes = await axios.get(
      `${import.meta.env.VITE_API_URL}/topics/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return axiosRes;
  }

  async findTopicDefinitions(id: string, accessToken: string) {
    const axiosRes = await axios.get(
      `${import.meta.env.VITE_API_URL}/topics/${id}/definitions`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return axiosRes;
  }

  async findTopicTasks(id: string, accessToken: string) {
    const axiosRes = await axios.get(
      `${import.meta.env.VITE_API_URL}/topics/${id}/tasks`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return axiosRes;
  }

  async createOne(data: CreateTopicData, accessToken: string) {
    const axiosRes = await axios.post(
      `${import.meta.env.VITE_API_URL}/topics`,
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

export const topicService = new TopicService();
