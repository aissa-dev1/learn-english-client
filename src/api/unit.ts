import axios from "axios";
import { CreateUnitData } from "./types";
import { UserStudyRole } from "@/features/types";

class UnitService {
  async findUnits(studyRole: UserStudyRole, accessToken: string) {
    const axiosRes = await axios.get(
      `${import.meta.env.VITE_API_URL}/units/${studyRole}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return axiosRes;
  }

  async findOne(id: string, accessToken: string) {
    const axiosRes = await axios.get(
      `${import.meta.env.VITE_API_URL}/units/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return axiosRes;
  }

  async findUnitTopics(id: string, accessToken: string) {
    const axiosRes = await axios.get(
      `${import.meta.env.VITE_API_URL}/units/${id}/topics`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return axiosRes;
  }

  async createOne(data: CreateUnitData, accessToken: string) {
    const axiosRes = await axios.post(
      `${import.meta.env.VITE_API_URL}/units`,
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

export const unitService = new UnitService();
